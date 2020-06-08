import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  Animated,
  TouchableOpacity,
  Alert,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {DrawerNavigatorItems, DrawerItems} from 'react-navigation-drawer';
import {Images, Metrics} from '../../theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import {Actions} from 'react-native-router-flux';
import { stackNavigator } from "../../redux/actions/StackNavigator";


class Sidebar extends Component {
  navigateHomePage = () => {
    const { myNavigation } = this.props;
    Actions.HomePage();
    // this.props(myNavigation.newView, 'Home');
  };
  navigateServicesPage = () => {
    Actions.ServicesPage();
  };
  navigateChartBox = () => {
    Actions.ChartBox();
  };
  navigateCategories = () => {
    Actions.Categories();
  };
  navigateAvailableServices = () => {
    Actions.AvailableServices();
  };
  navigateLogin = () => {
    Actions.LoginPage();
  };
  navigateRegister = () => {
    Actions.Register();
  };
  onLogout = () => {
    Actions.HomePage();
  };

  renderBody = () => {
    return (
      <View
        style={{
          flex: 1,
          // backgroundColor: '#F9FBFD ',
          paddingVertical: Metrics.ratio(10),
        }}>
        {this.renderRow('Home', this.navigateHomePage, 'costumer_home', '')}
        {this.renderRow(
          'Services',
          this.navigateServicesPage,
          'costumer_services',
          '',
        )}
        {this.renderRow(
          'Chart Box',
          this.navigateChartBox,
          'costumer_chart_box',
          '',
        )}
        {/* {this.renderRow(
          'Categories',
          this.navigateCategories,
          'costumer_choose_a_templates',
          '',
        )} */}
        {this.renderRow(
          'Available Services',
          this.navigateAvailableServices,
          'costumer_available_services',
          '',
        )}
        {this.renderRow(
          'Login',
          this.navigateLogin,
          'costumer_login',
          '',
        )}
        {this.renderRow(
          'Register',
          this.navigateRegister,
          'costumer_register',
          '',
        )}
        {/* {this.renderRow('Logout', this.onLogout, 'costumer_logout', 'logout')} */}
      </View>
    );
  };
  renderRow = (title, onPress, icon, activeScene, rightIcon) => {
    const {myNavigation} = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.listView,
          myNavigation &&
            myNavigation.newView === activeScene && {
              backgroundColor: '#50CEFF',
            },
          title == 'Logout' && {
            marginBottom: Metrics.ratio(25),
          },{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }
        ]}>
        <Image
          resizeMethod="auto"
          resizeMode="contain"
          style={{
            marginHorizontal: Metrics.ratio(16),
            width: Metrics.ratio(25),
            height: Metrics.ratio(25),
          }}
          source={Images[icon]}
        />
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text style={[styles.listTitle]}>{title}</Text>
        </View>
        {rightIcon && (
          <Icon
            style={{marginLeft: Metrics.screenWidth * 0.3}}
            size={20}
            color="white"
            name={rightIcon}
          />
        )}
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View
        style={{height: Metrics.screenHeight * 1, backgroundColor: '#F9FBFD'}}>
        <ScrollView>
          <View
            style={styles.container}
            forceInset={{top: 'always', horizontal: 'never'}}>
            {this.renderBody()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({myNavigation: state.myNavigation});

const action = {stackNavigator};

export default connect(mapStateToProps, action)(Sidebar);
