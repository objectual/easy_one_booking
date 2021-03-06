import * as React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeIcon from 'react-native-vector-icons/AntDesign';
import DotIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// import salon_unactive from './../../theme/Images/';
import {Images, Metrics, Colors, Fonts} from '../../theme';
import {token} from './../../config/WebServices';

import styles from './style';

const footerIconSize = 30;
const headerIconSize = 27;

// function Footer(props) {
class Footer extends React.Component {
  validateUser = () => {
    token
      ? this.props.navigation('BookingHistory')
      : this.props.navigation('Login');
  };

  componentDidMount() {
    // this.validateUser();
  }

  render() {
    const {children, screen, tab} = this.props;

    return (
      <View style={styles.mainContainer}>
        <View style={styles.bodyContainer}>{children}</View>

        <View style={styles.footerContainer}>
          <View style={styles.footerSubContainer}>
            <TouchableOpacity
              onPress={() => this.props.navigation('Home')}
              style={{justifyContent: 'center'}}>
              {screen != 'home' ? (
                <View style={{alignItems: 'center'}}>
                  <Image
                    source={Images.home_unactive}
                    style={{
                      width: Metrics.ratio(30),
                      height: Metrics.ratio(30),
                    }}
                  />
                  <Text
                    style={{fontSize: 9, color: 'white', textAlign: 'center'}}>
                    Home
                  </Text>
                </View>
              ) : (
                <View style={{alignItems: 'center'}}>
                  <Image
                    source={Images.home_active}
                    style={{
                      width: Metrics.ratio(30),
                      height: Metrics.ratio(30),
                    }}
                  />
                  <Text
                    style={{fontSize: 9, color: 'white', textAlign: 'center'}}>
                    Home
                  </Text>
                </View>
              )}
              {}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation('DrawerSaloons')}>
              {screen != 'history' ? (
                <View style={{alignItems: 'center'}}>
                  <Image
                    source={Images.salon_unactive}
                    style={{
                      width: Metrics.ratio(30),
                      height: Metrics.ratio(30),
                    }}
                  />
                  <Text
                    style={{fontSize: 9, color: 'white', textAlign: 'center'}}>
                    Salon
                  </Text>
                </View>
              ) : (
                <View style={{alignItems: 'center'}}>
                  <Image
                    source={Images.salon_active}
                    style={{
                      width: Metrics.ratio(30),
                      height: Metrics.ratio(30),
                    }}
                  />
                  <Text
                    style={{fontSize: 9, color: 'white', textAlign: 'center'}}>
                    Salon
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={{justifyContent: 'center'}}
              onPress={() => this.validateUser()}>
              {screen != 'services' ? (
                <View style={{alignItems: 'center'}}>
                  <Image
                    source={Images.booking_unactive}
                    style={{
                      width: Metrics.ratio(30),
                      height: Metrics.ratio(30),
                    }}
                  />
                  <Text
                    style={{fontSize: 9, color: 'white', textAlign: 'center'}}>
                    Booking
                  </Text>
                </View>
              ) : (
                <View style={{alignItems: 'center'}}>
                  <Image
                    source={Images.booking_active}
                    style={{
                      width: Metrics.ratio(30),
                      height: Metrics.ratio(30),
                    }}
                  />
                  <Text
                    style={{fontSize: 9, color: 'white', textAlign: 'center'}}>
                    Booking
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.props.navigation('Menu')}>
              {screen != 'navbar' ? (
                <Image
                  source={Images.nav_bar_unactive}
                  style={{
                    width: Metrics.ratio(30),
                    height: Metrics.ratio(30),
                    marginTop: Metrics.ratio(5),
                  }}
                />
              ) : (
                <Image
                  source={Images.nav_bar_active}
                  style={{width: Metrics.ratio(30), height: Metrics.ratio(30)}}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Footer;
