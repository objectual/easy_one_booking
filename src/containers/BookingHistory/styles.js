// @flow
import {StyleSheet, ListViewBase} from 'react-native';
import {Images, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: '#FDFFFC',
    flex: 1,
    //  justifyContent: "center"
  },
  servicebox: {
    height: Metrics.screenHeight * 0.2,
    width: Metrics.screenWidth * 0.37,
    backgroundColor: '#fff',
    marginVertical: Metrics.ratio(17),
    paddingHorizontal: Metrics.ratio(15),
    borderRadius: Metrics.ratio(15),
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  textmiddle: {
    textAlign: 'center',
  },
  submitBtn2: {
    backgroundColor: '#FF3600',
    paddingVertical: Metrics.ratio(10),
    alignItems: 'center',
    width: Metrics.screenWidth * 0.4,
    borderRadius: Metrics.screenWidth * 0.35,
  },
  submitBtnText2: {
    fontSize: Metrics.ratio(18),
    color: '#fff',
    // justifyContent: "center",
    // textAlignVertical: "center"
    textAlign: 'center',
  },
});
