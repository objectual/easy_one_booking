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
import FloatingLabel from 'react-native-floating-labels';
import { request as userVerifyOtp, success } from '../../redux/actions/VerifyOtp';
import styles from './styles';
import { Images, Metrics, Fonts } from '../../theme';
import SpinnerLoader from '../../components/SpinnerLoader';
import {
  nameRegex,
  emailRegex,
  postalCodeRegex,
  passwordRegex,
  validate,
} from '../../services/validation';

class OTP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: '',
      serverToken: '',
      isloading: false,

      formErrors: {
        emailError: false,
        passwordError: false,
      },
    };
  }

  _renderOverlaySpinner = () => {
    const { isloading } = this.state;

    return <SpinnerLoader isloading={isloading} />;
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.verifyOtp) {
      if (
        !nextProps.verifyOtp.failure &&
        !nextProps.verifyOtp.isFetching &&
        nextProps.verifyOtp.data &&
        nextProps.verifyOtp.data.success
      ) {
        console.log(this.props.route.params.userObj, 'this.props.route.params.userObj')
        this.setState({ isloading: false }, () => {
          Alert.alert('Success', nextProps.verifyOtp.data.msg, [
            {
              text: 'OK',
              onPress: () =>
                this.props.navigation.navigate(
                  'UpdatePassword',
                  {
                    userObj: this.props.route.params.userObj,
                  },
                  //  {
                  // userObj: {
                  //   otpCode: nextProps.forgetPassword.data.data.token,
                  //   _id: nextProps.forgetPassword.data.data._id,
                  //   _userId: nextProps.forgetPassword.data.data._userId,
                  // },
                  // }
                ),
            },
          ]);
        });
      } else if (
        !nextProps.verifyOtp.failure &&
        !nextProps.verifyOtp.isFetching &&
        nextProps.verifyOtp.data &&
        !nextProps.verifyOtp.data.success
      ) {
        this.setState({ isloading: false }, () => {
          setTimeout(() => {
            Alert.alert('Error', nextProps.login.data.msg);
          }, 3000);
        });
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

  handleLogin = () => {
    this.setState({ isLoading: true });
    const { userToken } = this.state;
    const { otpCode, _id, _userId } = this.props.route.params.userObj;

    const payload = {
      userId: _userId,
      token: userToken,
    };

    if (userToken == otpCode) {
      this.props.userVerifyOtp(payload);
    } else {
      Alert.alert('Error', 'Please Provide Right Code');
    }
  };

  onChangeToken = async (value) => {
    this.setState({ userToken: value });
  };

  renderTextInputWithLabel = (
    label,
    ref,
    returnKeyType,
    onChangeText,
    value,
    placeholder,
    keyboardType,
    onSubmitEditing,
    secureTextEntry,
    CustomTextInput,
    maxLength,
    errorMessage,
  ) => {
    return (
      <View>
        <Text style={styles.labelText}>{label}</Text>
        <TextInput
          style={[
            styles.textInput,
            CustomTextInput,
            Platform.OS == 'ios' && { paddingBottom: 0 },
          ]}
          placeholderTextColor="#81788B"
          ref={(o) => {
            ref = o;
          }}
          returnKeyType={returnKeyType}
          onChangeText={onChangeText}
          value={value}
          maxLength={maxLength}
          placeholder={placeholder}
          autoCompleteType="off"
          // onSubmitEditing={() => {
          //   this.onSubmit(onSubmitEditing);
          // }}
          secureTextEntry={secureTextEntry}
        />
        <View>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      </View>
    );
  };

  renderHeaderLogo = () => {
    return (
      <View style={styles.logoView}>
        <Image source={Images.easy1_logo_800x300} style={styles.logoImage} />
      </View>
    );
  };

  renderScreenHeading = () => {
    return <Text style={styles.screenHeading}>Enter OTP Code!</Text>;
  };

  renderSubmitBtn = () => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View
          style={[
            styles.submitBtn,
            this.state.passwordError == null && this.state.emailError == null
              ? { backgroundColor: 'transparent' }
              : { backgroundColor: 'transparent' },
          ]}
          disabled={
            this.state.passwordError == null && this.state.emailError == null
              ? false
              : true
          }></View>
        <TouchableOpacity
          onPress={() => this.handleLogin()}
          style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>Verify</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { btnDisabled, formErrors, userToken, password } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View
            style={{
              paddingHorizontal: Metrics.ratio(20),
            }}>
            {this.renderHeaderLogo()}
            {this.renderScreenHeading()}
            {this.renderTextInputWithLabel(
              'OTP',
              'inputEmail',
              'next',
              this.onChangeToken,
              userToken,
              '######',
              'email-address',
              'inputPassword',
              false,
              styles.CustomTextInput,
              6,
              this.state.emailError,
            )}

            {this.renderSubmitBtn()}
            {this._renderOverlaySpinner()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({ verifyOtp: state.verifyOtp });

const action = { userVerifyOtp };

export default connect(mapStateToProps, action)(OTP);
