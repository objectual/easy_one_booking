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

class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 5,
      date: new Date(1598051730000),
      mode: 'date',
      show: false,
      selectBookNow: 0,
      services: [
        {
          serviceImg:Images.select_services,
          serviceTitle:'Lorem Ipsum',
          servicePrice:'$50.00',
        },
        {
          serviceImg:Images.select_services,
          serviceTitle:'Lorem Ipsum',
          servicePrice:'$50.00',
        },
        {
          serviceImg:Images.select_services,
          serviceTitle:'Lorem Ipsum',
          servicePrice:'$50.00',
        }
      ]

    };
  }
  onChange = (event, date) => {
    date = date || this.state;
    this.setState({
      // show: Platform.OS === 'ios' ? true : false,
      date,
    });
  };

  showMode = (mode) => {
    this.setState({
      show: true,
      mode,
    });
  };

  showDatepicker = () => {
    this.setState({showDatepicker: true});
  };

  // showTimepicker = () => {
  //   this.setState({showTimepicker: true});
  //   // this.showMode('time');
  // };

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }
  _renderOverlaySpinner = () => {
    const {isloading} = this.state;
    return <SpinnerLoader isloading={isloading} />;
  };
  renderRow = () => {
    const {services} = this.state
    return (
      <View style={styles.containerForRow}>
        <Text style={{fontSize: Metrics.ratio(20)}}>Select Services</Text>
        {services.map((val, index) => {
          return(
            <View>
              {this.renderService(
              val.serviceImg,
              val.serviceTitle,
              val.servicePrice,
              index
        )}
            </View>
          )
        })}
        
      </View>
    );
  };
  renderNextStepButton = () => {
    return (
      <View
        style={[styles.containerForRow, {marginVertical: Metrics.ratio(10), alignItems: 'flex-end'}]}>
        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>Next Step</Text>
        </TouchableOpacity>
      </View>
    );
  };
  renderService = (image, title, Price, index) => {
    return (
      <View style={[styles.servicebox, {flexDirection: 'row'}]}>
        <View style={{width: Metrics.screenWidth * 0.3}}>
          <Image source={image} style={styles.servicesImage} />
        </View>
        <View
          style={{
            marginVertical: Metrics.ratio(15),
            width: Metrics.screenWidth * 0.35,
          }}>
          <Text style={{fontSize: Metrics.ratio(17)}}>{title}</Text>
          <TouchableOpacity onPress={() => this.showDatepicker()}>
            <View
              style={{flexDirection: 'row', marginVertical: Metrics.ratio(5)}}>
              <Image
                source={Images.calendar}
                style={{
                  height: Metrics.ratio(17),
                  width: Metrics.ratio(17),
                  marginRight: Metrics.ratio(5),
                }}
              />
              <Text style={{fontSize: Metrics.ratio(14)}}>{'Select Date hh'}</Text>
            </View>
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={ Images.tag_grey}
              style={{
                height: Metrics.ratio(17),
                width: Metrics.ratio(17),
                marginRight: Metrics.ratio(5),
              }}
            />
            <Text style={{fontSize: Metrics.ratio(14)}}>{Price}</Text>
          </View>
        </View>
        <View
          style={{justifyContent: 'center', width: Metrics.screenWidth * 0.2}}>
          {this.renderBookNowButton(index)}
        </View>
      </View>
    );
  };
  dateAndTimePicker() {
    const {showDatepicker} = this.state;
    return (
      <View>
        {showDatepicker ? (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={1591103986723}
            mode="datetime"
            is24Hour={false}
            display="default"
            onChange={this.onChange}
          />
        ) : null}
      </View>
    );
  }
  renderBookNowButton = (index) => {
    const { selectBookNow} = this.state;
    return (
      <View>
        <TouchableOpacity
          style={[styles.submitBtn1,{backgroundColor: selectBookNow == index ? '#d1d1d1'  : '#FF3600'}]}
          onPress={() =>
            this.setState({
              selectBookNow: index,
            })
          }>
          <Text style={styles.submitBtnText1}>Book Now</Text>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <Header
          headerText={'Services'}
          leftIcon={Images.costumer_header_menu}
          leftBtnPress={() => this.props.navigation.openDrawer()}
          rightBtnPress={() => this.props.navigation.navigate('Proceeding')}
          rightIcon={Images.cart_payment}
        />
        <ScrollView>
          <View>
            {this.renderRow()}
            {this.dateAndTimePicker()}
            {this.renderNextStepButton()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({});

const action = {};

export default connect(mapStateToProps, action)(Services);
