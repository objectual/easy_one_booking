import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
  BackHandler,
} from 'react-native';

import {Images, Metrics} from '../../theme';

import {Footer} from './../../components';

import Wallet_Icon from 'react-native-vector-icons/dist/SimpleLineIcons';

import AsyncStorage from '@react-native-community/async-storage';

import Booking_Icon from 'react-native-vector-icons/dist/EvilIcons';
import User_Icon from 'react-native-vector-icons/dist/Feather';
import Logout_Icon from 'react-native-vector-icons/dist/AntDesign';

import {token} from './../../config/WebServices';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: [
        {
          iconUrl: Wallet_Icon,
          icon: 'wallet',
          title: 'Wallet',
        },
        {
          iconUrl: Booking_Icon,
          icon: 'calendar',
          title: 'Booking History',
        },
        {
          iconUrl: User_Icon,
          icon: 'user-plus',
          title: 'Register',
        },
        {
          iconUrl: User_Icon,
          icon: 'user-minus',
          title: 'Login',
        },
        {
          iconUrl: Logout_Icon,
          icon: 'logout',
          title: 'Logout',
        },
      ],
      list: [
        {
          iconUrl: User_Icon,
          icon: 'user-plus',
          title: 'Register',
        },
        {
          iconUrl: User_Icon,
          icon: 'user-minus',
          title: 'Login',
        },
        {
          iconUrl: Logout_Icon,
          icon: 'logout',
          title: 'Logout',
        },
      ],
      token: '',
    };
  }

  handleAndroidBackButton = (callback) => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      callback;
      return true;
    });
  };

  async removeItemValue(key) {
    try {
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('loginResponce');
      this.setState({token: ''});
      alert('Logout Successfully');
      return true;
    } catch (exception) {
      return false;
    }
  }

  removeAndroidBackButtonHandler = () => {
    BackHandler.removeEventListener('hardwareBackPress', () => {});
  };

  onClickListener = (item, viewId) => {
    item.title == 'Login' && this.props.navigation.navigate('Login');
    item.title == 'Register' && this.props.navigation.navigate('Register');
    item.title == 'Logout' && this.removeItemValue();
    item.title == 'Booking History' &&
      token &&
      this.props.navigation.navigate('BookingHistory', {
        handleNavigation: this.props.navigation.navigate,
      });

    item.title == 'Wallet' &&
      token &&
      this.props.navigation.navigate('Wallet', {
        handleNavigation: this.props.navigation.navigate,
      });
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  componentDidMount() {
    this.setState({token});
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    this.props.navigation.navigate('Menu');
  };

  renderHeader = () => {
    return (
      <View
        style={{
          height: Metrics.ratio(150),
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: Metrics.ratio(100),
              height: 100,
              borderRadius: 50,
              backgroundColor: 'red',
              paddingLeft: Metrics.ratio(20),
            }}></View>
          <View
            style={{
              paddingLeft: Metrics.ratio(20),
            }}>
            <Text style={{fontSize: Metrics.ratio(22)}}>Lorem Ispum</Text>
            <Text style={{fontSize: Metrics.ratio(17)}}>Lorem Ispum</Text>
          </View>
        </View>
      </View>
    );
  };

  renderItemList = (item, index) => {
    if (item.title == 'Logout' && this.state.token) {
      return (
        <View style={styles.container}>
          <View style={styles.servicebox}>
            <TouchableOpacity onPress={() => this.onClickListener(item, index)}>
              <View
                style={[
                  styles.navigationInsideContainer,
                  {backgroundColor: this.state.bgColor},
                ]}>
                <item.iconUrl name={item.icon} size={30} />
                <Text style={styles.navigationContainerText}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (
      (item.title == 'Login' || item.title == 'Register') &&
      !this.state.token
    ) {
      return (
        <View style={styles.container}>
          <View style={styles.servicebox}>
            <TouchableOpacity onPress={() => this.onClickListener(item, index)}>
              <View
                style={[
                  styles.navigationInsideContainer,
                  {backgroundColor: this.state.bgColor},
                ]}>
                <item.iconUrl name={item.icon} size={30} />
                <Text style={styles.navigationContainerText}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (item.title == 'Booking History' || item.title == 'Wallet') {
      return (
        <View style={styles.container}>
          <View style={styles.servicebox}>
            <TouchableOpacity onPress={() => this.onClickListener(item, index)}>
              <View
                style={[
                  styles.navigationInsideContainer,
                  {backgroundColor: this.state.bgColor},
                ]}>
                <item.iconUrl name={item.icon} size={30} />
                <Text style={styles.navigationContainerText}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  render() {
    return (
      <Footer navigation={this.props.navigation.navigate} screen={'navbar'}>
        <ScrollView>
          {/* {this.renderHeader()} */}
          <View style={styles.formContent}></View>

          <FlatList
            data={this.state.dataSource}
            renderItem={({item, index}) => this.renderItemList(item, index)}
          />
        </ScrollView>
      </Footer>
    );
  }
}

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     backgroundColor: '#EBEBEB',
  //   },
  formContent: {
    flexDirection: 'row',
    marginTop: 30,
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconBtnSearch: {
    alignSelf: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  notificationList: {
    marginTop: 20,
    padding: 10,
  },
  notificationBox: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 10,
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: 10,
    alignSelf: 'center',
  },
  container: {
    marginHorizontal: Metrics.ratio(15),
    marginVertical: Metrics.ratio(10),
  },
  navigationInsideContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  navigationContainerText: {
    marginHorizontal: Metrics.ratio(15),
    fontSize: Metrics.ratio(17),
    justifyContent: 'center',
  },
  image: {
    height: 20,
    width: 20,
    justifyContent: 'center',
  },
  servicebox: {
    width: Metrics.screenWidth * 0.91,
    backgroundColor: '#fff',
    borderRadius: Metrics.ratio(15),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
  },
});
