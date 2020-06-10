// @flow
import { StyleSheet, ListViewBase } from "react-native";
import { Images, Metrics, Fonts } from '../../theme';

export default StyleSheet.create({
    container: {
        backgroundColor: "#FDFFFC",
         flex: 1,
        //  justifyContent: "center"
    },
  textmiddle: {
    textAlign : "center"
},
servicesImage: {
  marginVertical: Metrics.ratio(15),
  marginHorizontal: Metrics.ratio(15),
  height: Metrics.ratio(80),
  width: Metrics.ratio(80),
  borderRadius : Metrics.ratio(80),
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
titleText : {
  width: Metrics.screenWidth * 0.42,
  fontSize : Metrics.ratio(20),
  // resizeMode: 'contain',

}
});
