import {connect} from 'react-redux';
import React, {Component, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  Platform,
  TextInput,
  Linking,
  StyleSheet,
  Button,
  FlatList,
} from 'react-native';
import FloatingLabel from 'react-native-floating-labels';
import styles from './styles';
import {Images, Metrics, Fonts} from '../../theme';
import SpinnerLoader from '../../components/SpinnerLoader';
import Header from '../../components/Header/index';
import Rating from './../../components/Rating/index';
import StarRating from 'react-native-star-rating';
import {request as get_Employees_By_Saloon_And_Category} from '../../redux/actions/GetEmployeesBySaloonAndCategory.js';
import {request as create_Booking} from '../../redux/actions/CreateBooking.js';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import BookingModal from '../../components/BookingModal';



class SaloonEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 5,
      date: new Date(1598051730000),
      mode: 'date',
      loginData: this.props.login.data.data,
      show: false,
      getEmployeesList: [],
      selectBookNow: 0,
      showBookedModal: false
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.getEmployeesBySaloonAndCategory) {
      if (
        !nextProps.getEmployeesBySaloonAndCategory.failure &&
        !nextProps.getEmployeesBySaloonAndCategory.isFetching &&
        nextProps.getEmployeesBySaloonAndCategory.data.data &&
        nextProps.getEmployeesBySaloonAndCategory.data.success
      ) {
        this.setState({
          getEmployeesList: nextProps.getEmployeesBySaloonAndCategory.data.data,
        });
        console.log(
          nextProps.getEmployeesBySaloonAndCategory.data.data,
          'getEmployeesBySaloonAndCategorygetEmployeesBySaloonAndCategory',
        );
      } else if (
        !nextProps.getEmployeesBySaloonAndCategory.failure &&
        !nextProps.getEmployeesBySaloonAndCategory.isFetching &&
        nextProps.getEmployeesBySaloonAndCategory.data.data &&
        !nextProps.getEmployeesBySaloonAndCategory.data.success
      ) {
        this.setState({isloading: false}, () => {
          setTimeout(() => {
            Alert.alert(
              'Error',
              nextProps.getEmployeesBySaloonAndCategory.data.msg,
            );
          }, 3000);
        });
      }
    }
    // if (nextProps.createBooking) {
    //   console.log(
    //     nextProps.createBooking,
    //     'createBookingcreateBookingcreateBookingcreateBookingcreateBooking',
    //   );
    //   if (
    //     !nextProps.createBooking.failure &&
    //     !nextProps.createBooking.isFetching &&
    //     nextProps.createBooking.data &&
    //     nextProps.createBooking.data.success
    //   ) {
    //     // this.setState({
    //     //   getSelectedServices: nextProps.createBooking.data.data,
    //     // });
    //     console.log(
    //       nextProps.createBooking,
    //       'createBookingcreateBookingcreateBookingcreateBookingcreateBooking',
    //     );
    //   } else if (
    //     !nextProps.createBooking.failure &&
    //     !nextProps.createBooking.isFetching &&
    //     nextProps.createBooking.data &&
    //     !nextProps.createBooking.data.success
    //   ) {
    //     this.setState({isloading: false}, () => {
    //       setTimeout(() => {
    //         Alert.alert('Error', nextProps.createBooking.data.msg);
    //       }, 3000);
    //     });
    //   }
    // }
  }
  componentDidMount = () => {
    this.handleSaloonServicesByCategory();
  };

  handleSaloonServicesByCategory = () => {
    // const {ID, servicesId} = this.props;
    // console.log(servicesId, 'servicesIdservicesIdservicesId');
    // this.setState({isLoading: true});
    // const payload = {
    //   companyId: '5ee3b96663c5580017cd089b',
    //   serviceId: '5ee7417408ea9d0017d1f881',
    // };

    const {serviceId, companyId} = this.props.route.params;

    const payload = {
      companyId: companyId,
      serviceId: serviceId,
    };

    console.log(payload, 'SaloonEmployee');

    this.props.get_Employees_By_Saloon_And_Category(payload);
  };
  // handleCreateBookingLogin = () => {
  //   const {loginData} = this.state;
  //   if (loginData && loginData.access_token) {
  //     this.handleCreateBooking();
  //   } else {
  //     Alert.alert('Cannot Create Order', 'Please Login First for order');
  //   }
  // };

  // handleCreateBooking = () => {
  //   this.setState({isLoading: true});
  //   const {loginData} = this.state;
  //   const {ID, servicesId} = this.props;
  //   console.log(servicesId, 'servicesIdservicesIdservicesIdservicesId');
  //   const payload = {
  //     // employeeId: '5ee232365391f10aa8a853dc',
  //     // serviceId: '5ee21ff48384d05ab0b87a1a',
  //     // categoryId: ID,
  //     // status: '1',
  //     // bookingDate: '10-06-2020',
  //     access_token: loginData.access_token,
  //   };
  //   this.props.create_Booking(payload);
  // };

  onChange = (event, date) => {
    date = date || this.state;
    this.setState({
      // show: Platform.OS === 'ios' ? true : false,
      date,
    });
  };

  showMode = (mode) => {
    this.setState({
      show: true,
      mode,
    });
  };

  showDatepicker = () => {
    this.setState({showDatepicker: true});
  };

  // showTimepicker = () => {
  //   this.setState({showTimepicker: true});
  //   // this.showMode('time');
  // };

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }
  _renderOverlaySpinner = () => {
    const {isloading} = this.state;
    return <SpinnerLoader isloading={isloading} />;
  };
  renderRow = () => {
    const {getEmployeesList} = this.state;
    return (
      <View>
        <FlatList
          data={getEmployeesList}
          renderItem={({item, index}) => this.renderEmoployee(item, index)}
        />
      </View>
    );
  };
  renderNextStepButton = () => {
    return (
      <View>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => this.setState({setModalVisible: true})}>
          <Text style={styles.submitBtnText}>Show Date And Time</Text>
        </TouchableOpacity>
      </View>
    );
  };
  renderEmoployee = (employees, index) => {
    console.log(employees, 'employeesemployeesemployeesemployeesemployees');
    return (
    <TouchableOpacity 
      onPress={()=>this.setState({showBookedModal: true })} 
      style={styles.containerForRow}>
        <View style={[styles.servicebox, {flexDirection: 'row'}]}>
          <View style={{width: Metrics.screenWidth * 0.3}}>
            {employees && employees.image ? (
              <Image
                source={{uri: employees.image}}
                style={styles.servicesImage}
              />
            ) : (
              <Image
                source={Images.select_services}
                style={styles.servicesImage}
              />
            )}
          </View>
          <View
            style={{
              marginVertical: Metrics.ratio(15),
              width: Metrics.screenWidth * 0.35,
            }}>
            <Text numberOfLines={1} style={{fontSize: Metrics.ratio(17)}}>
              {employees && employees.createdDate && employees.createdDate
                ? employees.createdDate
                : 'created Date'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  // dateAndTimePicker() {
  //   const {showDatepicker} = this.state;
  //   return (
  //     <View>
  //       {showDatepicker ? (
  //         <DateTimePicker
  //           testID="dateTimePicker"
  //           timeZoneOffsetInMinutes={0}
  //           value={1591103986723}
  //           mode="datetime"
  //           is24Hour={false}
  //           display="default"
  //           onChange={this.onChange}
  //         />
  //       ) : null}
  //     </View>
  //   );
  // }
  // renderBookNowButton = services => {
  //   const {selectBookNow} = this.state;
  //   return (
  //     <View>
  //       <TouchableOpacity
  //         style={
  //           selectBookNow && selectBookNow._id == services.selectBookNow._id
  //             ? styles.btnSelect
  //             : styles.submitBtn1
  //         }
  //         onPress={() => this.handleCreateBookingLogin()}>
  //         <Text style={styles.submitBtnText1}>Book Now</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };

  renderPopup = () => {
    const {modalVisible, setModalVisible} = this.setState;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>

            <TouchableOpacity
              style={{...styles.openButton, backgroundColor: '#2196F3'}}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  addToCard =()=>
  {
    Alert.alert(
      "Add Service",
      "Do you want to add another services?",
      [
        {
          text: "No",
          onPress: () => {this.props.navigation.navigate('Proceeding'),this.setState({showBookedModal: false })},
          style: "cancel"
        },
        { text: "Yes", onPress: () => {this.props.navigation.navigate('Home'),this.setState({showBookedModal: false })} }
      ],
      { cancelable: false }
    );
  }

  render() {
    const {getEmployeesList, setModalVisible} = this.state;
    const {isFetching, failure} = this.props.getEmployeesBySaloonAndCategory;

    return (
      <View style={styles.container}>

        {this.state.showBookedModal &&
         <BookingModal
         addToCard={()=>this.addToCard()}
         onCancel={()=>this.setState({showBookedModal: false })}
         />        
        }

        

        <Header
          headerText={'Employee'}
          leftIcon={Images.pagination_back}
          leftBtnPress={() => this.props.navigation.goBack()}
        />
        {<SpinnerLoader isloading={isFetching} />}

        {isFetching == false && failure == false && (
          <ScrollView>
            <View>
              {getEmployeesList.length != 0 && this.renderRow()}
              {/* {setModalVisible ? this.renderPopup() : null} */}
              {/* {this.dateAndTimePicker()} */}
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  getEmployeesBySaloonAndCategory: state.getEmployeesBySaloonAndCategory,
  createBooking: state.createBooking,
  login: state.login,
});

const action = {get_Employees_By_Saloon_And_Category, create_Booking};

export default connect(mapStateToProps, action)(SaloonEmployee);
