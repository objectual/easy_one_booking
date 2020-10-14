// @flow
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
  CheckBox,
  FlatList,
  StyleSheet,
  Modal,
} from 'react-native';
import styles from './styles';
import Header from '../../components/Header/index';
import { Images, Metrics, Fonts, Colors } from '../../theme';
import { Actions } from 'react-native-router-flux';
import SubmitButton from '../../components/SubmitButton';
import { Footer } from './../../components';
import { request as get_wallet } from '../../redux/actions/GetWallet';
import SpinnerLoader from '../../components/SpinnerLoader';
import WalletCard from '../../components/WalletCard';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { get_user_Api, edit_user_profile_Api } from '../../config/WebServices'
import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';
import { times } from 'lodash';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerImage: this.props?.getCompany?.data?.data?.user?.profile_img,
      walletInfo: [],
      firstName: "",
      lastName: "",
      phoneNum: "",
      postalCode: "",
      firstNameErr: "",
      lastNameErr: "",
      phoneNumErr: "",
      postalCodeErr: "",
      userData: '',
      isloading: false,
    };
  }

  getUser = (accessToken) => {
    this.setState({ isloading: true })
    return new Promise((resolve, reject) => {
      axios
        .get(`${get_user_Api}`, {
          headers: {
            Authorization: accessToken,
          },
        })
        .then((response) => {
          if (response.data.success) {
            this.setState({
              userData: response.data.data,
              email: response.data.data.user?.email,
              firstName: response.data.data.user?.firstName,
              lastName: response.data.data.user?.lastName,
              phoneNum: response.data.data.user?.phoneNo,
              postalCode: response.data.data.user?.postalCode,
              isloading: false
            })
          }
          if (response.data.success) {
            resolve(response);
          }
        })
        .catch((error) => {
          this.setState({ isloading: false })
          console.log(error, "errorerrorerror")
          reject(error);
        });
    });
  };

  checkValidation() {
    const { firstName, lastName, postalCode, phoneNum } = this.state;

    if (!firstName) {
      this.setState({
        formErrors: {
          firstNameErr: "Enter first name"
        }
      })
      setTimeout(() => {
        this.setState({
          formErrors: {
            firstNameErr: ""
          }
        })
      }, 8000)
    } else if (!lastName) {
      this.setState({
        formErrors: {
          lastNameErr: "Enter last name"
        }
      })
      setTimeout(() => {
        this.setState({
          formErrors: {
            lastNameErr: ""
          }
        })
      }, 8000)
    } else if (!postalCode) {
      this.setState({
        formErrors: {
          postalCodeErr: "Enter postal code"
        }
      })
      setTimeout(() => {
        this.setState({
          formErrors: {
            postalCodeErr: ""
          }
        })
      }, 6000)
    } else if (phoneNum) {
      this.setState({
        formErrors: {
          phoneNumErr: "Enter phone number"
        }
      })
      setTimeout(() => {
        this.setState({
          formErrors: {
            phoneNumErr: ""
          }
        })
      }, 6000)
    }
    else {
      // this.updateUserData()
    }
  }


  updateUserData = () => {
    const { firstName, lastName, postalCode, email, phoneNum, accessToken, userData } = this.state;
    let dateofbirth = userData?.user?.dob

    const payload = {
      firstName: firstName,
      lastName: lastName,
      postalCode,
      phoneNo: phoneNum,
    }

    this.setState({ isloading: true })

    return new Promise((resolve, reject) => {
      axios
        .put(`${edit_user_profile_Api}`, payload, {
          headers: {
            Authorization: accessToken,
          },
        })
        .then((response) => {
          Alert.alert('Success', response.data.msg);
          console.log("qqqqqqqqqqqqqqqqq", response)
          if (response.data.success) {
            this.setState({ isloading: false })
            resolve(response);
          } else if (!response.data.success) {
            this.getUser(accessToken)
            reject(response);
          }
        })
        .catch((error) => {
          this.setState({ isloading: false })
          if (error.response) {
            Alert.alert('Error', error.response.data.msg);
          } else if (error.request) {
            Alert.alert('Error', 'Something Went Wrong');
          } else {
            Alert.alert('Error', error.msg);
          }
          reject(error);
        });
    });

  }

  componentDidMount = async () => {
    let accessToken = await AsyncStorage.getItem('access_token');
    this.setState({ accessToken })
    this.getUser(accessToken)
  };

  _renderOverlaySpinner = () => {
    const { isloading } = this.state; //this.props.getNotAssociateWithCompany;
    return <SpinnerLoader isloading={isloading} />;
  };

  onChangeFirstName = (value) => { this.setState({ firstName: value }) };
  onChangeLastName = (value) => { this.setState({ lastName: value }) };
  onChangeEmail = (value) => { this.setState({ email: value }) };
  onChangePostalCode = (value) => this.setState({ postalCode: value })
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

  renderSubmitBtn = () => {
    return (
      <View
        style={{ alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => this.updateUserData()}
          style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>Update</Text>
        </TouchableOpacity>
      </View>
    );
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
    autoCapitalize,
    editable
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
          editable={editable}
        />
        <View>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      </View>
    );
  };

  render() {
    const { firstName, lastName, postalCode, email, phoneNum, userData } = this.state;

    return (
      <Footer navigation={this.props.navigation.navigate} screen={''}>
        <View style={styles.container}>
          <ScrollView>
            <View style={{ margin: 15 }}>
              <Text style={styles.screenHeading}>Edit Profile</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {this.renderTextInputWithLable(
                  'First Name',
                  'inputName',
                  'next',
                  this.onChangeFirstName,
                  firstName,
                  'Enter firtst name.',
                  null,
                  'inputPostalCode',
                  false,
                  styles.CustomTextInput,
                  this.state.firstNameErr,
                  "firstName",
                  30,
                )}
                {this.renderTextInputWithLable(
                  'Last Name',
                  'inputName',
                  'next',
                  this.onChangeLastName,
                  lastName,
                  'Enter last name.',
                  null,
                  'inputPostalCode',
                  false,
                  styles.CustomTextInput,
                  this.state.lastNameErr,
                  "firstName",
                  30,
                )}
              </View>
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
                styles.CustomTextInputrow,
                this.state.postalCodeErr,
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
                styles.CustomTextInputrow,
                this.state.emailError,
                "emailAddress",
                50,
                "none",
                false
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
                styles.CustomTextInputrow,
                this.state.phoneNumErr,
                "telephoneNumber",
                14,
              )}
              {this.renderSubmitBtn()}
              {this._renderOverlaySpinner()}
            </View>
          </ScrollView>
        </View>
      </Footer>
    );
  }
}

const mapStateToProps = (state) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(Profile);
