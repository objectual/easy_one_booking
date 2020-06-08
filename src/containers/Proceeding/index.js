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
} from 'react-native';
import FloatingLabel from 'react-native-floating-labels';
import styles from './styles';
import {Images, Metrics, Fonts} from '../../theme';
import SpinnerLoader from '../../components/SpinnerLoader';
import Header from '../../components/Header/index';
import Rating from './../../components/Rating/index';
import StarRating from 'react-native-star-rating';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import ActionSheet from 'react-native-actionsheet';

const cancelIndexForMonth = 12;
const destructiveIndexForMonth = 12;
const titleForMonth = 'Select Month';
const optionForMonth = [
  'Jan',
  'feb',
  'Mar',
  'Apr',
  'may',
  'Jun',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
  'Cancel',
];
const cancelIndexForYear = 5;
const destructiveIndexForYear = 5;
const titleForYear = 'Select Year';
const optionForYear = ['2020', '2021', '2022', '2023', '2024', 'Cancel'];

const cancelIndexForPaymentMethod = 2;
const destructiveIndexForPaymentMethod = 2;
const titleForPaymentMethod = 'Select Payment Method';
const optionForPaymentMethod = ['Meezan', 'HBL', 'Cancel'];

class Proceeding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: '',
      selectedMonth: '',
      selectedYear: '',
      selectedPaymentMethod: '',
      totalServicesSum: null,
      services: [
        {
          serviceTitle: 'Lorem Ipsum',
          serviceTime: '11:00 - 12:00',
          servicePrice: 50.0,
        },
        {
          serviceTitle: 'Lorem Ipsum',
          serviceTime: '11:00 - 12:00',
          servicePrice: 50.0,
        },
      ],
    };
  }
  onChangeCardNumber = (value) => this.setState({cardNumber: value});

  renderServicesSum = () => {
    const {services} = this.state;
    let price;
    for (i = 0; i < services.length; i++) {
      price = price + services.servicePrice;
    }
    this.setState({totalServicesSum: price});
  };

  showActionSheetCard = () => {
    this.PaymentActionSheet.show();
  };
  showActionSheetMonth = () => {
    this.MonthActionSheet.show();
  };
  showActionSheetYear = () => {
    this.YearActionSheet.show();
  };
  renderServicesRow = () => {
    const {services} = this.state;
    return (
      <View>
        {services.map((val, ind) => {
          return (
            <View>
              {this.renderService(
                val.serviceTitle,
                val.serviceTime,
                val.servicePrice,
              )}
            </View>
          );
        })}
      </View>
    );
  };
  handlePressForMonth = (buttonIndex) => {
    this.setState({selectedMonth: buttonIndex});
  };
  handlePressForYear = (buttonIndex) => {
    this.setState({selectedYear: buttonIndex});
  };
  handlePressForPaymentMethod = (buttonIndex) => {
    this.setState({selectedPaymentMethod: buttonIndex});
  };
  renderService = (Time, Title, Price) => {
    return (
      <View>
        <View style={[styles.servicebody, styles.containerForRow]}>
          <Text style={styles.servicebodyfont}>{Time}</Text>
          <Text style={styles.servicebodyfont}>{Title}</Text>
          <Text style={styles.servicebodyfont}>{Price}</Text>
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
      </View>
    );
  };
  renderServiceHead = () => {
    return (
      <View>
        <View style={[styles.servicehead, styles.containerForRow]}>
          <Text style={styles.serviceheadfont}>Services</Text>
          <Text style={styles.serviceheadfont}>Time</Text>
          <Text style={styles.serviceheadfont}>Price</Text>
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
  renderSelectCard = () => {
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={Images.saloon_form_american_express}
            style={styles.paymentImg}
          />
          <Image
            source={Images.saloon_form_credit_card}
            style={styles.paymentImg}
          />
          <Image
            source={Images.saloon_form_master_card}
            style={styles.paymentImg}
          />
          <Image source={Images.saloon_form_paypal} style={styles.paymentImg} />
          <Image source={Images.saloon_form_visa} style={styles.paymentImg} />
        </View>
      </View>
    );
  };
  renderPaymentButton = (paymentLabel) => {
    return (
      <View>
        <Text style={styles.labelText}>{paymentLabel}</Text>
        <View>
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={this.showActionSheetCard}>
            <Text style={styles.submitBtnText}>
              {optionForPaymentMethod[this.state.selectedPaymentMethod] ||
                'Select Payment Method'}
            </Text>
          </TouchableOpacity>
        </View>
        <ActionSheet
          ref={(o) => (this.PaymentActionSheet = o)}
          title={titleForPaymentMethod}
          options={optionForPaymentMethod}
          cancelButtonIndex={cancelIndexForPaymentMethod}
          destructiveButtonIndex={destructiveIndexForPaymentMethod}
          onPress={this.handlePressForPaymentMethod}
        />
      </View>
    );
  };
  renderExpiryMonth = () => {
    return (
      <View>
        <View>
          <TouchableOpacity
            style={styles.submitBtn1}
            onPress={this.showActionSheetMonth}>
            <Text style={styles.submitBtnText1}>
              {optionForMonth[this.state.selectedMonth] || 'Month'}
            </Text>
          </TouchableOpacity>
        </View>
        <ActionSheet
          ref={(o) => (this.MonthActionSheet = o)}
          title={titleForMonth}
          options={optionForMonth}
          cancelButtonIndex={cancelIndexForMonth}
          destructiveButtonIndex={destructiveIndexForMonth}
          onPress={this.handlePressForMonth}
        />
      </View>
    );
  };
  renderExpiryYear = () => {
    return (
      <View>
        <View>
          <TouchableOpacity
            style={styles.submitBtn1}
            onPress={this.showActionSheetYear}>
            <Text style={styles.submitBtnText1}>
              {optionForYear[this.state.selectedYear] || 'Year'}
            </Text>
          </TouchableOpacity>
        </View>
        <ActionSheet
          ref={(o) => (this.YearActionSheet = o)}
          title={titleForYear}
          options={optionForYear}
          cancelButtonIndex={cancelIndexForYear}
          destructiveButtonIndex={destructiveIndexForYear}
          onPress={this.handlePressForYear}
        />
      </View>
    );
  };
  renderCardNumber = (
    label,
    ref,
    returnKeyType,
    onChangeText,
    value,
    placeholder,
    keyboardType,
    onSubmitEditing,
    secureTextEntry,
    CustomTextInput,
  ) => {
    return (
      <View>
        <Text style={styles.labelText}>{label}</Text>
        <TextInput
          style={[styles.textInput, CustomTextInput]}
          placeholderTextColor="#81788B"
          ref={(o) => {
            ref = o;
          }}
          returnKeyType={returnKeyType}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          autoCompleteType="off"
          keyboardType={keyboardType}
          // onSubmitEditing={() => {
          //   this.onSubmit(onSubmitEditing);
          // }}
          secureTextEntry={secureTextEntry}
        />
      </View>
    );
  };

  renderPaymentMethod = () => {
    const {cardNumber} = this.state;
    return (
      <View style={styles.containerForRow}>
        {this.renderPaymentButton('Choose Your Payment Method')}
        {this.renderSelectCard()}
        {this.renderCardNumber(
          'Card Number',
          'inputEmail',
          'next',
          this.onChangeCardNumber,
          cardNumber,
          '111-2222-3333-4444',
          '',
          '',
          false,
        )}
        <Text style={styles.labelText}>Expiry Date</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {this.renderExpiryMonth()}
          {this.renderExpiryYear()}
        </View>
      </View>
    );
  };
  renderPayNowButton = () => {
    return (
      <View style={styles.containerForRow}>
        <TouchableOpacity style={styles.submitBtn2}>
          <Text style={styles.submitBtnText2}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
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
            {this.renderServicesRow()}
            {this.renderTotalServices()}
            <Text style={styles.orderSummmerytext}>Payment Method</Text>
            {this.renderPaymentMethod()}
            {this.renderPayNowButton()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({});

const action = {};

export default connect(mapStateToProps, action)(Proceeding);
