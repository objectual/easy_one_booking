import {StyleSheet, Dimensions} from 'react-native';

import {Colors} from './../../theme';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerContainer: {
    flex: 2.3,
    justifyContent: 'space-between',
    width: width,
  },
  headerChild: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabsText: {fontSize: 18, fontFamily: 'LexendDeca-Regular'},
  headingText: {fontSize: 22, fontWeight: 'bold', marginLeft: 20},
  tabsContainer: {
    flex: 1.5,
    backgroundColor: Colors.primary,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },

  footerContainer: {
    flex: 0.7,
    backgroundColor: Colors.primary,
    borderTopColor: '#E3E5E9',
    borderTopWidth: 2,
    justifyContent: 'center',
  },
  footerSubContainer: {
    width: width * 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  headerHeading: {fontSize: width * 0.04},
  bodyContainer: {flex: 7},
});
