// @flow
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  MainContainer: {
    flexDirection: 'row',
  },
  childView: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 11,
    marginLeft: 3,
    color: '#d2d2d2',
  },
  StarImage: {
    width: 12,
    height: 12,
    resizeMode: 'cover',
  },
});
