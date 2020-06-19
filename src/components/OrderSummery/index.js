import React, {Component} from 'react';
import {Text, View, TextInput} from 'react-native';
import styles from './styles';

export default class OrderSummery extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <View style={[styles.servicebody, styles.containerForRow]}>
          <Text
            numberOfLines={1}
            style={[styles.servicebodyfont, styles.employeebody]}>
            {this.props.Employee}
          </Text>
          <Text
            numberOfLines={1}
            style={[styles.servicebodyfont, styles.servicesbody]}>
            {this.props.Services}
          </Text>
          <Text
            numberOfLines={1}
            style={[styles.servicebodyfont, styles.timebody]}>
            {this.props.TIme}
          </Text>
          <Text
            numberOfLines={1}
            style={[styles.servicebodyfont, styles.pricebody]}>
            {this.props.Price}
          </Text>
          <TouchableOpacity style={{justifyContent: 'center'}}>
            <Image
              source={Images.cross}
              style={{
                height: Metrics.ratio(15),
                width: Metrics.ratio(15),
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalLine}></View>
      </View>
    );
  }
}
