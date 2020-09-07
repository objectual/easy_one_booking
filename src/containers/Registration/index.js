import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  Text,
  Image,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import FloatingLabel from 'react-native-floating-labels';
import AsyncStorage from '@react-native-community/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styles';
// import CustomTextInput from '../../components/CustomTextInput';
import { request as userRegister } from '../../redux/actions/Register';
import SpinnerLoader from '../../components/SpinnerLoader';
import { Images, Metrics } from '../../theme';
import {
  nameRegex,
  emailRegex,
  postalCodeRegex,
  passwordRegex,
  validate,
} from '../../services/validation';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      postalCode: '',
      email: '',
      phoneNum: "",
      password: '',
      confirmPassword: '',
      isLoading: false,
      nameError: '',
      postalCodeError: '',
      emailError: '',
      passwordError: '',
      phoneNoErr: "",
      confirmPasswordError: '',
      fcmToken: null,
      formErrors: {
        nameError: false,
        emailError: false,
        passwordError: false,
        confirmPasswordError: false,
        phoneNoErr: false
      },
    };
  }
  componentDidMount() {
    this.getToken();
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    this.setState({ fcmToken });
  }

  onChangeName = async (value) => {
    this.setState({ name: value }),
      this.setState({
        nameError: await validate(
          value,
          nameRegex,
          'Please enter a valid name',
        ),
      });
  };

  onChangePostalCode = async (value) => {
    this.setState({ postalCode: value });
    this.setState({
      postalCodeError: await validate(
        value,
        postalCodeRegex,
        'Please enter a valid postal code',
      ),
    });
  };

  onChangeEmail = async (value) => {
    this.setState({ email: value });
    this.setState({
      emailError: await validate(
        value,
        emailRegex,
        'Please enter a valid email',
      ),
    });
  };

  onChangePassword = async (value) => {
    this.setState({ password: value });
    this.setState({
      passwordError: await validate(
        value,
        passwordRegex,
        'Password must be at least 6 characters.',
      ),
    });
  };
  onChangeConfirmPassword = async (value) => {
    this.setState({ confirmPassword: value }),
      this.setState({
        confirmPasswordError: await validate(
          value,
          new RegExp(`${this.state.password}`),
          'Password did not matach',
        ),
      });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.register) {
      console.log(
        nextProps.register,
        'nextProps.registernextProps.registernextProps.registernextProps.registernextProps.registernextProps.register',
      );
      if (
        !nextProps.register.failure &&
        !nextProps.register.isFetching &&
        nextProps.register.data &&
        nextProps.register.data.success
      ) {
        this.setState({ isloading: false }, () => {
          setTimeout(() => {
            Alert.alert(
              'Successfully',
              'Successfully Register',
              [
                {
                  text: 'ok',
                  onPress: () => {
                    this.props.navigation.navigate('Login');
                    // console.log('ok');
                  },
                },
              ],
              // {cancelable: false},
            );
          }, 3000);
        });
      } else if (
        !nextProps.register.failure &&
        !nextProps.register.isFetching
        // nextProps.register.data.error &&
        // !nextProps.register.data.success
      ) {
        // console.log(nextProps.register.data.error, 'nextProps.register.data.error._messagenextProps.register.data.error._message')
        // this.setState({isloading: false}, () => {
        //   setTimeout(() => {
        //     Alert.alert('Error', nextProps.register.data.msg);
        //   }, 3000);
        // });
        this.setState({ isloading: false });
      }
    }
  }

  checkValidation = () => {
    const { name, email, password, confirmPassword, postalCode, phoneNum } = this.state;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (name == '' || name == ' ' || name.length < 3) {
      this.setState({
        formErrors: {
          nameError: true,
          emailError: false,
          passwordError: false,
          confirmPasswordError: false,
          phoneNoErr: false
        },
      });
      setTimeout(() => {
        this.setState({
          formErrors: {
            nameError: false,
            emailError: false,
            passwordError: false,
            confirmPasswordError: false,
            phoneNoErr: false
          },
        });
      }, 3000);
    } else if (!email.match(emailRegex)) {
      this.setState({
        formErrors: {
          nameError: false,
          emailError: true,
          passwordError: false,
          confirmPasswordError: false,
          phoneNoErr: false
        },
      });
      setTimeout(() => {
        this.setState({
          formErrors: {
            nameError: false,
            emailError: false,
            passwordError: false,
            confirmPasswordError: false,
            phoneNoErr: false
          },
        });
      }, 3000);
    } else if (phoneNum.length < 14) {
      this.setState({
        formErrors: {
          nameError: false,
          emailError: true,
          passwordError: false,
          confirmPasswordError: false,
          phoneNoErr: false
        },
      });
      setTimeout(() => {
        this.setState({
          formErrors: {
            nameError: false,
            emailError: false,
            passwordError: false,
            confirmPasswordError: false,
            phoneNoErr: false
          },
        });
      }, 3000);
    } else if (password.length < 6) {
      this.setState({
        formErrors: {
          nameError: false,
          emailError: false,
          passwordError: true,
          confirmPasswordError: false,
          phoneNoErr: false
        },
      });
      setTimeout(() => {
        this.setState({
          formErrors: {
            nameError: false,
            emailError: false,
            passwordError: false,
            confirmPasswordError: false,
            phoneNoErr: false
          },
        });
      }, 3000);
    } else if (confirmPassword !== password) {
      this.setState({
        formErrors: {
          nameError: false,
          emailError: false,
          passwordError: false,
          confirmPasswordError: true,
          phoneNoErr: false
        },
      });
      setTimeout(() => {
        this.setState({
          formErrors: {
            nameError: false,
            emailError: false,
            passwordError: false,
            confirmPasswordError: false,
            phoneNoErr: false
          },
        });
      }, 3000);
    } else {
      this.setState({ isLoading: true });
      this.handleRegister();
    }
  };

  handleRegister = () => {
    const {
      name,
      email,
      password,
      confirmPassword,
      postalCode,
      fcmToken,
      phoneNum
    } = this.state;
    const payload = {
      userName: name,
      email: email,
      password: password,
      postalCode: postalCode,
      gcm_id: fcmToken,
      platform: Platform.OS,
      role: '5',
      phoneNo: phoneNum
    };
    console.log('payload ==>> ', payload);
    this.props.userRegister(payload);
    this.setState({
      name: '',
      postalCode: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNum: ""
    });
  };

  onSubmit = (value) => {
    if (value === 'onDone') {
      this.checkValidation();
    } else {
      this[value].focus();
    }
  };

  _renderOverlaySpinner = () => {
    const { isFetching } = this.props.register;
    return <SpinnerLoader isloading={isFetching} />;
  };

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
    maxLength,
    autoCapitalize
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
          secureTextEntry={secureTextEntry}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
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
    return <Text style={styles.screenHeading}>REGISTER</Text>;
  };

  renderSubmitBtn = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: Metrics.ratio(3),
          justifyContent: 'space-between',
          marginBottom: Metrics.screenHeight * 0.15,
        }}>
        <TouchableOpacity
          onPress={() => this.checkValidation()}
          disabled={
            this.state.nameError == null &&
              this.state.passwordError == null &&
              this.state.postalCodeError == null &&
              this.state.emailError == null &&
              this.state.confirmPasswordError == null &&
              this.state.phoneNoErr == null
              ? false
              : true
          }
          style={[
            styles.submitBtn,
            this.state.nameError == null &&
              this.state.passwordError == null &&
              this.state.postalCodeError == null &&
              this.state.emailError == null &&
              this.state.confirmPasswordError == null &&
              this.state.phoneNoErr == null
              ? { backgroundColor: '#FF3600' }
              : { backgroundColor: '#DEDEDE' },
          ]}>
          <Text style={styles.submitBtnText}>Register Now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Login')}
          style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  };

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

  render() {
    const { name, postalCode, email, password, confirmPassword, phoneNum } = this.state;
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView style={{ marginHorizontal: Metrics.ratio(10) }} showsVerticalScrollIndicator={false}>
          {this.renderHeaderLogo()}
          {this.renderScreenHeading()}
          {this.renderTextInputWithLable(
            'Name',
            'inputName',
            'next',
            this.onChangeName,
            name,
            'Enter your name.',
            null,
            'inputPostalCode',
            false,
            styles.CustomTextInput,
            this.state.nameError,
            "name",
            30,
          )}
          {this.renderTextInputWithLable(
            'Postal Code',
            'inputPostalCode',
            'next',
            this.onChangePostalCode,
            postalCode,
            'Enter your postal code.',
            null,
            'inputEmail',
            false,
            styles.CustomTextInput,
            this.state.postalCodeError,
            "postalCode",
            30,
          )}
          {this.renderTextInputWithLable(
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
            "emailAddress",
            50,
            "none"
          )}
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
            14,
          )}

          {this.renderTextInputWithLable(
            'Password',
            'inputPassword',
            'next',
            this.onChangePassword,
            password,
            'Enter your password',
            null,
            'inputConfirmPassword',
            true,
            styles.CustomTextInput,
            this.state.passwordError,
            "password",
            50,
          )}
          {this.renderTextInputWithLable(
            'Confirm Password',
            'inputConfirmPassword',
            'done',
            this.onChangeConfirmPassword,
            confirmPassword,
            'Confirm your password',
            null,
            'onDone',
            true,
            styles.CustomTextInput,
            this.state.confirmPasswordError,
            "password",
            50,
          )}
          {this.renderSubmitBtn()}
          {this._renderOverlaySpinner()}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({ register: state.register });

const actions = { userRegister };

export default connect(mapStateToProps, actions)(Register);
