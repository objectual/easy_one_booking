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
  BackHandler,
  Modal,
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
import {request as updateMyBooking} from '../../redux/actions/updateBooking';
import {
  place_reverse_Geocoding_URL,
  place_Autocomplete_URL,
  secret_Key,
} from '../../config/WebServices';
import {request as get_Services} from '../../redux/actions/GetServices';
import BookingHistoryCard from '../../components/BookingHistory/index';
import {initializeToken, token, getUserInfo} from '../../config/WebServices';
import CustomTextInputRow from './../../components/CustomTextInputRow/index';
import CustomTextInput from './../../components/CustomTextInput/index';
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

  handleBackButton() {
    // this.props.navigation.goBack();
    // console.log('{{{{{{{{}}}}}}}}}', this.props);
    // alert(JSON.stringify(this.props));
    // ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
    return true;
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
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
    this.props.get_Booking({payload});
    this.props.navigation.addListener('focus', () =>
      this.props.get_Booking({payload}),
    );
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  updateBooking = () => {
    const {status, editAppoinment} = this.state;
    console.log(editAppoinment._id, 'editAppoinment');
    const payload = {
      bookingId: editAppoinment._id,
      status: 2,
      totalAmount: 200,
      paymentMethod: 'Cash',
    };
    // let bookingStatus = status == null ? editAppoinment.status : status;
    this.props.updateMyBooking(payload);
  };

  renderButton = () => {
    return (
      <View
        style={{
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={styles.submitBtnView}
          onPress={() => this.updateBooking()}>
          <Text style={styles.submitBtnText}>Update</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderInputField = () => {
    const {editAppoinment, name, dateTime, status} = this.state;
    let customerName = editAppoinment.userId.firstName
      ? `${editAppoinment.userId.firstName} ${editAppoinment.userId.lastName}`
      : editAppoinment.userId.userName;
    return (
      <ScrollView>
        <CustomTextInputRow
          placeholderText={'Name'}
          CustomStyle={{width: Metrics.screenWidth * 0.7}}
          textInput={name}
          inputValue={customerName}
          handleInput={this.onChangeName}
          isEditable={false}
          // errorMessage={this.state.formErrors.addressError}
        />
        <Text style={styles.paymentHeaderText}>Add more info</Text>
        <View style={styles.paymentInpulMain}>
          <View style={{flex: 1, paddingLeft: 5}}>
            <CustomTextInput
              placeholderText={'$100.00'}
              textInputstyle={styles.textInput}
              // textInput={dateTime}
              inputValue={`$ ${editAppoinment.totalAmount.toString()}`}
              // handleInput={this.onChangeDateTime}
              customStyle={styles.custom}
              // errorMessage={this.state.formErrors.lastNameError}
            />
          </View>
        </View>

        {this.renderButton()}
      </ScrollView>
    );
  };

  renderPopup = () => {
    const {modalVisible} = this.setState;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{marginHorizontal: Metrics.ratio(15)}}>
              <TouchableOpacity
                onPress={() =>
                  this.setState({setModalVisible: false, status: null})
                }>
                <Image source={Images.cross} style={styles.crossImageStyle} />
              </TouchableOpacity>
              <Text style={styles.modalText}>Edit</Text>
              {this.renderInputField()}
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    const {isFetching, failure, data, success} = this.props.getBooking;
    const {setModalVisible} = this.state;
    return (
      <ScrollView>
        {isFetching && this._renderOverlaySpinner()}
        {data.success && (
          <FlatList
            data={data.data}
            renderItem={({item, index}) => {
              let customerName = item.userId.firstName
                ? item.userId.firstName + ' ' + item.userId.lastName
                : item.userId.userName;
              let employeeName =
                item?.services[0].employeeId.userId.firstName +
                ' ' +
                item?.services[0].employeeId.userId.lastName;
              let bookingStatus = item?.status === 1 ? 'Pending' : 'Completed';
              return (
                <BookingHistoryCard
                  orderNo={item._id}
                  customerName={customerName}
                  employeeName={employeeName}
                  date={item.services[0].date[0]}
                  time={item.services[0].time[0]}
                  employee={item.services[0].serviceId.name}
                  saloon={item.companyId.name}
                  price={item.totalAmount}
                  paymentMethod={item.paymentMethod}
                  bookingStatus={bookingStatus}
                  showButton={true}
                  onPress={() =>
                    this.setState({setModalVisible: true, editAppoinment: item})
                  }
                />
              );
            }}
          />
        )}
        {setModalVisible ? this.renderPopup() : null}
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
  updateMyBooking,
};

export default connect(mapStateToProps, action)(Current);
