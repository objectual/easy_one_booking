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
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Home from './../containers/Home/index';
import { Images, Metrics, Fonts, Colors } from '../theme';
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
import DrawerSaloons from './../containers/DrawerSaloons/index';
import BookingForm from './../containers/BookingForm/index';
import SaloonServicesByCategory from './../containers/SaloonServicesByCategory/index';
import GiveFeedBack from './../containers/GiveFeedBack/index';
import AsyncStorage from '@react-native-community/async-storage';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


async function getToken() {
  try {
    return await AsyncStorage.getItem('access_token')
  } catch (e) {
    // error reading value
  }
}

function CustomDrawerContent(props) {
  const token = getToken()
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />

      {token &&
        (<DrawerItem
          label="Logout"
          onPress={() => AsyncStorage.clear()}
          style={{ marginTop: 20 }}
          icon={({ focused }) => (
            <Image
              source={Images.costumer_logout}
              style={[getFocusedTabStyles(focused), styles.drawerIcon]}
            />
          )}
        />)
      }
    </DrawerContentScrollView>
  );
}

function homeStack({ navigation }) {
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

function serviceStack({ navigation }) {
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

function chatStack({ navigation }) {
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

function drawerSaloonsStack({ navigation }) {
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

function categoriesStack({ navigation }) {
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

function saloonStack({ navigation }) {
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

function employeeStack({ navigation }) {
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
function SaloonsStack({ navigation }) {
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

function bookingFormStack({ navigation }) {
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

function availableServicesStack({ navigation }) {
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

function registerStack({ navigation }) {
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

function proceedingStack({ navigation }) {
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

function giveFeedBackStack({ navigation }) {
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
    return { tintColor: Colors.red };
  }
}

function mainDrawer() {
  const token = getToken()

  return (
    <Drawer.Navigator
      drawerContentOptions={{
        itemStyle: { marginVertical: 10 },
        activeTintColor: 'red',
      }}
      drawerStyle={{
        width: '70%',
        backgroundColor: Colors.white,
        activeBackgroundColor: Colors.red,
      }}
      drawerType={'slide'}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={homeStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Image
              source={Images.costumer_home}
              style={[getFocusedTabStyles(focused), styles.drawerIcon]}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Chatbox"
        component={chatStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Image
              source={Images.costumer_chart_box}
              style={[getFocusedTabStyles(focused), styles.drawerIcon]}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="DrawerSaloon"
        component={drawerSaloonsStack}
        options={{
          title: 'Saloon',
          drawerIcon: ({ focused }) => (
            <Image
              source={Images.costumer_choose_a_templates}
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
          drawerIcon: ({ focused }) => (
            <Image
              source={Images.costumer_available_services}
              style={[getFocusedTabStyles(focused), styles.drawerIcon]}
            />
          ),
        }}
      />
      {token == null &&
        <>
          <Drawer.Screen
            name="Login"
            component={loginStack}
            options={{
              drawerIcon: ({ focused }) => (
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
              drawerIcon: ({ focused }) => (
                <Image
                  source={Images.costumer_register}
                  style={[getFocusedTabStyles(focused), styles.drawerIcon]}
                />
              ),
            }}
          />

        </>
      }


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

        {
          // <Drawer.Screen
          //   name="Saloons"
          //   component={saloonStack}
          //   options={{
          //     drawerIcon: ({focused}) => (
          //       <Image
          //         source={Images.costumer_services}
          //         style={[getFocusedTabStyles(focused), styles.drawerIcon]}
          //       />
          //     ),
          //   }}
          // />
          /*}
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

function mainStack({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
        <Stack.Screen
          name="BookingForm"
          options={{
            headerShown: false,
            headerTitleStyle: {
              marginLeft: '30%',
            },
          }}
          component={BookingForm}
        />

        <Stack.Screen
          name="SaloonEmployee"
          component={SaloonEmployee}
          options={{
            headerShown: false,
            headerTitleStyle: {
              marginLeft: '30%',
            },
          }}
        />
        {/* <Stack.Screen name="ServicesPage" component={Services} /> */}

        <Stack.Screen
          name="SaloonServicesByCategory"
          component={SaloonServicesByCategory}
          options={{
            headerShown: false,
            headerTitleStyle: {
              marginLeft: '30%',
            },
          }}
        />

        <Stack.Screen
          name="Proceeding"
          component={Proceeding}
          options={{
            headerShown: false,
            headerTitleStyle: {
              marginLeft: '30%',
            },
          }}
        />
        <Stack.Screen
          name="GiveFeedBack"
          component={GiveFeedBack}
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
