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
import styles from './style';
import {Images, Metrics, Fonts, Colors} from '../../theme';

export default class SubmitButton extends Component {
  render() {
    return (
      <View
        style={{
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={[styles.submitBtn, this.props.CustomStyle]}
          onPress={this.props.OnpressGo}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {this.props.enableInsideImage == true ? (
              <Image
                source={this.props.image}
                style={{height: 20, width: 20, marginRight: 5}}
              />
            ) : null}
            <Text
              style={[styles.submitBtnText, this.props.CustomStyleButtonText]}>
              {this.props.ButtonText}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
