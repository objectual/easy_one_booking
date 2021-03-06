// @flow
import { StyleSheet } from "react-native";
import { Images, Metrics, Fonts,Colors } from '../../theme';

export default StyleSheet.create({

    errorText:{
        color: 'red'
    },
    container: {
        backgroundColor: Colors.Glitter,
        justifyContent:'center',
        // paddingHorizontal: 20,
        height: Metrics.screenHeight
        },
    logoView: {
        alignItems: "center",
        paddingVertical: Metrics.ratio(30)
    },
    logoImage: {
        width: Metrics.ratio(200),
        height: Metrics.ratio(75),
        resizeMode: 'contain'
    },
    screenHeading: {
        fontSize: Metrics.ratio(25),
        color: "#5A5559",
        marginBottom: Metrics.ratio(20),
    },
    labelText: {
        fontSize: Metrics.ratio(14),
        color: "#181913",
        marginBottom: Metrics.ratio(10)
    },
    textInput: {
        height: Metrics.ratio(40),
        backgroundColor: '#fff',
        paddingHorizontal: Metrics.ratio(10),
        marginBottom: Metrics.ratio(15),
        borderRadius: Metrics.screenWidth * 0.5,
        borderWidth: 1,
        color: "#81788B",
        borderColor: "#FF3600",
        color: "#81788B",
        // justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
    },
    submitBtn: {
        backgroundColor: '#FF3600',
        paddingVertical: Metrics.ratio(10),
        alignItems: 'center',
        width: Metrics.screenWidth * 0.35,
        borderRadius: Metrics.screenWidth * 0.35,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
    },
    submitBtnText: {
        fontSize: Metrics.ratio(14),
        color: '#fff'
    },
    connectCardText: {
        fontSize: Metrics.ratio(15),
        color: "#5A5559",
        backgroundColor: '#FDFFFC',
        paddingHorizontal: Metrics.ratio(10),
        position: 'absolute',
        top: Metrics.ratio(-10.5),
        zIndex: 1,
    },
    socialBtn: {
        marginBottom: Metrics.ratio(15),
        width: Metrics.screenWidth * 0.7,
        height: Metrics.ratio(40),
        alignItems: 'center',
        flexDirection: 'row'
    },
    socialBtnIconView: {
        marginHorizontal: Metrics.ratio(3),
        width: Metrics.ratio(35),
        height: Metrics.ratio(35),
        justifyContent: 'center',
        alignItems: 'center',
    },
    CustomTextInput: {
        paddingBottom: Metrics.ratio(7),
    },
    socialBtnText: {
        fontSize: Metrics.ratio(14),
        color: '#fff',
        textAlign: 'center',
        width: (Metrics.screenWidth * 0.7) - Metrics.ratio(45)
    }
});
