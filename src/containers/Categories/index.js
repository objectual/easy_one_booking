import { connect } from 'react-redux';
import React, { Component } from 'react';
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
  ImageBackground
} from 'react-native';
import FloatingLabel from 'react-native-floating-labels';
import styles from './styles';
import { Images, Metrics, Fonts } from '../../theme';
import SpinnerLoader from '../../components/SpinnerLoader';
import Header from '../../components/Header/index';
import { request as get_Saloon_Categories } from '../../redux/actions/SaloonCategories';

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
        this.setState({ isloading: false }, () => {
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
    const { id } = this.props.route.params;
    console.log(id, 'ididididididididididid');
    this.setState({ isLoading: true });
    const payload = {
      companyId: id,
    };
    this.props.get_Saloon_Categories(payload);
  };

  _renderOverlaySpinner = () => {
    const { isloading } = this.state;
    return <SpinnerLoader isloading={isloading} />;
  };

  renderCategory = (category, index) => {
    const { id } = this.props.route.params;
    console.log(id, 'ididididid');
    return (
      <View >
        <TouchableOpacity
          style={
            category && category._id == category._id
              ? styles.showcardradius
              : null
          }
          onPress={() =>
            this.props.navigation.navigate('SaloonServicesByCategory', {
              categoryId: category._id,
              companyId: id,
            })
          }>
          {category && category.image && category.image &&
            <View
              
              style={styles.servicebox}
            >
              <Image
                    resizeMethod='auto'
                    resizeMode="stretch"
                    source={{ uri: category.image }}
                  />
              <Text numberOfLines={1} style={styles.titleText}>
                {category && category.name ? category.name : 'name'}
              </Text>
            </View>
            // (<ImageBackground
            //       source={Images.select_services}
            //       style={styles.servicebox}
            //     ></ImageBackground>)
          }
        </TouchableOpacity>
        {/* <View
            style={{
              justifyContent: 'center',
              width: Metrics.screenWidth * 0.45,
            }}>
            <Text numberOfLines={1} style={styles.titleText}>
              {category && category.name ? category.name : 'name'}
            </Text>
          </View> */}
        {/* <TouchableOpacity
            style={
              category && category._id == category._id
                ? styles.showcardradius
                : null
            }
            onPress={() =>
              this.props.navigation.navigate('SaloonServicesByCategory', {
                categoryId: category._id,
                companyId: id,
              })
            }>
            <View style={{width: Metrics.screenWidth * 0.1}}>
              <Image source={Images.arrow} style={styles.arrowImage} />
            </View>
          </TouchableOpacity> */}
      </View>

    );
  };

  renderCategoryRow = () => {
    const { getSelectedCategory } = this.state;
    if (getSelectedCategory.length == 0) {
      return (
        <View style={styles.textContainer}>
          <Text style={styles.textNotFound}>No Categories Found</Text>
        </View>
      );
    } else {
      return (
        <View style={{
          flexDirection: 'row',
          marginHorizontal: Metrics.screenWidth * 0.06
        }}>
          <FlatList
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            data={getSelectedCategory}
            renderItem={({ item, index }) => this.renderCategory(item, index)}
          />
        </View>
      );
    }
  };

  render() {
    const { getSelectedCategory } = this.state;

    const { isFetching, failure } = this.props.getSaloonCategories;
    return (
      <View style={styles.container}>
        <Header
          headerText={'Categories'}
          leftIcon={Images.pagination_back}
          leftBtnPress={() => this.props.navigation.goBack()}
        />
        {<SpinnerLoader isloading={isFetching} />}

        {isFetching == false && failure == false && (
          <ScrollView>
            <View>
              {this.renderCategoryRow()}
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

const action = { get_Saloon_Categories };

export default connect(mapStateToProps, action)(Categories);
