import { connect } from 'react-redux';
import React, { Component } from 'react';
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
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
// import FloatingLabel from 'react-native-floating-labels';
import {
  request as reSendEmail,
  success,
} from '../../redux/actions/ForgetPassword';
import styles from './styles';
import { Images, Metrics, Fonts } from '../../theme';
import SpinnerLoader from '../../components/SpinnerLoader';

class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNum: '', //new_cust1@mailinator.com
      isLoading: false,
      btnDisabled: false,
      phoneNoErr: '',
      fcmToken: null,
      userObj: {},
      formErrors: {
        phoneNoErr: false
      },
    };
  }

  _renderOverlaySpinner = () => {
    const { isLoading } = this.state;

    return <SpinnerLoader isloading={isLoading} />;
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.forgetPassword) {
      if (
        !nextProps.forgetPassword.failure &&
        !nextProps.forgetPassword.isFetching &&
        nextProps.forgetPassword.data &&
        nextProps.forgetPassword.data.success
      ) {
        console.log(nextProps.forgetPassword.data, 'nextProps.forgetPassword.data')

        Alert.alert('Info', nextProps.forgetPassword.data.msg, [
          {
            text: 'OK',
            onPress: () =>
              this.props.navigation.navigate('Otp', {
                userObj: {
                  otpCode: nextProps.forgetPassword.data.data.token,
                  _id: nextProps.forgetPassword.data.data._id,
                  _userId: nextProps.forgetPassword.data.data._userId,
                  // phoneNo: 
                },
              }),
          },
        ]);
        this.setState({
          isLoading: false,
          message: nextProps.forgetPassword.data.msg,
        });
      } else if (
        !nextProps.forgetPassword.failure &&
        !nextProps.forgetPassword.isFetching &&
        nextProps.forgetPassword.data &&
        !nextProps.forgetPassword.data.success
      ) {
        this.setState({ isloading: false }, () => {
          setTimeout(() => {
            Alert.alert('Error', nextProps.forgetPassword.data.msg);
          }, 1000);
        });
        this.setState({ isLoading: false });
      }
    }
  }

  componentDidMount() {
    this.getToken();
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    this.setState({ fcmToken });
  }

  onPhoneNoChange = (text) => {
    var cleaned = ('' + text).replace(/\D/g, '')
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      var intlCode = (match[1] ? '+1 ' : ''),
        number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');

      this.setState({
        phoneNum: number,
        phoneNoErr: null
      });

      return;
    }
    this.setState({
      phoneNoErr: 'Please enter a valid phone no',
      phoneNum: text
    });
  }

  renderTextInputWithLable = (
    lable,
    ref,
    returnKeyType,
    onChangeText,
    value,
    placeholder,
    keyboardType,
    onSubmitEditing,
    secureTextEntry,
    CustomTextInput,
    errorMessage,
    contentType,
    maxLength
  ) => {
    return (
      <View style={{ marginHorizontal: Metrics.ratio(3) }}>
        <Text style={styles.labelText}>{lable}</Text>
        <TextInput
          style={[styles.textInput, CustomTextInput, Platform.OS == "ios" && { paddingBottom: 0 }]}
          placeholderTextColor="#81788B"
          ref={(o) => {
            ref = o;
          }}
          returnKeyType={returnKeyType}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          autoCompleteType="off"
          keyboardType={keyboardType}
          textContentType={contentType}
          // onSubmitEditing={() => {
          //   this.onSubmit(onSubmitEditing);
          // }}
          secureTextEntry={secureTextEntry}
          maxLength={maxLength}
        />
        <View>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      </View>
    );
  };

  // renderTextInputWithLabel = (
  //   label,
  //   ref,
  //   returnKeyType,
  //   onChangeText,
  //   value,
  //   placeholder,
  //   keyboardType,
  //   onSubmitEditing,
  //   secureTextEntry,
  //   CustomTextInput,
  //   errorMessage,
  // ) => {
  //   return (
  //     <View>
  //       <Text style={styles.labelText}>{label}</Text>
  //       <TextInput
  //         style={[
  //           styles.textInput,
  //           CustomTextInput,
  //           Platform.OS == 'ios' && {paddingBottom: 0},
  //         ]}
  //         placeholderTextColor="#81788B"
  //         ref={(o) => {
  //           ref = o;
  //         }}
  //         returnKeyType={returnKeyType}
  //         onChangeText={onChangeText}
  //         value={value}
  //         placeholder={placeholder}
  //         autoCompleteType="off"
  //         // onSubmitEditing={() => {
  //         //   this.onSubmit(onSubmitEditing);
  //         // }}
  //         secureTextEntry={secureTextEntry}
  //       />
  //       <View>
  //         <Text style={styles.errorText}>{errorMessage}</Text>
  //       </View>
  //     </View>
  //   );
  // };

  renderHeaderLogo = () => {
    return (
      <View style={styles.logoView}>
        <Image source={Images.easy1_logo_800x300} style={styles.logoImage} />
      </View>
    );
  };

  renderScreenHeading = () => {
    return <Text style={styles.screenHeading}>Forgot your password!</Text>;
  };

  sendEmail = () => {
    // this.props.navigation.navigate('Otp')

    this.setState({ isLoading: true });

    const { phoneNum } = this.state;

    this.setState({ isLoading: true });

    const payload = {
      phoneNo: phoneNum,
    };

    this.props.reSendEmail(payload);
  };

  renderSubmitBtn = () => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View
          style={[
            styles.submitBtn,
            this.state.emailError == null
              ? { backgroundColor: 'transparent' }
              : { backgroundColor: 'transparent' },
          ]}
          disabled={
            this.state.emailError == null
              ? false
              : true
          }></View>
        <TouchableOpacity
          onPress={() => this.sendEmail()}
          style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>Send</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { btnDisabled, formErrors, phoneNum, isLoading } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View
            style={{
              paddingHorizontal: Metrics.ratio(20),
              // height: Metrics.screenHeight,
              // justifyContent: 'center',
            }}>
            {this.renderHeaderLogo()}
            {this.renderScreenHeading()}
            {this.renderTextInputWithLable(
              'Phone No',
              'inputPhoneNo',
              'next',
              this.onPhoneNoChange,
              phoneNum,
              'Enter your Phone No.',
              'phone-pad',
              'inputPassword',
              false,
              styles.CustomTextInput,
              this.state.phoneNoErr,
              "telephoneNumber",
              14
            )}

            {this.renderSubmitBtn()}
            {isLoading && this._renderOverlaySpinner()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

// const mapStateToProps = (state) =>
// {

//  return

//    {login: state.login, cart: state.cart}
// }
const mapStateToProps = (state) => {
  // console.log('Sfsfsfsf', state);
  return {
    forgetPassword: state.forgetPassword,
  };
};

const action = { reSendEmail };

export default connect(mapStateToProps, action)(ForgetPassword);
