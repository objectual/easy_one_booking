import {connect} from 'react-redux';
import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import styles from './styles';
import {Metrics} from '../../theme';

class AwesomePlaces extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <View style={styles.container}></View>;
  }
}

const mapStateToProps = (state) => ({});

const action = {};

export default connect(mapStateToProps, action)(AwesomePlaces);
