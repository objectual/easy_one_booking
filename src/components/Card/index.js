import {connect} from 'react-redux';
import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, Platform} from 'react-native';
import styles from './styles';
import {Images, Metrics} from '../../theme';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import Rating from './../Rating/index';

class Cards extends Component {
  renderShowCategoryButton = () => {
    const {id} = this.props;
    return (
      <View>
        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>Preview</Text>
        </TouchableOpacity>
      </View>
    );
  };

  static propTypes = {
    //selectedTab: PropTypes.oneOf(["mycars", "addcar"]),
    title: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string,
    totalRating: PropTypes.string,
    rating: PropTypes.string,
    touchControl: PropTypes.string,
    leftBtnPress: PropTypes.func,
    rightBtnPress: PropTypes.func,
    leftIconStyle: PropTypes.object,
    headerTextStyle: PropTypes.object,
    rightIconStyle: PropTypes.object,
    rightIconSize: PropTypes.number,
    productQuantity: PropTypes.number,
    itemQuantity: PropTypes.number,
  };
  static defaultProps = {
    title: '',
    image: undefined,
    description: undefined,
    id: undefined,
    rating: undefined,
    touchControl: undefined,
    rightIconStyle: undefined,
    rightIconSize: undefined,
    rightBtnPress: undefined,
    productQuantity: undefined,
    itemQuantity: undefined,
  };

  render() {
    const {
      image,
      title,
      description,
      totalRating,
      rating,
      touchControl,
    } = this.props;


    return (
      
        // <View style={styles.servicebox}>
          <TouchableOpacity
          style={styles.servicebox}
          onPress={this.props.onPress}
          >
            {image &&
               <Image
               // source={{uri:item.saloon.companyLogo}}
               resizeMode = "cover"
               resizeMethod = "auto"
               source={{uri:image}}
               style={{height: 100, width: Metrics.screenWidth * 0.45,  borderTopLeftRadius: Metrics.ratio(15),borderTopRightRadius: Metrics.ratio(15)}}
             />
            }
              <Text numberOfLines={1} style={styles.titleText}>
                {title}
              </Text>
              <Text numberOfLines={6} style={styles.descriptionText}>
              {description}
              </Text>
            <View
              style={{
                marginVertical: Metrics.ratio(10),
              }}>
              <View style = {{alignItems: "center"}}>
                <Rating
                  totalRating={totalRating ? totalRating : '(2.2k)'}
                  StarImage={styles.StarImage}
                  totalRatingtext={styles.totalRatingtext}
                  Default_Rating={rating ? rating : 5}
                  disabled={touchControl ? touchControl : true}
                />
              </View>
            </View>
          </TouchableOpacity>
        // </View>
    );
  }
}

// const mapStateToProps = () => ({});

// const actions = {};

// export default connect(
//   mapStateToProps,
//   actions
// )(Empty);

export default Cards;
