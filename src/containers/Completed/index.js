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
  StyleSheet,
  FlatList,
  PermissionsAndroid,
} from 'react-native';
import FloatingLabel from 'react-native-floating-labels';
import styles from './styles';
import {Images, Metrics, Fonts, Colors} from '../../theme';

import SpinnerLoader from '../../components/SpinnerLoader';
import Cards from '../..//components/Card';
import {Icon} from 'react-native-vector-icons/MaterialIcons';
import {request as get_Booking} from '../../redux/actions/GetBooking';
import Geolocation from '@react-native-community/geolocation';
// import {request as ge} from '../../redux/actions/GetCategories';
import {Dropdown} from 'react-native-material-dropdown';
import Immutable from 'seamless-immutable';
import {request as get_Saloon_By_Category} from '../../redux/actions/GetSaloonByCategory';
import {request as get_Saloon_By_Category_NearBy} from '../../redux/actions/GetSaloonNearBy';
import {
  place_reverse_Geocoding_URL,
  place_Autocomplete_URL,
  secret_Key,
} from '../../config/WebServices';
import {request as get_Services} from '../../redux/actions/GetServices';
import BookingHistoryCard from '../../components/BookingHistory/index';
import {initializeToken, token, getUserInfo} from '../../config/WebServices';

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
    // this.props.get_Booking({payload})
    this.props.navigation.addListener('focus', () =>
      this.props.get_Booking({payload}),
    );
  }

  render() {
    const {isFetching, failure, data, success} = this.props.getBooking;

    const {date, time, employee, saloon} = this.props;

    return (
      <ScrollView>
        {isFetching && this._renderOverlaySpinner()}
        {data.success && (
          <FlatList
            data={data.data}
            renderItem={({item, index}) =>
              item.status == 3 && (
                <BookingHistoryCard
                  date={item.services[0].date[0]}
                  time={item.services[0].time[0]}
                  employee={item.services[0].serviceId.name}
                  saloon={item.companyId.name}
                  price={item.services[0].serviceId.price}
                />
              )
            }
          />
        )}
      </ScrollView>
    );
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
