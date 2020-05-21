import { connect } from "react-redux";
import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity, Platform } from "react-native";
import styles from "./styles";
import { Images, Metrics } from "../../theme";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";

class Header extends Component {
  static propTypes = {
    //selectedTab: PropTypes.oneOf(["mycars", "addcar"]),
    headerText: PropTypes.string,
    leftIcon: PropTypes.string,
    rightIcon: PropTypes.string,
    leftBtnPress: PropTypes.func,
    rightBtnPress: PropTypes.func,
    leftIconStyle: PropTypes.object,
    headerTextStyle: PropTypes.object,
    rightIconStyle: PropTypes.object,
    rightIconSize: PropTypes.number,
    productQuantity: PropTypes.number,
    itemQuantity: PropTypes.number
  };
  static defaultProps = {
    headerText: "",
    leftIcon: undefined,
    rightIcon: undefined,
    leftBtnPress: undefined,
    leftIconStyle: undefined,
    headerTextStyle: undefined,
    rightIconStyle: undefined,
    rightIconSize: undefined,
    rightBtnPress: undefined,
    productQuantity: undefined,
    itemQuantity: undefined
  };

  render() {
    const {
      headerText,
      leftIcon,
      rightIcon,
      leftBtnPress,
      headerTextStyle,
      rightIconStyle,
      rightIconSize,
      rightBtnPress,
      itemQuantity
    } = this.props;

    return (
      <View style={[styles.container, Platform.OS === 'ios' && { paddingTop: Metrics.screenHeight * 0.035 }]}>
        <TouchableOpacity style={styles.TouchableMenu} onPress={leftBtnPress}>
          <Image source={leftIcon} style={{ width: Metrics.ratio(40), height: Metrics.ratio(40) }} />
        </TouchableOpacity>

        <View style={styles.headerTextView}>
          <Image source={Images.logo} style={{ width: Metrics.ratio(45), height: Metrics.ratio(45) }} />
          <Text style={[styles.headerText, headerTextStyle,]}>{headerText}</Text>
        </View>
        <TouchableOpacity style={styles.TouchableMenu} onPress={rightBtnPress}>
          <Image source={rightIcon} style={{ width: Metrics.ratio(40), height: Metrics.ratio(40) }} />
        </TouchableOpacity>

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

export default Header;
