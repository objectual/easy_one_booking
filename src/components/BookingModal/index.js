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
} from 'react-native';
import styles from './styles';
import {Images, Metrics, Fonts, Colors} from '../../theme';
import { Dropdown } from 'react-native-material-dropdown';


export default class BookingModal extends Component {
  state = {
    modalVisible: true,
    date: '8/8/2020',
    time: '9:34AM',
    dateData: [{value: '6/18/2020'}, {value: '2/18/2020'}, {value: '5/28/2020'}],
    timeData: [{value: '12:00 PM'}, {value: '3:00 PM'}, {value: '5:00 PM'}],
    isloading: false,
  };
  
  renderShowCategoryButton = () => {
    const {selectCard} = this.state;
    // console.log( selectCard, 'selectCardselectCardselectCardselectCard')
    return (
      <TouchableOpacity
        style={styles.submitBtn}
        onPress={this.props.addToCard}>
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
    return (
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}>
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
              <Text style={styles.nameValue}>Alex</Text>
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

                <View
                  style={styles.datePickerRow}>
                  

                  <Dropdown
                  dropdownOffset={{ top: 32, left: 10 }}
                  containerStyle={{width:'90%', borderWidth: 0}}
                  pickerStyle={{width:'40%'}}
                  value={this.state.dateData[0].value}
                  onChangeText={(text)=>this.setState({date: text})}
                  data={this.state.dateData}
                  />


                </View>
              </View>

              <View style={styles.timeContainer}>

              <View style={styles.datePickerLabelContainer}>
                  <Text>Select Time</Text>
                </View>

                <View
                  style={styles.datePickerRow}>
                   
                  <Dropdown
                  dropdownOffset={{ top: 32, left: 10 }}
                  containerStyle={{width:'90%', borderWidth: 0}}
                  pickerStyle={{width:'40%'}}
                  value={this.state.timeData[0].value}
                  onChangeText={(text)=>this.setState({date: text})}
                  data={this.state.timeData}
                  />


                </View>
              </View>
            </View>

            <View style={[styles.row,{marginTop:20}]}>{this.renderShowCategoryButton()}</View>
          </View>
        </View>
      </Modal>
    );
  }
}
