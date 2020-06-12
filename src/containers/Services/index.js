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

class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 5,
      date: new Date(1598051730000),
      mode: 'date',
      show: false,
      getSelectedServices: [],
      selectBookNow: 0,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.getSaloonServicesByCategory) {
      if (
        //   !nextProps.getSaloonServicesByCategory.failure &&
        //   !nextProps.getSaloonServicesByCategory.isFetching &&
        nextProps.getSaloonServicesByCategory.data
        // nextProps.getSaloonServicesByCategory.data.success
      ) {
        this.setState({
          getSelectedServices: nextProps.getSaloonServicesByCategory.data.data,
        });
        console.log(
          nextProps.getSaloonServicesByCategory.data.data,
          'getSaloonServicesByCategoryDatagetSaloonServicesByCategoryDatagetSaloonServicesByCategoryDatagetSaloonServicesByCategoryData',
        );
      } else if (
        !nextProps.getSaloonServicesByCategory.failure &&
        !nextProps.getSaloonServicesByCategory.isFetching &&
        nextProps.getSaloonServicesByCategory.data &&
        !nextProps.getSaloonServicesByCategory.data.success
      ) {
        this.setState({isloading: false}, () => {
          setTimeout(() => {
            Alert.alert(
              'Error',
              nextProps.getSaloonServicesByCategory.data.msg,
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
    this.setState({isLoading: true});
    const payload = {
      companyId: '5ee0ca321b1dc85bb0a98c17',
      categoryId: '5ee0cb031b1dc85bb0a98c18',
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
    return (
      <View style={styles.containerForRow}>
        <View style={[styles.servicebox, {flexDirection: 'row'}]}>
          <View style={{width: Metrics.screenWidth * 0.3}}>
            {services && services.image ? (
              <Image
                source={{uri: services.image}}
                style={styles.servicesImage}
              />
            ) : (
              <Image source={image} style={styles.servicesImage} />
            )}
          </View>
          <View
            style={{
              marginVertical: Metrics.ratio(15),
              width: Metrics.screenWidth * 0.35,
            }}>
            <Text numberOfLines={1} style={{fontSize: Metrics.ratio(17)}}>
              {services && services.serviceName ? services.serviceName : 'name'}
            </Text>
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
                  {'Select Date hh'}
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
          <View
            style={{
              justifyContent: 'center',
              width: Metrics.screenWidth * 0.2,
            }}>
            {this.renderBookNowButton()}
          </View>
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
  renderBookNowButton = () => {
    const {selectBookNow} = this.state;
    return (
      <View>
        <TouchableOpacity
          // style={[styles.submitBtn1,{backgroundColor: selectBookNow == index ? '#d1d1d1'  : '#FF3600'}]}
          style={[styles.submitBtn1,{backgroundColor:'#FF3600'}]}
          // onPress={() =>
          //   this.setState({
          //     selectBookNow: index,
          //   })
          // }
        >
          <Text style={styles.submitBtnText1}>Book Now</Text>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    const {getSelectedServices} = this.state;
    return (
      <View style={styles.container}>
        <Header
          headerText={'Services'}
          leftIcon={Images.pagination_back}
          leftBtnPress={() => this.props.navigation.goBack()}
          leftBtnPress={() => this.props.navigation.openDrawer()}
          rightBtnPress={() => this.props.navigation.navigate('Proceeding')}
          rightIcon={Images.cart_payment}
        />
        <ScrollView>
          <View>
            {getSelectedServices && getSelectedServices.length != 0 && this.renderRow()}
            {this.dateAndTimePicker()}
            {this.renderNextStepButton()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  getSaloonServicesByCategory: state.getSaloonServicesByCategory,
});

const action = {get_Saloon_Services_By_Category};

export default connect(mapStateToProps, action)(Services);
