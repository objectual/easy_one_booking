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

  
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            {/* {this.renderRow()} */}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({});

const action = {};

export default connect(mapStateToProps, action)(AvailableServices);
