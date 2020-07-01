import { connect } from 'react-redux';
import React, { Component, useState } from 'react';
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
import { Images, Metrics, Fonts } from '../../theme';
import SpinnerLoader from '../../components/SpinnerLoader';
import Header from '../../components/Header/index';
import Rating from './../../components/Rating/index';
import StarRating from 'react-native-star-rating';
import { request as get_Employees_By_Saloon_And_Category } from '../../redux/actions/GetEmployeesBySaloonAndCategory.js';
import { request as create_Booking } from '../../redux/actions/CreateBooking.js';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import BookingModal from '../../components/BookingModal';
import { add as addToCard, remove as removeFromCard } from '../../redux/actions/Cart';


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
      showBookedModal: false,
      selectedEmployee: {},
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
        this.setState({ isloading: false }, () => {
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

    const { serviceId, companyId } = this.props.route.params;

    const payload = {
      companyId: companyId,
      serviceId: serviceId,
    };

    console.log(payload, 'Saloo11111111111111111111111111111111nEmployee');

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



  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }
  _renderOverlaySpinner = () => {
    const { isloading } = this.state;
    return <SpinnerLoader isloading={isloading} />;
  };
  renderRow = () => {
    const { getEmployeesList } = this.state;
    return (
      <View>
        <FlatList
          data={getEmployeesList}
          renderItem={({ item, index }) => this.renderEmoployee(item, index)}
        />
      </View>
    );
  };
  renderEmoployee = (employees, index) => {
    return (
      <TouchableOpacity
        onPress={() => this.setState({ showBookedModal: true, selectedEmployee: employees })}
        style={styles.containerForRow}>
        <View style={[styles.servicebox, { flexDirection: 'row' }]}>
            {employees &&  employees.employeeId && employees.employeeId.userId && employees.employeeId.userId.profile_img &&
              <Image
                source={{uri : employees.employeeId.userId.profile_img}}
                style={styles.servicesImage}
              />
              // <Image
              //   source={Images.select_services}
              //   style={styles.servicesImage}
              // />
            }
          <View
            style={{
              marginVertical: Metrics.ratio(15),
              marginHorizontal: Metrics.ratio(5),
              flexWrap: "wrap",
              justifyContent: "center",
            }}>
            <Text numberOfLines={1} style={{ fontSize: Metrics.ratio(17) }}>
              {employees &&  employees.employeeId && employees.employeeId.userId && employees.employeeId.userId.firstName
                ? employees.employeeId.userId.firstName
                : 'Name'}
            </Text>
            <View style={{
              flexDirection: 'row',
              marginTop: Metrics.ratio(10),
            }}>
              <Text numberOfLines={1} style={styles.text14}>
                {employees &&  employees.employeeId && employees.employeeId.weekPlans && employees.employeeId.weekPlans['0'].availableStatus == 1
                  ? 'Mon'
                  : null}
              </Text>
              <Text numberOfLines={1} style={styles.text14}>
                {employees &&  employees.employeeId && employees.employeeId.weekPlans && employees.employeeId.weekPlans['1'].availableStatus == 1
                  ? '-Tue'
                  : null}
              </Text>
              <Text numberOfLines={1} style={styles.text14}>
                {employees &&  employees.employeeId && employees.employeeId.weekPlans && employees.employeeId.weekPlans['2'].availableStatus == 1
                  ? '-Wed'
                  : null}
              </Text>
              <Text numberOfLines={1} style={styles.text14}>
                {employees &&  employees.employeeId && employees.employeeId.weekPlans && employees.employeeId.weekPlans['3'].availableStatus == 1
                  ? '-Thu'
                  : null}
              </Text>
              <Text numberOfLines={1} style={styles.text14}>
                {employees &&  employees.employeeId && employees.employeeId.weekPlans && employees.employeeId.weekPlans['4'].availableStatus == 1
                  ? '-Fri'
                  : null}
              </Text>
              <Text numberOfLines={1} style={styles.text14}>
                {employees &&  employees.employeeId && employees.employeeId.weekPlans && employees.employeeId.weekPlans['5'].availableStatus == 1
                  ? '-Sat'
                  : null}
              </Text>
              <Text numberOfLines={1} style={styles.text14}>
                {employees &&  employees.employeeId && employees.employeeId.weekPlans && employees.employeeId.weekPlans['6'].availableStatus == 1
                  ? 'Sun'
                  : null}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
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
    const { modalVisible, setModalVisible } = this.setState;
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
              style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
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




  addToCard = async (e) => {
    let { serviceId, companyId, services, categoryId } = this.props.route.params;
    console.log(services, 'services')
    console.log(categoryId, 'categoryId')
    console.log(serviceId, 'serviceId')
  


    let payload = { ...e,...{companyId},...{services} }


    console.log(JSON.stringify(payload), 'proceedingpayload')


    if (await this.vaidateService(payload) == false) {


      await this.props.navigation.navigate('Proceeding', {
        companyId: companyId,
        serviceId: serviceId,
      }),
        this.setState({ showBookedModal: false });

      //  Alert.alert(
      //   'Oops',
      //   'This is service is already added',
      //   [
      //     {
      //       text: 'Ok',
      //       onPress: async() => {
      //          await this.props.navigation.navigate('Proceeding',{
      //           companyId: companyId,
      //           serviceId: serviceId,
      //         }),
      //           this.setState({showBookedModal: false});
      //       },
      //     },
      //   ],
      //   {cancelable: false},
      // );

    }
    else {
      await this.props.addToCard({ payload })
      this.props.navigation.navigate('Proceeding', {
        companyId: companyId,
        serviceId: serviceId,
      }),
        this.setState({ showBookedModal: false });

    }



    Alert.alert(
      'Add Service',
      'Do you want to add another services?',
      [
        {
          text: 'No',
          onPress: () => {
            this.props.navigation.navigate('Proceeding', {
              companyId: companyId,
              serviceId: serviceId,
            }),
              this.setState({ showBookedModal: false });
          },
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            this.props.navigation.navigate('Home'),
              this.setState({ showBookedModal: false });
          },
        },
      ],
      { cancelable: false },
    );
  };


  vaidateService = async (object) => {
    const { cart } = this.props


    if (cart.data.length == 0) {
      return await true;
    }

    for (let i = 0; i < cart.data.length; i++) {

      // console.log(JSON.stringify(cart.data[i].payload),'current object ')
      // console.log(JSON.stringify(object),'added object')


      if (await JSON.stringify(cart.data[i].payload) === await JSON.stringify(object)) {
        return await false;
      }
    }


    return await true;

  }


  render() {
    const { getEmployeesList, setModalVisible } = this.state;
    const { isFetching, failure } = this.props.getEmployeesBySaloonAndCategory;
    console.log(this.state.selectedEmployee, 'this.state.selectedEmployee')
    return (
      <View style={styles.container}>
        {this.state.showBookedModal && (
          <BookingModal
            data={this.state.selectedEmployee}
            addToCard={(e) => this.addToCard(e)}
            onCancel={() => this.setState({ showBookedModal: false })}
          />
        )}

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

const mapStateToProps = state => ({
  getEmployeesBySaloonAndCategory: state.getEmployeesBySaloonAndCategory,
  createBooking: state.createBooking,
  login: state.login,
  cart: state.cart
});

const action = { get_Employees_By_Saloon_And_Category, create_Booking, addToCard, removeFromCard };

export default connect(mapStateToProps, action)(SaloonEmployee);
