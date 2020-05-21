import { Platform, Share, Linking, Alert, ToastAndroid, DeviceEventEmitter, BackHandler } from 'react-native';
import { ApplicationStyles, Metrics, Colors } from '../theme';
import NetInfo from '@react-native-community/netinfo';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

class Util {

  isPlatformAndroid = () => Platform.OS === 'android';

  showToast(message: String) {
    if (this.isPlatformAndroid()) {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  }

  showYesNoMessage(title, message, onYes, onNo) {
    setTimeout(() => {
      Alert.alert(
        title,
        message,
        [
          {
            text: 'Yes',
            onPress: onYes,
          },
          {
            text: 'No',
            onPress: onNo,
            style: 'cancel',
          },
        ],
        { cancelable: false },
      );
    }, 150);
  }

  showCommonMessage(
    title,
    message,
    onOkPressed = () => console.log('OK Pressed'),
  ) {
    Alert.alert(
      title,
      message,
      [
        {
          text: 'ok',
          onPress: onOkPressed,
        },
      ],
      { cancelable: false },
    );
  }

  showAlertWithDelay(title, message, delay = 150) {
    setTimeout(() => {
      this.showCommonMessage(title, message);
    }, delay);
  }

  isConnected() {
    let isConnected;
    NetInfo.addEventListener(state => {
      isConnected = state.isConnected;
    });
    return isConnected;
  }

  isGPSEnabled() {
    LocationServicesDialogBox.checkLocationServicesIsEnabled({
      message: "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
      ok: "YES",
      cancel: "NO",
      enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
      showDialog: true, // false => Opens the Location access page directly
      openLocationServices: true, // false => Directly catch method is called if location services are turned off
      preventOutSideTouch: false, // true => To prevent the location services window from closing when it is clicked outside
      preventBackClick: false, // true => To prevent the location services popup from closing when it is clicked back button
      providerListener: false // true ==> Trigger locationProviderStatusChange listener when the location state changes
    }).then(function (success) {
      console.log(success, "Fahadddddddddddddddddddddddddddddd"); // success => {alreadyEnabled: false, enabled: true, status: "enabled"}
    }).catch((error) => {
      console.log(error.message); // error.message => "disabled"
    });
    BackHandler.addEventListener('hardwareBackPress', () => { //(optional) you can use it if you need it
      //do not use this method if you are using navigation."preventBackClick: false" is already doing the same thing.
      LocationServicesDialogBox.forceCloseDialog();
    });
    DeviceEventEmitter.addListener('locationProviderStatusChange', function (status) { // only trigger when "providerListener" is enabled
      console.log(status); //  status => {enabled: false, status: "disabled"} or {enabled: true, status: "enabled"}
    });
  }

}
export default new Util();
