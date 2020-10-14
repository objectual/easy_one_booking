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
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './../containers/Home/index';
import { Images, Metrics, Fonts, Colors } from '../theme';
import Services from './../containers/Services/index';
import ChartBox from './../containers/ChartBox/index';
import BookingHistory from '../containers/BookingHistory/index';
import Proceeding from './../containers/Proceeding/index';
import Login from './../containers/Login/index';
import Categories from './../containers/Categories/index';
import Register from './../containers/Registration/index';
import Saloons from './../containers/Saloons/index';
import SaloonEmployee from './../containers/SaloonEmployee/index';
import styles from './styles';
import DrawerSaloons from './../containers/DrawerSaloons/index';
import BookingForm from './../containers/BookingForm/index';
import SaloonServicesByCategory from './../containers/SaloonServicesByCategory/index';
import Menu from './../containers/Menu';
import AsyncStorage from '@react-native-community/async-storage';
import { token } from '../config/WebServices';
import RNRestart from 'react-native-restart';
import Wallet from '../containers/Wallet';
import Profile from '../containers/Profile';
import GiveFeedBack from '../containers/GiveFeedBack';

import ForgetPassword from './../containers/ForgetPassword/index';
import Otp from '../containers/Otp';
import UpdatePassword from './../containers/UpdatePassword/index';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function homeStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

function chatStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chatbox"
        component={ChartBox}
        options={{
          title: 'Live Chat',
          headerTitleStyle: {
            marginLeft: '40%',
          },
        }}
      />
    </Stack.Navigator>
  );
}

function loginStack({ navigation }) {
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
        }}
      />
    </Stack.Navigator>
  );
}

function registerStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          title: 'Register',
          headerTitleStyle: {
            textAlign: 'center',
            justifyContent: 'center',
            // marginLeft: '30%',
          },
          header: {
            style: {
              textAlign: 'center',
            },
          },
        }}
      />
    </Stack.Navigator>
  );
}

// function giveFeedBackStack({ navigation }) {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="GiveFeedBack"
//         component={GiveFeedBack}
//         options={{
//           title: 'GiveFeedBack',
//           headerTitleStyle: {
//             marginLeft: '30%',
//           },

//           headerLeft: () => (
//             <TouchableOpacity onPress={() => navigation.openDrawer()}>
//               <Image
//                 source={Images.costumer_header_menu}
//                 style={styles.headerIcon}
//               />
//             </TouchableOpacity>
//           ),
//         }}
//       />
//     </Stack.Navigator>
//   );
// }

function mainStack({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
        <Stack.Screen name="Home" component={homeStack} />

        <Stack.Screen
          name="Saloons"
          component={Saloons}
          options={{ title: 'Salons' }}
        />

        <Stack.Screen
          name="DrawerSaloons"
          component={DrawerSaloons}
          options={{ title: 'Salon' }}
        />

        <Stack.Screen
          name="BookingHistory"
          component={BookingHistory}
          options={{ title: 'Booking History' }}
        />


        <Stack.Screen
          name="Available Services"
          component={Services}
          options={{ title: 'Category' }}
        />

        <Stack.Screen name="Register" component={registerStack} />

        <Stack.Screen
          name="Chatbox"
          component={chatStack}
          options={{ title: 'Chat Box' }}
        />
        <Stack.Screen name="Login" component={loginStack} />
        <Stack.Screen name="Menu" component={Menu} />

        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen
          name="BookingForm"
          component={BookingForm}
          options={{ title: 'Booking Form' }}
        />
        <Stack.Screen name="Proceeding" component={Proceeding} />
        <Stack.Screen
          name="SaloonEmployee"
          component={SaloonEmployee}
          options={{ title: 'Salon Employee' }}
        />
        {/* <Stack.Screen name="ServicesPage" component={Services} /> */}

        <Stack.Screen
          name="SaloonServicesByCategory"
          component={SaloonServicesByCategory}
          options={{ title: 'Salons Service' }}
        />
        <Stack.Screen
          name="Wallet"
          component={Wallet}
          options={{ title: 'Wallet' }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ title: 'Profile' }}
        />
        <Stack.Screen
          name="GiveFeedBack"
          component={GiveFeedBack}
          options={{ title: 'GiveFeedBack' }}
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          options={{ title: 'Forget Password' }}
        />

        <Stack.Screen
          name="Otp"
          component={Otp}
          options={{ title: 'Insert OTP' }}
        />

        <Stack.Screen
          name="UpdatePassword"
          component={UpdatePassword}
          options={{ title: 'Update Password' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default mainStack;
