/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import MapView from  'react-native-maps';

export default class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      latitude: 13.139238380834923,
      longitude: 80.25188422300266,
    };
  }

  componentDidMount () {
    this.getCurrentLocation();    
  }

  getCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition(
          (position) => {
              let currentUserPosition = position.coords;
              this.setState({
                  latitude : currentUserPosition.latitude,
                  longitude: currentUserPosition.longitude
              });
          },
          (error) => {
              this.setState({
                  geoInfoText : 'GeoLocation Error'
              });
          }
      );
  }

  getMapCurrentRegion() {
    return {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  }

  render() {
    return <MapView style = {styles.map}
            initialRegion = {this.getMapCurrentRegion()}/>;
  }
}

const styles = StyleSheet.create({
  map: {
    height: 100,
    flex: 1
  }
});
