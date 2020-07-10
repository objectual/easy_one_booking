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
import {request as get_Saloon_Categories} from '../../redux/actions/SaloonCategories';
import Rating from './../../components/Rating/index';
import CustomTextInput from '../../components/CustomTextInput';
import CustomTextIarea from './../../components/CustomTextIarea/index';

class GiveFeedBack extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    return (
      <View style={styles.containerForRow}>
        <View style={styles.containerborder}>
          <Text style={styles.employeeheading}>For Employee</Text>
          <View style={styles.rating}>
            <Rating
              Default_Rating={2}
              disabled={false}
              StarImage={styles.StarImage}
            />
          </View>
        </View>
      </View>
    );
  };

  renderRatingForSaloon = () => {
    return (
      <View style={styles.containerForRow}>
        <View style={styles.containerborder}>
          <Text style={styles.employeeheading}>For Saloon</Text>
          <View style={styles.rating}>
            <Rating
              Default_Rating={2}
              disabled={false}
              StarImage={styles.StarImage}
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
        <TouchableOpacity style={styles.submitBtn2}>
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

const action = {get_Saloon_Categories};

export default connect(mapStateToProps, action)(GiveFeedBack);
