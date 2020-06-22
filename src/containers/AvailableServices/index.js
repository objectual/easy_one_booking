import {connect} from 'react-redux';
import React, {Component} from 'react';
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
} from 'react-native';
import FloatingLabel from 'react-native-floating-labels';
import styles from './styles';
import {Images, Metrics, Fonts} from '../../theme';
import SpinnerLoader from '../../components/SpinnerLoader';
import Header from '../../components/Header/index';

class AvailableServices extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderOverlaySpinner = () => {
    const {isloading} = this.state;
    return <SpinnerLoader isloading={isloading} />;
  };

  renderPayNowButton = () => {
    return (
      <View style={[styles.containerForRow, {alignItems: 'center'}]}>
        <TouchableOpacity
          style={styles.submitBtn2}
          // onPress={() => this.props.navigation.navigate('BookingForm')}
        >
          <Text style={styles.submitBtnText2}>Book Now</Text>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>{this.renderPayNowButton()}</View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const action = {};

export default connect(mapStateToProps, action)(AvailableServices);
