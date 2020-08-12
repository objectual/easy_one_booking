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
import RNPickerSelect, {defaultStyles} from 'react-native-picker-select';
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

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.updateBooking) {
      console.log(
        nextProps.updateBooking,
        'nextProps.loginnextProps.loginnextProps.loginnextProps.loginnextProps.loginnextProps.login',
      );
      if (
        !nextProps.updateBooking.failure &&
        !nextProps.updateBooking.isFetching &&
        nextProps.updateBooking.data &&
        nextProps.updateBooking.data.success
      ) {
        this.setState({isloading: false, setModalVisible: false});
      } else if (
        !nextProps.updateBooking.failure &&
        !nextProps.updateBooking.isFetching &&
        nextProps.updateBooking.data &&
        !nextProps.updateBooking.data.success
      ) {
        console.log(
          nextProps.updateBooking.data.msg,
          'nextProps.login.data.data.msgnextProps.login.data.data.msg',
        );
        // this.setState({isloading: false}, () => {
        //   setTimeout(() => {
        //     Alert.alert('Error', nextProps.login.data.msg);
        //   }, 3000);
        // });
        this.setState({isloading: false, setModalVisible: false});
      }
    }
  }

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
    this.props.get_Booking({payload});
    this.props.navigation.addListener('focus', () =>
      this.props.get_Booking({payload}),
    );
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  updateBooking = () => {
    const {status, paymentType, amount, editAppoinment} = this.state;
    const payload = {
      bookingId: editAppoinment._id,
      status: status,
      totalAmount: amount,
      paymentMethod: paymentType,
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

  handlePickerValue = (value, type) => {
    type === 'status'
      ? this.setState({status: value})
      : this.setState({paymentType: value});
  };

  renderDropdownPicker = (type, data) => {
    const status = [{label: 'Cancel', value: 3}];
    const paymentType = [
      {label: 'Cash', value: 'Cash'},
      {label: 'Points', value: 'Points'},
    ];
    return (
      <View style={styles.dropdownContainer}>
        <RNPickerSelect
          onValueChange={(value) => this.handlePickerValue(value, type)}
          items={type === 'status' ? status : paymentType}
          placeholder={{
            label: type === 'status' ? 'Pending' : 'Payment Method',
            value: null,
          }}
          style={{
            placeholder: {
              fontSize: Metrics.ratio(16),
              color: '#B4B4B4',
              fontFamily: Fonts.type.regular,
            },
            inputIOS: {
              marginTop: Metrics.ratio(15),
              fontFamily: Fonts.type.regular,
              fontSize: Metrics.ratio(16),
              color: '#B4B4B4',
            },
            viewContainer: {
              height: 50,
              width: Metrics.screenWidth * 0.35,
              paddingLeft: Metrics.ratio(0),
            },
          }}
        />
      </View>
    );
  };

  _renderOverlaySpinner = () => {
    return <SpinnerLoader isloading={true} />;
  };

  renderInputField = () => {
    const {editAppoinment, name, dateTime, amount} = this.state;
    let customerName = editAppoinment?.userId?.firstName
      ? `${editAppoinment?.userId?.firstName} ${editAppoinment?.userId?.lastName}`
      : editAppoinment?.userId?.userName;
    let companyName = editAppoinment?.companyId.name;
    let totalAmount = editAppoinment?.totalAmount;
    let bookingStatus = editAppoinment?.status;
    let paymentMethod = editAppoinment?.paymentMethod;
    console.log(editAppoinment, 'editAppoinment');
    return (
      <ScrollView>
        <Text style={styles.paymentHeaderText}>Customer Name</Text>
        <CustomTextInputRow
          placeholderText={'Name'}
          CustomStyle={{width: Metrics.screenWidth * 0.7}}
          inputValue={customerName}
          handleInput={this.onChangeName}
          isEditable={false}
          // errorMessage={this.state.formErrors.addressError}
        />
        <Text style={styles.paymentHeaderText}>Customer Name</Text>
        <CustomTextInputRow
          placeholderText={'Name'}
          CustomStyle={{width: Metrics.screenWidth * 0.7}}
          inputValue={companyName}
          handleInput={this.onChangeName}
          isEditable={false}
          // errorMessage={this.state.formErrors.addressError}
        />

        <Text style={styles.paymentHeaderText}>Add more info</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {/* {this.renderDropdownPicker('payment', paymentMethod)} */}
            {this.renderDropdownPicker('status', bookingStatus)}
          </View>
        </View>
        {/* <CustomTextInputRow
          placeholderText={'$100.00'}
          CustomStyle={{width: Metrics.screenWidth * 0.7}}
          inputValue={`$ ${amount ? JSON.stringify(amount) : JSON.stringify(totalAmount)}`}
          handleInput={this.onChangeAmount}
          // isEditable={false}
          // errorMessage={this.state.formErrors.addressError}
        /> */}

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
              let customerName = item?.userId?.firstName
                ? item?.userId?.firstName + ' ' + item.userId?.lastName
                : item?.userId?.userName;
              let employeeName =
                item?.services[0]?.employeeId?.userId?.firstName +
                ' ' +
                item?.services[0]?.employeeId?.userId?.lastName;
              let bookingStatus =
                item?.status === 1 ? 'Pending' : 'Now Serving';
              let dateTime = item?.createdDate;
              let newDate = new Date(dateTime);
              let time = newDate.toLocaleTimeString('en-US');
              let date = newDate.getDate();
              let month = newDate.getMonth(); //Month of the Year: 0-based index, so 1 in our example
              let year = newDate.getFullYear();
              let fullDate = `${date}-${month}-${year}`;
              if (item?.status === 1 || item?.status === 2) {
                return (
                  <BookingHistoryCard
                    orderNo={item._id}
                    customerName={customerName}
                    employeeName={employeeName}
                    date={fullDate}
                    time={time}
                    employee={item.services[0].serviceId.name}
                    saloon={item?.companyId?.name}
                    price={item?.totalAmount}
                    paymentMethod={item.paymentMethod}
                    bookingStatus={bookingStatus}
                    showButton={item?.status === 1}
                    onPress={() =>
                      this.setState({
                        setModalVisible: true,
                        editAppoinment: item,
                      })
                    }
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

const mapStateToProps = (state) => {
  return {
    getBooking: state.getBooking,
    updateBooking: state.updateBooking,
  };
};

const action = {
  get_Booking,
  updateMyBooking,
};

export default connect(mapStateToProps, action)(Current);
