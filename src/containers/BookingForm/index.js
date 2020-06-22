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

class BookingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
      email: '',
      name: '',
      phoneNo: '',
      postalCode: '',
      isloading: false,
      btnDisabled: false,
      formErrors: {
        emailError: false,
        nameError: false,
        phoneNoError: false,
        postalCodeError: false,
      },
=======
      getSelectedCategory: [],
      categoryId: null,
      showBookedModal: false
>>>>>>> e406690a4bcc94568b52b0a43d6a61cfca460733
    };
  }

  _renderOverlaySpinner = () => {
    const {isloading} = this.state;
    // console.log(
    //   isloading,
    //   'isloadingisloadingisloadingisloadingisloadingisloadingisloading',
    // );
    return <SpinnerLoader isloading={isloading} />;
  };

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
      this.setState({isloading: false}, () => {
        setTimeout(() => {
          Alert.alert(
            'email',
            'phoneNo Logged In',
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
    } else if (name.length < 3) {
      this.setState({isloading: false}, () => {
        setTimeout(() => {
          Alert.alert(
            'name',
            'phoneNo Logged In',
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
    } else if (postalCode.length < 11) {
      this.setState({isloading: false}, () => {
        setTimeout(() => {
          Alert.alert(
            'postalCode',
            'phoneNo Logged In',
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
    } else if (phoneNo.length < 11) {
      this.setState({isloading: false}, () => {
        setTimeout(() => {
          Alert.alert(
            'phoneNo',
            'phoneNo Logged In',
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
    } else {
      this.handleBooking();
    }
  };

  handleBooking = () => {
    // this.setState({isLoading: true});
    const {email, name, phoneNo, postalCode} = this.state;
    const payload = {
      email: email,
      name: name,
      phoneNo: phoneNo,
      postalCode: postalCode,
      gcm_id: 'string123',
      platform: 'android',
      // device_type: Platform.OS,
      // device_token: 'string',
    };
    this.props.create_Booking(payload);
  };

  onChangeEmail = value => this.setState({email: value});
  onChangename = value => this.setState({name: value});
  onChangePhoneNo = value => this.setState({phoneNo: value});
  onChangePostalCode = value => this.setState({postalCode: value});

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
  renderSubmitBtn = () => {
    return (
      <View>
        <TouchableOpacity
          style={styles.submitBtn}
<<<<<<< HEAD
          onPress={() => this.checkValidation()}>
=======
          onPress={() => this.setState({showBookedModal: true })}>
>>>>>>> e406690a4bcc94568b52b0a43d6a61cfca460733
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
        {/* <Header
          headerText={'Booking Form'}
          leftIcon={Images.pagination_back}
          leftBtnPress={() => this.props.navigation.goBack()}
        /> */}

        {this.state.showBookedModal &&
         <BookedSuccessModal
         onPress={()=>{this.props.navigation.navigate('Home'),this.setState({showBookedModal: false })}}
         onCancel={()=>this.setState({showBookedModal: false })}
         />        
        }

        {<SpinnerLoader isloading={isFetching} />}

        {isFetching == false && failure == false && (
          <ScrollView>
            {this.renderHeaderLogo()}
            <View>
              <CustomTextInput
                placeholderText={'Enter Your Name'}
                style={styles.textInput}
                value={name}
                onChangeText={this.onChangeEmail}
              />
              <CustomTextInput
                placeholderText={'Postal'}
                style={styles.textInput}
                value={postalCode}
                onChangeText={this.onChangename}
              />
              <CustomTextInput
                placeholderText={'Phone Number'}
                style={styles.textInput}
                value={phoneNo}
                onChangeText={this.onChangePhoneNo}
              />
              <CustomTextInput
                placeholderText={'Eamil'}
                style={styles.textInput}
                value={email}
                onChangeText={this.onChangePostalCode}
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
  };
};

const action = {create_Booking};

export default connect(mapStateToProps, action)(BookingForm);
