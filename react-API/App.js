/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  TextInput,
  NetInfo,
  Vibration
} from 'react-native';

const DURATION = 2000

export default class App extends Component{

    constructor(props){
        super(props);
    
        this.state = {
          keyboardText  : '',   
          netInfoText   : '',
          geoInfoText   : ''
        };
    }

    componentDidMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
        
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            this.setState({
                keyboardText : 'Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType
            }); 
        });

        this.netInfoConnectionChange = NetInfo.addEventListener(
            'connectionChange',
            this._handleConnectivityChange
        ); 

        this.getCurrentLocation();
        
        Vibration.vibrate(DURATION);
    }

    getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let currentUserPosition = position.coords;
                this.setState({
                    geoInfoText : 'GeoLocation: ' + currentUserPosition.latitude + ', ' + currentUserPosition.longitude
                });
            },
            (error) => {
                this.setState({
                    geoInfoText : 'GeoLocation Error'
                });
            }
        );
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
        this.netInfoConnectionChange.remove();
    }
    
      _keyboardDidShow = () => {
        this.setState({
            keyboardText : 'Keyboard Shown' 
        });
      }
    
      _keyboardDidHide = () => {
        this.setState({
            keyboardText : 'Keyboard Hide' 
        });
      }

      _handleConnectivityChange = (connectionInfo) => {
        this.setState({
            netInfoText : 'Connection change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType
        });
      }
       
      render() {
        return (
          <View>
            {/* KEYBOARD */}
            <Text style={styles.textLabel}>Keyboard API</Text>
            <TextInput
                onSubmitEditing={Keyboard.dismiss}
                style={styles.textInput}
            />
            <Text style={styles.textMessage}>{this.state.keyboardText}</Text>
          
            {/* NET INFO */}
            <Text style={styles.textLabel}>NetInfo API</Text>
            <Text style={styles.textMessage}>{this.state.netInfoText}</Text>
          
            {/* GEO Location */}
            <Text style={styles.textLabel}>GeoLocation API</Text>
            <Text style={styles.textMessage}>{this.state.geoInfoText}</Text>
          
          </View>  
        );
      }
}
let styles = StyleSheet.create({
    mainContainer: {
        flex    : 1
    },
    textLabel        : {
        marginTop   : 20,
        marginLeft  : 5,
        marginRight : 5,
        textAlign   : 'center',
        color       : '#2c3e50',
        fontWeight  : 'bold'
    },
    textMessage        : {
        marginTop   : 5,
        marginLeft  : 5,
        marginRight : 5,
        textAlign   : 'center',
        color       : '#2c3e50'
    },
    textInput  : {
        marginTop   : 5,
        marginLeft  : 5,
        marginRight : 5,
        color       : '#fff',
        backgroundColor: '#dfdfdf'    
    }
});