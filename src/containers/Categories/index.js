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

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getSelectedCategory: [],
      categoryId: null,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.getSaloonCategories) {
      if (
        !nextProps.getSaloonCategories.failure &&
        !nextProps.getSaloonCategories.isFetching &&
        nextProps.getSaloonCategories.data &&
        nextProps.getSaloonCategories.data.success
      ) {
        this.setState({
          getSelectedCategory: nextProps.getSaloonCategories.data.data,
        });
        // console.log(
        //   nextProps.getSaloonCategories.data.data,
        //   'getSaloonCategoriesDatagetSaloonCategoriesDatagetSaloonCategoriesDatagetSaloonCategoriesData',
        // );
      } else if (
        !nextProps.getSaloonCategories.failure &&
        !nextProps.getSaloonCategories.isFetching &&
        nextProps.getSaloonCategories.data &&
        !nextProps.getSaloonCategories.data.success
      ) {
        this.setState({isloading: false}, () => {
          setTimeout(() => {
            Alert.alert('Error', nextProps.getSaloonCategories.data.msg);
          }, 3000);
        });
      }
    }
  }
  componentDidMount = () => {
    this.handleSaloonCategories();
  };

  handleSaloonCategories = () => {
    const {id} = this.props;
    console.log(id, 'ididididididididididid');
    this.setState({isLoading: true});
    const payload = {
      id,
    };
    this.props.get_Saloon_Categories(payload);
  };

  _renderOverlaySpinner = () => {
    const {isloading} = this.state;
    return <SpinnerLoader isloading={isloading} />;
  };

  renderCategory = (category, index) => {
    const {id} = this.props;
    return (
      <View style={styles.containerForRow}>
        <View style={[styles.servicebox, {flexDirection: 'row'}]}>
          <View style={{width: Metrics.screenWidth * 0.3}}>
            {category && category.image ? (
              <Image
                source={{uri: category.image}}
                style={styles.servicesImage}
              />
            ) : (
              <Image
                source={Images.select_services}
                style={styles.servicesImage}
              />
            )}
          </View>
          <View
            style={{
              justifyContent: 'center',
              width: Metrics.screenWidth * 0.45,
            }}>
            <Text numberOfLines={1} style={styles.titleText}>
              {category && category.name ? category.name : 'name'}
            </Text>
          </View>
          <TouchableOpacity
            style={
              category && category._id == category._id
                ? styles.showcardradius
                : null
            }
            onPress={() =>
              this.props.navigation.navigate('ServicesPage', {
                id: category._id,
                companyId: id,
              })
            }>
            <View style={{width: Metrics.screenWidth * 0.1}}>
              <Image source={Images.arrow} style={styles.arrowImage} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderCategoryRow = () => {
    const {getSelectedCategory} = this.state;
    return (
      <View>
        <FlatList
          data={getSelectedCategory}
          renderItem={({item, index}) => this.renderCategory(item, index)}
          // keyExtractor={item => item.id}
          // extraData={selected}
        />
      </View>
    );
  };

  render() {
    const {getSelectedCategory} = this.state;
    return (
      <View style={styles.container}>
        <Header
          headerText={'Categories'}
          leftIcon={Images.pagination_back}
          leftBtnPress={() => this.props.navigation.goBack()}
        />
        <ScrollView>
          <View>
            {getSelectedCategory.length != 0 && this.renderCategoryRow()}
            {/* {this.renderCategory()} */}
          </View>
        </ScrollView>
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

export default connect(mapStateToProps, action)(Categories);
