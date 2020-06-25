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
  FlatList,
} from 'react-native';
import FloatingLabel from 'react-native-floating-labels';
import styles from './styles';
import {Images, Metrics, Fonts} from '../../theme';
import SpinnerLoader from '../../components/SpinnerLoader';
import Header from '../../components/Header/index';
import {request as create_Booking} from '../../redux/actions/CreateBooking';
import CustomTextInput from './../../components/CustomTextInput/index';
import BookedSuccessModal from '../../components/BookedSuccessModal';
import {
  nameRegex,
  emailRegex,
  postalCodeRegex,
  phoneNumberRegex,
  validate,
} from '../../services/validation';

class BookingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      phoneNo: '',
      postalCode: '',
      isloading: false,
      btnDisabled: false,
      emailError: '',
      nameError: '',
      phoneNoError: '',
      postalCodeError: '',
      loginData: this.props.login.data.data,
      formErrors: {
        emailError: false,
        nameError: false,
        phoneNoError: false,
        postalCodeError: false,
      },
    };
  }

  // _renderOverlaySpinner = () => {
  //   const {isFetching} = this.props.createBooking;
  //   return <SpinnerLoader isloading={isFetching} />;
  // };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.createBooking) {
      console.log(
        nextProps.createBooking,
        'nextProps.createBookingnextProps.createBooking',
      );
      if (
        !nextProps.createBooking.failure &&
        !nextProps.createBooking.isFetching &&
        nextProps.createBooking.data &&
        nextProps.createBooking.data.success
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
        console.log(
          nextProps.createBooking.data,
          ' nextProps.createBooking.data nextProps.createBooking.data',
        );
        // this.props.navigation.navigate('');
      } else if (
        !nextProps.createBooking.failure &&
        !nextProps.createBooking.isFetching &&
        nextProps.createBooking.data &&
        !nextProps.createBooking.data.success
      ) {
        console.log(
          nextProps.createBooking.data.msg,
          'nextProps.createBooking.data.data.msgnextProps.createBooking.data.data.msg',
        );
        this.setState({isloading: false}, () => {
          setTimeout(() => {
            Alert.alert('Error', nextProps.createBooking.data.msg);
          }, 3000);
        });
      }
    }
  }

  checkValidation = () => {
    const {email, name, phoneNo, postalCode} = this.state;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email.match(emailRegex)) {
      this.setState({
        formErrors: {
          emailError: true,
          nameError: false,
          phoneNoError: false,
          postalCodeError: false,
        },
      });
      setTimeout(() => {
        this.setState({
          formErrors: {
            emailError: false,
            nameError: false,
            phoneNoError: false,
            postalCodeError: false,
          },
        });
      }, 500);
    } else if (name == '' || name.length < 3) {
      this.setState({
        formErrors: {
          emailError: false,
          nameError: true,
          phoneNoError: false,
          postalCodeError: false,
        },
      });
      setTimeout(() => {
        this.setState({
          formErrors: {
            emailError: false,
            nameError: false,
            phoneNoError: false,
            postalCodeError: false,
          },
        });
      }, 500);
    } else if (phoneNo == '' || phoneNo.length < 11) {
      this.setState({
        formErrors: {
          emailError: false,
          nameError: false,
          phoneNoError: true,
          postalCodeError: false,
        },
      });
      setTimeout(() => {
        this.setState({
          formErrors: {
            emailError: false,
            nameError: false,
            phoneNoError: false,
            postalCodeError: false,
          },
        });
      }, 500);
    } else if (postalCode == '' || postalCode.length < 5) {
      this.setState({
        formErrors: {
          emailError: false,
          nameError: false,
          phoneNoError: false,
          postalCodeError: true,
        },
      });
      setTimeout(() => {
        this.setState({
          formErrors: {
            emailError: false,
            nameError: false,
            phoneNoError: false,
            postalCodeError: false,
          },
        });
      }, 500);
    } else {
      this.handleBooking();
    }
  };

  handleBooking = () => {
    // this.setState({isLoading: true});
    const {email, name, phoneNo, postalCode, loginData} = this.state;
    const {serviceId, companyId} = this.props.route.params;
    const payload = {
      employeeId: '5ee232365391f10aa8a853dc',
      serviceId: '5ee21ff48384d05ab0b87a1a',
      categoryId: ID,
      status: '1',
      bookingDate: '10-06-2020',
      access_token: loginData.access_token,
      // email: email,
      // name: name,
      // phoneNo: phoneNo,
      // postalCode: postalCode,
    };
    this.props.create_Booking(payload);
  };

  onChangeEmail = async value => {
    this.setState({email: value});
    this.setState({
      emailError: await validate(
        value,
        emailRegex,
        'Please enter a valid email',
      ),
    });
  };
  onChangename = async value => {
    this.setState({name: value});
    this.setState({
      nameError: await validate(
        value,
        nameRegex,
        'Please enter a name and atleast 3 character',
      ),
    });
  };
  onChangePhoneNo = async value => {
    this.setState({phoneNo: value});
    this.setState({
      phoneNoError: await validate(
        value,
        phoneNumberRegex,
        'Please enter a valid phone number',
      ),
    });
  };
  onChangePostalCode = async value => {
    this.setState({postalCode: value});
    this.setState({
      postalCodeError: await validate(
        value,
        postalCodeRegex,
        'Please enter a postal code',
      ),
    });
  };

  onSubmit = value => {
    if (value === 'onDone') {
      this.checkValidation();
    } else {
      this[value].focus();
    }
  };

  renderHeaderLogo = () => {
    return (
      <View style={styles.logoView}>
        <Image source={Images.easy1_logo_800x300} style={styles.logoImage} />
      </View>
    );
  };
  renderHeading = () => {
    return (
      <View style={styles.containerForRow}>
        <Text style={styles.titleText}>Please enter your detail to conform the booking</Text>
      </View>
    );
  };
  renderSubmitBtn = () => {
    return (
      <View>
        <TouchableOpacity
          style={styles.submitBtn}
          disabled={
            this.state.nameError == null &&
            this.state.emailError == null &&
            this.state.postalCodeError == null &&
            this.state.phoneNoError == null
              ? false
              : true
          }
          onPress={() => this.setState({showBookedModal: true})}>
          <Text style={styles.submitBtnText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {email, name, phoneNo, postalCode} = this.state;
    const {isFetching, failure} = this.props.createBooking;
    return (
      <View style={styles.container}>
        <Header
          headerText={'Booking Form'}
          leftIcon={Images.pagination_back}
          leftBtnPress={() => this.props.navigation.goBack()}
        />

        {this.state.showBookedModal && (
          <BookedSuccessModal
            onPress={() => {
              this.props.navigation.navigate('Home'),
                this.setState({showBookedModal: false});
            }}
            onCancel={() => this.setState({showBookedModal: false})}
          />
        )}

        {<SpinnerLoader isloading={isFetching} />}

        {isFetching == false && failure == false && (
          <ScrollView>
            {this.renderHeaderLogo()}
            {this.renderHeading()}
            <View>
              <CustomTextInput
                placeholderText={'Enter Your Name'}
                style={styles.textInput}
                textInput={name}
                handleInput={this.onChangename}
                errorMessage={this.state.nameError}
              />
              <CustomTextInput
                placeholderText={'Postal Code'}
                style={styles.textInput}
                textInput={postalCode}
                handleInput={this.onChangePostalCode}
                errorMessage={this.state.postalCodeError}
              />
              <CustomTextInput
                placeholderText={'Phone Number'}
                style={styles.textInput}
                textInput={phoneNo}
                handleInput={this.onChangePhoneNo}
                errorMessage={this.state.phoneNoError}
              />
              <CustomTextInput
                placeholderText={'Eamil'}
                style={styles.textInput}
                textInput={email}
                handleInput={this.onChangeEmail}
                errorMessage={this.state.emailError}
              />
              {this.renderSubmitBtn()}
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    createBooking: state.createBooking,
    login: state.login,
  };
};

const action = {create_Booking};

export default connect(mapStateToProps, action)(BookingForm);
