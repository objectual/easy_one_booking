// @flow
import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.background.primary,
  },
  containerForCard: {
    marginHorizontal: Metrics.ratio(15),
    marginVertical: Metrics.ratio(8),
  },
  containerForRow: {
    marginHorizontal: Metrics.ratio(15),
    marginTop: Metrics.ratio(10),
  },
  searchSection: {
    height: Metrics.ratio(40),
    flex: 1,
    flexDirection: 'row',
    marginRight: Metrics.ratio(10),
    paddingHorizontal: Metrics.ratio(10),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#FF3600',
    borderRadius: Metrics.screenWidth * 0.55,
    color: '#81788B',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  input: {
    flex: 1,
    height: Metrics.ratio(30),
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    backgroundColor: '#fff',
    color: '#424242',
  },
  searchIcon: {
    height: Metrics.ratio(15),
    width: Metrics.ratio(15),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7);',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    width: Metrics.screenWidth * 0.8,
    height: Metrics.screenHeight * 0.5,
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
    marginVertical: 15,
    textAlign: 'center',
    fontSize: Metrics.ratio(20)
  },
  text18: {
    fontSize: Metrics.ratio(16),
    fontWeight: 'bold'
  },
  checkbox: {
    marginHorizontal: Metrics.ratio(0)
  },
  selectContainer: {
    flexDirection: 'row', justifyContent: "space-between", marginVertical: Metrics.ratio(10)
  },
  inputInsidePopup: {
    paddingHorizontal: Metrics.ratio(10),
    height: Metrics.ratio(40),
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#E0E2E4',
    borderRadius: Metrics.screenWidth * 0.02,
    color: '#81788B',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  dropdownContainer: {
    paddingHorizontal: Metrics.ratio(15),
    width: Metrics.screenWidth * 0.69,
    height: Metrics.screenWidth * 0.4,
    marginLeft: 5,
    backgroundColor: '#fff',
    borderColor: '#FF3600',
    borderBottomRightRadius: Metrics.ratio(5),
    borderBottomLeftRadius: Metrics.ratio(5),
    color: '#81788B',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  image: {
    height: Metrics.ratio(60),
    width: Metrics.ratio(60),
    borderRadius: Metrics.ratio(200),
  },
  imageTickCross: {
    height: Metrics.ratio(22),
    width: Metrics.ratio(22),
    marginHorizontal: Metrics.ratio(3),
  },
  containerTickCross: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15
  },
  containerServiceBox: {
    flexDirection: 'row',
    paddingHorizontal: Metrics.ratio(15),
    paddingVertical: Metrics.ratio(10),
    alignItems: 'center'
  },
  titleText: {
    fontSize: Metrics.ratio(18),
    marginVertical: Metrics.ratio(5),
    width: Metrics.ratio(150),
  },
  servicebox: {
    width: Metrics.screenWidth * 0.9,
    backgroundColor: '#fff',
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
  titleText: {
    fontSize: Metrics.ratio(16),
    // marginVertical: Metrics.ratio(3),
  },
  descriptionText: {
    fontSize: Metrics.ratio(14),
    // marginVertical: Metrics.ratio(3),
  },
  numberText: {
    fontSize: Metrics.ratio(35),
    // marginVertical: Metrics.ratio(3),
  },
  StarImage: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },
  totalRatingtext: {
    fontSize: 40,
    fontWeight: 'bold'
    // color: '#d2d2d2',
  },
  CustomStyle: {
    width: Metrics.screenWidth * 0.91
  },
  CustomStyleButtonCancel:{
    backgroundColor: '#fff',
    width: Metrics.screenWidth * 0.34
  },
  CustomStyleButtonSave:{
    width: Metrics.screenWidth * 0.34
  },
  CustomStyleButtonText:{
    color: 'black'
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
});
