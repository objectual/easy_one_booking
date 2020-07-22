/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Alert} from 'react-native';
import Navigation from './navigator';
// import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import {Footer} from './components';
import Store from './redux/store';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import NotificationAlert from './components/NotificationAlert'
const store = Store();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotification: false
    };
  }

  componentDidMount() {
    this.socket = io('http://192.168.18.10:3000');
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
    this.checkPermission();
    this.foregroundNotificationListner();
  }

  foregroundNotificationListner = () => {
    messaging().onMessage(async (remoteMessage) => {
      this.setState({
        showNotification: true,
        notificationTitle: remoteMessage?.notification.title,
        notificationMessage: remoteMessage?.notification.title,
      })
      console.log(remoteMessage, "iiiiiiiiiiiiioooooooooooopppppppppp")
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
  };

  async checkPermission() {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async requestPermission() {
    try {
      await messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
    console.log('fcmToken:', fcmToken);
  }

  render() {
    const {showNotification} = this.state;
    console.disableYellowBox = true;

    return (
      <Provider store={store}>
        <Navigation />
       {/* {showNotification ? <NotificationAlert/> : null}  */}
       <NotificationAlert 
          notificationTitle = {notificationTitle}
          notificationMessage = {notificationMessage} 
       /> 
      </Provider>
    );
  }
}
