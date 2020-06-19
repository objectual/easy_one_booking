import React, {Component} from 'react';
import {Modal, Text, TouchableOpacity, View, Image} from 'react-native';
import styles from './styles';
import {Images, Metrics, Fonts, Colors} from '../../theme';


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
          onPress={this.props.onPress}>
          <Text style={styles.submitBtnText}>OK</Text>
        </TouchableOpacity>
    );
  };

  render() {
    return (
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={true}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}>
        <View style={styles.container}>
          <View style={styles.modal}>
            

            <View style={styles.row}>
              <View style={styles.imageContainer}>
                <Image
                source={Images.saloon_check_arrow}
                style={styles.image}
                />
              </View>
            </View>
            <View style={styles.nameLabelBorder}/>


            <View style={styles.row}>
              <Text style={styles.nameValue}>Booked Successful</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.descriptionValue}>Your Booking has been confirmed</Text>
              <Text style={styles.descriptionValue}>Click Ok to proceed next step</Text>

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
