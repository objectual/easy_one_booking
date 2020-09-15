// @flow
import {StyleSheet, ListViewBase} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
     justifyContent: "center",
     backgroundColor: Colors.Glitter,
  },
  containerForRow: {
    marginHorizontal: Metrics.ratio(20),
  },
  serviceboxsender: {
    width: Metrics.screenWidth * 0.75,
    marginVertical: Metrics.ratio(10),
    alignItems:'flex-start'
  },
  textmiddlesender: {
    backgroundColor: '#F2F2F2',
    fontSize: Metrics.ratio(16),
    paddingHorizontal: Metrics.ratio(15),
    paddingVertical: Metrics.ratio(10),
    color: '#424242',
    borderColor: '#F2F2F2',
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
  servicesImagesender: {
    marginRight: Metrics.ratio(10),
    height: Metrics.ratio(40),
    width: Metrics.ratio(40),
    borderRadius: Metrics.ratio(50),
    marginBottom: Metrics.ratio(15),
  },
  serviceboxreciver: {
    width: Metrics.screenWidth * 0.75,
    marginVertical: Metrics.ratio(5),
    alignItems:'flex-end'
  },
  textmiddlereciver: {
    backgroundColor: '#8F60A6',
    borderColor: '#8F60A6',
    fontSize: Metrics.ratio(16),
    paddingHorizontal: Metrics.ratio(15),
    paddingVertical: Metrics.ratio(10),
    color: '#fff',
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    borderWidth: 1,
    borderBottomRightRadius: Metrics.ratio(0),
    borderTopRightRadius: Metrics.ratio(10),
    borderTopLeftRadius: Metrics.ratio(10),
    borderBottomLeftRadius: Metrics.ratio(10),
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
  textInput: {
    height: Metrics.ratio(40),
    backgroundColor: '#fff',
    // width: Metrics.screenWidth * 0.42,
    paddingHorizontal: Metrics.ratio(10),
    marginVertical: Metrics.ratio(5),
    borderColor: '#FF3600',
    borderRadius: Metrics.screenWidth * 0.03,
    color: '#81788B',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FF3600',
    color: '#81788B',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    
    elevation: 4,
  },
});
