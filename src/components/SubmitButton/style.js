// @flow
import {StyleSheet} from 'react-native';
import {Images, Metrics, Fonts, Colors} from '../../theme';

export default StyleSheet.create({
  submitBtn: {
    backgroundColor: '#FF3600',
    paddingVertical: Metrics.ratio(10),
    alignItems: 'center',
    marginTop: Metrics.ratio(10),
    marginBottom: Metrics.ratio(10),
    width: Metrics.screenWidth * 0.4,
    borderRadius: Metrics.screenWidth * 0.35,
    borderWidth: 1,
    borderColor: '#FF3600',
    color: '#81788B',
    justifyContent: 'center',
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.17,
    shadowRadius: 1.0,
  },
  submitBtnText: {
    fontSize: Metrics.ratio(14),
    color: '#fff',
  },
});
