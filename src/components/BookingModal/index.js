import React, {Component} from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Picker,
} from 'react-native';
import styles from './styles';
import {Images, Metrics, Fonts, Colors} from '../../theme';

export default class BookingModal extends Component {
  state = {
    modalVisible: true,
    selectedValue: 'java'
  };

  renderShowCategoryButton = () => {
    const {selectCard} = this.state;
    // console.log( selectCard, 'selectCardselectCardselectCardselectCard')
    return (
      <TouchableOpacity
        style={styles.submitBtn}
        onPress={() => this.props.addToCard}>
        <Text style={styles.submitBtnText}>Add To Card</Text>
      </TouchableOpacity>
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
              <TouchableOpacity onPress={this.props.onCancel}>
                <Text>X</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <Text style={styles.nameLabel}>Employee Name</Text>
            </View>
            <View style={styles.nameLabelBorder} />

            <View style={styles.row}>
              <Text style={styles.nameValue}>Employee Name</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.nameValue}>Employee Name</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.descriptionValue}>
                Please Select the date and time for the Appointment
              </Text>
            </View>

            <View style={styles.row}>
              <View style={styles.dateContainer}>
                <View style={styles.datePickerLabel}>
                  <Text>Select date</Text>
                </View>

                <View style={styles.datePickerRow}>

                  <View style={styles.datePickerimageContainer}>
                    <Image
                      source={Images.costumer_register}
                      style={styles.image}
                    />
                  </View>

                  <View style={styles.datePickerComponent}>
                    <Picker

                        selectedValue={this.state.selectedValue}
        style={{ height: 50, width: 80 }}
        onValueChange={(itemValue, itemIndex) => this.setState({})}
      >
        <Picker.Item label="1/1/2019" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>

                  </View>
                </View>
              </View>

              <View style={styles.timeContainer}>
                <Text>Selec time</Text>
              </View>
            </View>

            <View style={styles.row}>{this.renderShowCategoryButton()}</View>
          </View>
        </View>
      </Modal>
    );
  }
}
