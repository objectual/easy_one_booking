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
import GiveFeedBack from './../containers/GiveFeedBack/index';
import AsyncStorage from '@react-native-community/async-storage';
import {token} from '../config/WebServices';
import RNRestart from 'react-native-restart';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />

      {token != null && (
        <DrawerItem
          label="Logout"
          onPress={async () => {
            await AsyncStorage.clear(), RNRestart.Restart();
          }}
          style={{marginTop: 20}}
          icon={({focused}) => (
            <Image
              source={Images.costumer_logout}
              style={[getFocusedTabStyles(focused), styles.drawerIcon]}
            />
          )}
        />
      )}
    </DrawerContentScrollView>
  );
}

function homeStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        // options={{
        //   title: 'Home',
        //   headerTitleStyle: {flex: 1, textAlign: 'center'},
        // }}
      />
    </Stack.Navigator>
  );
}

function menuStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{
          title: 'Menu',
          headerTitleStyle: {
            marginLeft: '30%',
          },

          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={Images.costumer_header_menu}
                style={styles.headerIcon}
              />
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
              <Image
                source={Images.costumer_header_menu}
                style={styles.headerIcon}
              />
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
            marginLeft: '40%',
          },
        }}
      />
    </Stack.Navigator>
  );
}

function drawerSaloonsStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DrawerSaloons"
        component={DrawerSaloons}
        options={{
          title: 'Saloons',
          headerTitleStyle: {
            marginLeft: '30%',
          },

          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={Images.costumer_header_menu}
                style={styles.headerIcon}
              />
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
              <Image
                source={Images.costumer_header_menu}
                style={styles.headerIcon}
              />
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
              <Image
                source={Images.costumer_header_menu}
                style={styles.headerIcon}
              />
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
              <Image
                source={Images.costumer_header_menu}
                style={styles.headerIcon}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
function SaloonsStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ServicesPage"
        component={Services}
        options={{
          title: 'ServicesPage',
          headerTitleStyle: {
            marginLeft: '15%',
          },

          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={Images.costumer_header_menu}
                style={styles.headerIcon}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

// drawerSaloonsStack

function bookingFormStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BookingForm"
        component={BookingForm}
        options={{
          title: 'Booking Form',
          headerTitleStyle: {
            marginLeft: '15%',
          },

          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={Images.costumer_header_menu}
                style={styles.headerIcon}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function bookingHistoryStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BookingHistory"
        component={BookingHistory}
        options={{
          title: 'Booking History',
          headerTitleStyle: {
            marginLeft: '15%',
          },

          // headerLeft: () => (
          //   <TouchableOpacity onPress={() => navigation.openDrawer()}>
          //     <Image
          //       source={Images.costumer_header_menu}
          //       style={styles.headerIcon}
          //     />
          //   </TouchableOpacity>
          // ),
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
        }}
      />
    </Stack.Navigator>
  );
}

function historyStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Booking History"
        component={BookingHistory}
        options={{
          title: 'Booking History',
          headerTitleStyle: {
            marginLeft: '30%',
          },
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

function proceedingStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Proceeding"
        component={Proceeding}
        options={{
          title: 'Proceeding',
          headerTitleStyle: {
            marginLeft: '30%',
          },

          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={Images.costumer_header_menu}
                style={styles.headerIcon}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function giveFeedBackStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GiveFeedBack"
        component={GiveFeedBack}
        options={{
          title: 'GiveFeedBack',
          headerTitleStyle: {
            marginLeft: '30%',
          },

          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={Images.costumer_header_menu}
                style={styles.headerIcon}
              />
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

function mainStack({navigation}) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
        <Stack.Screen name="Home" component={homeStack} />

        <Stack.Screen name="Saloons" component={Saloons} />

        <Stack.Screen name="DrawerSaloons" component={DrawerSaloons} />

        {token != null && (
          <Stack.Screen
            name="BookingHistory"
            component={historyStack}
            options={{
              headerShown: false,
              headerTitleStyle: {
                marginLeft: '30%',
              },
            }}
          />
          // ) : (
          //   alert('Please Login')
        )}

        <Stack.Screen name="Available Services" component={Services} />

        <Stack.Screen name="Register" component={registerStack} />

        <Stack.Screen name="Chatbox" component={chatStack} />
        <Stack.Screen name="Login" component={loginStack} />
        <Stack.Screen name="Menu" component={Menu} />

        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="BookingForm" component={BookingForm} />

        <Stack.Screen name="SaloonEmployee" component={SaloonEmployee} />
        {/* <Stack.Screen name="ServicesPage" component={Services} /> */}

        <Stack.Screen
          name="SaloonServicesByCategory"
          component={SaloonServicesByCategory}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default mainStack;
