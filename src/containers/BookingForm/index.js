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
  FlatList,
} from 'react-native';
import FloatingLabel from 'react-native-floating-labels';
import styles from './styles';
import {Images, Metrics, Fonts} from '../../theme';
import SpinnerLoader from '../../components/SpinnerLoader';
import Header from '../../components/Header/index';
import {request as get_Saloon_Categories} from '../../redux/actions/SaloonCategories';
import CustomTextInput from './../../components/CustomTextInput/index';
import BookedSuccessModal from '../../components/BookedSuccessModal';

class BookingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getSelectedCategory: [],
      categoryId: null,
      showBookedModal: false
    };
  }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   if (nextProps.getSaloonCategories) {
  //     if (
  //       !nextProps.getSaloonCategories.failure &&
  //       !nextProps.getSaloonCategories.isFetching &&
  //       nextProps.getSaloonCategories.data &&
  //       nextProps.getSaloonCategories.data.success
  //     ) {
  //       this.setState({
  //         getSelectedCategory: nextProps.getSaloonCategories.data.data,
  //       });
  //       // console.log(
  //       //   nextProps.getSaloonCategories.data.data,
  //       //   'getSaloonCategoriesDatagetSaloonCategoriesDatagetSaloonCategoriesDatagetSaloonCategoriesData',
  //       // );
  //     } else if (
  //       !nextProps.getSaloonCategories.failure &&
  //       !nextProps.getSaloonCategories.isFetching &&
  //       nextProps.getSaloonCategories.data &&
  //       !nextProps.getSaloonCategories.data.success
  //     ) {
  //       this.setState({isloading: false}, () => {
  //         setTimeout(() => {
  //           Alert.alert('Error', nextProps.getSaloonCategories.data.msg);
  //         }, 3000);
  //       });
  //     }
  //   }
  // }
  // componentDidMount = () => {
  //   this.handleSaloonCategories();
  // };

  // handleSaloonCategories = () => {
  //   const {id} = this.props;
  //   console.log(id, 'ididididididididididid');
  //   this.setState({isLoading: true});
  //   const payload = {
  //     id,
  //   };
  //   this.props.get_Saloon_Categories(payload);
  // };

  _renderOverlaySpinner = () => {
    const {isloading} = this.state;
    return <SpinnerLoader isloading={isloading} />;
  };
  renderHeaderLogo = () => {
    return (
      <View style={styles.logoView}>
        <Image source={Images.easy1_logo_800x300} style={styles.logoImage} />
      </View>
    );
  };
  renderSubmitBtn = () => {
    return (
      <View>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => this.setState({showBookedModal: true })}>
          <Text style={styles.submitBtnText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {getSelectedCategory} = this.state;
    const {isFetching, failure} = this.props.getSaloonCategories;
    return (
      <View style={styles.container}>
        <Header
          headerText={'Booking Form'}
          leftIcon={Images.pagination_back}
          leftBtnPress={() => this.props.navigation.goBack()}
        />

        {this.state.showBookedModal &&
         <BookedSuccessModal
         onPress={()=>{this.props.navigation.navigate('Home'),this.setState({showBookedModal: false })}}
         onCancel={()=>this.setState({showBookedModal: false })}
         />        
        }

        {<SpinnerLoader isloading={isFetching} />}

        {isFetching == false && failure == false && (
          <ScrollView>
            {this.renderHeaderLogo()}
            <View>
              <CustomTextInput
                placeholderText={'Enter Your Name'}
                style={styles.textInput}
              />
              <CustomTextInput
                placeholderText={'Postal'}
                style={styles.textInput}
              />
              <CustomTextInput
                placeholderText={'Phone Number'}
                style={styles.textInput}
              />
              <CustomTextInput
                placeholderText={'Eamil'}
                style={styles.textInput}
              />
              {this.renderSubmitBtn()}
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state, 'sssaaaaaaaaaafffffffffffffffffffsssssssssssss');
  return {
    getSaloonCategories: state.getSaloonCategories,
  };
};

const action = {get_Saloon_Categories};

export default connect(mapStateToProps, action)(BookingForm);
