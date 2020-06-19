import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Images, Metrics} from './../../theme';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import styles from './styles';

export default class Rating extends Component {
  static propTypes = {
    Default_Rating: PropTypes.number,
    totalRating: PropTypes.string,
    touchableControl: PropTypes.string,
    StarImage: PropTypes.string,
    totalRatingtext: PropTypes.string,

    // Max_Rating: PropTypes.number,
  };
  constructor(props) {
    super(props);
    this.state = {
      // Default_Rating: 2,
      Max_Rating: 5,
    };

    this.Star =
      'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
    this.Star_With_Border =
      'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
  }
  UpdateRating(key) {
    this.setState({Default_Rating: key});
    //Keeping the Rating Selected in state
  }
  render() {
    const {
      totalRating,
      Default_Rating,
      touchableControl,
      StarImage,
      totalRatingtext,
    } = this.props;

    let React_Native_Rating_Bar = [];
    //Array to hold the filled or empty Stars
    for (var i = 1; i <= this.state.Max_Rating; i++) {
      React_Native_Rating_Bar.push(
        <TouchableOpacity
          disabled={touchableControl}
          activeOpacity={0.7}
          key={i}
          onPress={this.UpdateRating.bind(this, i)}>
          <Image
            style={StarImage}
            source={
              i <= Default_Rating
                ? {uri: this.Star}
                : {uri: this.Star_With_Border}
            }
          />
        </TouchableOpacity>,
      );
    }
    return (
      <View style={styles.MainContainer}>
        {/*View to hold our Stars*/}
        <View style={styles.childView}>{React_Native_Rating_Bar}</View>
        <Text style={totalRatingtext}>{totalRating}</Text>
        {/* <Text style={styles.textStyle}>
          {this.state.Default_Rating} / {this.state.Max_Rating}
        </Text> */}
      </View>
    );
  }
}

{
  /* <Image source={Images.rating_fill} style={styles.image} /> */
}
{
  /* <Image source={Images.rating_unfill} style={styles.image} /> */
}
