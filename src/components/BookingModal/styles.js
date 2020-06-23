// @flow
import {StyleSheet} from 'react-native';
import {Images, Metrics, Fonts, Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    width: '100%',
    flexGrow: 1,
  },
  modal: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 40,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  text: {
    color: '#3f2949',
    marginTop: 10,
  },
  row: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 10,
    borderWidth: 0,
  },
  rowCancel: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  nameLabel: {
    fontSize: 20,
  },
  nameValue: {
    fontSize: 20,
    color: Colors.taupeGrey,
  },
  descriptionValue: {
    color: Colors.taupeGrey,
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
  onCancel: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 20,
  },
  onCancelText: {
    fontSize: 18,
  },
  nameLabelBorder: {
    height: 0,
    width: '22%',
    backgroundColor: 'black',
    marginTop: -10,
  },
  dateContainer: {
    width: '50%',
    alignItems: 'flex-start',
    borderWidth: 0,
  },
  timeContainer: {
    width: '50%',
    alignItems: 'flex-start',
    borderWidth: 0,
    marginLeft: 5,
  },
  datePicker: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
  },
  datePickerimageColumn: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePickerComponent: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    marginTop: 20,
  },
  datePickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    width: '100%',
    height: 50,
    borderWidth: 0,
  },
  dateValueContainer: {
    width: '90%',
    borderBottomWidth: 1,
    borderColor: '#D3D3D3',
    height: 55,
    justifyContent: 'flex-end',
    paddingBottom: 5,
  },

  datePickerimageContainer: {},

  timePicker: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 40,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  image: {
    height: 20,
    width: 20,
  },
  datePickerLabelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
