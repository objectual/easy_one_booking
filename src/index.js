/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Alert, Platform} from 'react-native';
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
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from "react-native-push-notification";
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
    this.backgroundNotificationListner();
    // this.getNotification();
    this.registerNotificationListner();
  }

  registerForNotifications = token => {
   console.log(token,'osapdopsaopsd')
  };

  registerNotificationListner = () => {
    PushNotification.configure({
      onRegister:(token)=>{
        console.log(token,'0909090909090')
        this.registerForNotifications(token.token)
      } ,
      requestPermissions: true,
    });
    return true;
  }
  

  foregroundNotificationListner = () => {
    messaging().onMessage(async (remoteMessage) => {
      console.log(remoteMessage,'temoteeeee00000')
      let notificationTitle = Platform.OS === "ios" ? remoteMessage?.data?.notification?.title  : remoteMessage?.notification?.title;
      let notificationMessage = Platform.OS === "ios" ? remoteMessage?.data?.notification?.body  : remoteMessage?.notification?.body;
      let details = {
        alertTitle: Platform.OS === "ios" ? remoteMessage?.data?.notification?.title  : remoteMessage?.notification?.title,
        alertBody: Platform.OS === "ios" ? remoteMessage?.data?.notification?.body  : remoteMessage?.notification?.body,
      }
      console.log(remoteMessage,'remoteee')
      this.setState({
        showNotification: true,
        notificationTitle: notificationTitle,
        notificationMessage: notificationMessage
      })
      PushNotificationIOS.scheduleLocalNotification(details);
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
  };

  // getNotification = () => {
  //   PushNotificationIOS.getDeliveredNotifications((data) => {
  //     console.log(data,'88888888888899999900000')
  //   });
  // }

  backgroundNotificationListner = () => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      let notificationTitle = Platform.OS === "ios" ? remoteMessage?.data?.notification?.title  : remoteMessage?.notification?.title;
      let notificationMessage = Platform.OS === "ios" ? remoteMessage?.data?.notification?.body  : remoteMessage?.notification?.body;
      let details = {
        alertTitle: Platform.OS === "ios" ? remoteMessage?.data?.notification?.title  : remoteMessage?.notification?.title,
        alertBody: Platform.OS === "ios" ? remoteMessage?.data?.notification?.body  : remoteMessage?.notification?.body,
      }
      console.log(remoteMessage,'background notification remoteee')
      this.setState({
        showNotification: true,
        notificationTitle: notificationTitle,
        notificationMessage: notificationMessage
      })
      PushNotificationIOS.scheduleLocalNotification(details);
    });
  }

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
      const granted = await messaging().requestPermission({
        alert: true,
        announcement: false,
        badge: true,
        carPlay: true,
        provisional: false,
        sound: true,
      });
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  async getToken() {
    console.log("fcm token")
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log(fcmToken,'fflsakdlkdslkds')
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
    console.log('fcmToken:', fcmToken);
  }

  render() {
    const {showNotification, notificationTitle, notificationMessage} = this.state;
    console.disableYellowBox = true;

    return (
      <Provider store={store}>
        <Navigation />
        {showNotification ? <NotificationAlert 
          notificationTitle = {notificationTitle}
          notificationMessage = {notificationMessage} 
       /> : null}  
      </Provider>
    );
  }
}
