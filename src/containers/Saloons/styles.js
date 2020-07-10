// @flow
import { StyleSheet, ListViewBase } from "react-native";
import { Images, Metrics, Fonts, Colors } from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.Glitter,
    flex: 1,
    //  justifyContent: "center"
  },
  servicebox: {
    height: Metrics.screenHeight * 0.2,
    width: Metrics.screenWidth * 0.37,
    backgroundColor: "#fff",
    marginVertical: Metrics.ratio(17),
    paddingHorizontal: Metrics.ratio(15),
    borderRadius: Metrics.ratio(15),
    elevation: 5,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  textmiddle: {
    textAlign: "center"
  },
  containerForRow: {
    paddingHorizontal: Metrics.screenWidth * 0.05,
    // marginTop: Metrics.ratio(20),
  },
  submitBtn: {
    paddingVertical: Metrics.ratio(14),
    // alignItems: 'center',
    width: Metrics.screenWidth * 0.5,
    borderRadius: Metrics.screenWidth * 0.35,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  submitBtnText: {
    fontSize: Metrics.ratio(14),
    color: '#000',
    // justifyContent: "center",
    // textAlignVertical: "center"
    textAlign: 'center'
  },
  submitBtnText1: {
    fontSize: Metrics.ratio(12),
    color: '#fff',
    // justifyContent: "center",
    // textAlignVertical: "center"
    textAlign: 'center'
  },
  submitBtn1: {

    paddingVertical: Metrics.ratio(5),
    // alignItems: 'center',
    width: Metrics.screenWidth * 0.2,
    borderRadius: Metrics.screenWidth * 0.35,
  },
  submitBtn: {
    backgroundColor: '#FF3600',
    paddingVertical: Metrics.ratio(10),
    // alignItems: 'center',
    width: Metrics.screenWidth * 0.4,
    borderRadius: Metrics.screenWidth * 0.35,
  },
  submitBtnText: {
    fontSize: Metrics.ratio(18),
    color: '#fff',
    // justifyContent: "center",
    // textAlignVertical: "center"
    textAlign: 'center'
  },
  servicebox: {
    backgroundColor: "white",
    marginTop: Metrics.ratio(20),
    marginBottom: Metrics.ratio(7),
    borderRadius: Metrics.ratio(15),
    // overflow: 'hidden',
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
  },
  servicesImage: {
    marginVertical: Metrics.ratio(15),
    marginHorizontal: Metrics.ratio(15),
    height: Metrics.ratio(80),
    width: Metrics.ratio(80),
    borderRadius: Metrics.ratio(80),
  },
  textContainer: {
    alignItems: 'center',
    marginTop: '50%'
  },
  textNotFound: {
    fontSize: 22
  },
  textsize15: {
    fontSize: Metrics.ratio(15)
  },
  textsize18: {
    fontSize: Metrics.ratio(18)
  },
  dataContainer: {
    marginVertical: Metrics.ratio(15),
    width: Metrics.screenWidth * 0.55,
  }

});
