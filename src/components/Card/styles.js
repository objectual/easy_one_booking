// @flow
import {StyleSheet, Platform} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: Metrics.screenHeight * 0.08,
    flexDirection: 'row',
    shadowColor: Colors.black,
    paddingHorizontal: Metrics.ratio(10),
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  cardradius: {
    padding: Metrics.ratio(7),
  },

  titleText: {
    fontSize: Metrics.ratio(18),
    marginVertical: Metrics.ratio(5),
    width: Metrics.ratio(150),
  },
  servicebox: {
    width: Metrics.screenWidth * 0.45,
    backgroundColor: '#fff',
    borderRadius: Metrics.ratio(15),
    overflow: 'hidden',
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.0,
  },
  titleText: {
    fontSize: Metrics.ratio(16),
    // marginVertical: Metrics.ratio(3),
  },
  descriptionText: {
    fontSize: Metrics.ratio(11),
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
});
