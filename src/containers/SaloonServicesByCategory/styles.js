// @flow
import {StyleSheet, ListViewBase} from 'react-native';
import {Images, Metrics, Fonts, Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.Glitter,
    flex: 1,
  },

  textmiddle: {
    textAlign: 'center',
  },
  servicebox: {
    marginHorizontal: Metrics.screenWidth * 0.05,
    backgroundColor: '#fff',
    marginTop: Metrics.ratio(20),
    marginBottom: Metrics.ratio(7),
    borderRadius: Metrics.ratio(15),
    alignItems: "center",
    overflow: 'hidden',
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.0,
  },
  servicesImage: {
    marginVertical: Metrics.ratio(15),
    marginLeft: Metrics.ratio(5),
    height: Metrics.ratio(80),
    width: Metrics.ratio(80),
    borderRadius: Metrics.ratio(80),
  },
  containerForRow: {
    // paddingHorizontal: Metrics.ratio(20),
    // marginTop: Metrics.ratio(20),
  },
  arrowImage: {
    width: Metrics.ratio(20),
    // height : Metrics.ratio(25),
    // marginBottom : Metrics.ratio(-15),
  },
  
  containertext : {
    justifyContent: "center",
    // marginVertical: Metrics.ratio(15),
    width: Metrics.screenWidth * 0.45,
  },
  containertitle : {
    height: Metrics.ratio(17),
    width: Metrics.ratio(17),
    marginRight: Metrics.ratio(5),
  },
  containerAeroImage : {
    width: Metrics.screenWidth * 0.05,
    marginLeft: Metrics.ratio(15),
  }

});
