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
import Home from './../../containers/Home/index';
import Services from './../../containers/Services/index';
import ChartBox from './../../containers/ChartBox/index';
import AvailableServices from './../../containers/AvailableServices/index';
import Proceeding from './../../containers/Proceeding/index';
import Login from './../../containers/Login/index';
import Categories from './../../containers/Categories/index';
import Register from './../../containers/Registration/index';
import Saloons from './../../containers/Saloons/index';
import SaloonEmployee from './../../containers/SaloonEmployee/index';

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
        key="Home"
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
            <Scene hideNavBar key="HomePage" component={Home} />
            <Scene hideNavBar key="ServicesPage" component={Services} />
            <Scene hideNavBar key="ChartBox" component={ChartBox} />
            <Scene hideNavBar key="Categories" component={Categories} />
            <Scene
              hideNavBar
              key="AvailableServices"
              component={AvailableServices}
            />
            <Scene hideNavBar key="Proceeding" component={Proceeding} />
            <Scene hideNavBar key="LoginPage" component={Login} />
            <Scene hideNavBar key="Register" component={Register} />
            <Scene hideNavBar key="SaloonsPage" component={Saloons} />
            <Scene hideNavBar key="SaloonEmployee" component={SaloonEmployee} />
          </Stack>
        </Scene>
      </Drawer>
    );
  }
}

export default new DrawerMenu();
