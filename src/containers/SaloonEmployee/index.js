import {connect} from 'react-redux';
import React, {Component, useState} from 'react';
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
  StyleSheet,
  Button,
  FlatList,
} from 'react-native';
import FloatingLabel from 'react-native-floating-labels';
import styles from './styles';
import {Images, Metrics, Fonts} from '../../theme';
import SpinnerLoader from '../../components/SpinnerLoader';
import Header from '../../components/Header/index';
import Rating from './../../components/Rating/index';
import StarRating from 'react-native-star-rating';
import {request as get_Employees_By_Saloon_And_Category} from '../../redux/actions/GetEmployeesBySaloonAndCategory.js';
import {request as create_Booking} from '../../redux/actions/CreateBooking.js';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';

class SaloonEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 5,
      date: new Date(1598051730000),
      mode: 'date',
      loginData: this.props.login.data.data,
      show: false,
      getSelectedServices: [],
      selectBookNow: 0,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.getEmployeesBySaloonAndCategory) {
      if (
        !nextProps.getEmployeesBySaloonAndCategory.failure &&
        !nextProps.getEmployeesBySaloonAndCategory.isFetching &&
        nextProps.getEmployeesBySaloonAndCategory.data.data &&
        nextProps.getEmployeesBySaloonAndCategory.data.success
      ) {
        this.setState({
          getSelectedServices:
            nextProps.getEmployeesBySaloonAndCategory.data.data,
        });
        // console.log(
        //   nextProps.getEmployeesBySaloonAndCategory.data.data,
        //   'getEmployeesBySaloonAndCategory',
        // );
      } else if (
        !nextProps.getEmployeesBySaloonAndCategory.failure &&
        !nextProps.getEmployeesBySaloonAndCategory.isFetching &&
        nextProps.getEmployeesBySaloonAndCategory.data.data &&
        !nextProps.getEmployeesBySaloonAndCategory.data.success
      ) {
        this.setState({isloading: false}, () => {
          setTimeout(() => {
            Alert.alert(
              'Error',
              nextProps.getEmployeesBySaloonAndCategory.data.msg,
            );
          }, 3000);
        });
      }
    }
    if (nextProps.createBooking) {
      console.log(
        nextProps.createBooking,
        'createBookingcreateBookingcreateBookingcreateBookingcreateBooking',
      );
      if (
        !nextProps.createBooking.failure &&
        !nextProps.createBooking.isFetching &&
        nextProps.createBooking.data &&
        nextProps.createBooking.data.success
      ) {
        // this.setState({
        //   getSelectedServices: nextProps.createBooking.data.data,
        // });
        console.log(
          nextProps.createBooking,
          'createBookingcreateBookingcreateBookingcreateBookingcreateBooking',
        );
      } else if (
        !nextProps.createBooking.failure &&
        !nextProps.createBooking.isFetching &&
        nextProps.createBooking.data &&
        !nextProps.createBooking.data.success
      ) {
        this.setState({isloading: false}, () => {
          setTimeout(() => {
            Alert.alert('Error', nextProps.createBooking.data.msg);
          }, 3000);
        });
      }
    }
  }
  componentDidMount = () => {
    this.handleSaloonServicesByCategory();
  };

  handleSaloonServicesByCategory = () => {
    // const {categoryId} = this.props;
    this.setState({isLoading: true});
    const payload = {
      companyId: '5ee0ca321b1dc85bb0a98c17',
      serviceId: '5ee38d25e6d5b733dcca9297',
    };
    this.props.get_Employees_By_Saloon_And_Category(payload);
  };
  handleCreateBookingLogin = () => {
    const {loginData} = this.state;
    if (loginData && loginData.access_token) {
      this.handleCreateBooking();
    } else {
      Alert.alert('Cannot Create Order', 'Please Login First for order');
    }
  };

  handleCreateBooking = () => {
    const {loginData} = this.state;
    console.log(
      loginData.access_token,
      'loginDataloginDataloginDataloginDataloginData',
    );
    // const {categoryId} = this.props;
    this.setState({isLoading: true});
    const payloadBooking = {
      employeeId: '5ee232365391f10aa8a853dc',
      serviceId: '5ee21ff48384d05ab0b87a1a',
      categoryId: '5ee0cb031b1dc85bb0a98c18',
      status: '1',
      bookingDate: '10-06-2020',
      access_token: loginData.access_token,
    };
    this.props.create_Booking(payloadBooking);
  };

  onChange = (event, date) => {
    date = date || this.state;
    this.setState({
      // show: Platform.OS === 'ios' ? true : false,
      date,
    });
  };

  showMode = (mode) => {
    this.setState({
      show: true,
      mode,
    });
  };

  showDatepicker = () => {
    this.setState({showDatepicker: true});
  };

  // showTimepicker = () => {
  //   this.setState({showTimepicker: true});
  //   // this.showMode('time');
  // };

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }
  _renderOverlaySpinner = () => {
    const {isloading} = this.state;
    return <SpinnerLoader isloading={isloading} />;
  };
  renderRow = () => {
    const {getSelectedServices} = this.state;
    return (
      <View>
        <FlatList
          // horizontal
          data={getSelectedServices}
          renderItem={({item, index}) => this.renderService(item, index)}
          // keyExtractor={item => item.id}
          // extraData={selected}
        />
      </View>
    );
  };
  renderNextStepButton = () => {
    return (
      <View
        style={[
          styles.containerForRow,
          {marginVertical: Metrics.ratio(10), alignItems: 'flex-end'},
        ]}>
        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>Next Step</Text>
        </TouchableOpacity>
      </View>
    );
  };
  renderService = (services, index) => {
    const {selectBookNow} = this.state;
    return (
      <View style={styles.containerForRow}>
        <View style={[styles.servicebox, {flexDirection: 'row'}]}>
          <View style={{width: Metrics.screenWidth * 0.3}}>
            {services && services.image ? (
              <Image
                source={{uri: services.image}}
                style={styles.servicesImage}
              />
            ) : (
              <Image source={image} style={styles.servicesImage} />
            )}
          </View>
          <View
            style={{
              marginVertical: Metrics.ratio(15),
              width: Metrics.screenWidth * 0.35,
            }}>
            <Text numberOfLines={1} style={{fontSize: Metrics.ratio(17)}}>
              {services && services.serviceName ? services.serviceName : 'name'}
            </Text>
            {/* <Text>{services && services._id ? services._id : 'id'}</Text> */}
            <TouchableOpacity
            //  onPress={() => this.showDatepicker()}
            >
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: Metrics.ratio(5),
                }}>
                <Image
                  source={Images.calendar}
                  style={{
                    height: Metrics.ratio(17),
                    width: Metrics.ratio(17),
                    marginRight: Metrics.ratio(5),
                  }}
                />
                <Text style={{fontSize: Metrics.ratio(14)}}>
                  {'Select Date hh'}
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={Images.tag_grey}
                style={{
                  height: Metrics.ratio(17),
                  width: Metrics.ratio(17),
                  marginRight: Metrics.ratio(5),
                }}
              />
              <Text style={{fontSize: Metrics.ratio(14)}}>
                {services && services.price ? services.price : 'name'}
              </Text>
            </View>
          </View>

          <View
            style={{
              justifyContent: 'center',
              width: Metrics.screenWidth * 0.2,
            }}>
            {this.renderBookNowButton()}
          </View>
        </View>
      </View>
    );
  };
  dateAndTimePicker() {
    const {showDatepicker} = this.state;
    return (
      <View>
        {showDatepicker ? (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={1591103986723}
            mode="datetime"
            is24Hour={false}
            display="default"
            onChange={this.onChange}
          />
        ) : null}
      </View>
    );
  }
  renderBookNowButton = (services) => {
    const {selectBookNow} = this.state;
    return (
      <View>
        <TouchableOpacity
          style={
            selectBookNow && selectBookNow._id == services.selectBookNow._id
              ? styles.btnSelect
              : styles.submitBtn1
          }
          onPress={() => this.handleCreateBookingLogin()}>
          <Text style={styles.submitBtnText1}>Book Now</Text>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    const {getSelectedServices} = this.state;
    return (
      <View style={styles.container}>
        <Header
          headerText={'Employees'}
          leftIcon={Images.pagination_back}
          leftBtnPress={() => this.props.navigation.goBack()}
          rightBtnPress={() => this.props.navigation.navigate('Proceeding')}
          rightIcon={Images.cart_payment}
        />
        <ScrollView>
          <View>
            {getSelectedServices &&
              getSelectedServices.length != 0 &&
              this.renderRow()}
            {this.dateAndTimePicker()}
            {this.renderNextStepButton()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  getEmployeesBySaloonAndCategory: state.getEmployeesBySaloonAndCategory,
  createBooking: state.createBooking,
  login: state.login,
});

const action = {get_Employees_By_Saloon_And_Category, create_Booking};

export default connect(mapStateToProps, action)(SaloonEmployee);
