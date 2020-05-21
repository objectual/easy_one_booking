// @flow
import React from 'react';

import {Image, View} from 'react-native';
import {connect} from 'react-redux';

import {
  Stack,
  Scene,
  Actions,
  ActionConst,
  Drawer,
  Tabs,
} from 'react-native-router-flux';

import {Header} from '../../components';
import {Images, Metrics, Colors, Fonts} from '../../theme';
import styles from '../styles';
import Sidebar from '../../containers/Sidebar';
import AwesomePlaces from '../../containers/AwesomePlaces';
const CustomHeader = () => {
  return (
    <Header
      headerText={'Dashboard'}
      leftIcon={Images.menuIcon}
      leftBtnPress={() => {
        this.props.navigation.openDrawer();
      }}
    />
  );
};

class DrawerMenu {
  // onEnterSomeView = () => {
  //   console.log('uuuuuiiiiioooo');
  // };

  // onExitSomeView = () => {
  //   console.log('uuuuuiiiexitiioooo');
  // };

  // closeSideMenu() {
  //   this._drawer.close()
  // }

  getDrawerMenu() {
    return (
      <Drawer
        drawer
        hideNavBar
        type={ActionConst.RESET}
        key="dashboard"
        contentComponent={Sidebar}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan={true}
        tweenHandler={(ratio) => {
          return {
            mainOverlay: {
              opacity: ratio === 0 ? 0 : 0.3,
              backgroundColor: '#000',
            },
          };
        }}
        drawerWidth={Metrics.screenWidth * 0.72}>
        <Scene hideNavBar>
          <Stack key="root">
            <Scene hideNavBar key="Yourplaces" component={AwesomePlaces} />
          </Stack>
        </Scene>
      </Drawer>
    );
  }
}

export default new DrawerMenu();
