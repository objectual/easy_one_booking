// @flow
import { StyleSheet, ListViewBase } from 'react-native';
import { Images, Metrics, Fonts } from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: '#FDFFFC',
    flex: 1,
  },
  HeadImg: {
    width: Metrics.ratio(360),
    height: Metrics.ratio(250),
    // width: Metrics.screenHeight* 0.62 ,
    // height: Metrics.screenHeight * 0.4,
    // resizeMode: "contain",
  },
  mainheading: {
    color: '#5c0000',
    fontSize: Metrics.ratio(22),
    fontFamily: Fonts.type.bold,
  },
  mainheading1: {
    color: '#5c0000',
    fontSize: Metrics.ratio(20),
    fontFamily: Fonts.type.bold,
  },
  mainheading2: {
    color: '#5c0000',
    fontSize: Metrics.ratio(18),
    marginTop: Metrics.ratio(5),
    marginBottom: Metrics.ratio(10),
    fontFamily: Fonts.type.bold,
  },
  mainheading3: {
    color: '#5c0000',
    fontSize: Metrics.ratio(15),
    marginBottom: Metrics.ratio(10),
  },
  submitBtn: {
    backgroundColor: '#FF3600',
    paddingVertical: Metrics.ratio(10),
    // alignItems: 'center',
    width: Metrics.screenWidth * 0.4,
    borderRadius: Metrics.screenWidth * 0.35,
  },
  previewBtn: {
    backgroundColor: '#fff',
    paddingVertical: Metrics.ratio(1),
    paddingHorizontal: Metrics.ratio(7),
    borderRadius: Metrics.screenWidth * 0.35,
    borderWidth: Metrics.ratio(2),
    borderColor: '#FF3600',
  },
  submitBtnText: {
    fontSize: Metrics.ratio(14),
    color: '#fff',
    // justifyContent: "center",
    // textAlignVertical: "center"
    textAlign: 'center',
  },
  containerForRow: {
    paddingHorizontal: Metrics.ratio(20),
    marginTop: Metrics.ratio(20),
  },
  servicebox: {
    // height: Metrics.screenHeight * 0.23,
    // width: Metrics.screenWidth * 0.45,
    // backgroundColor: "#fff",
    // marginVertical: Metrics.ratio(17),
    // marginHorizontal: Metrics.ratio(8),
    // borderRadius: Metrics.ratio(15),
    // overflow: 'hidden',
    // elevation: 5,
    // shadowOffset: {
    //   width: 0,
    //   height: 1
    // },
    // shadowOpacity: 0.18,
    // shadowRadius: 1.0,
  },
  titleText: {
    fontSize: Metrics.ratio(18),
    marginVertical: Metrics.ratio(5),
    width: Metrics.ratio(150),
  },
  cardradius: {
    padding: Metrics.ratio(10),

  },
  showcardradius: {
    borderWidth: Metrics.ratio(1),
    borderColor: '#5c0000',
    borderRadius: Metrics.ratio(5),
  },
  cardImage: {
    height: Metrics.ratio(190),
    width: Metrics.ratio(180),
    borderRadius: Metrics.ratio(10),
    borderWidth: Metrics.ratio(2),
    borderColor: '#EEEEEE',
  },
  StarImage: {
    width: 12,
    height: 12,
    resizeMode: 'cover',
  },
  totalRatingtext: {
    fontSize: 11,
    marginLeft: 3,
    color: '#d2d2d2',
  },
  timeContainer: {
    marginVertical: Metrics.ratio(3), flexDirection: 'row'
  },
  timeContainerTextday: {
    fontSize: Metrics.ratio(15),
              width: Metrics.screenWidth * 0.15,
  },
  timeContainerTextTime: {
    fontSize: Metrics.ratio(15),
    width: Metrics.screenWidth * 0.8,
  },
});
