// @flow
import {StyleSheet, ListViewBase} from 'react-native';
import {Images, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: '#FDFFFC',
    flex: 1,
    //  justifyContent: "center"
  },
  containerForRow: {
    paddingHorizontal: Metrics.ratio(20),
    marginVertical: Metrics.ratio(20),
  },
  servicehead: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    width: Metrics.screenWidth * 0.95,
  },
  servicebody: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  serviceheadfont: {
    fontSize: Metrics.ratio(15),
    fontWeight: 'bold',
  },
  serviceheadfontRed: {
    fontSize: Metrics.ratio(16),
    fontWeight: 'bold',
    color: 'red',
  },
  servicebodyfont: {
    fontSize: Metrics.ratio(12),
  },
  employeebody: {
    width: Metrics.screenWidth * 0.23,
  },
  servicesbody: {
    width: Metrics.screenWidth * 0.2,
  },
  timebody: {
    width: Metrics.screenWidth * 0.26,
  },
  pricebody: {
    width: Metrics.screenWidth * 0.16,
  },
  horizontalLine: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  orderSummmerytext: {
    fontSize: Metrics.ratio(20),
    marginTop: Metrics.ratio(10),
    paddingHorizontal: Metrics.ratio(20),
  },
  labelText: {
    fontSize: Metrics.ratio(14),
    color: '#181913',
    marginVertical: Metrics.ratio(10),
  },
  textInput: {
    height: Metrics.ratio(45),
    backgroundColor: '#fff',
    paddingHorizontal: Metrics.ratio(10),
    // paddingVertical: Metrics.ratio(5),
    // paddingBottom: Metrics.ratio(5),
    marginBottom: Metrics.ratio(15),
    borderRadius: Metrics.screenWidth * 0.5,
    borderWidth: 1,
    borderColor: '#F3F4F8',
    color: '#81788B',
    justifyContent: 'center',
  },
  textInputcsc: {
    height: Metrics.ratio(45),
    width: Metrics.ratio(160),
    backgroundColor: '#fff',
    paddingHorizontal: Metrics.ratio(10),
    // paddingVertical: Metrics.ratio(5),
    // paddingBottom: Metrics.ratio(5),
    marginBottom: Metrics.ratio(15),
    borderRadius: Metrics.screenWidth * 0.5,
    borderWidth: 1,
    borderColor: '#F3F4F8',
    color: '#81788B',
    justifyContent: 'center',
  },
  submitBtn: {
    // backgroundColor: '#FF3600',
    paddingVertical: Metrics.ratio(10),
    // alignItems: 'center',
    // width: Metrics.screenWidth * 0.6,
    borderRadius: Metrics.screenWidth * 0.35,
    borderWidth: 1,
    borderColor: '#F3F4F8',
  },
  submitBtnText: {
    fontSize: Metrics.ratio(18),
    color: '#000',
    // justifyContent: "center",
    // textAlignVertical: "center"
    textAlign: 'center',
  },
  submitBtn1: {
    // backgroundColor: '#FF3600',
    paddingVertical: Metrics.ratio(10),
    // alignItems: 'center',
    width: Metrics.screenWidth * 0.43,
    borderRadius: Metrics.screenWidth * 0.35,
    borderWidth: 1,
    borderColor: '#F3F4F8',
  },
  submitBtnText1: {
    fontSize: Metrics.ratio(18),
    color: '#000',
    // justifyContent: "center",
    // textAlignVertical: "center"
    textAlign: 'center',
  },
  submitBtn2: {
    backgroundColor: '#FF3600',
    paddingVertical: Metrics.ratio(10),
    alignItems: 'center',
    width: Metrics.screenWidth * 0.4,
    borderRadius: Metrics.screenWidth * 0.35,
  },
  submitBtnText2: {
    fontSize: Metrics.ratio(18),
    color: '#fff',
    // justifyContent: "center",
    // textAlignVertical: "center"
    textAlign: 'center',
  },
  paymentImg: {
    height: Metrics.ratio(32),
    width: Metrics.ratio(50),
    marginTop: Metrics.ratio(5),
    marginRight: Metrics.ratio(5),
  },
});
