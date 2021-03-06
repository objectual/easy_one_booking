import {connect} from 'react-redux';
import React, {Component, useState} from 'react';
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
import {request as get_Saloon_Services_By_Category} from '../../redux/actions/GetSaloonServicesByCategory.js';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Footer} from './../../components';

class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 5,
      date: new Date(1598051730000),
      mode: 'date',
      show: false,
      selectCompanyId: this.props.getSaloon.data.data.saloon,
      getSelectedServices: [],
      selectBookNow: 0,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.getSaloonServicesByCategory) {
      if (
        !nextProps.getSaloonServicesByCategory.failure &&
        !nextProps.getSaloonServicesByCategory.isFetching &&
        nextProps.getSaloonServicesByCategory.data.data &&
        nextProps.getSaloonServicesByCategory.data.success
      ) {
        this.setState({
          getSelectedServices: nextProps.getSaloonServicesByCategory.data.data,
        });
        // console.log(
        //   nextProps.getSaloonServicesByCategory.data.data,
        //   'getSaloonServicesByCategoryDatagetSaloonServicesByCategoryDatagetSaloonServicesByCategoryDatagetSaloonServicesByCategoryData',
        // );
      } else if (
        !nextProps.getSaloonServicesByCategory.failure &&
        !nextProps.getSaloonServicesByCategory.isFetching &&
        nextProps.getSaloonServicesByCategory.data.data &&
        !nextProps.getSaloonServicesByCategory.data.success
      ) {
        // this.setState({isloading: false}, () => {
        //   setTimeout(() => {
        //     Alert.alert(
        //       'Error',
        //       nextProps.getSaloonServicesByCategory.data.msg,
        //     );
        //   }, 3000);
        // });
        this.setState({isloading: false});
      }
    }
  }
  componentDidMount = () => {
    this.handleSaloonServicesByCategory();
  };

  handleSaloonServicesByCategory = () => {
    const {id, companyId} = this.props;
    console.log(companyId, 'selectCompanyIdselectCompanyIdselectCompanyId');
    this.setState({isLoading: true});
    const payload = {
      companyId: companyId,
      categoryId: id,
    };
    this.props.get_Saloon_Services_By_Category(payload);
  };

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
    const {getSelectedServices} = this.state;
    return (
      <View>
        <FlatList
          // horizontal
          data={getSelectedServices}
          renderItem={({item, index}) => this.renderService(item, index)}
          // keyExtractor={item => item.id}
          // extraData={selected}
        />
      </View>
    );
  };
  renderNextStepButton = () => {
    return (
      <View
        style={[
          styles.containerForRow,
          {marginVertical: Metrics.ratio(10), alignItems: 'flex-end'},
        ]}>
        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>Next Step</Text>
        </TouchableOpacity>
      </View>
    );
  };
  renderService = (services, index) => {
    const {id} = this.props;
    return (
      <View style={styles.containerForRow}>
        <View style={[styles.servicebox, {flexDirection: 'row'}]}>
          <View style={{width: Metrics.screenWidth * 0.3}}>
            {
              services && services.image && services.image && (
                <Image
                  source={{uri: services.image}}
                  style={styles.servicesImage}
                />
              )
              // <Image source={image} style={styles.servicesImage} />
            }
          </View>
          <View
            style={{
              marginVertical: Metrics.ratio(15),
              width: Metrics.screenWidth * 0.45,
            }}>
            <Text numberOfLines={1} style={{fontSize: Metrics.ratio(17)}}>
              {services && services.serviceName ? services.serviceName : 'name'}
            </Text>
            {/* <Text>{services && services._id ? services._id : 'id'}</Text> */}
            <TouchableOpacity
            //  onPress={() => this.showDatepicker()}
            >
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: Metrics.ratio(5),
                }}>
                <Image
                  source={Images.calendar}
                  style={{
                    height: Metrics.ratio(17),
                    width: Metrics.ratio(17),
                    marginRight: Metrics.ratio(5),
                  }}
                />
                <Text style={{fontSize: Metrics.ratio(14)}}>
                  {'Select Date'}
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={Images.tag_grey}
                style={{
                  height: Metrics.ratio(17),
                  width: Metrics.ratio(17),
                  marginRight: Metrics.ratio(5),
                }}
              />
              <Text style={{fontSize: Metrics.ratio(14)}}>
                {services && services.price ? services.price : 'name'}
              </Text>
            </View>
          </View>
          <TouchableOpacity
          // onPress={() =>
          //   this.props.navigation.navigate('SaloonEmployee', {
          //     ID: id,
          //     servicesId: services._id,
          //   })
          // }
          >
            <View
              style={{
                justifyContent: 'center',
                width: Metrics.screenWidth * 0.1,
              }}>
              <Image source={Images.arrow} style={styles.arrowImage} />
            </View>
          </TouchableOpacity>
          {/* {this.renderBookNowButton()} */}
        </View>
      </View>
    );
  };
  dateAndTimePicker() {
    const {showDatepicker} = this.state;
    return (
      <View>
        {showDatepicker ? (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={1591103986723}
            mode="datetime"
            is24Hour={false}
            display="default"
            onChange={this.onChange}
          />
        ) : null}
      </View>
    );
  }
  render() {
    const {getSelectedServices} = this.state;
    return (
      <Footer navigation={this.props.navigation.navigate} screen={'services'}>
        <ScrollView>
          <View>
            {getSelectedServices &&
              getSelectedServices.length != 0 &&
              this.renderRow()}
            {this.dateAndTimePicker()}
            {/* {this.renderNextStepButton()} */}
          </View>
        </ScrollView>
      </Footer>
    );
  }
}

const mapStateToProps = (state) => ({
  getSaloonServicesByCategory: state.getSaloonServicesByCategory,
  getSaloon: state.getSaloon,
  login: state.login,
});

const action = {get_Saloon_Services_By_Category};

export default connect(mapStateToProps, action)(Services);
