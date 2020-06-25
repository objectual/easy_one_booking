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

export default class BookingModal extends Component {
  state = {
    modalVisible: true,
    date: new Date().toLocaleDateString(),
    time: '9:34AM',
    dateData: [
      {value: '6/18/2020'},
      {value: '2/18/2020'},
      {value: '5/28/2020'},
    ],
    timeData: [{value: '12:00 PM'}, {value: '3:00 PM'}, {value: '5:00 PM'}],
    isloading: false,
    selectedEmployee: {},
    timeSlot: '',
    isDatePickerVisible: false,
    data: {},
    buttonDisable: false,
  };

  async componentDidMount() {
    if ((await this.validateDate(this.state.date)) == false) {
      Alert.alert(
        'We are Sorry',
        'This employee is not available on current date,Please select some other date',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
      this.setState({buttonDisable: true});
    } else {
      this.setState({buttonDisable: false});
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (JSON.stringify(props.data) !== JSON.stringify(state.selectedEmployee)) {
      let dateSlots = [];

      for (let i = 0; i < props.data.employeeId.weekPlans.length; i++) {
        let object = Immutable.asMutable(props.data.employeeId.weekPlans[i]);
        object.timeSlotsLabel = `${object.checkIn} ${object.checkOut}`;
        object.timeSlotsValue = `${object.checkIn}${object.checkOut}`;
        dateSlots.push(object);
      }

      return {
        selectedEmployee: dateSlots,
        data: props.data,
        timeSlot: dateSlots[0].timeSlotsLabel
      };
    }
  }

  showDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  };

  hideDatePicker = () => {
    this.setState({isDatePickerVisible: false});
  };

  validateDate = (date) => {
    let day = new Date(date).getDay();
    day = day == 0 ? 7 : day + 0;
    day.toString();
    console.log(day, 'day');

    for (let i = 0; i < this.state.data.employeeId.weekPlans.length; i++) {
      if (
        this.state.data.employeeId.weekPlans[i].dayOfWeek == day &&
        this.state.data.employeeId.weekPlans[i].availableStatus == '1'
      ) {
        return true;
      }
    }

    return false;
  };

  handleConfirm = async (date) => {
    var d = new Date(date);
    var localFormat = d.toLocaleDateString();
    console.warn('A date has been picked: ', this.state.date);
    if ((await this.validateDate(date)) == false) {
      Alert.alert(
        'We are Sorry',
        'This employee is not available on this date',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
      this.setState({
        date: localFormat,
        isDatePickerVisible: false,
        buttonDisable: true,
      });
    } else {
      this.setState({
        date: localFormat,
        isDatePickerVisible: false,
        buttonDisable: false,
      });
    }
  };

  renderShowCategoryButton = () => {
    const {selectCard, timeSlot, data} = this.state;
    console.log( timeSlot, 'timeSlot')
    console.log( data, 'dataEmployee')

    let  selectedEmployeePayload = {
      checkIn: timeSlot.split(' ')[0],
      checkOut: timeSlot.split(' ')[1],
      date: this.state.date,
      employee: data.employeeId.userId,
      price:'',
      servicesName:'',
      serviceId:''    
    };
    console.log( selectedEmployeePayload, 'bookingpayload')

    return (
      <TouchableOpacity
        disabled={this.state.buttonDisable}
        style={styles.submitBtn}
        onPress={()=>this.props.addToCard(selectedEmployeePayload)}>
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
                  {el.value}454545ssjdjsdjsjdsjdj
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
          isVisible={this.state.isDatePickerVisible}
          mode="date"
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
                  <Text>Select Date</Text>
                </View>

                <View style={styles.datePickerRow}>
                  <TouchableOpacity
                    onPress={() => this.showDatePicker()}
                    style={styles.dateValueContainer}>
                    <Text style={{fontSize: 16}}>{this.state.date}</Text>
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

              <View style={styles.timeContainer}>
                <View style={styles.datePickerLabelContainer}>
                  <Text>Select Time</Text>
                </View>

                <View style={styles.datePickerRow}>
                  <Dropdown
                    dropdownOffset={{top: 32, left: 10}}
                    containerStyle={{width: '90%', borderWidth: 0}}
                    pickerStyle={{width: '40%'}}
                    value={this.state.timeSlot}
                    onChangeText={(text) => this.setState({timeSlot: text})}
                    data={this.state.selectedEmployee}
                    labelExtractor={(x) => x.timeSlotsLabel}
                    valueExtractor={(x) => x.timeSlotsValue}
                  />
                </View>
              </View>
            </View>

            <View style={[styles.row, {marginTop: 20}]}>
              {this.renderShowCategoryButton()}
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
