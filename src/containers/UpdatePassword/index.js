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
import FloatingLabel from 'react-native-floating-labels';
import {
  request as passwordReset,
  success,
} from '../../redux/actions/ResetPassword';
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

class UpdatePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
      isloading: false,
      passwordError: '',
      formErrors: {
        emailError: false,
        passwordError: false,
      },
    };
  }

  _renderOverlaySpinner = () => {
    const {isFetching} = this.props.resetPassword;

    return <SpinnerLoader isloading={isFetching} />;
  };

  //   UNSAFE_componentWillReceiveProps(nextProps) {
  //     if (nextProps.login) {
  //       if (
  //         !nextProps.login.failure &&
  //         !nextProps.login.isFetching &&
  //         nextProps.login.data &&
  //         nextProps.login.data.success
  //       ) {
  //         this.setState({isloading: false}, () => {
  //           setTimeout(() => {
  //             Alert.alert(
  //               'Successfully',
  //               'Successfully Logged In',
  //               [
  //                 {
  //                   text: 'ok',
  //                   onPress: () => {
  //                     if (this.props.cart.data.length == 0) {
  //                       this.props.navigation.navigate('Home');
  //                     } else {
  //                       this.props.navigation.navigate('Proceeding');
  //                     }
  //                   },
  //                 },
  //               ],
  //               {cancelable: false},
  //             );
  //           }, 500);
  //         });
  //       } else if (
  //         !nextProps.login.failure &&
  //         !nextProps.login.isFetching &&
  //         nextProps.login.data &&
  //         !nextProps.login.data.success
  //       ) {
  //         console.log(
  //           nextProps.login.data.msg,
  //           'nextProps.login.data.data.msgnextProps.login.data.data.msg',
  //         );
  //         // this.setState({isloading: false}, () => {
  //         //   setTimeout(() => {
  //         //     Alert.alert('Error', nextProps.login.data.msg);
  //         //   }, 3000);
  //         // });
  //         this.setState({isloading: false});
  //       }
  //     }
  //   }

  componentDidMount() {
    this.getToken();
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    this.setState({fcmToken});
  }

  handleReset = () => {
    this.setState({isloading: true});
    const {confirmPassword, password, fcmToken} = this.state;
    const payload = {
      password: password,
      userId: this.props.route.params.userObj.userId,
    };

    console.log(payload, 'sflsdlklsdfsdfsdfkl');

    // this.props.passwordReset(payload);
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
    this.setState({confirmPassword: value});
    this.setState({
      passwordError: await validate(
        value,
        passwordRegex,
        'Password must be at least 6 characters.',
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
    return <Text style={styles.screenHeading}>Reset Password</Text>;
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
          onPress={() => this.handleReset()}
          style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {btnDisabled, confirmPassword, email, password} = this.state;

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
              'New Password',
              'inputEmail',
              'next',
              this.onChangePassword,
              password,
              'Enter new password.',
              'email-address',
              'inputPassword',
              true,
              styles.CustomTextInput,
              this.state.emailError,
            )}
            {this.renderTextInputWithLabel(
              'Confirm Password',
              'inputPassword',
              'done',
              this.onChangeConfirmPassword,
              confirmPassword,
              'Enter new password',
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

const mapStateToProps = (state) => ({
  resetPassword: state.resetPassword,
});

const action = {passwordReset};

export default connect(mapStateToProps, action)(UpdatePassword);
