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
  FlatList,
  StyleSheet,
} from 'react-native';
import FloatingLabel from 'react-native-floating-labels';
import styles from './styles';
import {Images, Metrics, Fonts} from '../../theme';
import SpinnerLoader from '../../components/SpinnerLoader';
import Header from '../../components/Header/index';
import Rating from './../../components/Rating/index';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import {request as get_Saloon} from '../../redux/actions/GetSaloon';
import {request as Get_Categories} from '../../redux/actions/GetCategories';
import Geolocation from '@react-native-community/geolocation';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: '',
      latitude: '',
      selectCard: null,
      selectSaloon: null,
      GetSaloonData: [],
      GetSaloonCategories: [],
      dayandtime: [
        {
          day: 'Mon',
          time: '08:00-12:30 | 14:00- 17:00',
        },
        {
          day: 'Tue',
          time: '08:00-12:30 | 14:00- 17:00',
        },
        {
          day: 'Wed',
          time: '08:00-12:30 | 14:00- 17:00',
        },
        {
          day: 'Thur',
          time: '08:00-12:30 | 14:00- 17:00',
        },
        {
          day: 'Fri',
          time: '08:00-12:30 | 14:00- 17:00',
        },
        {
          day: 'Sat',
          time: 'Close',
        },
        {
          day: 'Sun',
          time: 'Close',
        },
        // {
        //   cardImage: Images.saloon_card,
        //   cardTtle: 'Lorem ipsum dolor',
        //   cardDiscription: 'Lorem ipsum dolor sit amet, ctur adipiscing elit',
        //   rating: 5,
        //   totalRatingNo: '(2.2k)',
        // },
      ],
    };
  }

  componentDidMount = () => {
    this.getLocationHandler();
    this.getCategoriesApi();
  };

  getCategoriesApi = () => {
    this.props.Get_Categories();
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.getSaloon) {
      if (
        !nextProps.getSaloon.failure &&
        !nextProps.getSaloon.isFetching &&
        nextProps.getSaloon.data.data &&
        nextProps.getSaloon.data.success
      ) {
        this.setState({GetSaloonData: nextProps.getSaloon.data.data});
        // console.log(
        //   nextProps.getSaloon.data.data,
        //   'GetSaloonDataGetSaloonDataGetSaloonDataGetSaloonData',
        // );
      } else if (
        !nextProps.getSaloon.failure &&
        !nextProps.getSaloon.isFetching &&
        nextProps.getSaloon.data.data &&
        !nextProps.getSaloon.data.success
      ) {
        this.setState({isloading: false}, () => {
          setTimeout(() => {
            Alert.alert('Error', nextProps.getSaloon.data.msg);
          }, 3000);
        });
      }
    }

    if (nextProps.getCategories) {
      if (
        !nextProps.getCategories.failure &&
        !nextProps.getCategories.isFetching &&
        nextProps.getCategories.data &&
        nextProps.getCategories.data.success
      ) {
        this.setState({GetSaloonCategories: nextProps.getCategories.data.data});
        // console.log(
        //   nextProps.getCategories.data.data,
        //   'getCategoriesgetCategoriesgetCategoriesgetCategoriesgetCategories',
        // );
      } else if (
        !nextProps.getCategories.failure &&
        !nextProps.getCategories.isFetching &&
        nextProps.getCategories.data &&
        !nextProps.getCategories.data.success
      ) {
        this.setState({isloading: false}, () => {
          setTimeout(() => {
            Alert.alert('Error', nextProps.getCategories.data.msg);
          }, 3000);
        });
      }
    }
  }
  _renderOverlaySpinner = () => {
    const {isloading} = this.state;
    return <SpinnerLoader isloading={isloading} />;
  };

  renderScreenHeadImg = () => {
    return (
      <Image source={Images.costumer_home_head_img} style={styles.HeadImg} />
    );
  };
  renderHeading = () => {
    return (
      <View style={styles.containerForRow}>
        <Text style={styles.mainheading}>About Easy1</Text>
        <Text style={{marginTop: Metrics.ratio(20)}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget
          nisi ex. Integer est enim, hendrerit at enim in, feugiat efficitur
          massa. Maecenas dictum feugiat magna, in tincidunt orci aliquet
          convallis.
        </Text>
      </View>
    );
  };

  renderShowCategoryButton = () => {
    const {selectCard} = this.state;
    // console.log( selectCard, 'selectCardselectCardselectCardselectCard')
    return (
      <View>
        <Text style={styles.mainheading2}>
          {selectCard && selectCard.saloon.name ? selectCard.saloon.name : null}
        </Text>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() =>
            this.props.navigation.navigate('Categories', {
              id: selectCard.saloon._id,
            })
          }>
          <Text style={styles.submitBtnText}>Show Category</Text>
        </TouchableOpacity>
      </View>
    );
  };
  renderShowWithRadiusButton = () => {
    return (
      <View>
        <TouchableOpacity
          style={[
            styles.submitBtn,
            {
              paddingVertical: Metrics.ratio(10),
              width: Metrics.screenWidth * 0.32,
            },
          ]}>
          <Text style={[styles.submitBtnText, {fontSize: Metrics.ratio(12)}]}>
            Show With Radius
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  renderRatedSaloon = () => {
    return (
      <View
        style={[
          styles.containerForRow,
          {flexDirection: 'row', justifyContent: 'space-between'},
        ]}>
        <Text style={styles.mainheading}>Top Rated Saloon</Text>
        {/* {this.renderShowWithRadiusButton()} */}
      </View>
    );
  };
  renderOurServices = () => {
    return (
      <View style={styles.containerForRow}>
        <Text style={styles.mainheading}>Our Services</Text>
      </View>
    );
  };

  getLocationHandler = () => {
    this.setState({isLoading: true});
    Geolocation.getCurrentPosition(
      pos => {
        this.setState(
          {
            longitude: pos.coords.longitude,
            latitude: pos.coords.latitude,
            radius: 5000,
          },
          () => this.handleGetSaloon(),
        );
        console.log('latitude: ', pos.coords.longitude);
        console.log('longitude: ', pos.coords.latitude);
      },
      error => this.setState({error: error.message}),
      {enableHighAccuracy: false, timeout: 5000, maximumAge: 10000},
    );
  };
  handleGetSaloon = () => {
    this.setState({isLoading: true});
    const {longitude, latitude, radius} = this.state;
    const payload = {
      longitude,
      latitude,
      radius,
    };
    this.props.get_Saloon(payload);
  };

  renderSaloonCard = salon => {
    const {selectCard} = this.state;
    // console.log(salon,'llllllllllllll')
    return (
      <TouchableOpacity
        style={
          selectCard && selectCard.saloon._id == salon.saloon._id
            ? styles.showcardradius
            : null
        }
        onPress={() =>
          this.setState({showdescription: true, selectCard: salon})
        }>
        <View style={styles.cardradius}>
          {salon &&
          salon.template &&
          salon.template.coverImage &&
          salon.template.coverImage.url ? (
            <Image
              source={{uri: salon.template.coverImage.url}}
              style={styles.cardImage}
            />
          ) : (
            <Image source={Images.saloon_card} style={styles.cardImage} />
          )}
          <View>
            <Text numberOfLines={1} style={styles.titleText}>
              {salon && salon.saloon && salon.saloon.name}
            </Text>
            <Rating totalRating={'(2.2k)'} Default_Rating={5} disabled={true} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  renderSaloonCategories = category => {
    const {selectSaloon} = this.state;
    return (
      <TouchableOpacity
        style={
          selectSaloon && selectSaloon._id == category._id
            ? styles.showcardradius
            : null
        }
        onPress={() =>
          this.props.navigation.navigate('Saloons', {id: category._id})
        }>
        <View style={styles.cardradius}>
          {category && category.image && category.image ? (
            <Image source={{uri: category.image}} style={styles.cardImage} />
          ) : (
            <Image source={Images.saloon_card} style={styles.cardImage} />
          )}
          <View>
            <Text numberOfLines={1} style={styles.titleText}>
              {category && category.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  renderSaloonCategoriesCard = () => {
    const {GetSaloonCategories} = this.state;
    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View
          style={[styles.containerForRow, {marginBottom: Metrics.ratio(30)}]}>
          <View style={{flexDirection: 'row'}}>
            <FlatList
              horizontal
              data={GetSaloonCategories}
              renderItem={({item, index}) =>
                this.renderSaloonCategories(item, index)
              }
              // keyExtractor={item => item.id}
              // extraData={selected}
            />
          </View>
        </View>
      </ScrollView>
    );
  };
  renderTopRatedSaloonCard = () => {
    const {GetSaloonData} = this.state;
    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View
          style={[styles.containerForRow, {marginBottom: Metrics.ratio(30)}]}>
          <View style={{flexDirection: 'row'}}>
            <FlatList
              horizontal
              data={GetSaloonData}
              renderItem={({item, index}) => this.renderSaloonCard(item, index)}
            />
          </View>
        </View>
      </ScrollView>
    );
  };
  renderDayAndTime = (day, time) => {
    return (
      <View>
        <View style={{marginVertical: Metrics.ratio(3), flexDirection: 'row'}}>
          <Text
            style={{
              fontSize: Metrics.ratio(15),
              width: Metrics.screenWidth * 0.2,
            }}>
            {day}
          </Text>
          <Text
            style={{
              fontSize: Metrics.ratio(15),
              width: Metrics.screenWidth * 0.8,
            }}>
            {time}
          </Text>
        </View>
      </View>
    );
  };
  renderDescription = () => {
    const {dayandtime, selectCard} = this.state;
    return (
      <View style={styles.containerForRow}>
        <Text style={styles.mainheading1}>Description</Text>
        {this.renderShowCategoryButton()}
        <Text style={styles.mainheading2}>Opening Hours</Text>
        {dayandtime.map((val, index) => {
          return <View>{this.renderDayAndTime(val.day, val.time, index)}</View>;
        })}
        <Text style={styles.mainheading2}>Address</Text>
        <Text style={styles.mainheading3}>
          {selectCard && selectCard.saloon.address
            ? selectCard.saloon.address
            : null}
        </Text>
      </View>
    );
  };

  render() {
    const {showdescription, GetSaloonData, GetSaloonCategories} = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderScreenHeadImg()}
          {this.renderHeading()}
          {this.renderOurServices()}
          {GetSaloonCategories.length != 0 && this.renderSaloonCategoriesCard()}
          {this.renderRatedSaloon()}
          {GetSaloonData.length != 0 && this.renderTopRatedSaloonCard()}
          {showdescription ? this.renderDescription() : null}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    getSaloon: state.getSaloon,
    getCategories: state.getCategories,
  };
};

const action = {get_Saloon, Get_Categories};

export default connect(mapStateToProps, action)(Home);
