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
import {Footer} from './../../components';
import CustomTextInput from '../../components/CustomTextInput';

class ChartBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }
  onChangeText = value => this.setState({text: value});

  _renderOverlaySpinner = () => {
    const {isloading} = this.state;
    return <SpinnerLoader isloading={isloading} />;
  };
  renderSender = () => {
    return (
      <View style={styles.containerForRow}>
        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          <View>
            <Image
              source={Images.select_services}
              style={styles.servicesImagesender}
            />
          </View>
          <View style={styles.serviceboxsender}>
            <Text style={styles.textmiddlesender}>
              
            </Text>
          </View>
        </View>
      </View>
    );
  };
  renderReciver = () => {
    return (
      <View style={styles.containerForRow}>
        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          <View style={styles.serviceboxreciver}>
            <Text style={styles.textmiddlereciver}>
            </Text>
          </View>
          <View>
            <Image
              source={Images.select_services}
              style={styles.servicesImagereciver}
            />
          </View>
        </View>
      </View>
    );
  };

  renderSend = () => {
    const {text} = this.state;
    return (
      <View style={[styles.containerForRow, {marginTop: Metrics.ratio(30)}]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={Images.select_services} style={styles.camera} />
          <View style={{width: Metrics.screenWidth * 0.66}}></View>
          <View>
            <Image source={Images.select_services} style={styles.camera} />
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      // <View style={styles.container}>
      <Footer navigation={this.props.navigation.navigate} screen={'chat'}>
        <ScrollView>
          <View>{/* {this.renderRow()} */}</View>
        </ScrollView>
        {/* // </View> */}
      </Footer>
    );
  }
}

const mapStateToProps = state => ({});

const action = {};

export default connect(mapStateToProps, action)(ChartBox);
