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
  Linking,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import FloatingLabel from 'react-native-floating-labels';
import styles from './styles';
import { Images, Metrics, Fonts, Colors } from '../../theme';
import SpinnerLoader from '../../components/SpinnerLoader';
import Header from '../../components/Header/index';
import Rating from './../../components/Rating/index';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import { request as get_Saloon } from '../../redux/actions/GetSaloon';
import { request as Get_Categories, } from '../../redux/actions/GetCategories';

import { request as get_Services } from '../../redux/actions/GetServices';
import Geolocation from '@react-native-community/geolocation';
import { initializeToken, token } from '../../config/WebServices'


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: '',
      latitude: '',
      selectCard: null,
      selectSaloon: null,
      GetSaloonData: [],
      getServices: [],
    };
  }




  componentDidMount = async () => {

    await initializeToken()
    await this.props.get_Services();
    await this.props.get_Saloon();


    // await this.getLocationHandler();
  };

  // componentWillUnmount()
  // {
  //   this.didFocusListener.remove();
  // }


  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.getSaloon) {
      if (
        !nextProps.getSaloon.failure &&
        !nextProps.getSaloon.isFetching &&
        nextProps.getSaloon.data.data &&
        nextProps.getSaloon.data.success
      ) {
        this.setState({ GetSaloonData: nextProps.getSaloon.data.data });
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
        this.setState({ isloading: false }, () => {
          setTimeout(() => {
            Alert.alert('Error', nextProps.getSaloon.data.msg);
          }, 3000);
        });
      }
    }

    if (nextProps.getServices) {
      if (
        !nextProps.getServices.failure &&
        !nextProps.getServices.isFetching &&
        nextProps.getServices.data &&
        nextProps.getServices.data.success
      ) {
        this.setState({ getServices: nextProps.getServices.data.data });
        console.log(
          nextProps.getServices.data.data,
          'getCategoriesgetCategoriesgetCategoriesgetCategoriesgetCategories',
        );
      } else if (
        !nextProps.getServices.failure &&
        !nextProps.getServices.isFetching &&
        nextProps.getServices.data &&
        !nextProps.getServices.data.success
      ) {
        this.setState({ isloading: false }, () => {
          setTimeout(() => {
            Alert.alert('Error', nextProps.getServices.data.msg);
          }, 3000);
        });
      }
    }
  }
  _renderOverlaySpinner = () => {
    const { isloading } = this.state;
    return <ActivityIndicator size="large" color={Colors.violetBlue} />;
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
        <Text style={{ marginTop: Metrics.ratio(20) }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget
          nisi ex. Integer est enim, hendrerit at enim in, feugiat efficitur
          massa. Maecenas dictum feugiat magna, in tincidunt orci aliquet
          convallis.
        </Text>
      </View>
    );
  };

  renderShowCategoryButton = () => {
    const { selectCard } = this.state;
    console.log(selectCard, 'selectCardselectCardselectCardselectCard');
    return (
      <View>
        <Text style={styles.mainheading2}>
          {selectCard && selectCard.saloon.name ? selectCard.saloon.name : null}
        </Text>
        <Text style={styles.mainheading2}>
          Description
        </Text>
        <Text style={styles.mainheading3}>
          {selectCard && selectCard.saloon.companyShortDescription ? selectCard.saloon.companyShortDescription : null}
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
          <Text style={[styles.submitBtnText, { fontSize: Metrics.ratio(12) }]}>
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
          { flexDirection: 'row', justifyContent: 'space-between' },
        ]}>
        <Text style={styles.mainheading}>Top Rated Salon</Text>
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

  // getLocationHandler = () => {
  //   this.setState({ isLoading: true });
  //   Geolocation.getCurrentPosition(
  //     pos => {
  //       this.setState(
  //         {
  //           longitude: pos.coords.longitude,
  //           latitude: pos.coords.latitude,
  //           radius: 5000,
  //         },
  //         () => this.handleGetSaloon(),
  //       );
  //       console.log('latitude: ', pos.coords.longitude);
  //       console.log('longitude: ', pos.coords.latitude);
  //     },
  //     error => this.setState({ error: error.message }),
  //     { enableHighAccuracy: false, timeout: 5000, maximumAge: 10000 },
  //   );
  // };
  // handleGetSaloon = () => {
  //   this.setState({ isLoading: true });
  //   const { longitude, latitude, radius } = this.state;
  //   const payload = {
  //     longitude,
  //     latitude,
  //     radius,
  //   };
  //   this.props.get_Saloon();
  // };

  renderSaloonCard = salon => {
    const { selectCard } = this.state;
    // console.log(salon,'llllllllllllll')
    return (
      <TouchableOpacity
        style={
          selectCard && selectCard.saloon._id == salon.saloon._id
            ? styles.showcardradius
            : null
        }
        onPress={() =>
          this.setState({ showdescription: true, selectCard: salon })
        }>
        <View style={styles.cardradius}>
          {/* {salon &&
          salon.template &&
          salon.template.coverImage &&
          salon.template.coverImage.url ? ( */}
          <View style = {{ 
            overflow: 'hidden',
            borderRadius: Metrics.ratio(10),
            borderWidth: Metrics.ratio(2),
            borderColor: '#FF3600',
            shadowColor: Colors.black,
            shadowOffset: {
              width: 0,
              height: 1
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.0}}
              >
          <Image
            // source={{ uri: salon.saloon.companyLogo }}
            source={{ uri: salon.template.coverImage.url }}
            style={styles.cardImage}
          />
    </View>
          
          {/* ) : (
            <Image source={Images.saloon_card} style={styles.cardImage} />
          )} */}
          <View>
            <Text numberOfLines={1} style={styles.titleText}>
              {salon && salon.saloon && salon.saloon.name}
            </Text>
            <Rating
              totalRating={'(2.2k)'}
              Default_Rating={5}
              disabled={true}
              StarImage={styles.StarImage}
              totalRatingtext={styles.totalRatingtext}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  renderSaloonCategories = category => {
    const { selectSaloon } = this.state;
    console.log(category.image, "asasdasddadasdasdasdasdsfsdgasffwer")
    return (
      <TouchableOpacity
        style={{
         }}
        onPress={() =>
          this.props.navigation.navigate('Saloons', { id: category._id })
        }
      // onPress={() => this.props.navigation.navigate('BookingForm')}
      >
          <View style  = {styles.categoriesCardContainer}> 
          {category && category.image && category.image &&
            <Image
              resizeMethod = "auto"
              resizeMode = "stretch"
              source={{ uri: category.image }}
              style={{ 
                 height: Metrics.ratio(120),
                 width: Metrics.ratio(110),
                 }}
            />
            //( <Image source={Images.saloon_card} style={styles.cardImage} />)
          }
          </View>
          <View>
            <Text numberOfLines={1} style={styles.titleText}>
              {category && category.name}
            </Text>
          </View>
      </TouchableOpacity>
    );
  };
  renderSaloonCategoriesCard = () => {
    const { getServices } = this.state;
    const { isFetching, failure } = this.props.getServices;

    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View
          style={[styles.containerForRow, { marginBottom: Metrics.ratio(30) }]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {isFetching == false && failure == false ? (
              <FlatList
                horizontal
                data={getServices}
                renderItem={({ item, index }) =>
                  this.renderSaloonCategories(item, index)
                }
              // keyExtractor={item => item.id}
              // extraData={selected}
              />
            ) : (
                this._renderOverlaySpinner()
              )}
          </View>
        </View>
      </ScrollView>
    );
  };
  renderTopRatedSaloonCard = () => {
    const { GetSaloonData } = this.state;
    const { isFetching, failure } = this.props.getSaloon;

    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View
          style={[styles.containerForRow, { marginBottom: Metrics.ratio(30) }]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {isFetching == false && failure == false ? (
              <FlatList
                horizontal
                data={GetSaloonData}
                renderItem={({ item, index }) =>
                  this.renderSaloonCard(item, index)
                }
              />
            ) : (
                this._renderOverlaySpinner()
              )}
          </View>
        </View>
      </ScrollView>
    );
  };
  // renderDayAndTime = (day, time) => {
  //   return (
  //     <View>
  //       <View style={styles.timeContainer}>
  //         <Text
  //           style={styles.timeContainerTextday}>
  //           {day}
  //         </Text>
  //         <Text
  //           style={styles.timeContainerTextTime}>
  //           {time}
  //         </Text>
  //       </View>
  //     </View>
  //   );
  // };
  renderDayAndTimeColumn = (saloonTime) => {
    console.log(saloonTime, "saloonTimesaloonTimesaloonTime")

    if (saloonTime.schedule != undefined) {
      return (
        <View>
          <View style={styles.timeContainer}>
            <Text
              style={styles.timeContainerTextday}>
              {saloonTime && saloonTime.schedule.weekPlans && saloonTime.schedule.weekPlans['0'].availableStatus == 1
                ? 'Mon'
                : 'Mon'}
            </Text>
            <Text
              style={styles.timeContainerTextTime}>
              {saloonTime && saloonTime.schedule.weekPlans && saloonTime.schedule.weekPlans['0'].checkIn
                ? saloonTime.schedule.weekPlans['0'].checkIn
                : <Text style={{ color: 'red' }}>OFF</Text>}{'  '}
              {saloonTime && saloonTime.schedule.weekPlans && saloonTime.schedule.weekPlans['0'].checkOut
                ? saloonTime.schedule.weekPlans['0'].checkOut
                : null}
            </Text>
          </View>

          <View style={styles.timeContainer}>
            <Text
              style={styles.timeContainerTextday}>
              {saloonTime && saloonTime.schedule.weekPlans && saloonTime.schedule.weekPlans['1'].availableStatus == 1
                ? 'Tue'
                : 'Tue'}
            </Text>
            <Text
              style={styles.timeContainerTextTime}>
              {saloonTime && saloonTime.schedule.weekPlans && saloonTime.schedule.weekPlans['1'].checkIn
                ? saloonTime.schedule.weekPlans['1'].checkIn
                : <Text style={{ color: 'red' }}>OFF</Text>}{'  '}
              {saloonTime && saloonTime.schedule.weekPlans && saloonTime.schedule.weekPlans['1'].checkOut
                ? saloonTime.schedule.weekPlans['1'].checkOut
                : null}
            </Text>
          </View>

          <View style={styles.timeContainer}>
            <Text
              style={styles.timeContainerTextday}>
              {saloonTime && saloonTime.schedule.weekPlans && saloonTime.schedule.weekPlans['2'].availableStatus == 1
                ? 'Wed'
                : 'Wed'}
            </Text>
            <Text
              style={styles.timeContainerTextTime}>
              {saloonTime && saloonTime.schedule.weekPlans && saloonTime.schedule.weekPlans['2'].checkIn
                ? saloonTime.schedule.weekPlans['2'].checkIn
                : <Text style={{ color: 'red' }}>OFF</Text>}{'  '}
              {saloonTime && saloonTime.schedule.weekPlans && saloonTime.schedule.weekPlans['2'].checkOut
                ? saloonTime.schedule.weekPlans['2'].checkOut
                : null}
            </Text>
          </View>

          <View style={styles.timeContainer}>
            <Text
              style={styles.timeContainerTextday}>
              {saloonTime && saloonTime.schedule.weekPlans && saloonTime.schedule.weekPlans['3'].availableStatus == 1
                ? 'Thu'
                : 'Thu'}
            </Text>
            <Text
              style={styles.timeContainerTextTime}>
              {saloonTime && saloonTime.schedule.weekPlans && saloonTime.schedule.weekPlans['3'].checkIn
                ? saloonTime.schedule.weekPlans['3'].checkIn
                : <Text style={{ color: 'red' }}>OFF</Text>}{'  '}
              {saloonTime && saloonTime.schedule.weekPlans && saloonTime.schedule.weekPlans['3'].checkOut
                ? saloonTime.schedule.weekPlans['3'].checkOut
                : null}
            </Text>
          </View>

          <View style={styles.timeContainer}>
            <Text
              style={styles.timeContainerTextday}>
              {saloonTime && saloonTime.schedule.weekPlans && saloonTime.schedule.weekPlans['4'].availableStatus == 1
                ? 'Fri'
                : 'Fri'}
            </Text>
            <Text
              style={styles.timeContainerTextTime}>
              {saloonTime && saloonTime.schedule.weekPlans && saloonTime.schedule.weekPlans['4'].checkIn
                ? saloonTime.schedule.weekPlans['4'].checkIn
                : <Text style={{ color: 'red' }}>OFF</Text>}{'  '}
              {saloonTime && saloonTime.schedule.weekPlans && saloonTime.schedule.weekPlans['4'].checkOut
                ? saloonTime.schedule.weekPlans['4'].checkOut
                : null}
            </Text>
          </View>

          <View style={styles.timeContainer}>
            <Text
              style={styles.timeContainerTextday}>
              {saloonTime && saloonTime.schedule.weekPlans && saloonTime.schedule.weekPlans['5'].availableStatus == 1
                ? 'Sat'
                : 'Sat'}
            </Text>
            <Text
              style={styles.timeContainerTextTime}>
              {saloonTime && saloonTime.schedule.weekPlans && saloonTime.schedule.weekPlans['5'].checkIn
                ? saloonTime.schedule.weekPlans['5'].checkIn
                : <Text style={{ color: 'red' }}>OFF</Text>}{'  '}
              {saloonTime && saloonTime.schedule.weekPlans && saloonTime.schedule.weekPlans['5'].checkOut
                ? saloonTime.schedule.weekPlans['5'].checkOut
                : null}
            </Text>
          </View>

          <View style={styles.timeContainer}>
            <Text
              style={styles.timeContainerTextday}>
              {saloonTime && saloonTime.schedule.weekPlans && saloonTime.schedule.weekPlans['6'].availableStatus == 1
                ? 'Sun'
                : 'Sun'}
            </Text>
            <Text
              style={styles.timeContainerTextTime}>
              {saloonTime && saloonTime.schedule.weekPlans && saloonTime.schedule.weekPlans['6'].checkIn
                ? saloonTime.schedule.weekPlans['6'].checkIn
                : <Text style={{ color: 'red' }}>OFF</Text>} {'  '}
              {saloonTime && saloonTime.schedule.weekPlans && saloonTime.schedule.weekPlans['6'].checkOut
                ? saloonTime.schedule.weekPlans['6'].checkOut
                : null}
            </Text>
          </View>

        </View>
      );
    }
    else {
      return (
        <View>

        </View>
      )
    }
  };
  renderDayAndTime = () => {
    const { GetSaloonData } = this.state;
    console.log(GetSaloonData, "GetSaloonDataGetSaloonDataGetSaloonData")
    const { isFetching, failure } = this.props.getSaloon;
    return (
      <View>
        <FlatList
          // horizontal
          data={GetSaloonData}
          renderItem={({ item, index }) => this.renderDayAndTimeColumn(item, index)}
        />
      </View>
    );
  };

  renderDescription = () => {
    const { dayandtime, selectCard, GetSaloonData } = this.state;
    return (
      <View style={styles.containerForRow}>
        <Text style={styles.mainheading1}>Name</Text>
        {this.renderShowCategoryButton()}
        <Text style={styles.mainheading2}>Opening Hours</Text>
        {/* {dayandtime.map((val, index) => {
          return <View>{this.renderDayAndTime(val.day, val.time, index)}</View>;
        })} */}
        {GetSaloonData &&
          GetSaloonData.length != 0 &&
          this.renderDayAndTime()}
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
    const { showdescription, GetSaloonData, getServices } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderScreenHeadImg()}
          {this.renderHeading()}
          {this.renderOurServices()}
          {this.renderSaloonCategoriesCard()}
          {this.renderRatedSaloon()}
          {this.renderTopRatedSaloonCard()}
          {showdescription ? this.renderDescription() : null}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    getSaloon: state.getSaloon,
    getServices: state.getServices,
  };
};

const action = { get_Saloon, get_Services };

export default connect(mapStateToProps, action)(Home);
