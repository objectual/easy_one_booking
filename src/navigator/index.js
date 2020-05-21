import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, Dimensions, Platform, BackHandler} from 'react-native';
import {Stack, Scene, Router, Actions, Tabs} from 'react-native-router-flux';

import {Colors, Metrics, Images} from '../theme';
import utils from '../util';

import Login from '../containers/Login';
import Register from '../containers/Registration';
// import ForgotPassword from '../containers/ForgotPassword';
// import VerifyResetCode from '../containers/VerifyResetCode';
// import ResetPassword from '../containers/ResetPassword';
import DrawerMenu from './DrawerNavigator';
import styles from './styles';

function onBackPress() {
  const scene = Actions.currentScene;
  if (scene === 'Login' || scene === 'Profile') {
    utils.showYesNoMessage(
      'Confirm',
      'Are you sure you want to exit?',
      () => {
        BackHandler.exitApp();
      },
      () => {},
    );
    return true;
  } else {
    Actions.pop();
    return true;
  }
}

const navigator = Actions.create(
  <Stack
    titleStyle={styles.title}
    headerStyle={styles.header}
    key="root"
    tintColor={Colors.primary}
    // panHandlers={null}
  >
    <Scene
      hideNavBar
      headerStyle={styles.header}
      titleStyle={[styles.title, {width: Metrics.screenWidth}]}
      tintColor="white"
      title={'Login'}
      key="Login"
      component={Login}
      renderLeftButton={
        () => {}
        //<TabButtonLeft imagesArray={["rightArrow"]} actions={[Actions.pop]} />
      }
    />

    <Scene
      hideNavBar
      headerStyle={styles.header}
      titleStyle={[styles.title, {width: Metrics.screenWidth}]}
      tintColor="white"
      title={'Register'}
      key="Register"
      component={Register}
      renderLeftButton={
        () => {}
        //<TabButtonLeft imagesArray={["rightArrow"]} actions={[Actions.pop]} />
      }
    />

    {/* <Scene
      hideNavBar
      headerStyle={styles.header}
      titleStyle={[styles.title, {width: Metrics.screenWidth}]}
      tintColor="white"
      title={'ForgotPassword'}
      key="ForgotPassword"
      component={ForgotPassword}
      renderLeftButton={
        () => {}
        //<TabButtonLeft imagesArray={["rightArrow"]} actions={[Actions.pop]} />
      }
    />

    <Scene
      hideNavBar
      headerStyle={styles.header}
      titleStyle={[styles.title, {width: Metrics.screenWidth}]}
      tintColor="white"
      // drawerLockMode="locked-closed"
      // gesturesEnabled={false}
      title={'VerifyResetCode'}
      key="VerifyResetCode"
      component={VerifyResetCode}
      renderLeftButton={
        () => {}
        //<TabButtonLeft imagesArray={["rightArrow"]} actions={[Actions.pop]} />
      }
    />

    <Scene
      hideNavBar
      headerStyle={styles.header}
      titleStyle={[styles.title, {width: Metrics.screenWidth}]}
      tintColor="white"
      title={'ResetPassword'}
      key="ResetPassword"
      component={ResetPassword}
      renderLeftButton={
        () => {}
        //<TabButtonLeft imagesArray={["rightArrow"]} actions={[Actions.pop]} />
      }
    /> */}
    {DrawerMenu.getDrawerMenu()}
  </Stack>,
);
export default () => (
  <AppNavigator backAndroidHandler={onBackPress} navigator={navigator} />
);
const AppNavigator = connect()(Router);
