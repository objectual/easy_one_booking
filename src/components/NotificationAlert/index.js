import NotificationPopup from 'react-native-push-notification-popup';
import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import styles from './styles';
import {Metrics} from '../../theme';

export default class NotificationAlert extends Component {
  componentDidMount() {
    this.popup.show({
      onPress: function () {
        console.log('Pressed');
      },
      appIconSource: require('../../assets/splashIcon.png'),
      appTitle: 'Some App',
      timeText: 'Now',
      title: 'Something Else!',
      body: 'Order has been created.',
      slideOutTime: 5000,
    });
  }
  renderCustomPopup = ({appIconSource, appTitle, timeText, title, body}) => (
    <View
      style={{
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: Metrics.ratio(5),
        overflow: 'hidden',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: Metrics.ratio(10),
          backgroundColor: '#eee',
        }}>
        <Image style = {{width: Metrics.ratio(60), height: Metrics.ratio(20)}} source = {appIconSource}/>
        <Text
          style={{
            color: '#000',
            fontSize: Metrics.ratio(14),
          }}>
          Now
        </Text>
      </View>
      <View
        style={{
          padding: Metrics.ratio(10),
        }}>
        <Text
          style={{
            color: '#000',
            fontSize: Metrics.ratio(16),
            paddingBottom: Metrics.ratio(3)
          }}>
          {title}
        </Text>
        <Text
          style={{
            color: '#000',
            fontSize: Metrics.ratio(12),
          }}>
          {body}
        </Text>
      </View>
    </View>
  );
  render() {
    return (
      <NotificationPopup
        ref={(ref) => (this.popup = ref)}
        renderPopupContent={this.renderCustomPopup}
      />
    );
  }
}
