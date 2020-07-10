// @flow
import {StyleSheet, Platform} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  inputTitle: {
    color: '#ABB4BD',
    fontSize: 14,
  },
  input: {
    paddingVertical: 5,
    color: '#1D2029',
    fontSize: 14,
    fontFamily: 'Avenir Next',
  },
  textInput: {
    height: Metrics.ratio(40),
    backgroundColor: '#fff',
    paddingHorizontal: Metrics.ratio(10),
    // marginBottom: Metrics.ratio(15),
    marginHorizontal: Metrics.ratio(15),
    borderRadius: Metrics.screenWidth * 0.5,
    borderWidth: 1,
    borderColor: '#F3F4F8',
    color: '#81788B',
    justifyContent: 'center',
  },
});
