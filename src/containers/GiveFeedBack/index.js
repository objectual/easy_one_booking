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
  StyleSheet,
  FlatList,
} from 'react-native';
import FloatingLabel from 'react-native-floating-labels';
import styles from './styles';
import { Images, Metrics, Fonts } from '../../theme';
import SpinnerLoader from '../../components/SpinnerLoader';
import Header from '../../components/Header/index';
import { request as customer_rating_for_company } from '../../redux/actions/CustomerRatingForCompany';
import Rating from './../../components/Rating/index';
import CustomTextInput from '../../components/CustomTextInput';
import CustomTextIarea from './../../components/CustomTextIarea/index';

import StarRating from 'react-native-star-rating';

class GiveFeedBack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 3.5,
      bookingData: ""//props.route.params.remoteMessage.data,
    };
  }

  // componentDidMount() {
  //   console.log(
  //     'paramsfndksdfhksdfksfjhksdsdfsdfkskdjf',
  //     this.props.route.params.remoteMessage.data,
  //   );
  // }

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
    return (
      <View style={styles.containerForRow}>
        <View style={styles.containerborder}>
          <Text style={styles.employeeheading}>For Employee</Text>
          <View style={styles.rating}>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={this.state.starCount}
              starStyle={{ color: 'orange' }}
              selectedStar={(rating) => this.onStarRatingPress(rating)}
            />
          </View>
        </View>
      </View>
    );
  };

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  submitFeedback() {
    this.setState({ isLoading: true });
    const { starCount, bookingData } = this.state;

    let booking = JSON.parse(bookingData.body);
    //
    // "userId": "",
    //   "bookingId": "",
    //     "ratingToCustomerByCompany": 2.6
    //
    // {"body": "{\"services\":
    // [{\"serviceId\":\"5f317eb7394d400017dc824f\",
    // \"employeeId\":\"5f2030f787487600175f8342\",
    // \"categoryId\":\"5f060678b6e7dd0017cd0c77\",
    // \"date\":\"08-25-20\",
    // \"time\":\"12:10:00\"}],
    // \"postalCode\":\"02221\",
    // \"email\":\"Testing99@gmail.com\",
    // \"companyId\":\"5f3147b4cc26e1001741f43a\",
    // \"phoneNo\":\"090078601\",
    // \"status\":\"1\",\"totalAmount\":20,
    // \"paymentMethod\":\"Cash\",
    // \"userId\":\"5f1881ddccc8061b7c0f9a28\"}"}

    const payload = {
      companyId: booking.companyId,
      bookingId: booking.userId.bookingId,
      ratingToCompanyByCustomer: starCount,
    };

    alert(JSON.stringify(payload));

    // this.props.customer_rating_for_company(payload);
  }

  renderRatingForSaloon = () => {
    return (
      <View style={styles.containerForRow}>
        <View style={styles.containerborder}>
          <Text style={styles.employeeheading}>For Saloon</Text>
          <View style={styles.rating}>
            <StarRating
              disabled={false}
              maxStars={5}
              starStyle={{ color: 'orange' }}
              rating={this.state.starCount}
              selectedStar={(rating) => this.onStarRatingPress(rating)}
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
          <CustomTextInput placeholderText={'Title'} title={'Title'} />
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
    const { getSelectedCategory } = this.state;

    const { isFetching, failure } = this.props.getSaloonCategories;
    return (
      <View style={styles.container}>
        {<SpinnerLoader isloading={isFetching} />}

        {isFetching == false && failure == false && (
          <ScrollView>
            <View>
              {this.renderHeading()}
              {this.renderRatingForEmployee()}
              {this.renderRatingForSaloon()}
              {this.renderTitle()}
              {this.renderDescription()}
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

const action = { customer_rating_for_company };

export default connect(mapStateToProps, action)(GiveFeedBack);
