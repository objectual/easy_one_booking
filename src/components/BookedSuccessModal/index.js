import React, {Component} from 'react';
import {Modal, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import styles from './styles';

export default class BookedSuccessModal extends Component {
  state = {
    modalVisible: true,
  };


  renderShowCategoryButton = () => {
    const {selectCard} = this.state;
    // console.log( selectCard, 'selectCardselectCardselectCardselectCard')
    return (
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => this.props.addToCard }>
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
            <View style={styles.nameLabelBorder}/>


            <View style={styles.row}>
              <Text style={styles.nameValue}>Employee Name</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.nameValue}>Employee Name</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.descriptionValue}>Please Select the date and time for the Appointment</Text>
            </View>

            <View style={styles.row}>
                  {this.renderShowCategoryButton()}
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
