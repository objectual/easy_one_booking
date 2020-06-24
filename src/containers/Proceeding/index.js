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
  Picker,
  FlatList,
} from 'react-native';
import FloatingLabel from 'react-native-floating-labels';
import styles from './styles';
import {Images, Metrics, Fonts} from '../../theme';
import SpinnerLoader from '../../components/SpinnerLoader';
import Header from '../../components/Header/index';

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
      cart: ''
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (JSON.stringify(props.cart) !== JSON.stringify(state.cart)) {

      return {
        cart: props.cart,
      };
    }
  }

  renderServicesSum = () => {
    const {services} = this.state;
    let price;
    for (i = 0; i < services.length; i++) {
      price = price + services.servicePrice;
    }
    this.setState({totalServicesSum: price});
  };

  renderServicesRow = () => {
    const {cart} = this.state;
    console.log(cart,'cartstate')


    return (
      <View>
        <FlatList
          // horizontal
          data={[]}
          renderItem={({item, index}) => this.renderService(item)}
          // keyExtractor={item => item.id}
          // extraData={selected}
        />
      </View>
    );
  };

  renderService = selectservice => {
    console.log(selectservice,'itemselectservice')
    return (
      <>
        <View style={[styles.servicebody,]}>
          <View style={{ width: '100%',flexDirection:'row', borderWidth:0 }}>
            <View style={{ width: '50%'}}>
                <Text>
                  Employee Name
                </Text>
            </View>
            <View style={{ width: '50%', }}>
                <Text>
                 {/* {selectservice.name} */}
                </Text>
            </View>
          

          </View>

          <Text
            numberOfLines={1}
            style={[styles.servicebodyfont, styles.servicesbody]}>
            {selectservice ? selectservice : 'Services'}
          </Text>
          <Text
            numberOfLines={1}
            style={[styles.servicebodyfont, styles.timebody]}>
            {selectservice ? selectservice : '11-00/Apr'}
          </Text>
          <Text
            numberOfLines={1}
            style={[styles.servicebodyfont, styles.pricebody]}>
            {selectservice ? slectservice : '$5000'}
          </Text>
          <TouchableOpacity style={{justifyContent: 'center'}}>
            <Image
              source={Images.cross}
              style={{
                height: Metrics.ratio(15),
                width: Metrics.ratio(15),
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalLine}></View>
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
  renderTotalServices = () => {
    const {totalServicesSum} = this.state;
    return (
      <View>
        <View style={[styles.servicehead, styles.containerForRow]}>
          <Text style={styles.serviceheadfontRed}>TOTAL</Text>
          <Text style={styles.serviceheadfontRed}>{totalServicesSum}</Text>
        </View>
      </View>
    );
  };

  renderPayNowButton = () => {
    const {serviceId, companyId} = this.props.route.params;
    return (
      <View style={[styles.containerForRow, {alignItems: 'center'}]}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('BookingForm', {
              companyId: companyId,
              serviceId: serviceId,
            })
          }
          style={styles.submitBtn2}>
          <Text style={styles.submitBtnText2}>Book Now</Text>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    const {services} = this.state;
    const {cart} = this.props
    console.log(cart,'cartarray')
    return (
      <View style={styles.container}>
        <Header
          headerText={'Proceeding'}
          leftIcon={Images.pagination_back}
          leftBtnPress={() => this.props.navigation.goBack()}
        />
        <ScrollView>
          <View>
            <Text style={styles.orderSummmerytext}>Order summery</Text>
            {this.renderServiceHead()}
            {this.renderService()}
            {services && services.length != 0 && this.renderServicesRow()}
            {this.renderTotalServices()}
            {this.renderPayNowButton()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
});

const action = {};

export default connect(mapStateToProps, action)(Proceeding);
