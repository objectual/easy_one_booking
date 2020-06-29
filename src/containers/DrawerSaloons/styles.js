// @flow
import {StyleSheet, ListViewBase} from 'react-native';
import {Images, Metrics, Fonts, Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.Glitter,
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
  submitBtn: {
    backgroundColor: '#FF3600',
    paddingVertical: Metrics.ratio(10),
    // alignItems: 'center',
    borderRadius: Metrics.screenWidth * 0.35,
  },
  submitBtnText: {
    fontSize: Metrics.ratio(14),
    color: '#fff',
    // justifyContent: "center",
    // textAlignVertical: "center"
    textAlign: 'center',
  },
  textInput: {
    // height: Metrics.ratio(40),
    paddingVertical: Metrics.ratio(10),
    // marginTop: Metrics.ratio(25),
    paddingHorizontal: Metrics.ratio(10),
    marginBottom: 20,
    borderRadius: Metrics.screenWidth * 0.5,
    borderWidth: 1,
    borderColor: '#F3F4F8',
    color: '#81788B',
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
  },
  textInputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Metrics.ratio(25),
    marginBottom: 20,
    borderRadius: Metrics.screenWidth * 0.5,
    borderWidth: 1,
    borderColor: '#F3F4F8',
    color: '#81788B',
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  textInputWithLabel:{paddingHorizontal: Metrics.ratio(10),
    paddingVertical: Metrics.ratio(10),
    marginTop: Metrics.ratio(25),
    marginBottom: 20,
    borderRadius: Metrics.screenWidth * 0.5,
    borderWidth: 1,
    borderColor: '#F3F4F8',
    color: '#81788B',
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,}
});
