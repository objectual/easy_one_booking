// @flow
import { StyleSheet, ListViewBase } from "react-native";
import { Images, Metrics, Fonts, Colors } from '../../theme';

export default StyleSheet.create({
    container: {
      backgroundColor: Colors.Glitter,
         flex: 1,
        //  justifyContent: "center"
    },
  textmiddle: {
    textAlign : "center"
},
servicesImage: {
  height: Metrics.ratio(180),
  width: Metrics.ratio(170),
},
arrowImage: {
  width: Metrics.ratio(25),
  borderRadius : Metrics.ratio(80),
  resizeMode: 'contain',
},
containerForRow: {
  paddingHorizontal: Metrics.ratio(20),
  // marginTop: Metrics.ratio(20),
},
servicebox: {
   width: Metrics.screenWidth * 0.42,
  // height: Metrics.screenHeight * 0.22,
  backgroundColor: '#FFF3EB',
  marginTop: Metrics.ratio(20),
  marginBottom: Metrics.ratio(7),
  borderRadius: Metrics.ratio(15),
  // overflow: 'hidden',
  elevation: 5,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.32,
  shadowRadius: 5.46,
},
titleText : {
  textAlign: "center",
  fontSize : Metrics.ratio(20),
  color : "white",
  backgroundColor : '#FC7813',
  // borderBottomRightRadius: Metrics.ratio(10),
  // borderBottomLeftRadius: Metrics.ratio(10),
},
textContainer:{
  alignItems: 'center',
  marginTop: '50%'
},
textNotFound:{
  fontSize: 22
},
image : {
  height: Metrics.ratio(30),
  width: Metrics.ratio(30),
  marginHorizontal : Metrics.ratio(10),
  marginVertical : Metrics.ratio(10),
  alignSelf : 'flex-end',
}
});
