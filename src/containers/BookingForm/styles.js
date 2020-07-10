// @flow
import {StyleSheet, ListViewBase} from 'react-native';
import {Images, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: '#FDFFFC',
    flex: 1,
    //  justifyContent: "center"
  },
  textmiddle: {
    textAlign: 'center',
  },
  servicesImage: {
    marginVertical: Metrics.ratio(15),
    marginHorizontal: Metrics.ratio(15),
    height: Metrics.ratio(80),
    width: Metrics.ratio(80),
    borderRadius: Metrics.ratio(80),
  },
  arrowImage: {
    width: Metrics.ratio(25),
    borderRadius: Metrics.ratio(80),
    resizeMode: 'contain',
  },
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
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.0,
  },
  titleText: {
    fontSize: Metrics.ratio(20),
    marginBottom: Metrics.ratio(20),
  },
  textContainer: {
    alignItems: 'center',
    marginTop: '50%',
  },
  textNotFound: {
    fontSize: 22,
  },
  logoView: {
    alignItems: 'center',
    paddingVertical: Metrics.ratio(30),
  },
  logoImage: {
    width: Metrics.ratio(200),
    height: Metrics.ratio(75),
    resizeMode: 'contain',
  },
  submitBtn: {
    backgroundColor: '#FF3600',
    paddingVertical: Metrics.ratio(10),
    alignItems: 'center',
    width: Metrics.screenWidth * 0.35,
    borderRadius: Metrics.screenWidth * 0.35,
    marginTop: Metrics.ratio(30),
    marginLeft: Metrics.ratio(15),
  },
  submitBtnText: {
    fontSize: Metrics.ratio(14),
    color: '#fff',
  },
});
