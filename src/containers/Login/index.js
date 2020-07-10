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
import {request as userLogin, success} from '../../redux/actions/Login';
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

// import GoogleSigninBtn from '../../components/GoogleSigninButton';
// import FacebookSigninButton from '../../components/FacebookSigninButton';
// import InstagramLoginButton from '../../components/InstagramLoginButton';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isloading: false,
      btnDisabled: false,
      emailError: '',
      passwordError: '',
      formErrors: {
        emailError: false,
        passwordError: false,
      },
    };
  }

  _renderOverlaySpinner = () => {
    const {isFetching} = this.props.login;

    return <SpinnerLoader isloading={isFetching} />;
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.login) {
      console.log(
        nextProps.login,
        'nextProps.loginnextProps.loginnextProps.loginnextProps.loginnextProps.loginnextProps.login',
      );
      if (
        !nextProps.login.failure &&
        !nextProps.login.isFetching &&
        nextProps.login.data &&
        nextProps.login.data.success
      ) {
        this.setState({isloading: false}, () => {
          setTimeout(() => {
            Alert.alert(
              'Successfully',
              'Successfully Logged In',
              [
                {
                  text: 'ok',
                  onPress: () => {
                    console.log('ok');
                  },
                },
              ],
              {cancelable: false},
            );
          }, 3000);
        });
        if (this.props.cart.data.length == 0) {
          this.props.navigation.navigate('Home');
        } else {
          this.props.navigation.navigate('Proceeding');
        }
      } else if (
        !nextProps.login.failure &&
        !nextProps.login.isFetching &&
        nextProps.login.data &&
        !nextProps.login.data.success
      ) {
        console.log(
          nextProps.login.data.msg,
          'nextProps.login.data.data.msgnextProps.login.data.data.msg',
        );
        // this.setState({isloading: false}, () => {
        //   setTimeout(() => {
        //     Alert.alert('Error', nextProps.login.data.msg);
        //   }, 3000);
        // });
        this.setState({isloading: false});
      }
    }
  }

  checkValidation = () => {
    const {email, password} = this.state;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email.match(emailRegex)) {
      this.setState({
        formErrors: {
          emailError: true,
          passwordError: false,
        },
      });
      setTimeout(() => {
        this.setState({
          formErrors: {
            emailError: false,
            passwordError: false,
          },
        });
      }, 3000);
    } else if (password.length < 6) {
      this.setState({
        formErrors: {
          emailError: false,
          passwordError: true,
        },
      });
      setTimeout(() => {
        this.setState({
          formErrors: {
            emailError: false,
            passwordError: false,
          },
        });
      }, 3000);
    } else {
      this.handleLogin();
    }
  };

  handleLogin = () => {
    this.setState({isLoading: true});
    const {email, password} = this.state;
    const payload = {
      email: email,
      password: password,
      gcm_id: 'string123',
      platform: 'android',
      // device_type: Platform.OS,
      // device_token: 'string',
    };
    this.props.userLogin(payload);
  };

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
  onChangePassword = async (value) => {
    this.setState({password: value});
    this.setState({
      passwordError: await validate(
        value,
        passwordRegex,
        'Password must be at least 6 characters.',
      ),
    });
  };

  onSubmit = (value) => {
    if (value === 'onDone') {
      this.checkValidation();
    } else {
      this[value].focus();
    }
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
          style={[styles.textInput, CustomTextInput]}
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
    return <Text style={styles.screenHeading}>LOGIN</Text>;
  };

  renderSubmitBtn = () => {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity
          style={[
            styles.submitBtn,
            this.state.passwordError == null && this.state.emailError == null
              ? {backgroundColor: '#FF3600'}
              : {backgroundColor: '#DEDEDE'},
          ]}
          disabled={
            this.state.passwordError == null && this.state.emailError == null
              ? false
              : true
          }
          onPress={() => this.checkValidation()}>
          <Text style={styles.submitBtnText}>Login Now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Register')}
          style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>Go to Register</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderGmailBtn = () => {
    return (
      <TouchableOpacity
        style={{backgroundColor: '#4385F5', ...styles.socialBtn}}>
        <View style={{backgroundColor: '#fff', ...styles.socialBtnIconView}}>
          <Image
            source={Images.gmail_icon}
            style={{width: Metrics.ratio(30), height: Metrics.ratio(30)}}
          />
        </View>
        <Text style={styles.socialBtnText}>Sign in with Google</Text>
      </TouchableOpacity>
    );
  };

  renderFacebookBtn = () => {
    return (
      <TouchableOpacity
        style={{backgroundColor: '#3B5999', ...styles.socialBtn}}>
        <View style={{...styles.socialBtnIconView}}>
          <Image
            source={Images.facebook_icon}
            style={{width: Metrics.ratio(25), height: Metrics.ratio(25)}}
          />
        </View>
        <Text style={styles.socialBtnText}>Facebook</Text>
      </TouchableOpacity>
    );
  };

  renderConnectCard = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <View style={{marginVertical: Metrics.ratio(30), alignItems: 'center'}}>
          <Text style={styles.connectCardText}>OR CONNECT WITH</Text>
          <View
            style={{
              width: Metrics.screenWidth * 0.7,
              height: 1,
              backgroundColor: '#000',
            }}></View>
        </View>
        {this.renderGmailBtn()}
        {this.renderFacebookBtn()}
      </View>
    );
  };

  render() {
    const {btnDisabled, formErrors, email, password} = this.state;
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
            {this.renderTextInputWithLabel(
              'Password',
              'inputPassword',
              'done',
              this.onChangePassword,
              password,
              'Enter your password',
              null,
              'onDone',
              true,
              styles.CustomTextInput,
              this.state.passwordError,
            )}
            {this.renderSubmitBtn()}
            {this._renderOverlaySpinner()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({login: state.login, cart: state.cart});

const action = {userLogin};

export default connect(mapStateToProps, action)(Login);
