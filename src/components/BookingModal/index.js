import React, {Component} from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Picker,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import styles from './styles';
import {Images, Metrics, Fonts, Colors} from '../../theme';
import {Dropdown} from 'react-native-material-dropdown';
import Immutable from 'seamless-immutable';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {token} from './../../config/WebServices';

export default class BookingModal extends Component {
  state = {
    modalVisible: true,
    date: 'Select Date Time',
    time: '',
    dateData: [],
    timeData: [],
    isloading: false,
    selectedEmployee: {},
    timeSlot: '',
    isDatePickerVisible: false,
    data: {},
    buttonDisable: true,
    errorMessages: null,
    dayDetail: null,
  };

  async componentDidMount() {
    // this.setState({buttonDisable: true});
    // if ((await this.validateDate(this.state.date)) == false) {
    //   Alert.alert(
    //     'We are Sorry',
    //     'This employee is not available on current date,Please select some other date',
    //     [{text: 'OK', onPress: () => console.log('OK Pressed')}],
    //     {cancelable: false},
    //   );
    //   this.setState({buttonDisable: true});
    // } else {
    //   this.setState({buttonDisable: false});
    // }
  }

  static getDerivedStateFromProps(props, state) {
    if (JSON.stringify(props.data) !== JSON.stringify(state.selectedEmployee)) {
      let dateSlots = [];

      for (let i = 0; i < props.data.weekPlans.length; i++) {
        let object = Immutable.asMutable(props.data.weekPlans[i]);
        object.timeSlotsLabel = `${object.checkIn} ${object.checkOut}`;
        object.timeSlotsValue = `${object.checkIn}${object.checkOut}`;
        dateSlots.push(object);
      }

      return {
        selectedEmployee: dateSlots,
        data: props.data,
        timeSlot: dateSlots[0].timeSlotsLabel,
      };
    }
  }

  showDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  };

  hideDatePicker = () => {
    this.setState({isDatePickerVisible: false});
  };

  getDay = async (date) => {
    return await [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ][new Date(date).getDay()];
  };

  validateDate = async (date) => {
    let day = new Date(date).getDay();
    day = day == 0 ? 7 : day;
    day.toString();
    console.log(day, 'day');

    for (let i = 0; i < this.state.data.weekPlans.length; i++) {
      if (
        this.state.data.weekPlans[i].dayOfWeek == day &&
        this.state.data.weekPlans[i].availableStatus == '1'
      ) {
        // return true;
        return await this.validateTime(
          this.state.data.weekPlans[i],
          date,
        );
      }
    }

    // await this.setState({errorMessages:'This employee is not available on this date'})
    // await Alert.alert(
    //   'We are Sorry',
    //   'This employee is not available on this date',
    //   [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
    //   { cancelable: false },
    // );

    // return await false
    return await {
      valid: false,
      errorMessages: `This employee is not available on ${await this.getDay(
        date,
      )}`,
    };
  };

  validateTime = async (object, date) => {
    let day = await this.getDay(date);
    let currentHourArray = new Date(date).toTimeString().split(' ')[0];
    let startHourArray = object.checkIn.split(':');
    let endHourArray = object.checkOut.split(':');
    let formatHour = currentHourArray.split(':');

    console.log(formatHour, 'currentHourArray');
    console.log(startHourArray, 'startHourArray');
    console.log(endHourArray, 'endHourArray');

    var currentHour = new Date();
    currentHour.setHours(formatHour[0], formatHour[1], 0);
    var startHour = new Date();
    startHour.setHours(startHourArray[0], startHourArray[1], 0);
    var endHour = new Date();
    endHour.setHours(endHourArray[0], endHourArray[1], 0);

    if (currentHour >= startHour && currentHour <= endHour) {
      // return await true
      return await {
        valid: true,
        errorMessages: null,
        checkIn: object.checkIn,
        checkOut: object.checkOut,
        day: day,
      };
    } else {
      // Alert.alert(
      //   'We are Sorry',
      //   'This employee is not available on this time',
      //   [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      //   { cancelable: false },
      // );

      // await this.setState({errorMessages:'This employee is not available on this time'})

      return await {
        valid: false,
        errorMessages: `This employee is available on ${day} from ${object.checkIn} to ${object.checkOut}`,
      };

      // return await false
    }
  };

  handleConfirm = async (date) => {
    let validatidaion = await this.validateDate(date);
    let currentHourArray = new Date(date).toTimeString().split(' ')[0];
    let formatHour = currentHourArray.split(':');
    let d = new Date(date);
    let localFormat = d.toLocaleDateString();
    console.warn('A date has been picked: ', this.state.date);

    if (validatidaion.valid == false) {
      this.setState({
        date: localFormat,
        isDatePickerVisible: false,
        buttonDisable: true,
        time: `${formatHour[0]}:${formatHour[1]}`,
        errorMessages: validatidaion.errorMessages,
        dayDetail: null,
      });
    } else {
      this.setState({
        date: localFormat,
        isDatePickerVisible: false,
        buttonDisable: false,
        time: `${formatHour[0]}:${formatHour[1]}`,
        errorMessages: null,
        dayDetail: `This Employee is avaiable on ${validatidaion.day} from ${validatidaion.checkIn} to ${validatidaion.checkOut}`,
      });
    }
  };

  submit = async (object) => {
    // if (this.state.date == 'Select Date Time' || this.state.time == '') {
    //   Alert.alert(
    //     'Date/Time',
    //     'Please select date and time',
    //     [{text: 'OK', onPress: () => console.log('OK Pressed')}],
    //     {cancelable: false},
    //   );
    // } else {
    //   Alert.alert('Booking Added Successfully');
    // }

    this.props.addToCard(object);
    // alert('Sfd');
    // token
    //   ?
    //   : this.props.navigation.navigate('Login');
    // console.log('objectobjectobjectobjectobject', object);
  };

  renderShowCategoryButton = () => {
    const {selectCard, timeSlot, data, time} = this.state;
    console.log(timeSlot, 'timeSlot');
    console.log(data, 'dataEmployee');

    let selectedEmployeePayload = {
      checkIn: time,
      checkOut: time,
      date: this.state.date,
      // employee: data.employeeId.userId,
      employee: data.employeeId,
      price: '',
      servicesName: '',
      serviceId: '',
    };
    console.log(selectedEmployeePayload, 'bookingpayload');

    return (
      <TouchableOpacity
        disabled={this.state.buttonDisable}
        style={[
          styles.submitBtn,
          this.state.buttonDisable && {backgroundColor: '#DEDEDE'},
        ]}
        onPress={() => this.submit(selectedEmployeePayload)}>
        <Text style={styles.submitBtnText}>Add To Cart</Text>
      </TouchableOpacity>
    );
  };

  renderDropdown = (data) => {
    let calculatedHeightFromRecords = data && data.length * Metrics.ratio(40);
    let maximumAllowedHeight = Metrics.ratio(40) * 3;
    return (
      <View
        style={{
          width: Metrics.screenWidth * 0.865,
          height:
            calculatedHeightFromRecords < maximumAllowedHeight
              ? calculatedHeightFromRecords
              : maximumAllowedHeight,
          marginHorizontal: Metrics.ratio(25),
          borderBottomLeftRadius: Metrics.ratio(5),
          borderBottomRightRadius: Metrics.ratio(5),
          backgroundColor: 'white',
          elevation: 4,
          shadowColor: Colors.black,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.18,
          shadowRadius: 1.0,
          position: 'absolute',
        }}>
        <ScrollView>
          {this.state.isloading && (
            <ActivityIndicator
              size="small"
              style={{marginVertical: 20}}
              color={Colors.darkStaleBlue}
            />
          )}
          {data && data && data.length > 0 && this.renderDropdownList(data)}
        </ScrollView>
      </View>
    );
  };

  renderDropdownList = (data) => {
    return (
      <View>
        {data.map((el, index) => {
          if (el.IsAgencyAccepted) {
            return (
              <TouchableOpacity
                style={{
                  //backgroundColor: "red",
                  flex: 1,
                  height: Metrics.ratio(40),
                }}
                onPress={() => {
                  this.setState({date: el.date});
                }}>
                <Text
                  style={{
                    fontSize: Metrics.ratio(16),
                    marginVertical: Metrics.screenHeight * 0.01,
                    marginLeft: Metrics.screenWidth * 0.02,
                  }}>
                  {el.value}
                </Text>
              </TouchableOpacity>
            );
          }
        })}
      </View>
    );
  };

  renderDropdown = (data) => {
    let calculatedHeightFromRecords = data && data.length * Metrics.ratio(40);
    let maximumAllowedHeight = Metrics.ratio(40) * 3;
    return (
      <View
        style={{
          width: Metrics.screenWidth * 0.865,
          height:
            calculatedHeightFromRecords < maximumAllowedHeight
              ? calculatedHeightFromRecords
              : maximumAllowedHeight,
          marginHorizontal: Metrics.ratio(25),
          borderBottomLeftRadius: Metrics.ratio(5),
          borderBottomRightRadius: Metrics.ratio(5),
          backgroundColor: 'white',
          elevation: 4,
          shadowColor: Colors.black,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.18,
          shadowRadius: 1.0,
        }}>
        <ScrollView>
          {/* {this.state.isloading && <ActivityIndicator size="small" style={{ marginVertical: 20 }} color={Colors.darkStaleBlue} />} */}
          {data && data && data.length > 0 && this.renderDropdownList(data)}
        </ScrollView>
      </View>
    );
  };

  render() {
    console.log(this.state.selectedEmployee, 'dataBookingModal');
    return (
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}>
        <DateTimePickerModal
          minimumDate={new Date()}
          isVisible={this.state.isDatePickerVisible}
          mode={'datetime'}
          onConfirm={(date) => this.handleConfirm(date)}
          onCancel={() => this.hideDatePicker()}
        />

        <View style={styles.container}>
          <View style={styles.modal}>
            <View style={styles.rowCancel}>
              <TouchableOpacity
                style={styles.onCancel}
                onPress={this.props.onCancel}>
                <Text style={styles.onCancelText}>X</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <Text style={styles.nameLabel}>Employee Name</Text>
            </View>
            <View style={styles.nameLabelBorder} />

            <View style={styles.row}>
              <Text
                style={
                  styles.nameValue
                }>{`${this.state.data.employeeId.userId.firstName} ${this.state.data.employeeId.userId.lastName}`}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.descriptionValue}>
                Please Select the date and time for the Appointment
              </Text>
            </View>

            <View style={styles.row}>
              <View style={styles.dateContainer}>
                <View style={styles.datePickerLabelContainer}>
                  <Text>Date Time</Text>
                </View>

                <View style={styles.datePickerRow}>
                  <TouchableOpacity
                    onPress={() => this.showDatePicker()}
                    style={styles.dateValueContainer}>
                    <Text
                      style={{
                        fontSize: 16,
                      }}>{`${this.state.date} ${this.state.time}`}</Text>
                  </TouchableOpacity>

                  {/* <Dropdown
                  dropdownOffset={{ top: 32, left: 10 }}
                  containerStyle={{width:'90%', borderWidth: 0}}
                  pickerStyle={{width:'40%'}}
                  value={this.state.dateData[0].value}
                  onChangeText={(text)=>this.setState({date: text})}
                  data={this.state.dateData}
                  /> */}
                </View>
              </View>

              {/* <View style={styles.timeContainer}>
                <View style={styles.datePickerLabelContainer}>
                  <Text>Time</Text>
                </View>

                <View style={styles.datePickerRow}>
                  <View
                    style={styles.dateValueContainer}>
                    <Text style={{fontSize: 16}}>{this.state.time}</Text>
                  </View>
                </View>
              </View> */}
            </View>

            <View style={[styles.row, {marginTop: 20}]}>
              {this.renderShowCategoryButton()}
            </View>
            {this.state.errorMessages != null && (
              <View style={styles.row}>
                <Text style={styles.errorValue}>
                  {this.state.errorMessages}
                </Text>
              </View>
            )}
            {this.state.dayDetail != null && (
              <View style={styles.row}>
                <Text style={styles.descriptionValue}>
                  {this.state.dayDetail}
                </Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    );
  }
}
