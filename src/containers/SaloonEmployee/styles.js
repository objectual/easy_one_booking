// @flow
import {StyleSheet, ListViewBase} from 'react-native';
import {Images, Metrics, Fonts, Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.Glitter,
    flex: 1,
    //  justifyContent: "center"
  },

  textmiddle: {
    textAlign: 'center',
  },
  servicebox: {
    backgroundColor: '#fff',
    marginTop: Metrics.ratio(20),
    marginBottom: Metrics.ratio(7),
    borderRadius: Metrics.ratio(15),
    overflow: 'hidden',
    elevation: 5,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  servicesImage: {
    marginHorizontal: Metrics.ratio(5),
    marginVertical: Metrics.ratio(15),
    height: Metrics.ratio(80),
    width: Metrics.ratio(80),
    borderRadius: Metrics.ratio(80),
  },
  containerForRow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    marginHorizontal: Metrics.screenWidth * 0.05,
    // paddingHorizontal: Metrics.ratio(20),
    // marginTop: Metrics.ratio(20),
  },

  submitBtnText1: {
    fontSize: Metrics.ratio(12),
    color: '#fff',
    textAlign: 'center',
  },
  submitBtn1: {
    paddingVertical: Metrics.ratio(5),
    backgroundColor: '#FF3600',
    width: Metrics.screenWidth * 0.2,
    borderRadius: Metrics.screenWidth * 0.35,
  },
  submitBtn: {
    marginTop: Metrics.ratio(10),
    backgroundColor: '#FF3600',
    paddingVertical: Metrics.ratio(10),
    // alignItems: 'center',
    width: Metrics.screenWidth * 0.5,
    borderRadius: Metrics.screenWidth * 0.35,
  },
  submitBtnText: {
    fontSize: Metrics.ratio(18),
    color: '#fff',
    // justifyContent: "center",
    // textAlignVertical: "center"
    textAlign: 'center',
  },
  btnSelect: {
    backgroundColor: 'green',
    paddingVertical: Metrics.ratio(5),
    width: Metrics.screenWidth * 0.2,
    borderRadius: Metrics.screenWidth * 0.35,
  },
  arrowImage: {
    width: Metrics.ratio(25),
    borderRadius: Metrics.ratio(80),
    resizeMode: 'contain',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: Metrics.screenWidth * 0.8,
    height: Metrics.screenHeight * 0.7,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  text14: {
    fontSize: Metrics.ratio(14),
  },
});
