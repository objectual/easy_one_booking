// @flow
import {StyleSheet, Platform} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  inputTitle: {
    marginHorizontal: Metrics.ratio(15),
    marginBottom: Metrics.ratio(5),
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
    marginVertical: Metrics.ratio(5),
    marginHorizontal: Metrics.ratio(15),
    borderRadius: Metrics.screenWidth * 0.5,
    borderWidth: 1,
    borderColor: '#F3F4F8',
    color: '#81788B',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    marginHorizontal: Metrics.ratio(15),
  },
});
