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
    const {item} = this.props;
    return (
      <View style={styles.containerForRow}>
        <View style={styles.servicebox}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <Text style={styles.titlesize}>Date : {item ? item : "22-22-2020"}</Text>
            <Text style={styles.titlesize}>Time : {item ? item : "13:00"}</Text>
          </View>
          <View>
            <Text style={styles.nametext}>Name : {item ? item : "Arsalan"}</Text>
            <Text style={styles.titlesize}>Employee : {item ? item : ""}</Text>
            <Text style={styles.titlesize}>Saloon : {item ? item : ""}</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <Text style={styles.titlesize}>Payment Process : {item ? item : ""}</Text>
            <Text style={styles.titleTotal}>Total : {item ? item : ""}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default BookingHistoryCard;
