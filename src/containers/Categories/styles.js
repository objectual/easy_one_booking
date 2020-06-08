// @flow
import { StyleSheet, ListViewBase } from "react-native";
import { Images, Metrics, Fonts } from '../../theme';

export default StyleSheet.create({
    container: {
        backgroundColor: "#FDFFFC",
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
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
  },
  textmiddle: {
    textAlign : "center"
},
    
});
