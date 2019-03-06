import * as React from 'react';
import { FlatList, ActivityIndicator, View, Text, StyleSheet, Dimensions, ToastAndroid,
  Linking, TextInput, TouchableOpacity, Picker, AsyncStorage } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

// Tab 1 component
export class TabOne extends React.Component {
  constructor(props){
      super(props);
      this.state = { isLoading: true }

      this.goToURL = this.goToURL.bind(this);
  }

  componentWillMount(){
    API_KEY = '0e31295f93404f34922420eec9703ecf'
    return fetch('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=' + API_KEY)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.articles,
        }, function(){

        });
      })
      .catch((error) =>{
        ToastAndroid.show(error, ToastAndroid.LONG);
        console.error(error);
      });
  }

  render () {
      if(this.state.isLoading){
        return(
            <View style={{flex: 1, padding: 20}}>
              <ActivityIndicator/>
            </View>
          )
        }
      return(
          <View style={{flex: 1, paddingTop:20}}>
            <FlatList
              data={this.state.dataSource}
              renderItem={({item}) =>
                <View style={styles.container}>
                        <Text style={styles.newsTitle}> {item.title} </Text>
                        <Text style={styles.newsAuthor}> By {item.author} </Text>
                        <Text style={styles.newsUrl} onPress={() => this.goToURL(item.url)}> {item.url} </Text>
                </View> }
              keyExtractor={(item, index) => index}
            />
          </View>
      );
  }

  goToURL(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + url);
      }
    });
  }
}

// Tab2 component
export class TabTwo extends React.Component {
  state = {
      name: '',
      email: '',
      contact: '',
      age: '',
      gender: 'Male',
   }

   handleName = (text) => {
      this.setState({ name: text })
   }
   handleEmail = (text) => {
      this.setState({ email: text })
   }
   handleContact = (text) => {
      this.setState({ contact: text })
   }
   handleAge = (text) => {
      this.setState({ age: text })
   }
   handleGender = (text) => {
      this.setState({ gender: text })
   }

   componentWillMount(){
     AsyncStorage.getItem('name').then(
       (value) => {
         this.setState({ 'name': value});
     });
     AsyncStorage.getItem('email').then(
       (value) => {
         this.setState({ 'email': value })
      });
     AsyncStorage.getItem('contact').then(
       (value) => {
         this.setState({ 'contact': value })
     });
     AsyncStorage.getItem('age').then(
       (value) => {
         this.setState({ 'age': value })
     });
     AsyncStorage.getItem('gender').then(
       (value) => {
         this.setState({ 'gender': value })
     });
   }

   submit = () => {
      this.setData();
   }

   setData = () => {
      AsyncStorage.setItem('name', this.state.name);
      AsyncStorage.setItem('email', this.state.email);
      AsyncStorage.setItem('contact', this.state.contact);
      AsyncStorage.setItem('age', this.state.age);
      AsyncStorage.setItem('gender', this.state.gender);
      this.showToast("Saved successfully");
   }

   showToast = (value) => {
     ToastAndroid.show(value, ToastAndroid.LONG);
   }

   render(){
      return (
         <View style = {styles.inputContainer}>

           <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Name"
              placeholderTextColor = "#9a73ef"
              autoCapitalize = "none"
              onChangeText = {this.handleName}
              value={this.state.name}/>

            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Email"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleEmail}
               value={this.state.email}/>

            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Contact"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleContact}
               value={this.state.contact}/>

             <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Age"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleAge}
                value={this.state.age}/>

                <Picker
                  selectedValue={this.state.gender}
                  style = {styles.picker}
                  onValueChange={(itemValue, itemIndex) => this.setState({gender: itemValue})}>
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                </Picker>

              <TouchableOpacity
                 style = {styles.submitButton}
                 onPress = {
                    () => this.submit()
                 }>
                 <Text style = {styles.submitButtonText}> Submit </Text>
              </TouchableOpacity>
         </View>
      )
   }
}

// Main Screen
export default class TabViewExample extends React.Component {

  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'First' },
      { key: 'second', title: 'Second' },
    ],
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this.renderScene}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
    );
  }

  renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <TabOne />;
      case 'second':
        return <TabTwo />;
      default:
        return null;
    }
  }

}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    borderColor: '#000',
    borderWidth: 1,
  },
  newsTitle: {
    color: '#f00',
    fontSize: 16,
  },
  newsAuthor: {
    fontSize: 14,
  },
  newsUrl: {
    color: '#0000FF',
    fontSize: 14,
  },
  inputContainer: {
       paddingTop: 23
  },
  input: {
     margin: 15,
     padding: 10,
     height: 40,
     borderColor: '#7a42f4',
     borderWidth: 1
  },
  picker: {
    margin: 15,
    padding: 10,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  submitButton: {
     backgroundColor: '#7a42f4',
     padding: 10,
     margin: 15,
     height: 40,
  },
  submitButtonText:{
     color: 'white',
     textAlign: 'center',
  }
});
