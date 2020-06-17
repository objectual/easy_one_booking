// import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import {View, Text, Dimensions, Platform, BackHandler} from 'react-native';
// import {Stack, Scene, Router, Actions, Tabs} from 'react-native-router-flux';

// import {Colors, Metrics, Images} from '../theme';
// import utils from '../util';

// import Login from '../containers/Login';
// import Register from '../containers/Registration';
// // import ForgotPassword from '../containers/ForgotPassword';
// // import VerifyResetCode from '../containers/VerifyResetCode';
// // import ResetPassword from '../containers/ResetPassword';
// import DrawerMenu from './DrawerNavigator';
// import styles from './styles';

// function onBackPress() {
//   const scene = Actions.currentScene;
//   if (scene === 'Login' || scene === 'Profile') {
//     utils.showYesNoMessage(
//       'Confirm',
//       'Are you sure you want to exit?',
//       () => {
//         BackHandler.exitApp();
//       },
//       () => {},
//     );
//     return true;
//   } else {
//     Actions.pop();
//     return true;
//   }
// }

// const navigator = Actions.create(
//   <Stack
//     titleStyle={styles.title}
//     headerStyle={styles.header}
//     key="root"
//     tintColor={Colors.primary}
//     // panHandlers={null}
//   >
//     {DrawerMenu.getDrawerMenu()}

//     <Scene
//       hideNavBar
//       headerStyle={styles.header}
//       titleStyle={[styles.title, {width: Metrics.screenWidth}]}
//       tintColor="white"
//       title={'Login'}
//       key="Login"
//       component={Login}
//       renderLeftButton={
//         () => {}
//         //<TabButtonLeft imagesArray={["rightArrow"]} actions={[Actions.pop]} />
//       }
//     />

//     <Scene
//       hideNavBar
//       headerStyle={styles.header}
//       titleStyle={[styles.title, {width: Metrics.screenWidth}]}
//       tintColor="white"
//       title={'Register'}
//       key="Register"
//       component={Register}
//       renderLeftButton={
//         () => {}
//         //<TabButtonLeft imagesArray={["rightArrow"]} actions={[Actions.pop]} />
//       }
//     />

//     {/* <Scene
//       hideNavBar
//       headerStyle={styles.header}
//       titleStyle={[styles.title, {width: Metrics.screenWidth}]}
//       tintColor="white"
//       title={'ForgotPassword'}
//       key="ForgotPassword"
//       component={ForgotPassword}
//       renderLeftButton={
//         () => {}
//         //<TabButtonLeft imagesArray={["rightArrow"]} actions={[Actions.pop]} />
//       }
//     />

//     <Scene
//       hideNavBar
//       headerStyle={styles.header}
//       titleStyle={[styles.title, {width: Metrics.screenWidth}]}
//       tintColor="white"
//       // drawerLockMode="locked-closed"
//       // gesturesEnabled={false}
//       title={'VerifyResetCode'}
//       key="VerifyResetCode"
//       component={VerifyResetCode}
//       renderLeftButton={
//         () => {}
//         //<TabButtonLeft imagesArray={["rightArrow"]} actions={[Actions.pop]} />
//       }
//     />

//     <Scene
//       hideNavBar
//       headerStyle={styles.header}
//       titleStyle={[styles.title, {width: Metrics.screenWidth}]}
//       tintColor="white"
//       title={'ResetPassword'}
//       key="ResetPassword"
//       component={ResetPassword}
//       renderLeftButton={
//         () => {}
//         //<TabButtonLeft imagesArray={["rightArrow"]} actions={[Actions.pop]} />
//       }
//     /> */}
//   </Stack>,
// );
// export default () => (
//   <AppNavigator
//     // backAndroidHandler={onBackPress}
//     navigator={navigator}
//   />
// );
// const AppNavigator = connect()(Router);

import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Home from './../containers/Home/index';
import {Images, Metrics, Fonts, Colors} from '../theme';
import Services from './../containers/Services/index';
import ChartBox from './../containers/ChartBox/index';
import AvailableServices from './../containers/AvailableServices/index';
import Proceeding from './../containers/Proceeding/index';
import Login from './../containers/Login/index';
import Categories from './../containers/Categories/index';
import Register from './../containers/Registration/index';
import Saloons from './../containers/Saloons/index';
import SaloonEmployee from './../containers/SaloonEmployee/index';
import styles from './styles';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => null}
        style={{marginTop: 20}}
        icon={({focused}) => (
          <Image
            source={Images.costumer_logout}
            style={[getFocusedTabStyles(focused), styles.drawerIcon]}
          />
        )}
      />
    </DrawerContentScrollView>
  );
}

function homeStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          headerTitleStyle: {
            marginLeft: '30%',
          },

          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image source={Images.costumer_header_menu} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function serviceStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Services"
        component={Services}
        options={{
          title: 'Services',
          headerTitleStyle: {
            marginLeft: '25%',
          },

          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image source={Images.costumer_header_menu} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function chatStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chatbox"
        component={ChartBox}
        options={{
          title: 'Live Chat',
          headerTitleStyle: {
            marginLeft: '30%',
          },

          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image source={Images.costumer_header_menu} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function categoriesStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={{
          title: 'Categories',
          headerTitleStyle: {
            marginLeft: '25%',
          },

          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image source={Images.costumer_header_menu} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function saloonStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Saloons"
        component={Saloons}
        options={{
          title: 'Saloons',
          headerTitleStyle: {
            marginLeft: '15%',
          },

          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image source={Images.costumer_header_menu} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function employeeStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SaloonEmployee"
        component={SaloonEmployee}
        options={{
          title: 'SaloonEmployee',
          headerTitleStyle: {
            marginLeft: '15%',
          },

          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image source={Images.costumer_header_menu} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function availableServicesStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AvailableServices"
        component={AvailableServices}
        options={{
          title: 'Available Services',
          headerTitleStyle: {
            marginLeft: '15%',
          },

          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image source={Images.costumer_header_menu} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function loginStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Login',
          headerTitleStyle: {
            marginLeft: '30%',
          },

          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image source={Images.costumer_header_menu} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function registerStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          title: 'Register',
          headerTitleStyle: {
            marginLeft: '30%',
          },

          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image source={Images.costumer_header_menu} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function getFocusedTabStyles(focused) {
  if (focused) {
    return {tintColor: Colors.red};
  }
}

function mainDrawer() {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        itemStyle: {marginVertical: 10},
        activeTintColor: 'red',
      }}
      drawerStyle={{
        width: '70%',
        backgroundColor: Colors.white,
        activeBackgroundColor: Colors.red,
      }}
      drawerType={'slide'}
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={homeStack}
        options={{
          drawerIcon: ({focused}) => (
            <Image
              source={Images.costumer_home}
              style={[getFocusedTabStyles(focused), styles.drawerIcon]}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Services"
        component={serviceStack}
        options={{
          drawerIcon: ({focused}) => (
            <Image
              source={Images.costumer_services}
              style={[getFocusedTabStyles(focused), styles.drawerIcon]}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Chatbox"
        component={chatStack}
        options={{
          drawerIcon: ({focused}) => (
            <Image
              source={Images.costumer_chart_box}
              style={[getFocusedTabStyles(focused), styles.drawerIcon]}
            />
          ),
        }}
      />
      {/*
        <Drawer.Screen
          name="Categories"
          component={categoriesStack}
          options={{
            drawerIcon: ({focused}) => 
            <Image
              source={Images.costumer_services}
              style={[getFocusedTabStyles(focused),styles.drawerIcon]}


            />
          }}
        />*/}

      <Drawer.Screen
        name="Available Services"
        component={availableServicesStack}
        options={{
          drawerIcon: ({focused}) => (
            <Image
              source={Images.costumer_available_services}
              style={[getFocusedTabStyles(focused), styles.drawerIcon]}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Login"
        component={loginStack}
        options={{
          drawerIcon: ({focused}) => (
            <Image
              source={Images.costumer_login}
              style={[getFocusedTabStyles(focused), styles.drawerIcon]}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Register"
        component={registerStack}
        options={{
          drawerIcon: ({focused}) => (
            <Image
              source={Images.costumer_register}
              style={[getFocusedTabStyles(focused), styles.drawerIcon]}
            />
          ),
        }}
      />

      {/*}

        <Drawer.Screen
          name="Saloons"
          component={saloonStack}
          options={{
            drawerIcon: ({focused}) => 
            <Image
              source={Images.costumer_services}
              style={[getFocusedTabStyles(focused),styles.drawerIcon]}

            />
          }}
        />

        <Drawer.Screen
          name="Employee"
          component={employeeStack}
          options={{
            drawerIcon: ({focused}) => 
            <Image
              source={Images.costumer_services}
              style={[getFocusedTabStyles(focused),styles.drawerIcon]}


            />
          }}
        /> */}
    </Drawer.Navigator>
  );
}

function mainStack({navigation}) {
  return (
    <NavigationContainer>
      <Stack.Navigator
     
      >
        <Stack.Screen
          name="mainDrawer"
          component={mainDrawer}
          options={{
            headerShown: false,
            headerTitleStyle: {
              marginLeft: '30%',
            },
          }}
        />
         <Stack.Screen
          name="Saloons"
          component={Saloons}
          options={{
            headerShown: false,
            headerTitleStyle: {
              marginLeft: '30%',
            },
          }}
        />

        <Stack.Screen
          name="Categories"
          component={Categories}
          options={{
            headerShown: false,
            headerTitleStyle: {
              marginLeft: '30%',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default mainStack;
