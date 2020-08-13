import { connect } from 'react-redux';
import React, { Component } from 'react';
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
  FlatList,
  PermissionsAndroid,
  BackHandler,
} from 'react-native';
import FloatingLabel from 'react-native-floating-labels';
import styles from './styles';
import { Images, Metrics, Fonts, Colors } from '../../theme';

import SpinnerLoader from '../../components/SpinnerLoader';
import Cards from '../..//components/Card';
import { Icon } from 'react-native-vector-icons/MaterialIcons';
import { request as get_Booking } from '../../redux/actions/GetBooking';
import Geolocation from '@react-native-community/geolocation';
// import {request as ge} from '../../redux/actions/GetCategories';
import { Dropdown } from 'react-native-material-dropdown';
import Immutable from 'seamless-immutable';
import { request as get_Saloon_By_Category } from '../../redux/actions/GetSaloonByCategory';
import { request as get_Saloon_By_Category_NearBy } from '../../redux/actions/GetSaloonNearBy';
import {
  place_reverse_Geocoding_URL,
  place_Autocomplete_URL,
  secret_Key,
} from '../../config/WebServices';
import { request as get_Services } from '../../redux/actions/GetServices';
import BookingHistoryCard from '../../components/BookingHistory/index';
import { initializeToken, token, getUserInfo } from '../../config/WebServices';

var saloonsData = [];
var categoriesData = [];

class Current extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchByCategory: '',
      searchByLocation: '',
      saloonRadius: 25000,
      byRating: '',
      byServices: '',
      longitude: '',
      latitude: '',
      selectCard: null,
      saloonsData: [],
      categoriesData: [],
      searchTerm: '',
      suggestion: [],
      categoryId: '',
      predictionsData: [],
      selectedLocation: '',
      saloonNearBy: false,
      saloonsNearByData: [],
      selectedLocationSaloons: false,
      permission: false,
    };
  }

  _renderOverlaySpinner = () => {
    return <SpinnerLoader isloading={true} />;
  };

  // static getDerivedStateFromProps(props, state) {
  //   console.log(props.getSaloonNearBy.data, 'props.getSaloonNearBy.data.data');

  //   if (
  //     JSON.stringify(props.getSaloonByCategory.data.data) !==
  //     JSON.stringify(state.saloonsData)
  //   ) {
  //     return {
  //       saloonsData: props.getSaloonByCategory.data.data,
  //     };
  //   }
  //   if (state.suggestion.length == 0) {
  //     return {saloonsData: []};
  //   }

  //   if (props.getSaloonNearBy.data != undefined) {
  //     return {saloonsNearByData: props.getSaloonNearBy.data.data};
  //   }
  // }

  async componentDidMount() {
    let payload = JSON.parse(await getUserInfo());
    console.log(payload, 'payload');
    this.props.get_Booking({ payload });
    this.props.navigation.addListener('focus', () =>
      this.props.get_Booking({ payload }),
    );
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    // this.props.navigation.goBack();

    // alert('Back button is pressed ');/
    // ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
    return true;
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  render() {
    const { isFetching, failure, data, success } = this.props.getBooking;
    const { setModalVisible } = this.state;
    if (data.success) {
      let booking = [...data.data];
      return (
        <ScrollView>
          {isFetching && this._renderOverlaySpinner()}
          {data.success && (
            <FlatList
              data={booking.reverse()}
              renderItem={({ item, index }) => {
                let customerName = item?.userId?.firstName
                  ? item?.userId?.firstName + ' ' + item?.userId?.lastName
                  : item?.userId?.userName;
                let employeeName =
                  item?.services[0]?.employeeId?.userId?.firstName +
                  ' ' +
                  item?.services[0]?.employeeId?.userId?.lastName;
                let bookingStatus = item?.status === 3 ? 'Cancelled' : 'Completed';
                let dateTime = item?.createdDate
                let newDate = new Date(dateTime);
                let time = newDate.toLocaleTimeString('en-US');
                let date = newDate.getDate();
                let month = newDate.getMonth(); //Month of the Year: 0-based index, so 1 in our example
                let year = newDate.getFullYear()
                let fullDate = `${date}-${month}-${year}`
                if (item?.status === 3 || item?.status === 4) {
                  return (
                    <BookingHistoryCard
                      orderNo={item._id}
                      customerName={customerName}
                      employeeName={employeeName}
                      date={fullDate}
                      time={time}
                      employee={item?.services[0]?.serviceId?.name}
                      saloon={item?.companyId?.name}
                      price={item?.totalAmount}
                      paymentMethod={item.paymentMethod}
                      bookingStatus={bookingStatus}
                    />
                  );
                }
                return null;
              }}
            />
          )}
          {setModalVisible ? this.renderPopup() : null}
        </ScrollView>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    getBooking: state.getBooking,
  };
};

const action = {
  get_Booking,
};

export default connect(mapStateToProps, action)(Current);
