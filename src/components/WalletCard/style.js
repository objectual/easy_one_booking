// @flow
import {StyleSheet, Platform} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    marginHorizontal: Metrics.ratio(15),
    marginVertical: Metrics.ratio(8),
  },
  image: {
    height: Metrics.ratio(45),
    width: Metrics.ratio(45),
    borderRadius: Metrics.ratio(200),
    backgroundColor: 'red',
  },
  imageTickCross: {
    height: Metrics.ratio(10),
    width: Metrics.ratio(10),
  },
  containerTickCross: {
    flexDirection: 'row',
    // alignItems: 'center',
    // marginVertical: 15
  },
  containerServiceBox: {
    flexDirection: 'row',
    paddingHorizontal: Metrics.ratio(15),
    paddingVertical: Metrics.ratio(10),
    alignItems: 'center',
  },
  titleText: {
    fontSize: Metrics.ratio(18),
    marginVertical: Metrics.ratio(5),
    width: Metrics.ratio(150),
  },
  servicebox: {
    width: Metrics.ratio('100%'),
    backgroundColor: '#fff',
    borderRadius: Metrics.ratio(15),
    // overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
  },
  titleText: {
    fontSize: Metrics.ratio(18),
    // marginVertical: Metrics.ratio(3),
  },
  descriptionText: {
    fontSize: Metrics.ratio(14),
    // marginVertical: Metrics.ratio(3),
  },
  numberText: {
    fontSize: Metrics.ratio(35),
    // marginVertical: Metrics.ratio(3),
  },
  StarImage: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },
  totalRatingtext: {
    fontSize: 40,
    fontWeight: 'bold',
    // color: '#d2d2d2',
  },
});
