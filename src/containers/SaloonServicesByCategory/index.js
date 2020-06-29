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



class SaloonServicesByCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 5,
      show: false,
      selectCompanyId: this.props.getSaloon.data.data.saloon,
      getSelectedServices: [],
      selectBookNow: 0,
      showBookedModal: false
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
    // const {id, companyId} = this.props;
    // this.setState({isLoading: true});
    const {categoryId, companyId} = this.props.route.params;

    const payload = {
      companyId: companyId,
      categoryId: categoryId,
    };
    console.log(payload, 'SaloonServicesByCategory');
    this.props.get_Saloon_Services_By_Category(payload);
  };

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
  renderService = (services, index) => {
    const {id} = this.props;
    const {companyId, categoryId } = this.props.route.params;

    const payload = {
      companyId: companyId,
      serviceId: services._id,
      services: services,
      categoryId: categoryId
    };

    return (
        <View style={[styles.servicebox, {flexDirection: 'row'}]}>
            {services && services.image && services.image && 
              <Image
              resizeMethod = "auto"
              resizeMode = "contain"
                source={{uri: services.image}}
                style={styles.servicesImage}
              />
              // <Image source={image} style={styles.servicesImage} />
            }
            <View style = {{ flexDirection: 'row', marginHorizontal : Metrics.ratio(5)}}>
              <View
              style={styles.containertext}>
              <Text numberOfLines={1} style={{fontSize: Metrics.ratio(17)}}>
                {services && services.name ? services.name : 'name'}
              </Text>
              {/* <Text>{services && services._id ? services._id : 'id'}</Text> */}
            
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: Metrics.ratio(5),
                  }}>
                  <Image
                    source={Images.human}
                    style={styles.containertitle}
                  />
                  <Text>
                    {'Select Employee'}
                  </Text>
                </View>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={Images.tag_grey}
                  style={styles.containertitle}
                />
                <Text>
                  $ {services && services.price ? services.price : 'name'}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style = {styles.containerAeroImage}
              onPress={() =>
                this.props.navigation.navigate('SaloonEmployee', payload)
              }>
                <Image resizeMode = "contain" resizeMethod = "auto"  source={Images.arrow} style={styles.arrowImage} />
            </TouchableOpacity>
            </View>
        </View>
    );
  };
 
  render() {
    const {getSelectedServices} = this.state;
    const {isFetching, failure} = this.props.getSaloonServicesByCategory;
    return (
      <View style={styles.container}>
        <Header
          headerText={'Salon Services'}
          leftIcon={Images.pagination_back}
          leftBtnPress={() => this.props.navigation.goBack()}
        />
        <SpinnerLoader isloading={isFetching} />
        {isFetching == false && failure == false && (
          <ScrollView>
            <View>
              {getSelectedServices &&
                getSelectedServices.length != 0 &&
                this.renderRow()}
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  getSaloonServicesByCategory: state.getSaloonServicesByCategory,
  getSaloon: state.getSaloon,
  login: state.login,
});

const action = {get_Saloon_Services_By_Category};

export default connect(mapStateToProps, action)(SaloonServicesByCategory);
