import React, {Component} from 'react';
import {Text, View, TextInput} from 'react-native';
import styles from './styles';

export default class CustomTextInputRow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={this.props.style}>
        {/* <Text style={styles.inputTitle}>{this.props.title}</Text> */}
        <TextInput
          placeholder={this.props.placeholderText}
          secureTextEntry={this.props.isSecure}
          style={[styles.textInputRow, this.props.CustomStyle]}
          onChangeText={this.props.handleInput}
          autoCompleteType="off"
          value={this.props.inputValue}
          maxLength={this.props.maxLength}
          keyboardType={this.props.keyboardType}
          editable={this.props.isEditable}
        />
        {/* <View style={{borderBottomColor: '#D8D8D8', borderBottomWidth: 1}} /> */}
        <View>
          <Text style={styles.errorText}>{this.props.errorMessage}</Text>
        </View>
      </View>
    );
  }
}
