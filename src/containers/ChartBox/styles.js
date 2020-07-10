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
    backgroundColor: 'red',
  },
  serviceboxsender: {
    // height: Metrics.screenHeight * 0.1,
    width: Metrics.screenWidth * 0.75,
    backgroundColor: '#F2F2F2',
    marginVertical: Metrics.ratio(10),
    borderColor: '#F2F2F2',
    // borderTopWidth: 1,
    // borderLeftWidth: 1,
    // borderRightWidth: 1,
    // borderBottomWidth: 1,
    borderWidth: 1,
    borderBottomRightRadius: Metrics.ratio(10),
    borderTopRightRadius: Metrics.ratio(10),
    borderTopLeftRadius: Metrics.ratio(10),
    borderBottomLeftRadius: Metrics.ratio(0),
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  textmiddlesender: {
    fontSize: Metrics.ratio(16),
    paddingHorizontal: Metrics.ratio(15),
    paddingVertical: Metrics.ratio(10),
    color: '#424242',
  },
  servicesImagesender: {
    marginRight: Metrics.ratio(10),
    height: Metrics.ratio(40),
    width: Metrics.ratio(40),
    borderRadius: Metrics.ratio(50),
    marginBottom: Metrics.ratio(15),
  },
  serviceboxreciver: {
    width: Metrics.screenWidth * 0.75,
    backgroundColor: '#8F60A6',
    marginVertical: Metrics.ratio(5),
    borderColor: '#8F60A6',
    borderWidth: 1,
    borderBottomRightRadius: Metrics.ratio(0),
    borderTopRightRadius: Metrics.ratio(10),
    borderTopLeftRadius: Metrics.ratio(10),
    borderBottomLeftRadius: Metrics.ratio(10),
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  textmiddlereciver: {
    fontSize: Metrics.ratio(16),
    paddingHorizontal: Metrics.ratio(15),
    paddingVertical: Metrics.ratio(10),
    color: '#fff',
  },
  servicesImagereciver: {
    marginLeft: Metrics.ratio(10),
    height: Metrics.ratio(40),
    width: Metrics.ratio(40),
    borderRadius: Metrics.ratio(50),
    marginBottom: Metrics.ratio(15),
  },
  camera: {
    height: Metrics.ratio(40),
    width: Metrics.ratio(40),
    borderRadius: Metrics.ratio(50),
  },
});
