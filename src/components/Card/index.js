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
      rightIconSize,
      rightBtnPress,
      itemQuantity,
    } = this.props;

    return (
      <View
        style={{
          paddingVertical: Metrics.ratio(15),
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
        }}>
        <View style={styles.servicebox}>
          <TouchableOpacity>
            {image ? (
              image
            ) : (
              <Image
                source={Images.saloon_card}
                style={{height: Metrics.ratio(120)}}
              />
            )}
            <View style={{paddingHorizontal: Metrics.ratio(10)}}>
              <Text numberOfLines={1} style={styles.titleText}>
                {title ? title : 'Title'}
              </Text>
              <Text numberOfLines={1} style={styles.descriptionText}>
                {description ? description : 'Descriptsion'}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: Metrics.ratio(10),
                marginVertical: Metrics.ratio(10),
              }}>
              <Rating
                totalRating={totalRating ? totalRating : '(2.2k)'}
                Default_Rating={rating ? rating : 5}
                disabled={touchControl ? touchControl : true}
              />
              {this.renderShowCategoryButton()}
            </View>
          </TouchableOpacity>
        </View>
      </View>
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
