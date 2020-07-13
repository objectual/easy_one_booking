import {connect} from 'react-redux';
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  TextInput,
  Linking,
  BackHandler,
  FlatList,
} from 'react-native';
import FloatingLabel from 'react-native-floating-labels';
import styles from './styles';
import {Images, Metrics, Fonts} from '../../theme';
import SpinnerLoader from '../../components/SpinnerLoader';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import BookingHistoryCard from '../../components/BookingHistory/index';
import Pending from '../Pending/index';
import Completed from '../Completed/index';

const Tab = createMaterialTopTabNavigator();

function CurrentScreen(props) {
  const {navigation, handleNavigation} = props;

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);

    const unsubscribe = navigation.addListener('tabPress', (e) => {});
    // return unsubscribe, backButtonHandler();
    return unsubscribe;
  }, [navigation]);

  function backButtonHandler() {
    BackHandler.removeEventListener('hardwareBackPress', () => true);
  }

  return (
    <View>
      <FlatList
        data={null}
        renderItem={({item, index}) => <BookingHistoryCard item={'item'} />}
      />
      <BookingHistoryCard />
    </View>
  );
}

function PreviousScreen() {
  return (
    <View>
      <FlatList
        data={null}
        renderItem={({item, index}) => <BookingHistoryCard item={'item'} />}
      />
      <BookingHistoryCard />
    </View>
  );
}

class BookingHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Detail: [(name = 'ddddddd')],
    };
  }

  handleBackButton() {
    alert('Back button is pressed ');
    // ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
    return true;
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  _renderOverlaySpinner = () => {
    const {isloading} = this.state;
    return <SpinnerLoader isloading={isloading} />;
  };

  render() {
    return (
      <NavigationContainer independent={true}>
        <Tab.Navigator
          initialRouteName="CurrentScreen"
          tabBarOptions={{
            labelStyle: {fontSize: 15},
            activeTintColor: 'white',
            inactiveTintColor: '#FF4514',
            // pressColor: '#FF4514',
            style: {
              borderWidth: 3,
              borderColor: '#FF4514',
            },
            tabStyle: {
              // activeBackgroundColor: '#FF4514',
              // inactiveBackgroundColor: 'white',
            },
            indicatorStyle: {
              borderWidth: 27,
              borderColor: '#FF4514',
            },
          }}>
          <Tab.Screen
            name="Pending"
            component={Pending}
            navigation={this.props.navigation}
          />
          <Tab.Screen
            name="Completed"
            component={Completed}
            navigation={this.props.navigation}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => ({});

const action = {};

export default connect(mapStateToProps, action)(BookingHistory);
