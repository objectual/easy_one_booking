import {connect} from 'react-redux';
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  TextInput,
  Linking,
  StyleSheet,
} from 'react-native';
import FloatingLabel from 'react-native-floating-labels';
import styles from './styles';
import {Images, Metrics, Fonts} from '../../theme';
import SpinnerLoader from '../../components/SpinnerLoader';
import Header from '../../components/Header/index';
import {request as get_Saloon_Categories} from '../../redux/actions/SaloonCategories';


class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.getSaloonCategories) {
      if (
        !nextProps.getSaloonCategories.failure &&
        !nextProps.getSaloonCategories.isFetching &&
        nextProps.getSaloonCategories.data &&
        nextProps.getSaloonCategories.data.success
      ) {
        // this.setState({GetSaloonData: nextProps.getSaloon.data.data});
        console.log(
          nextProps.getSaloonCategories,
          'getSaloonCategoriesgetSaloonCategoriesgetSaloonCategoriesgetSaloonCategoriesgetSaloonCategories',
        );
      } else if (
        !nextProps.getSaloonCategories.failure &&
        !nextProps.getSaloonCategories.isFetching &&
        nextProps.getSaloonCategories.data &&
        !nextProps.getSgetSaloonCategoriesaloon.data.success
      ) {
        this.setState({isloading: false}, () => {
          setTimeout(() => {
            Alert.alert('Error', nextProps.getSaloonCategories.data.msg);
          }, 3000);
        });
      }
    }
  }

  handleSaloonCategories = () => {
    this.setState({isLoading: true});
    const payload = {
      id : "5ed8ddd8ef6d924bb8cca4f3"
    };
    this.props.get_Saloon_Categories(payload);
  };

  _renderOverlaySpinner = () => {
    const {isloading} = this.state;
    return <SpinnerLoader isloading={isloading} />;
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          headerText={'Categories'}
          leftIcon={Images.costumer_header_menu}
          leftBtnPress={() => this.props.navigation.openDrawer()}
        />
        <ScrollView>
          <View>{/* {this.renderRow()} */}</View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  getSaloonCategories: state.getSaloonCategories,
  getCategories: state.getCategories,
});

const action = {get_Saloon_Categories};

export default connect(mapStateToProps, action)(Categories);
