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
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import FloatingLabel from 'react-native-floating-labels';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import styles from './styles';
import {Images, Metrics, Fonts, Colors} from '../../theme';
import SpinnerLoader from '../../components/SpinnerLoader';
import Header from '../../components/Header/index';
import Rating from './../../components/Rating/index';
import {Footer} from './../../components';

// import Icon from 'react-native-vector-icons/MaterialIcons';
import {request as get_Saloon} from '../../redux/actions/GetSaloon';
import {request as Get_Categories} from '../../redux/actions/GetCategories';

import {request as get_Services} from '../../redux/actions/GetServices';
import Geolocation from '@react-native-community/geolocation';
import {initializeToken, token} from '../../config/WebServices';

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
    await initializeToken();
    await this.props.get_Services();
    await this.props.get_Saloon();
    this.foregroundNotificationListner();
    // await this.getLocationHandler();
  };

  foregroundNotificationListner = () => {
    messaging().onMessage(async (remoteMessage) => {
      let notificationTitle =
        Platform.OS === 'ios'
          ? remoteMessage?.data?.notification?.title
          : remoteMessage?.notification?.title;
      let notificationMessage =
        Platform.OS === 'ios'
          ? remoteMessage?.data?.notification?.body
          : remoteMessage?.notification?.body;
      let details = {
        alertTitle:
          Platform.OS === 'ios'
            ? remoteMessage?.data?.notification?.title
            : remoteMessage?.notification?.title,
        alertBody:
          Platform.OS === 'ios'
            ? remoteMessage?.data?.notification?.body
            : remoteMessage?.notification?.body,
      };

      this.setState({
        showNotification: true,
        notificationTitle: notificationTitle,
        notificationMessage: notificationMessage,
      });

      if (Platform.OS == 'android') {
        PushNotification.localNotification({
          autoCancel: true,
          bigText: remoteMessage?.notification?.body,
          // subText: 'Local Notification Demo',
          title: remoteMessage?.notification?.title,
          message: 'Expand me to see more',
          vibrate: true,
          vibration: 300,
          playSound: true,
          soundName: 'default',
          actions: '["Open"]',
        });

        this.props.navigation.navigate('GiveFeedBack', {
          remoteMessage: remoteMessage,
        });
      } else {
        PushNotificationIOS.scheduleLocalNotification(details);
      }

      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log('nextProps:nextPropsnextProps ', nextProps);
    if (nextProps.getSaloon) {
      if (
        !nextProps.getSaloon.failure &&
        !nextProps.getSaloon.isFetching &&
        nextProps.getSaloon.data &&
        nextProps.getSaloon.data.success
      ) {
        this.setState({GetSaloonData: nextProps.getSaloon.data.saloons});
      } else if (
        !nextProps.getSaloon.failure &&
        !nextProps.getSaloon.isFetching &&
        nextProps.getSaloon.data.data &&
        !nextProps.getSaloon.data.success
      ) {
        // this.setState({ isloading: false }, () => {
        //   setTimeout(() => {
        //     Alert.alert('Error', nextProps.getSaloon.data.msg);
        //   }, 3000);
        // });
        this.setState({isloading: false});
      }
    }

    if (nextProps.getServices) {
      if (
        !nextProps.getServices.failure &&
        !nextProps.getServices.isFetching &&
        nextProps.getServices.data &&
        nextProps.getServices.data.success
      ) {
        this.setState({getServices: nextProps.getServices.data.data});
      } else if (
        !nextProps.getServices.failure &&
        !nextProps.getServices.isFetching &&
        nextProps.getServices.data &&
        !nextProps.getServices.data.success
      ) {
        this.setState({isloading: false}, () => {
          setTimeout(() => {
            Alert.alert('Error', nextProps.getServices.data.msg);
          }, 3000);
        });
      }
    }
  }
  _renderOverlaySpinner = () => {
    const {isloading} = this.state;
    return <ActivityIndicator size="large" color={Colors.violetBlue} />;
  };

  renderScreenHeadImg = () => {
    return (
      <Image source={Images.costumer_home_head_img} style={styles.HeadImg} />
    );
  };
  renderHeading = () => {
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.content}>
          We make booking experience a fun to do.
        </Text>
        <Text style={styles.content}>Let it be easy!</Text>
        {/* <Text style={{ marginTop: Metrics.ratio(20) }}>
          The beauty parlour shop is the need of every age of men women and
          children famours poet keats defined the word beauty as : " A thing of
          beauty is a joy for ever: Beauty parlour is a very important shop to
          make the people good looking by application of cosmetics treatment of
          hair and nourishment of skin by various Our Beauty Salon is located in
          Curepipe and will offer affordable priced, convenient hair styling.
          This Salon will accept walk-ins as well as appointments for the entire
          family. The salon will grow its market share based on superior
          customer attention. The Salon is a family hair salon, also known as a
          “quick hair salon” and this new salon has everything to set up a new
          path and disguise people in an unexpected way.
        </Text> */}
      </View>
    );
  };

  renderShowCategoryButton = () => {
    const {selectCard} = this.state;
    return (
      <View>
        <Text style={styles.mainheading2}>
          {selectCard && selectCard.name ? selectCard.name : null}
        </Text>
        <Text style={styles.mainheading2}>Description</Text>
        <Text style={styles.mainheading3}>
          {selectCard && selectCard.companyShortDescription
            ? selectCard.companyShortDescription
            : null}
        </Text>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={
            () =>
              this.props.navigation.navigate('Categories', {
                selectedCard: selectCard._id,
              })
            // alert(JSON.stringify(selectCard))
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
        <Text style={styles.mainheading}>Top Rated Salon</Text>
        {/* {this.renderShowWithRadiusButton()} */}
      </View>
    );
  };
  renderOurServices = () => {
    return (
      <View style={styles.containerForRow}>
        <Text style={[styles.mainheading, {marginVertical: Metrics.ratio(10)}]}>
          Our Services
        </Text>
      </View>
    );
  };

  renderSaloonCard = (salon) => {
    const {selectCard} = this.state;

    // this.props.navigation.navigate('Categories', {
    //   selectedCard: selectCard._id,
    // });

    return (
      <TouchableWithoutFeedback
        onPress={
          () =>
            this.props.navigation.navigate('Categories', {
              selectedCard: salon,
            })
          // alert(JSON.stringify(salon))
          // this.setState({showdescription: true, selectCard: salon})
        }>
        <View style={[styles.cardradius]}>
          {/* {salon &&
          salon.template &&
          salon.template.coverImage &&
          salon.template.coverImage.url ? ( */}
          <View
            style={[
              {
                // overflow: 'hidden',
                borderRadius: Metrics.ratio(10),
                // borderWidth: Metrics.ratio(2),
                // borderColor: '#FF3600',
                backgroundColor: 'white',
                elevation: 9,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.32,
                shadowRadius: 5.46,
              },
              selectCard && selectCard._id == salon._id
                ? styles.showcardradius
                : null,
            ]}>
            {salon?.templateID?.coverImage && (
              <Image
                // source={{ uri: salon.saloon.companyLogo }}
                source={{uri: salon.templateID.coverImage.url}}
                style={styles.cardImage}
              />
            )}
            <Text
              numberOfLines={1}
              style={[styles.titleText, {marginHorizontal: Metrics.ratio(3)}]}>
              {salon && salon.name && salon.name}
            </Text>
            {/* <Text
              numberOfLines={3}
              style={[
                styles.titleText,
                {
                  fontSize: Metrics.ratio(14),
                  marginHorizontal: Metrics.ratio(3),
                  marginVertical: Metrics.ratio(3),
                },
              ]}>
              {salon && salon.saloon && salon.saloon.companyShortDescription}
            </Text> */}
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginVertical: Metrics.ratio(5),
                paddingHorizontal: Metrics.ratio(5),
              }}>
              <View></View>
              <Rating
                totalRating={'(2.2k)'}
                Default_Rating={5}
                disabled={true}
                StarImage={styles.StarImage}
                totalRatingtext={styles.totalRatingtext}
              />
            </View>
          </View>

          {/* ) : (
            <Image source={Images.saloon_card} style={styles.cardImage} />
          )} */}
        </View>
      </TouchableWithoutFeedback>
    );
  };

  renderSaloonCategories = (category) => {
    const {selectSaloon} = this.state;
    return (
      <TouchableWithoutFeedback
        style={{}}
        onPress={() => {
          // this.props.navigation.navigate('GiveFeedBack');
          this.props.navigation.navigate('Saloons', {id: category._id});
        }}
        // onPress={() => this.props.navigation.navigate('BookingForm')}
      >
        <View>
          <View style={styles.categoriesCardContainer}>
            {
              category && category.image && category.image && (
                <Image
                  resizeMethod="auto"
                  resizeMode="stretch"
                  source={{uri: category.image}}
                  style={{
                    height: Metrics.ratio(50),
                    width: Metrics.ratio(40),
                  }}
                />
              )
              //( <Image source={Images.saloon_card} style={styles.cardImage} />)
            }
          </View>
          <View>
            <Text
              numberOfLines={2}
              style={[
                styles.titleText,
                {textAlign: 'center', marginVertical: Metrics.ratio(5)},
              ]}>
              {category && category.name}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  renderSaloonCategoriesCard = () => {
    const {getServices} = this.state;
    const {isFetching, failure} = this.props.getServices;

    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View
          style={[styles.containerForRow, {marginBottom: Metrics.ratio(30)}]}>
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
                renderItem={({item, index}) =>
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
    const {GetSaloonData} = this.state;
    const {isFetching, failure} = this.props.getSaloon;

    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View
          style={[styles.containerForRow, {marginBottom: Metrics.ratio(30)}]}>
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
                renderItem={({item, index}) =>
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

  renderDayAndTimeColumn = (saloonTime) => {
    console.log(saloonTime, 'saloonTimesal111oonTimesaloonTime');

    return (
      <View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeContainerTextday}>
            {saloonTime &&
            saloonTime.schedule.weekPlans &&
            saloonTime.schedule.weekPlans['0'].availableStatus == 1
              ? 'Mon'
              : 'Mon'}
          </Text>
          <Text style={styles.timeContainerTextTime}>
            {saloonTime &&
            saloonTime.schedule.weekPlans &&
            saloonTime.schedule.weekPlans['0'].checkIn ? (
              saloonTime.schedule.weekPlans['0'].checkIn
            ) : (
              <Text style={{color: 'red'}}>OFF</Text>
            )}
            {'  '}
            {saloonTime &&
            saloonTime.schedule.weekPlans &&
            saloonTime.schedule.weekPlans['0'].checkOut
              ? saloonTime.schedule.weekPlans['0'].checkOut
              : null}
          </Text>
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.timeContainerTextday}>
            {saloonTime &&
            saloonTime.schedule.weekPlans &&
            saloonTime.schedule.weekPlans['1'].availableStatus == 1
              ? 'Tue'
              : 'Tue'}
          </Text>
          <Text style={styles.timeContainerTextTime}>
            {saloonTime &&
            saloonTime.schedule.weekPlans &&
            saloonTime.schedule.weekPlans['1'].checkIn ? (
              saloonTime.schedule.weekPlans['1'].checkIn
            ) : (
              <Text style={{color: 'red'}}>OFF</Text>
            )}
            {'  '}
            {saloonTime &&
            saloonTime.schedule.weekPlans &&
            saloonTime.schedule.weekPlans['1'].checkOut
              ? saloonTime.schedule.weekPlans['1'].checkOut
              : null}
          </Text>
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.timeContainerTextday}>
            {saloonTime &&
            saloonTime.schedule.weekPlans &&
            saloonTime.schedule.weekPlans['2'].availableStatus == 1
              ? 'Wed'
              : 'Wed'}
          </Text>
          <Text style={styles.timeContainerTextTime}>
            {saloonTime &&
            saloonTime.schedule.weekPlans &&
            saloonTime.schedule.weekPlans['2'].checkIn ? (
              saloonTime.schedule.weekPlans['2'].checkIn
            ) : (
              <Text style={{color: 'red'}}>OFF</Text>
            )}
            {'  '}
            {saloonTime &&
            saloonTime.schedule.weekPlans &&
            saloonTime.schedule.weekPlans['2'].checkOut
              ? saloonTime.schedule.weekPlans['2'].checkOut
              : null}
          </Text>
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.timeContainerTextday}>
            {saloonTime &&
            saloonTime.schedule.weekPlans &&
            saloonTime.schedule.weekPlans['3'].availableStatus == 1
              ? 'Thu'
              : 'Thu'}
          </Text>
          <Text style={styles.timeContainerTextTime}>
            {saloonTime &&
            saloonTime.schedule.weekPlans &&
            saloonTime.schedule.weekPlans['3'].checkIn ? (
              saloonTime.schedule.weekPlans['3'].checkIn
            ) : (
              <Text style={{color: 'red'}}>OFF</Text>
            )}
            {'  '}
            {saloonTime &&
            saloonTime.schedule.weekPlans &&
            saloonTime.schedule.weekPlans['3'].checkOut
              ? saloonTime.schedule.weekPlans['3'].checkOut
              : null}
          </Text>
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.timeContainerTextday}>
            {saloonTime &&
            saloonTime.schedule.weekPlans &&
            saloonTime.schedule.weekPlans['4'].availableStatus == 1
              ? 'Fri'
              : 'Fri'}
          </Text>
          <Text style={styles.timeContainerTextTime}>
            {saloonTime &&
            saloonTime.schedule.weekPlans &&
            saloonTime.schedule.weekPlans['4'].checkIn ? (
              saloonTime.schedule.weekPlans['4'].checkIn
            ) : (
              <Text style={{color: 'red'}}>OFF</Text>
            )}
            {'  '}
            {saloonTime &&
            saloonTime.schedule.weekPlans &&
            saloonTime.schedule.weekPlans['4'].checkOut
              ? saloonTime.schedule.weekPlans['4'].checkOut
              : null}
          </Text>
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.timeContainerTextday}>
            {saloonTime &&
            saloonTime.schedule.weekPlans &&
            saloonTime.schedule.weekPlans['5'].availableStatus == 1
              ? 'Sat'
              : 'Sat'}
          </Text>
          <Text style={styles.timeContainerTextTime}>
            {saloonTime &&
            saloonTime.schedule.weekPlans &&
            saloonTime.schedule.weekPlans['5'].checkIn ? (
              saloonTime.schedule.weekPlans['5'].checkIn
            ) : (
              <Text style={{color: 'red'}}>OFF</Text>
            )}
            {'  '}
            {saloonTime &&
            saloonTime.schedule.weekPlans &&
            saloonTime.schedule.weekPlans['5'].checkOut
              ? saloonTime.schedule.weekPlans['5'].checkOut
              : null}
          </Text>
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.timeContainerTextday}>
            {saloonTime &&
            saloonTime.schedule.weekPlans &&
            saloonTime.schedule.weekPlans['6'].availableStatus == 1
              ? 'Sun'
              : 'Sun'}
          </Text>
          <Text style={styles.timeContainerTextTime}>
            {saloonTime &&
            saloonTime.schedule.weekPlans &&
            saloonTime.schedule.weekPlans['6'].checkIn ? (
              saloonTime.schedule.weekPlans['6'].checkIn
            ) : (
              <Text style={{color: 'red'}}>OFF</Text>
            )}{' '}
            {'  '}
            {saloonTime &&
            saloonTime.schedule.weekPlans &&
            saloonTime.schedule.weekPlans['6'].checkOut
              ? saloonTime.schedule.weekPlans['6'].checkOut
              : null}
          </Text>
        </View>
      </View>
    );
  };
  renderDayAndTime = (selectCard) => {
    return <View>{this.renderDayAndTimeColumn(selectCard)}</View>;
  };

  renderDescription = () => {
    const {dayandtime, selectCard, GetSaloonData} = this.state;

    return (
      <View style={styles.containerForRow}>
        <Text style={styles.mainheading1}>Name</Text>
        {this.renderShowCategoryButton()}
        {/* <Text style={styles.mainheading2}>Opening Hours</Text> */}
        {dayandtime &&
          dayandtime.map((val, index) => {
            return (
              <View>{this.renderDayAndTime(val.day, val.time, index)}</View>
            );
          })}
        {selectCard && selectCard.schedule && this.renderDayAndTime(selectCard)}
        <Text style={styles.mainheading2}>Address</Text>
        <Text style={styles.mainheading3}>
          {selectCard && selectCard.address ? selectCard.address : null}
        </Text>
      </View>
    );
  };

  render() {
    const {showdescription, GetSaloonData, getServices} = this.state;
    return (
      <Footer navigation={this.props.navigation.navigate} screen={'home'}>
        {/* // <View style={styles.container}>
         */}
        <ScrollView>
          {this.renderScreenHeadImg()}
          {this.renderHeading()}
          {this.renderOurServices()}
          {this.renderSaloonCategoriesCard()}
          {this.renderRatedSaloon()}
          {this.renderTopRatedSaloonCard()}
          {/* {showdescription ? this.renderDescription() : null} */}
        </ScrollView>
        {/* </View> */}
      </Footer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getSaloon: state.getSaloon,
    getServices: state.getServices,
  };
};

const action = {get_Saloon, get_Services};

export default connect(mapStateToProps, action)(Home);
