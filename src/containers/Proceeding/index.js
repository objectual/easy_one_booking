import { connect } from 'react-redux';
import React, { Component, useState } from 'react';
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
  Modal,
  FlatList,
} from 'react-native';
import FloatingLabel from 'react-native-floating-labels';
import styles from './styles';
import { Images, Metrics, Fonts, Colors } from '../../theme';
import SpinnerLoader from '../../components/SpinnerLoader';
import { Footer } from '../../components';
import Header from '../../components/Header/index';
import {
  add as addToCard,
  remove as removeFromCard,
  removeAll,
} from '../../redux/actions/Cart';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';

// import {initializeToken, token} from '../../config/WebServices'
import {
  request as create_Booking,
  hideModal,
} from '../../redux/actions/CreateBooking';
import { initializeToken, token, getUserInfo } from '../../config/WebServices';
import BookedSuccessModal from '../../components/BookedSuccessModal';

class Proceeding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: '',
      cscNumber: '',
      selectedMonth: '',
      selectedYear: '',
      selectedPaymentMethod: '',
      totalServicesSum: null,
      services: [],
      cart: {},
      showBookedModal: false,
      data: [],
      createBooking: '',
      modalVisible: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    console.log(
      JSON.stringify(props.createBooking),
      'props.createBooking.data',
    );
    console.log(JSON.stringify(props.cart), 'props.createBooking.data');

    if (JSON.stringify(props.cart) != JSON.stringify(state.cart)) {
      return {
        cart: props.cart,
        createBooking: props.createBooking,
      };
    }

    if (props.createBooking.success == true) {
      return { showBookedModal: true };
    }
  }

  renderServicesSum = () => {
    const { services } = this.state;
    let price;
    for (i = 0; i < services.length; i++) {
      price = price + services.servicePrice;
    }
    this.setState({ totalServicesSum: '0' });
  };

  renderServicesRow = () => {
    const { services, cart } = this.state;
    console.log(this.state.cart, 'cartstate');

    return (
      <View>
        <FlatList
          // horizontal
          data={cart.data}
          renderItem={({ item, index }) => this.renderService(item, index)}
        // keyExtractor={item => item.id}
        // extraData={selected}
        />
      </View>
    );
  };

  getRows = (label, value) => {
    return (
      <View style={{ width: '90%', flexDirection: 'row', marginBottom: 5 }}>
        <View style={{ width: '50%' }}>
          <Text style={{ fontSize: 18 }}>{label}</Text>
        </View>
        <View style={{ width: '50%' }}>
          <Text style={{ fontSize: 18, color: Colors.taupeGrey }}>{value}</Text>
        </View>
      </View>
    );
  };

  getCancelRow = (index) => {
    return (
      <View
        style={{
          width: '95%',
          alignItems: 'flex-end',
          marginBottom: 5,
        }}>
        <TouchableOpacity
          style={{
            width: Metrics.ratio(40),
            height: Metrics.ratio(40),
            backgroundColor: "#FF3600",
            alignItems: 'center',
            justifyContent: "center",
            paddingBottom: 5,
            borderRadius: 100,
            elevation: 5
          }}
          onPress={async () => await this.props.removeFromCard({ index })}
        >
          <Text style={{ fontSize: Metrics.ratio(18), color: "white", alignSelf: "center" }}>x</Text>
        </TouchableOpacity>
      </View>
    );
  };

  getRows = (label, value) => {
    return (
      <View style={{ width: '90%', flexDirection: 'row', marginBottom: 5 }}>
        <View style={{ width: '50%' }}>
          <Text style={{ fontSize: 18 }}>{label}</Text>
        </View>
        <View style={{ width: '50%' }}>
          <Text style={{ fontSize: 18, color: Colors.taupeGrey }}>{value}</Text>
        </View>
      </View>
    );
  };

  renderService = (object, index) => {
    // let object = {"payload":{"checkIn": "12:00", "checkOut": "21:00","date":"6/24/2020","employee":{"firstName":"Another","lastName":"Fayzee","userName":null,"bio":null,"dob":"2012-12-08T19:00:00.000Z","address":"Khalid bin waleed road","postalCode":"921","city":"Sharjah","province":null,"_id":"5ef0c1c9d93dd409408cace4","email":"anotherfayzee@mailinator.com","phoneNo":90078601,"password":"$2a$10$J.j7ETAVvL8XyiqLPKXgMuxV2gAsLI5NJ9bmsbfalai/bS/F3yZh6","gcm_id":"string123","profile_img":"https://easy-1-jq7udywfca-uc.a.run.app/public/images/user.png","createdDate":"2020-06-22T14:35:53.626Z","__v":0,"platform":"ios"},"price":150,"servicesName":"","serviceId":"5eee2ebe6e24b64cfc018a97","categoryId":"5eee2ebe6e24b64cfc018a97","_id":"5eee4536634bb82ea4c480f5","name":"Hair dressing","isActive":1,"companyId":"5ef2027efcd846363c6aabab","image":"http://res.cloudinary.com/dxwbz4wlo/image/upload/v1592673591/serviceImage/e66lt87us0s0akmmiuep.jpg","__v":0}}
    return (
      <>
        <View style={[styles.servicebody]}>
          {this.getCancelRow(index)}
          {this.getRows(
            'Name',
            `${object.payload?.employee?.employeeId?.userId.firstName} ${object.payload?.employee?.employeeId?.userId.lastName}`,
          )}
          {this.getRows('Service Name', object.payload?.serviceObj.name)}
          {this.getRows('Price', `$${object.payload?.serviceObj.price}`)}
          {this.getRows('Date', object.payload?.date)}
          {this.getRows('Time', object.payload?.checkIn)}

          <View
            style={{
              width: '90%',
              borderBottomWidth: 1,
              marginTop: 35,
              borderColor: '#dedede',
            }}
          />
        </View>
      </>
    );
  };

  renderServiceHead = () => {
    return (
      <View>
        <View style={[styles.servicehead, styles.containerForRow]}>
          <Text style={[styles.serviceheadfont, styles.employeebody]}>
            Employee
          </Text>
          <Text style={[styles.serviceheadfont, styles.servicesbody]}>
            Services
          </Text>
          <Text style={[styles.serviceheadfont, styles.timebody]}>Time</Text>
          <Text style={[styles.serviceheadfont, styles.pricebody]}>Price</Text>
        </View>
        <View style={styles.horizontalLine}></View>
      </View>
    );
  };

  getTotalPrice = () => {
    const { cart } = this.state;
    let price = 0;
    for (let i = 0; i < cart.data.length; i++) {
      price = price + parseInt(cart.data[i].payload.serviceObj.price);
    }
    return price.toString();
  };

  renderTotalServices = () => {
    const { totalServicesSum } = this.state;
    console.log(this.getTotalPrice(), 'price');
    return (
      <View>
        <View style={{ width: '80%', flexDirection: 'row', borderWidth: 0 }}>
          <Text style={styles.serviceheadfontRed}>TOTAL</Text>
          <Text style={styles.serviceheadfontRed}>${this.getTotalPrice()}</Text>
        </View>
      </View>
    );
  };

  booKNow = async () => {
    if (token == null) {
      this.props.navigation.navigate('Login');
    } else {
      await this.createPayload();
    }
  };

  renderPopup = () => {
    const { modalVisible, setModalVisible } = this.setState;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={{ ...styles.openButton }}
              onPress={() => {
                this.setState({ modalVisible: false });
              }}>
              <View
                style={{
                  justifyContent: 'flex-end',
                  alignSelf: 'flex-end',
                  marginTop: Metrics.ratio(10),
                  marginHorizontal: Metrics.ratio(10),
                  // padding: 20,
                }}>
                <Text style={styles.textStyle}>X</Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.modalText}>Select Payment Type</Text>
            {this.renderDropdownPicker()}
            <View style={[styles.containerForRow, { alignItems: 'center' }]}>
              <TouchableOpacity
                // onPress={() => this.booKNow()}
                onPress={() => {
                  this.setState({ modalVisible: false }, () => this.booKNow());
                }}
                style={[
                  styles.submitBtn2,
                  { width: Metrics.screenWidth * 0.55 },
                ]}>
                <Text style={styles.submitBtnText2}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  renderDropdownPicker = (type, data) => {
    const status = [{ label: 'Cancel', value: 3 }];
    const paymentType = [
      { label: 'Cash', value: 'Cash' },
      { label: 'Points', value: 'Points' },
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
              marginHorizontal: Metrics.ratio(10),
            },
            inputIOS: {
              marginTop: Metrics.ratio(10),
              fontFamily: Fonts.type.regular,
              fontSize: Metrics.ratio(16),
              color: '#B4B4B4',
            },
            viewContainer: {
              height: 50,
              marginHorizontal: Metrics.ratio(10),
            },
          }}
        />
      </View>
    );
  };

  handlePickerValue = (value, type) => {
    this.setState({ status: value });
  };

  createPayload = async () => {
    const { login } = this.props;
    const { cart } = this.props;
    const { status } = this.state;
    let userInfo = JSON.parse(await getUserInfo());

    let services = [];

    for (let i = 0; i < cart.data.length; i++) {
      let dateFormat = cart.data[i].payload.date.split('/');
      let timeArray = `${cart.data[i].payload.checkIn}:00`;
      let dateArray = `${dateFormat[0]}-${dateFormat[1]}-${dateFormat[2]}`;
      // await timeArray.push(cart.data.payload[i].checkIn)
      // await dateArray.push(`${dateFormat[0]}-${dateFormat[1]}-${dateFormat[2]}`)
      console.log(cart.data[i].payload.employee.employeeId._id, '////////fucnnn')

      let object = {
        // companyId: cart.data[i].payload.companyId,
        serviceId: cart.data[i].payload.serviceObj._id,
        employeeId: cart.data[i].payload.employee.employeeId._id,
        categoryId: cart.data[i].payload.serviceObj.serviceId,
        date: dateArray,
        time: timeArray,
      };

      services.push(object);

      // return await console.log(payload,'paylodof Services')
      //  services.push(payload)
    }

    let payload = {
      services: services,
      // userName: "Test",
      postalCode: '02221',
      email: userInfo.data.email,
      companyId: cart.data[0].payload.companyId,
      phoneNo: '090078601',
      status: '1',
      access_token: userInfo.data.access_token,
      totalAmount: parseInt(this.getTotalPrice()),
      paymentMethod: status,
    };
    console.log(payload, 'postbody');
    this.props.create_Booking(payload);
  };

  renderPayNowButton = () => {
    return (
      <View style={[styles.containerForRow, { alignItems: 'center' }]}>
        <TouchableOpacity
          // onPress={() => this.booKNow()}
          onPress={() => {
            token
              ? this.setState({ modalVisible: true })
              : this.props.navigation.navigate('Login');
          }}
          style={styles.submitBtn2}>
          <Text style={styles.submitBtnText2}>Book Now</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { services, modalVisible } = this.state;
    const { cart } = this.props;
    const { createBooking } = this.props;
    {
      // alert("sf")
      cart.data.length == 0 &&
        createBooking.success == false &&
        this.props.navigation.navigate('Home');
    }

    return (
      <Footer navigation={this.props.navigation.navigate} screen={'menu'}>
        <View style={styles.container}>
          {createBooking.isFetching && <SpinnerLoader isloading={true} />}

          {createBooking.success && (
            <BookedSuccessModal
              onPress={() => {
                this.props.removeAll();
                this.props.hideModal();
                this.setState({ showBookedModal: false });
                this.props.navigation.navigate('Home');
              }}
              onCancel={() => this.setState({ showBookedModal: false })}
            />
          )}

          <ScrollView>
            <View>
              {this.renderServicesRow()}
              {this.renderTotalServices()}
            </View>
          </ScrollView>
          {modalVisible && this.renderPopup()}
          {this.renderPayNowButton()}
        </View>
      </Footer>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  login: state.login,
  createBooking: state.createBooking,
});

const action = { removeFromCard, create_Booking, hideModal, removeAll };

export default connect(mapStateToProps, action)(Proceeding);
