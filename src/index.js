/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Navigation from './navigator';
// import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';

import Store from './redux/store';

const store = Store();

export default class App extends Component {
  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }

  render() {
    console.disableYellowBox = true;

    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
