// @flow
import {StyleSheet, ListViewBase} from 'react-native';
import {Images, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: '#FDFFFC',
    flex: 1,
    //  justifyContent: "center"
  },
  containerForRow: {
    marginHorizontal: Metrics.ratio(20),
  },
  mainheading: {
    fontSize: Metrics.ratio(24),
    marginTop: Metrics.ratio(25),
    textAlign: 'center',
  },
  employeeheading: {
    fontSize: Metrics.ratio(20),
    marginVertical: Metrics.ratio(3),
    textAlign: 'center',
  },
  mainheadingtext: {
    fontSize: Metrics.ratio(16),
    marginTop: Metrics.ratio(25),
    marginBottom: Metrics.ratio(10),
    textAlign: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: '50%',
  },
  StarImage: {
    width: 30,
    height: 30,
    marginRight: Metrics.ratio(12),
    marginLeft: Metrics.ratio(12),
    // resizeMode: 'cover',
  },
  containerborder: {
    borderWidth: Metrics.ratio(1),
    marginTop: Metrics.ratio(15),
    alignItems: 'center',
  },
  rating: {
    borderTopWidth: Metrics.ratio(1),
    paddingVertical: Metrics.ratio(15),
  },
  titleText: {
    fontSize: Metrics.ratio(16),
  },
  descriptionText: {
    fontSize: Metrics.ratio(16),
    marginTop: Metrics.ratio(15),
  },
  submitBtn2: {
    backgroundColor: '#FF3600',
    paddingVertical: Metrics.ratio(8),
    marginTop: Metrics.ratio(20),
    // alignItems: 'center',
    width: Metrics.screenWidth * 0.4,
    borderRadius: Metrics.screenWidth * 0.35,
  },
  submitBtnText2: {
    fontSize: Metrics.ratio(16),
    color: '#fff',
    // justifyContent: "center",
    // textAlignVertical: "center"
    textAlign: 'center',
  },
});
