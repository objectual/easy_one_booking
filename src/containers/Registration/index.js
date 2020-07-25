import {connect} from 'react-redux';
import React, {Component} from 'react';
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

import styles from './styles';
// import CustomTextInput from '../../components/CustomTextInput';
import {request as userRegister} from '../../redux/actions/Register';
import SpinnerLoader from '../../components/SpinnerLoader';
import {Images, Metrics} from '../../theme';
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
      password: '',
      confirmPassword: '',
      isLoading: false,
      nameError: '',
      postalCodeError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
      fcmToken: null,
      formErrors: {
        nameError: false,
        emailError: false,
        passwordError: false,
        confirmPasswordError: false,
      },
    };
  }
  componentDidMount() {
    this.getToken();
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    this.setState({fcmToken});
  }

  onChangeName = async (value) => {
    this.setState({name: value}),
      this.setState({
        nameError: await validate(
          value,
          nameRegex,
          'Please enter a valid name',
        ),
      });
  };

  onChangePostalCode = async (value) => {
    this.setState({postalCode: value});
    this.setState({
      postalCodeError: await validate(
        value,
        postalCodeRegex,
        'Please enter a valid postal code',
      ),
    });
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
  onChangeConfirmPassword = async (value) => {
    this.setState({confirmPassword: value}),
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
        this.setState({isloading: false}, () => {
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
        this.setState({isloading: false});
      }
    }
  }

  checkValidation = () => {
    const {name, email, password, confirmPassword, postalCode} = this.state;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (name == '' || name == ' ' || name.length < 3) {
      this.setState({
        formErrors: {
          nameError: true,
          emailError: false,
          passwordError: false,
          confirmPasswordError: false,
        },
      });
      setTimeout(() => {
        this.setState({
          formErrors: {
            nameError: false,
            emailError: false,
            passwordError: false,
            confirmPasswordError: false,
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
        },
      });
      setTimeout(() => {
        this.setState({
          formErrors: {
            nameError: false,
            emailError: false,
            passwordError: false,
            confirmPasswordError: false,
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
        },
      });
      setTimeout(() => {
        this.setState({
          formErrors: {
            nameError: false,
            emailError: false,
            passwordError: false,
            confirmPasswordError: false,
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
        },
      });
      setTimeout(() => {
        this.setState({
          formErrors: {
            nameError: false,
            emailError: false,
            passwordError: false,
            confirmPasswordError: false,
          },
        });
      }, 3000);
    } else {
      this.setState({isLoading: true});
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
    } = this.state;
    const payload = {
      userName: name,
      email: email,
      password: password,
      postalCode: postalCode,
      gcm_id: fcmToken,
      platform: Platform.OS,
      role: '5',

      // userName : name,
      // email : email,
      // password : password,
      // postalCode : postalCode,
      // role : "5",
      // gcm_id: "string123",
      // platform : "android",

      // password_confirmation: confirmPassword,
      // phone: 'string',
      // device_token: 'string',
      // device_type: Platform.OS,
    };
    console.log('payload ==>> ', payload);
    this.props.userRegister(payload);
    this.setState({
      name: '',
      postalCode: '',
      email: '',
      password: '',
      confirmPassword: '',
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
    const {isFetching} = this.props.register;
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
  ) => {
    return (
      <View>
        <Text style={styles.labelText}>{lable}</Text>
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
    return <Text style={styles.screenHeading}>REGISTER</Text>;
  };

  renderSubmitBtn = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: Metrics.ratio(30),
        }}>
        <TouchableOpacity
          onPress={() => this.checkValidation()}
          disabled={
            this.state.nameError == null &&
            this.state.passwordError == null &&
            this.state.postalCodeError == null &&
            this.state.emailError == null &&
            this.state.confirmPasswordError == null
              ? false
              : true
          }
          style={[
            styles.submitBtn,
            this.state.nameError == null &&
            this.state.passwordError == null &&
            this.state.postalCodeError == null &&
            this.state.emailError == null &&
            this.state.confirmPasswordError == null
              ? {backgroundColor: '#FF3600'}
              : {backgroundColor: '#DEDEDE'},
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

  render() {
    const {name, postalCode, email, password, confirmPassword} = this.state;
    return (
       <View style = {styles.container}> 
         <KeyboardAwareScrollView>
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
              this.state.nameError
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
              this.state.postalCodeError
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
              this.state.emailError

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
              this.state.passwordError
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
              this.state.confirmPasswordError

            )}
            {this.renderSubmitBtn()}
            {this._renderOverlaySpinner()}
        </KeyboardAwareScrollView>
       </View>
    );
  }
}

const mapStateToProps = (state) => ({register: state.register});

const actions = {userRegister};

export default connect(mapStateToProps, actions)(Register);
