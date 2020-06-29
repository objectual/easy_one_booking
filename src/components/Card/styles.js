// @flow
import {StyleSheet, Platform} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  
  cardradius: {
    padding: Metrics.ratio(7),
  },

  titleText: {
    fontSize: Metrics.ratio(18),
    marginVertical: Metrics.ratio(5),
    width: Metrics.ratio(150),
  },
  servicebox: {
    margin: Metrics.ratio(5),
    width: Metrics.screenWidth * 0.45,
    backgroundColor: '#fff',
    borderRadius: Metrics.ratio(15),
    // overflow: 'hidden',
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    marginVertical: Metrics.ratio(10)
  },
  titleText: {
    fontSize: Metrics.ratio(16),
    marginVertical: Metrics.ratio(5),
    marginHorizontal: Metrics.ratio(5),
    // marginVertical: Metrics.ratio(3),
  },
  descriptionText: {
    fontSize: Metrics.ratio(11),
    marginVertical: Metrics.ratio(5),
    marginHorizontal: Metrics.ratio(5),
    // marginVertical: Metrics.ratio(3),
  },
  submitBtn: {
    borderWidth: 2,
    borderColor: '#FF3600',
    paddingVertical: Metrics.ratio(3),
    paddingHorizontal: Metrics.ratio(5),
    // alignItems: 'center',
    borderRadius: Metrics.screenWidth * 0.35,
  },
  submitBtnText: {
    fontSize: Metrics.ratio(10),
    // justifyContent: "center",
    // textAlignVertical: "center"
    textAlign: 'center',
  },
  StarImage: {
    width: 12,
    height: 12,
    resizeMode: 'cover',
  },
  totalRatingtext: {
    fontSize: 11,
    marginLeft: 3,
    color: '#d2d2d2',
  },
});
