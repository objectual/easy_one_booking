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
  containerForRow: {
    paddingHorizontal: Metrics.ratio(20),
    // marginTop: Metrics.ratio(20),
  },
  servicesImage: {
    height: Metrics.ratio(180),
    width: Metrics.ratio(170),
  },
  arrowImage: {
    width: Metrics.ratio(25),
    borderRadius: Metrics.ratio(80),
    resizeMode: 'contain',
  },
  mainheading0: {
    color: 'black',
    fontSize: Metrics.ratio(18),
    fontFamily: Fonts.type.bold,
    fontWeight: 'bold',
    paddingVertical: Metrics.ratio(10),
  },
  mainheading2: {
    color: 'black',
    fontSize: Metrics.ratio(14),
    fontWeight: 'bold',
  },
  mainheading1: {
    color: '#5c0000',
    fontSize: Metrics.ratio(14),
    fontFamily: Fonts.type.bold,
    paddingVertical: Metrics.ratio(10),
  },
  headAddress: {
    color: '#5c0000',
    fontSize: Metrics.ratio(14),
    fontFamily: Fonts.type.bold,
    paddingVertical: Metrics.ratio(8),
  },
  mainheading1: {
    color: 'black',
    fontSize: Metrics.ratio(16),
    fontFamily: Fonts.type.bold,
    paddingVertical: Metrics.ratio(10),
  },
  containerForRow: {
    paddingHorizontal: Metrics.ratio(20),
  },
  servicebox: {
    width: Metrics.screenWidth * 0.42,
    // height: Metrics.screenHeight * 0.22,
    backgroundColor: '#2B3439',
    marginTop: Metrics.ratio(20),
    marginBottom: Metrics.ratio(7),
    borderRadius: Metrics.ratio(15),
    // alignItems: "center",
    // justifyContent: "center",
    // overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
  },
  titleText: {
    textAlign: 'center',
    fontSize: Metrics.ratio(20),
    color: 'white',
    backgroundColor: '#FC7813',
    // borderBottomRightRadius: Metrics.ratio(10),
    // borderBottomLeftRadius: Metrics.ratio(10),
  },
  textContainer: {
    alignItems: 'center',
    marginTop: '50%',
  },
  textNotFound: {
    fontSize: 22,
  },
  image: {
    height: Metrics.ratio(30),
    width: Metrics.ratio(30),
    marginHorizontal: Metrics.ratio(10),
    marginVertical: Metrics.ratio(10),
    alignSelf: 'flex-end',
  },
  ratingContainer: {
    width: Metrics.screenWidth * 0.3,
    paddingVertical: Metrics.ratio(20),
    flexDirection: 'row',
  },
  btnContainer: {
    paddingVertical: Metrics.ratio(12),
    width: Metrics.screenWidth * 0.4,
    backgroundColor: '#FF4514',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: Metrics.ratio(30),
  },
  btnText: {
    color: 'white',
  },
});
