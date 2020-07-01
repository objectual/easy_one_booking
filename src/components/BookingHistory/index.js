import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import styles from './styles';
import { Images, Metrics } from '../../theme';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

class BookingHistoryCard extends Component {
  static propTypes = {
    //selectedTab: PropTypes.oneOf(["mycars", "addcar"]),
    item: PropTypes.string,
    leftBtnPress: PropTypes.func,
    rightIconSize: PropTypes.number,
  };

  render() {
    const {date, time, employee, saloon, price, orderNo, customerName, employeeName, paymentMethod, bookingStatus } = this.props;
    return (
      <View style={styles.containerForRow}>
        <View style={styles.servicebox}>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <Text style={styles.titlesize}>Date : {date}</Text>
            <Text style={styles.titlesize}>Time : {time}</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <Text style={styles.titlesize}>Booking ID : {orderNo}</Text>
          </View>
          
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <Text style={styles.titlesize}>Customer Name : {customerName}</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <Text style={styles.titlesize}>Employee Name : {employeeName}</Text>
          </View>
        
          <View>
            {/* <Text style={styles.nametext}>Name : {}</Text> */}
            <Text style={styles.titlesize}>Service Name : {employee}</Text>
            <Text style={styles.titlesize}>Saloon : {saloon}</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            {/* <Text style={styles.titlesize}>Payment Process : {item ? item : ""}</Text> */}
            <Text style={styles.titlesize}>Payment Method : {paymentMethod}</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            {/* <Text style={styles.titlesize}>Payment Process : {item ? item : ""}</Text> */}
            <Text style={styles.titleTotal}>Total Amount : ${price}</Text>
            <Text style={styles.titleTotal}>{bookingStatus}</Text>
          </View>
         
        </View>
      </View>
    );
  }
}

export default BookingHistoryCard;
