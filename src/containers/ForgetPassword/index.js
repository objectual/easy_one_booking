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
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
// import FloatingLabel from 'react-native-floating-labels';
import {
  request as reSendEmail,
  success,
} from '../../redux/actions/ForgetPassword';
import styles from './styles';
import {Images, Metrics, Fonts} from '../../theme';
import SpinnerLoader from '../../components/SpinnerLoader';
import {
  nameRegex,
  emailRegex,
  postalCodeRegex,
  passwordRegex,
  validate,
} from '../../services/validation';

class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'muhammadsarim555@gmail.com', //new_cust1@mailinator.com
      isLoading: false,
      btnDisabled: false,
      emailError: '',
      passwordError: '',
      fcmToken: null,
      userObj: {},
      formErrors: {
        emailError: false,
        passwordError: false,
      },
    };
  }

  _renderOverlaySpinner = () => {
    const {isLoading} = this.state;

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
  

        Alert.alert('Info', nextProps.forgetPassword.data.msg, [
          {
            text: 'OK',
            onPress: () =>
              this.props.navigation.navigate('Otp', {
                userObj: {
                  otpCode: nextProps.forgetPassword.data.data.token,
                  _id: nextProps.forgetPassword.data.data._id,
                  _userId: nextProps.forgetPassword.data.data._userId,
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
        this.setState({isloading: false}, () => {
          setTimeout(() => {
            Alert.alert('Error', nextProps.forgetPassword.data.msg);
          }, 1000);
        });
        this.setState({isLoading: false});
      }
    }
  }

  componentDidMount() {
    this.getToken();
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    this.setState({fcmToken});
  }

  onChangeEmail = async (value) => {
    this.setState({email: value});
    this.setState({
      emailError: await validate(
        value,
        emailRegex,
        'Please enter a valid email',
      ),
    });
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
    errorMessage,
  ) => {
    return (
      <View>
        <Text style={styles.labelText}>{label}</Text>
        <TextInput
          style={[
            styles.textInput,
            CustomTextInput,
            Platform.OS == 'ios' && {paddingBottom: 0},
          ]}
          placeholderTextColor="#81788B"
          ref={(o) => {
            ref = o;
          }}
          returnKeyType={returnKeyType}
          onChangeText={onChangeText}
          value={value}
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
    return <Text style={styles.screenHeading}>Forgot your password!</Text>;
  };

  sendEmail = () => {
    // this.props.navigation.navigate('Otp')

    this.setState({isLoading: true});

    const {email} = this.state;

    this.setState({isLoading: true});

    const payload = {
      email,
    };

    this.props.reSendEmail(payload);
  };

  renderSubmitBtn = () => {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View
          style={[
            styles.submitBtn,
            this.state.passwordError == null && this.state.emailError == null
              ? {backgroundColor: 'transparent'}
              : {backgroundColor: 'transparent'},
          ]}
          disabled={
            this.state.passwordError == null && this.state.emailError == null
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
    const {btnDisabled, formErrors, email, isLoading} = this.state;
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
            {this.renderTextInputWithLabel(
              'Email',
              'inputEmail',
              'next',
              this.onChangeEmail,
              email,
              'Enter your email.',
              'email-address',
              'inputPassword',
              false,
              styles.CustomTextInput,
              this.state.emailError,
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

const action = {reSendEmail};

export default connect(mapStateToProps, action)(ForgetPassword);
