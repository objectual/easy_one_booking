// @flow
import {StyleSheet} from 'react-native';
import {Images, Metrics, Fonts, Colors} from '../../theme';

export default StyleSheet.create({
  containerForRow: {
    paddingHorizontal: Metrics.ratio(20),
    // marginTop: Metrics.ratio(20),
  },
  servicebox: {
    backgroundColor: '#fff',
    marginTop: Metrics.ratio(20),
    marginBottom: Metrics.ratio(7),
    borderRadius: Metrics.ratio(15),
    overflow: 'hidden',
    elevation: 5,
    paddingHorizontal: Metrics.ratio(15),
    paddingVertical: Metrics.ratio(15),
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.0,
  },
  nametext: {
    fontSize: Metrics.ratio(18),
    marginTop: Metrics.ratio(7),
  },
  titlesize: {
    fontSize: Metrics.ratio(15),
    marginVertical: Metrics.ratio(1),
  },
  titleTotal: {
    fontSize: Metrics.ratio(17),
    color: '#FF4514',
  },
  submitBtn: {
    backgroundColor: '#FF3600',
    marginTop: Metrics.ratio(2),
    paddingVertical: Metrics.ratio(2),
    alignItems: 'center',
    width: Metrics.screenWidth * 0.15,
    borderRadius: Metrics.screenWidth * 0.02,
    borderWidth: 1,
    borderColor: '#FF3600',
    color: '#81788B',
    justifyContent: 'center',
    elevation: 5,
    marginLeft: Metrics.ratio(10),
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.17,
    shadowRadius: 1.0,
  },
  submitBtnText: {
    fontSize: Metrics.ratio(12),
    color: '#fff',
  },
});
