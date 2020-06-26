// @flow
import { StyleSheet } from 'react-native';
import { Images, Metrics, Fonts, Colors } from '../../theme';

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
    paddingHorizontal : Metrics.ratio(15),
    paddingVertical  :Metrics.ratio(15),
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.0,
  },
  nametext :{
    fontSize : Metrics.ratio(18),
    marginTop : Metrics.ratio(7),
  },
  titlesize :{
    fontSize : Metrics.ratio(15),
    marginVertical : Metrics.ratio(1),
  },
  titleTotal :{
    fontSize : Metrics.ratio(17),
    color: '#FF4514'
  }
});
