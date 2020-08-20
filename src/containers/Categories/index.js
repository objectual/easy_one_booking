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
  ImageBackground,
} from 'react-native';
import FloatingLabel from 'react-native-floating-labels';
import styles from './styles';
import {Images, Metrics, Fonts} from '../../theme';
import SpinnerLoader from '../../components/SpinnerLoader';
import {Footer} from '../../components';
import Header from '../../components/Header/index';

import StarRating from 'react-native-star-rating';
import {request as get_Saloon_Categories} from '../../redux/actions/SaloonCategories';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getSelectedCategory: [],
      categoryId: null,
      selectedCard: null,
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
        // this.setState({ isloading: false }, () => {
        //   setTimeout(() => {
        //     Alert.alert('Error', nextProps.getSaloonCategories.data.msg);
        //   }, 3000);
        // });
        this.setState({isloading: false});
      }
    }
  }
  componentDidMount = () => {
    this.handleSaloonCategories();
  };

  handleSaloonCategories = () => {
    const {selectedCard} = this.props.route.params;
    this.setState({isLoading: true, selectedCard});
    const payload = {
      companyId: selectedCard._id,
    };
    this.props.get_Saloon_Categories(payload);
  };

  _renderOverlaySpinner = () => {
    const {isloading} = this.state;
    return <SpinnerLoader isloading={isloading} />;
  };

  renderCategory = (category, index) => {
    const {selectedCard} = this.props.route.params;
    let id = selectedCard._id;

    return (
      <View>
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
          {
            category && category.image && category.image && (
              <View style={styles.servicebox}>
                <View
                  style={{
                    height: Metrics.screenHeight * 0.2,
                    width: Metrics.screenWidth * 0.42,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={{
                      marginTop: Metrics.ratio(20),
                      width: Metrics.ratio(120),
                      height: Metrics.ratio(100),
                    }}
                    resizeMethod="auto"
                    resizeMode="contain"
                    source={{uri: category.image}}
                  />
                </View>
                <View
                  style={{
                    marginTop: Metrics.ratio(10),
                    borderBottomLeftRadius: Metrics.ratio(10),
                    borderBottomRightRadius: Metrics.ratio(10),
                    // paddingVertical: Metrics.ratio(10),
                    overflow: 'hidden',
                  }}>
                  <Text numberOfLines={1} style={styles.titleText}>
                    {category && category.name ? category.name : 'name'}
                  </Text>
                </View>
              </View>
            )
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
    const {getSelectedCategory} = this.state;
    if (getSelectedCategory.length == 0) {
      return (
        <View style={styles.textContainer}>
          <Text style={styles.textNotFound}>No Categories Found</Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: Metrics.screenWidth * 0.06,
          }}>
          <FlatList
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            data={getSelectedCategory}
            renderItem={({item, index}) => this.renderCategory(item, index)}
          />
        </View>
      );
    }
  };

  render() {
    const {getSelectedCategory, selectedCard} = this.state;

    console.log('sfdsdf', selectedCard);

    const {isFetching, failure} = this.props.getSaloonCategories;
    return (
      <Footer navigation={this.props.navigation.navigate} screen={'saloon'}>
        <View style={styles.container}>
          {<SpinnerLoader isloading={isFetching} />}
          {isFetching == false && failure == false && (
            <ScrollView>
              <View style={styles.containerForRow}>
                <Text style={styles.mainheading0}>{selectedCard?.name}</Text>

                <Text style={styles.mainheading1}>Description</Text>
                <Text>{selectedCard?.companyShortDescription}</Text>
                <Text style={styles.mainheading1}>Address</Text>
                <Text style={styles.mainheading2}>
                  {selectedCard?.address.toUpperCase()}
                </Text>

                <View style={styles.ratingContainer}>
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={4}
                    starStyle={{color: 'orange'}}
                    starSize={20}
                  />
                </View>
              </View>
              <ScrollView horizontal={true}>
                <View>{this.renderCategoryRow()}</View>
              </ScrollView>
            </ScrollView>
          )}
        </View>
      </Footer>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state, 'sssaaaaaaaaaafffffffffffffffffffsssssssssssss');
  return {
    getSaloonCategories: state.getSaloonCategories,
  };
};

const action = {get_Saloon_Categories};

export default connect(mapStateToProps, action)(Categories);
