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
import {request as customer_rating_for_company} from '../../redux/actions/CustomerRatingForCompany';
import Rating from './../../components/Rating/index';
import CustomTextInput from '../../components/CustomTextInput';
import CustomTextIarea from './../../components/CustomTextIarea/index';

import StarRating from 'react-native-star-rating';

class GiveFeedBack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 0,
      salonRating: 0,
      bookingData: null, //props.route.params.remoteMessage.data,
    };
  }

  componentDidMount() {
    this.setState({
      bookingData: this.props.route.params.remoteMessage,
    });
  }

  renderHeading = () => {
    return (
      <View style={styles.containerForRow}>
        <Text style={styles.mainheading}>Give Feedback</Text>
        <Text style={styles.mainheadingtext}>
          How has your experience with saloon onlone so far?
        </Text>
      </View>
    );
  };
  renderRatingForEmployee = () => {
    const {starCount} = this.state;

    return (
      <View style={styles.containerForRow}>
        <View style={styles.containerborder}>
          <Text style={styles.employeeheading}>For Employee</Text>
          <View style={styles.rating}>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={starCount}
              starStyle={{color: 'orange'}}
              selectedStar={(rating) =>
                this.onStarRatingPress(rating, 'starCount')
              }
            />
          </View>
        </View>
      </View>
    );
  };

  onStarRatingPress(rating, updateState) {
    this.setState({
      [updateState]: rating,
    });
  }

  submitFeedback() {
    this.setState({isLoading: true});
    const {starCount, bookingData} = this.state;

    let booking = JSON.parse(bookingData.data.body);

    console.log('sbfkshdfkhs', booking);

    const payload = {
      companyId: booking.companyId,
      bookingId: booking.userId,
      ratingToEmployeeByCustomer: [
        {
          employeeId: booking.services[0].employeeId,
          rate: starCount,
          review: '',
        },
      ],
    };

    this.props.customer_rating_for_company(payload);
  }

  renderRatingForSaloon = () => {
    const {salonRating} = this.state;

    return (
      <View style={styles.containerForRow}>
        <View style={styles.containerborder}>
          <Text style={styles.employeeheading}>For Saloon</Text>
          <View style={styles.rating}>
            <StarRating
              disabled={false}
              maxStars={5}
              starStyle={{color: 'orange'}}
              rating={salonRating}
              selectedStar={(rating) =>
                this.onStarRatingPress(rating, 'salonRating')
              }
            />
          </View>
        </View>
      </View>
    );
  };
  renderTitle = () => {
    return (
      <View>
        <Text style={[styles.mainheadingtext, styles.containerForRow]}>
          How has your experience with saloon onlone so far?
        </Text>
        <View style={styles.titleText}>
          <CustomTextInput placeholderText={'Review'} title={'Review For Employee'} />
          <CustomTextInput placeholderText={'Review'} title={'Review For Customer'} />
        </View>
      </View>
    );
  };
  renderDescription = () => {
    return (
      <View>
        <View style={styles.descriptionText}>
          <CustomTextIarea placeholderText={''} title={'Description'} />
        </View>
      </View>
    );
  };
  renderPayNowButton = () => {
    return (
      <View style={styles.containerForRow}>
        <TouchableOpacity
          style={styles.submitBtn2}
          onPress={() => this.submitFeedback()}>
          <Text style={styles.submitBtnText2}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    const {getSelectedCategory} = this.state;

    const {isFetching, failure} = this.props.getSaloonCategories;
    return (
      <View style={styles.container}>
        {/* {<SpinnerLoader isloading={isFetching} />} */}

        {isFetching == false && failure == false && (
          <ScrollView>
            <View>
              {this.renderHeading()}
              {this.renderRatingForEmployee()}
              {this.renderRatingForSaloon()}
              {this.renderTitle()}
              {/* {this.renderDescription()} */}
              {this.renderPayNowButton()}
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getSaloonCategories: state.getSaloonCategories,
  };
};

const action = {customer_rating_for_company};

export default connect(mapStateToProps, action)(GiveFeedBack);
