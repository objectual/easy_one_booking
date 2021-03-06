import {connect} from 'react-redux';
import React, {Component} from 'react';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import axios from 'axios';

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

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import {social_api} from '../../config/WebServices';

// import GoogleSigninBtn from '../../components/GoogleSigninButton';
// import FacebookSigninButton from '../../components/FacebookSigninButton';
// import InstagramLoginButton from '../../components/InstagramLoginButton';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '', // mail@mail.com new_cust1@mailinator.com customertester@gmail.com
      password: '', //123456 tester
      isloading: false,
      btnDisabled: false,
      emailError: '',
      passwordError: '',
      fcmToken: null,
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
                    if (this.props.cart.data.length == 0) {
                      this.props.navigation.navigate('Home');
                    } else {
                      this.props.navigation.navigate('Proceeding');
                    }
                  },
                },
              ],
              {cancelable: false},
            );
          }, 500);
        });
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

  componentDidMount() {
    GoogleSignin.configure({
      // scopes: CONFIG.GOOGLE_SERVICE.SCOPES,
      webClientId:
        '844382195072-huf6m3ddnm5neciu5f28utac8imr1gmu.apps.googleusercontent.com',
      androidClientId:
        '844382195072-huf6m3ddnm5neciu5f28utac8imr1gmu.apps.googleusercontent.com',
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });

    this.getToken();
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    this.setState({fcmToken});
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
    const {email, password, fcmToken} = this.state;
    const payload = {
      email: email,
      password: password,
      gcm_id: fcmToken,
      platform: Platform.OS,
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
    autoCapitalize,
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
          key={placeholder || 5}
          autoCompleteType="off"
          autoCapitalize={autoCapitalize}
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

  renderFb = () => {
    LoginManager.logInWithPermissions([
      'public_profile',
      'email',
      'user_birthday',
    ]).then((result) => {
      if (result.isCancelled) {
        return Promise.reject(new Error('The user canceled'));
      }
      console.log(`sucess :${result.grantedPermissions.toString()}`);
      console.log('sucess', result);
      AccessToken.getCurrentAccessToken()
        .then((res) => {
          const {accessToken} = res;
          console.log(accessToken, 'resres');
          this.initUser(accessToken);
        })
        .catch((error) => {
          console.log(error, 'error');
        });
      //  return AccessToken.getCurrentAccessToken()})
    });
  };

  initUser = (token) => {
    fetch(
      'https://graph.facebook.com/v2.5/me?fields=email,name&access_token=' +
        token,
    )
      .then((response) => response.json())
      .then((json) => {
        // AsyncStorage.setItem('loginResponce', JSON.stringify(response))
        console.log(val, 'json');
        // Some user object has been set up somewhere, build that user here
        // this.setState({fbuserName:json.name,email:json.email})
        const payload = {
          userName: json.name,
          email: json.email,
          provider: 'facebook',
          idToken: token,
          //  password: "itsol",
          //  phoneNo: "12121",
          //  gcm_id: "eyIB1PF-ayQ2QtJytgeBN1:APA91bEmuiikVuLPXIQM9JNq7L-WJqNpC7FxO1CUpvxcrvoHOrPijQfrz3dSDEXFFxULwqW3lnyTip3QLE-teA1Z-RZmd1JpwiZyHGmQsOXOkcxRsbX4_dOgrjvyXTSf-JXyYypiRslU",
          // postalCode: "123",
          //   platform: "ios",
          role: '5',
        };
        console.log(payload, 'payload');
        this.social_login(payload);
      })
      .catch(() => {
        // reject('ERROR GETTING DATA FROM FACEBOOK')
      });
  };

  async storeLoginResponce(response) {
    try {
      await AsyncStorage.setItem('loginResponce', JSON.stringify(response));
      console.log(response, 'response');
    } catch (e) {}
  }

  social_login = (data) => {
    console.log(social_api, 'Data_in_google');
    axios({
      method: 'post',
      url: social_api,
      data: data,
    })
      .then((response) => {
        console.log(response, 'responseresponse');
        if (response.data.success) {
          // resolve(response);
        }
      })
      .catch((error) => {
        console.log(error, 'errr');
      });
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
        style={{backgroundColor: '#4385F5', ...styles.socialBtn}}
        onPress={this.signIn}>
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
        style={{backgroundColor: '#3B5999', ...styles.socialBtn}}
        onPress={this.renderFb}>
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

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      alert(userInfo.user?.name);
      console.log('userInfo: ', userInfo);
      this.setState({userInfo});
    } catch (error) {
      console.log('error: ', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
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
              'none',
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
              (secureTextEntry = true),
              styles.CustomTextInput,
              this.state.passwordError,
              'characters',
            )}

            <TouchableOpacity
              style={styles.forgetContainer}
              onPress={() => this.props.navigation.navigate('ForgetPassword')}>
              <Text style={styles.forgetTxt}>Forget Password?</Text>
            </TouchableOpacity>

            {this.renderSubmitBtn()}

            {/* <GoogleSigninButton
              style={{width: 300, height: 48}}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={this.signIn}
              disabled={this.state.isSigninInProgress}
            /> */}
            {this._renderOverlaySpinner()}
            {this.renderConnectCard()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({login: state.login, cart: state.cart});

const action = {userLogin};

export default connect(mapStateToProps, action)(Login);
