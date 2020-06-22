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
    };
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
    const {services} = this.state;
    return (
      <View>
        <FlatList
          // horizontal
          data={services}
          renderItem={({item, index}) => this.renderService(item, index)}
          // keyExtractor={item => item.id}
          // extraData={selected}
        />
      </View>
    );
  };

  renderService = selectservice => {
    return (
      <View>
        <View style={[styles.servicebody, styles.containerForRow]}>
          <Text
            numberOfLines={1}
            style={[styles.servicebodyfont, styles.employeebody]}>
            {selectservice ? selectservice : 'Employee'}
          </Text>
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
      </View>
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
    return (
      <View style={[styles.containerForRow, {alignItems: 'center'}]}>
        <TouchableOpacity 
        onPress={()=>this.props.navigation.navigate('BookingForm')}
        style={styles.submitBtn2}
        >
          <Text style={styles.submitBtnText2}>Book Now</Text>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    const {services} = this.state;
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
            {services && services.length != 0 && this.renderServicesRow()}
            {this.renderTotalServices()}
            {this.renderPayNowButton()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const action = {};

export default connect(mapStateToProps, action)(Proceeding);
