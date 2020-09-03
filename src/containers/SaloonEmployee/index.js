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
import _ from "lodash";
import styles from './styles';
import { Images, Metrics, Fonts } from '../../theme';
import SpinnerLoader from '../../components/SpinnerLoader';
import { Footer } from '../../components';

import { request as get_Employees_By_Saloon_And_Category } from '../../redux/actions/GetEmployeesBySaloonAndCategory.js';
import { request as create_Booking } from '../../redux/actions/CreateBooking.js';

import BookingModal from '../../components/BookingModal';
import {
  add as addToCard,
  remove as removeFromCard,
} from '../../redux/actions/Cart';

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
  }
  componentDidMount = () => {
    this.handleSaloonServicesByCategory();
  };

  handleSaloonServicesByCategory = () => {

    const { serviceId, companyId } = this.props.route.params;

    const payload = {
      companyId: companyId,
      serviceId: serviceId,
    };

    this.props.get_Employees_By_Saloon_And_Category(payload);
  };

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
        onPress={() =>
          this.setState({ showBookedModal: true, selectedEmployee: employees })
        }
        style={styles.containerForRow}>
        <View style={[styles.servicebox, { flexDirection: 'row' }]}>
          {
            employees &&
            employees.employeeId &&
            employees.employeeId.userId &&
            employees.employeeId.userId.profile_img && (
              <Image
                source={{ uri: employees.employeeId.userId.profile_img }}
                style={styles.servicesImage}
              />
            )

          }
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text numberOfLines={1} style={{ fontSize: Metrics.ratio(17) }}>
              {employees &&
                employees.employeeId &&
                employees.employeeId.userId &&
                employees.employeeId.userId.firstName
                ? employees.employeeId.userId.firstName
                : 'Name'}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: Metrics.ratio(10),
              }}>
              <Text numberOfLines={1} style={styles.text14}>
                {employees &&
                  employees.weekPlans &&
                  employees.weekPlans['0']?.availableStatus == 1
                  ? 'Sun'
                  : null}
              </Text>
              <Text numberOfLines={1} style={styles.text14}>
                {employees &&
                  employees.weekPlans &&
                  employees.weekPlans['1']?.availableStatus == 1
                  ? '-Mon'
                  : null}
              </Text>
              <Text numberOfLines={1} style={styles.text14}>
                {employees &&
                  employees.weekPlans &&
                  employees.weekPlans['2']?.availableStatus == 1
                  ? '-Tue'
                  : null}
              </Text>
              <Text numberOfLines={1} style={styles.text14}>
                {employees &&
                  employees.weekPlans &&
                  employees.weekPlans['3']?.availableStatus == 1
                  ? '-Wed'
                  : null}
              </Text>
              <Text numberOfLines={1} style={styles.text14}>
                {employees &&
                  employees.weekPlans &&
                  employees.weekPlans['4']?.availableStatus == 1
                  ? '-Thu'
                  : null}
              </Text>
              <Text numberOfLines={1} style={styles.text14}>
                {employees &&
                  employees.weekPlans &&
                  employees.weekPlans['5']?.availableStatus == 1
                  ? '-Fri'
                  : null}
              </Text>
              <Text numberOfLines={1} style={styles.text14}>
                {employees &&
                  employees.weekPlans &&
                  employees.weekPlans['6']?.availableStatus == 1
                  ? 'Sat'
                  : null}
              </Text>
            </View>
            {/* {this.renderTimeSlots(employees)} */}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderTimeSlots = (employees) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: Metrics.ratio(10),
        }}>
        <Text numberOfLines={1} style={styles.text14}>
          {employees &&
            employees.employeeId &&
            employees.employeeId.weekPlans &&
            employees.employeeId.weekPlans['0'].availableStatus == 1
            ? 'Mon'
            : null}
        </Text>
        <Text numberOfLines={1} style={styles.text14}>
          {employees &&
            employees.employeeId &&
            employees.employeeId.weekPlans &&
            employees.employeeId.weekPlans['1'].availableStatus == 1
            ? '-Tue'
            : null}
        </Text>
        <Text numberOfLines={1} style={styles.text14}>
          {employees &&
            employees.employeeId &&
            employees.employeeId.weekPlans &&
            employees.employeeId.weekPlans['2'].availableStatus == 1
            ? '-Wed'
            : null}
        </Text>
        <Text numberOfLines={1} style={styles.text14}>
          {employees &&
            employees.employeeId &&
            employees.employeeId.weekPlans &&
            employees.employeeId.weekPlans['3'].availableStatus == 1
            ? '-Thu'
            : null}
        </Text>
        <Text numberOfLines={1} style={styles.text14}>
          {employees &&
            employees.employeeId &&
            employees.employeeId.weekPlans &&
            employees.employeeId.weekPlans['4'].availableStatus == 1
            ? '-Fri'
            : null}
        </Text>
        <Text numberOfLines={1} style={styles.text14}>
          {employees &&
            employees.employeeId &&
            employees.employeeId.weekPlans &&
            employees.employeeId.weekPlans['5'].availableStatus == 1
            ? '-Sat'
            : null}
        </Text>
        <Text numberOfLines={1} style={styles.text14}>
          {employees &&
            employees.employeeId &&
            employees.employeeId.weekPlans &&
            employees.employeeId.weekPlans['6'].availableStatus == 1
            ? 'Sun'
            : null}
        </Text>
      </View>
    );
  };

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
    let companyEmpService = _.find(e.employee.companyServices, 'price', services._id);
    let serviceObj = { ...services }
    serviceObj.price = companyEmpService.price

    let payload = { ...e, ...{ companyId }, ...{ serviceObj } };
    console.log(payload, 'pppppppppppppp/pppppp')
    console.log("addToCard -> services", services._id)
    console.log("addToCard -> companyId", companyId)
    if ((await this.vaidateService(payload)) == false) {
      await this.props.navigation.navigate('Proceeding', {
        companyId: companyId,
        serviceId: serviceId,
      }),
        this.setState({ showBookedModal: false });

    } else {
      await this.props.addToCard({ payload });
      this.props.navigation.navigate('Proceeding', {
        companyId: companyId,
        serviceId: serviceId,
      }),
        this.setState({ showBookedModal: false });
    }
    setTimeout(() => {

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
    }, 1000)
  };

  vaidateService = async (object) => {
    const { cart } = this.props;

    if (cart.data.length == 0) {
      return await true;
    }

    for (let i = 0; i < cart.data.length; i++) {
      // console.log(JSON.stringify(cart.data[i].payload),'current object ')
      // console.log(JSON.stringify(object),'added object')

      if (
        (await JSON.stringify(cart.data[i].payload)) ===
        (await JSON.stringify(object))
      ) {
        return await false;
      }
    }

    return await true;
  };

  render() {
    const { getEmployeesList, setModalVisible } = this.state;
    const { isFetching, failure } = this.props.getEmployeesBySaloonAndCategory;

    return (
      <Footer navigation={this.props.navigation.navigate} screen={'saloon'}>
        <View style={styles.container}>
          {this.state.showBookedModal && (
            <BookingModal
              data={this.state.selectedEmployee}
              addToCard={(e) => this.addToCard(e)}
              onCancel={() => this.setState({ showBookedModal: false })}
            />
          )}

          {<SpinnerLoader isloading={isFetching} />}

          {isFetching == false && failure == false && (
            <ScrollView>
              <View>
                {getEmployeesList.length != 0 && this.renderRow()}
                {/* {setModalVisible ? this.renderPopup() : null} */}
                {/* {this.dateAndTimePicker()} */}
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  height: Metrics.ratio(500),
                  alignItems: 'center',
                }}>
                {getEmployeesList.length == 0 && (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: 22,
                      }}>
                      Employee Not Found
                    </Text>
                  </View>
                )}
              </View>
            </ScrollView>
          )}
        </View>
      </Footer>
    );
  }
}

const mapStateToProps = (state) => ({
  getEmployeesBySaloonAndCategory: state.getEmployeesBySaloonAndCategory,
  createBooking: state.createBooking,
  login: state.login,
  cart: state.cart,
});

const action = {
  get_Employees_By_Saloon_And_Category,
  create_Booking,
  addToCard,
  removeFromCard,
};

export default connect(mapStateToProps, action)(SaloonEmployee);
