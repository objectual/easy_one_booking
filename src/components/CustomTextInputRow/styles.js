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
    width: Metrics.screenWidth * 0.42,
    paddingHorizontal: Metrics.ratio(10),
    marginVertical: Metrics.ratio(15),
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
  textInputRow: {
    height: Metrics.ratio(40),
    backgroundColor: '#fff',
    width: Metrics.screenWidth * 0.9,
    paddingHorizontal: Metrics.ratio(10),
    marginVertical: Metrics.ratio(5),
    borderColor: '#FF3600',
    borderRadius: Metrics.screenWidth * 0.03,
    borderWidth: 1,
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
