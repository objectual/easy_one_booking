// @flow
import {StyleSheet, ListViewBase} from 'react-native';
import {Images, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: '#FDFFFC',
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
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.0,
  },
  servicesImage: {
    marginVertical: Metrics.ratio(15),
    marginHorizontal: Metrics.ratio(15),
    height: Metrics.ratio(80),
    width: Metrics.ratio(80),
    borderRadius: Metrics.ratio(80),
  },
  containerForRow: {
    paddingHorizontal: Metrics.ratio(20),
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
});