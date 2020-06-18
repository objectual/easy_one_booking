// @flow
import { StyleSheet } from "react-native";
import {Images, Metrics, Fonts, Colors} from '../../theme';


export default StyleSheet.create ({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(52, 52, 52, 0.8)',
      width: '100%',
      flexGrow: 1
    },
    modal: {
       width:'80%',
       justifyContent:'center',
       alignItems: 'center',
       paddingTop: 20,
       paddingBottom: 40,
       backgroundColor:'white',
       borderRadius: 10,
       

    },
    text: {
       color: '#3f2949',
       marginTop: 10
    },
    row:{
    width:'70%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'flex-start',
    marginVertical: 10
    },
    rowCancel:{
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    nameLabel:{
       fontSize: 20,
    },
    nameValue:{
       fontSize: 20,
       color:Colors.taupeGrey

    },
    descriptionValue:{
      color:Colors.taupeGrey
    },
    submitBtn: {
      backgroundColor: '#FF3600',
      paddingVertical: Metrics.ratio(10),
      width: Metrics.screenWidth * 0.4,
      borderRadius: Metrics.screenWidth * 0.35,
    },
    submitBtnText: {
      fontSize: Metrics.ratio(14),
      color: '#fff',
      textAlign: 'center',
    },
    nameLabelBorder:{
       height: 0,
       width: '30%',
       backgroundColor:'black',
       marginTop: -10,
    },
    dateContainer:{
       width:'50%',
       justifyContent:'center',
       alignItems: 'center',
       backgroundColor:'red',


    },
    timeContainer:{
      width:'40%',
      justifyContent:'center',
      alignItems: 'center',
      backgroundColor:'red',
      marginLeft: '20%'

    },
    datePicker:{
      width:'80%',
      justifyContent:'center',
      alignItems: 'center',
      paddingTop: 20,
      paddingBottom: 40,
      backgroundColor:'white',
      borderRadius: 10,
      flexDirection:'row'
    },
    datePickerimageColumn:{
       width: '20%',
       justifyContent:'center',
       alignItems: 'center',
    },
    datePickerComponent:{
      width: '80%',
      justifyContent:'center',
      alignItems: 'center',
   },
   datePickerRow:{
      height: 40,
      flexDirection:'row',
      justifyContent:'center',
      alignItems: 'center',
      borderRadius: 10,
      borderWidth: 1,
      paddingHorizontal: 10
   
   },

   datePickerimageContainer:{

   },

    timePicker:{
      width:'80%',
      justifyContent:'center',
      alignItems: 'center',
      paddingTop: 20,
      paddingBottom: 40,
      backgroundColor:'white',
      borderRadius: 10,
    },
    image:{
       height: 20,
       width: 20
    }

 })