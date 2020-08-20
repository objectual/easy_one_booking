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
  PermissionsAndroid,
} from 'react-native';
import FloatingLabel from 'react-native-floating-labels';
import styles from './styles';
import { Images, Metrics, Fonts, Colors } from '../../theme';

import SpinnerLoader from '../../components/SpinnerLoader';
import Cards from '../..//components/Card';
import { Footer } from '../../components';
import { Icon } from 'react-native-vector-icons/MaterialIcons';
import { request as get_Saloon } from '../../redux/actions/GetSaloon';
import Geolocation from '@react-native-community/geolocation';
// import {request as ge} from '../../redux/actions/GetCategories';
import { Dropdown } from 'react-native-material-dropdown';
import Immutable from 'seamless-immutable';

import { request as get_Saloon_By_Category } from '../../redux/actions/GetSaloonByCategory';
import { request as get_Saloon_By_Category_NearBy } from '../../redux/actions/GetSaloonNearBy';
import {
  place_reverse_Geocoding_URL,
  place_Autocomplete_URL,
  secret_Key,
} from '../../config/WebServices';
import { request as get_Services } from '../../redux/actions/GetServices';

var saloonsData = [];
var categoriesData = [];

class DrawerSaloons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchByCategory: '',
      searchByLocation: '',
      saloonRadius: 25000,
      byRating: '',
      byServices: '',
      longitude: '',
      latitude: '',
      selectCard: null,
      searchTerm: '',
      suggestion: [],
      categoryId: '',
      predictionsData: [],
      selectedLocation: '',
      saloonNearBy: false,
      saloonsNearByData: [],
      selectedLocationSaloons: false,
      permission: false,
      showData: [],
      saloonsBycategoriesData: [],
      saloonsData: [],
      categoriesData: [],
      saloonsSuccess: false,
      categoriesSuccess: false,
      saloonsBycategoriesDataSuccess: false,
      saloonsNearByData: [],
      saloonsNearByDataSuccess: false,
      expandSearchByCategory: false,
      expandSearchByLocation: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    let object = {};

    if (props.getSaloon.success !== state.saloonsSuccess) {
      object = {
        saloonsSuccess: props.getSaloon.success,
        saloonsData: props.getSaloon.data.saloons,
        showData: props.getSaloon.data.saloons,
      };

      console.log('::::::::::::::::::::::::::::::::', props.getSaloon);
    }

    if (props.getServices.success !== state.categoriesSuccess) {
      object = {
        categoriesSuccess: props.getServices.success,
        categoriesData: props.getServices.data.data,
      };
    }
    // alert(props.getServices.success)

    // // console.log(props.getSaloonNearBy.success,'props.getSaloonNearBy.successdsdsdsds')

    if (
      props.getSaloonNearBy.success !== undefined &&
      props.getSaloonNearBy.success !== state.saloonsNearByDataSuccess
    ) {
      object = {
        saloonsNearByDataSuccess: props.getSaloonNearBy.success,
        saloonsNearByData: props.getSaloonNearBy.data.data,
        showData: props.getSaloonNearBy.data.data,
      };
    }

    if (
      props.getSaloonByCategory.success !== undefined &&
      props.getSaloonByCategory.success !== state.saloonsBycategoriesDataSuccess
    ) {
      object = {
        saloonsBycategoriesDataSuccess: props.getSaloonByCategory.success,
        saloonsBycategoriesData: props.getSaloonByCategory.data.data,
        showData: [...props.getSaloonByCategory.data.data],
        // showData: [],
      };
    }

    return object;

    // if (
    //   JSON.stringify(props.getSaloonByCategory.data.data) !==
    //   JSON.stringify(state.saloonsData)
    // ) {
    //   return {
    //     saloonsData: props.getSaloonByCategory.data.data,
    //   };
    // }
    // if (state.suggestion.length == 0) {
    //   return {saloonsData: []};
    // }

    // if (props.getSaloonNearBy.data != undefined) {
    //   return {saloonsNearByData: props.getSaloonNearBy.data.data};
    // }
  }

  // onChangeSearchBar = (value) => this.setState({searchByCategory: value});

  onChangeSaloonRadius = (value) => this.setState({ saloonRadius: value });
  onChangeByRating = (value) => this.setState({ byRating: value });
  onChangeByServices = (value) => this.setState({ byServices: value });
  onChangeTextSelectedValue = async (value) => {
    // this.setState({categoryId: value});
    await this.props.get_Saloon_By_Category({ serviceId: value._id });
    this.setState({ suggestion: [], searchTerm: value.name });
  };

  onChangeSearchBar = async (searchTerm) => {
    this.setState({ searchTerm, saloonNearBy: false });
    try {
      if (
        searchTerm.trim().length >= 1 &&
        this.state.categoriesData.length != 0
      ) {
        var suggestion = await Immutable.asMutable(
          this.state.categoriesData,
        ).filter((x) => {
          return new RegExp(searchTerm, 'i').test(x.name);
        });

        if (suggestion.length == 0) {
          this.setState({ suggestion: [] });
        } else {
          this.setState({ suggestion: suggestion });
        }
      } else {
        this.setState((state) => ({
          suggestion: [],
          showData: state.saloonsData,
        }));
      }
    } catch (e) {
      this.setState({ suggestion: [] });
    }
  };

  onChangeSearchByLocation = async (value) => {
    this.setState({ searchByLocation: value });

    if (value.length == 0) {
      this.setState({ predictionsData: [], selectedLocationSaloons: false });
    }
    if (value.length > 1) {
      let response = await fetch(
        `${place_Autocomplete_URL}input=${value}&key=${secret_Key}`,
      );

      let prediction = await response.json();

      try {
        if (prediction.predictions.length !== 0) {
          this.setState({ predictionsData: prediction.predictions });
        }
      } catch (e) {
        this.setState({ predictionsData: [] });
      }
    }
    // else {
    //   await this.setState({predictionsData: [], selectedLocationSaloons: false});
    // }
  };

  requestLocationPermission = async () => {
    if (Platform.OS == 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.getLocationHandler();
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      this.getLocationHandler();
    }
  };

  async componentDidMount() {
    await this.requestLocationPermission();
    this.props.get_Services();
    this.props.get_Saloon();
  }

  getLocationHandler = async () => {
    // this.setState({isLoading: true});
    Geolocation.getCurrentPosition(
      (pos) => {
        this.setState(
          {
            longitude: pos.coords.longitude,
            latitude: pos.coords.latitude,
            permission: true,
            // radius: 5000,
          },
          async () => await this.handleGetSaloon(),
        );
      },
      (error) => console.log(error, 'error'),
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 10000 },
    );
  };
  handleGetSaloon = () => {
    const { longitude, latitude, saloonRadius } = this.state;
    const payload = {
      longitude,
      latitude,
      radius: saloonRadius,
    };
  };

  _renderOverlaySpinner = () => {
    return <SpinnerLoader isloading={true} />;
  };
  renderShowCategoryButton = () => {
    const { selectCard } = this.state;
    // console.log( selectCard, 'selectCardselectCardselectCardselectCard')
    return (
      <View>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() =>
            this.props.navigation.navigate('Categories', {
              id: selectCard.saloon._id,
            })
          }>
          <Text style={styles.submitBtnText}>Show Category</Text>
        </TouchableOpacity>
      </View>
    );
  };
  renderTextInputWithLableRow = (
    // lable,
    // ref,
    // returnKeyType,
    onChangeText,
    // icon,
    value,
    placeholder,
    // keyboardType,
    // onSubmitEditing,
    // secureTextEntry,
    // CustomTextInput,
  ) => {
    return (
      <TextInput
        style={[
          styles.textInputWithLabel,
          this.state.suggestion.length != 0 && {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          },
        ]}
        placeholderTextColor="#81788B"
        onSubmitEditing={() => {
          this.setState({ expandSearchByCategory: false });
        }}
        onFocus={() => this.setState({ expandSearchByCategory: true })}
        ref={(input) => (this.searchInput = input)}
        // ref={(o) => {
        //   ref = o;
        // }}
        // returnKeyType={returnKeyType}
        onChangeText={onChangeText}
        // icon={icon}
        value={value}
        // icon={icon}
        // value={this.state.value}
        placeholder={placeholder}
      // rightIcon={Images.arrow}
      // autoCompleteType="off"
      // keyboardType={keyboardType}
      // onSubmitEditing={() => {
      //   this.onSubmit(onSubmitEditing);
      // }}
      // secureTextEntry={secureTextEntry}
      />
    );
  };

  renderTextInputWithLable = (
    // lable,
    // ref,
    // returnKeyType,
    onChangeText,
    placeholder,
    value,
    // keyboardType,
    // onSubmitEditing,
    // secureTextEntry,
    // CustomTextInput,
  ) => {
    return (
      <View>
        {/* <Text style={styles.labelText}>{lable}</Text> */}
        <TextInput
          style={[
            styles.textInput,
            this.state.predictionsData.length != 0 && {
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            },
          ]}
          placeholderTextColor="#81788B"
          // onFocus={()=>this.setState({expandSearchByLocation: true })}

          // ref={(o) => {
          //   ref = o;
          // }}
          // returnKeyType={returnKeyType}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
        // autoCompleteType="off"
        // keyboardType={keyboardType}
        // onSubmitEditing={() => {
        //   this.onSubmit(onSubmitEditing);
        // }}
        // secureTextEntry={secureTextEntry}
        />
      </View>
    );
  };

  getSaloonNearBy = async () => {
    if (this.state.saloonNearBy) {
      // this.setState({saloonNearBy: false});
      this.setState((state) => ({
        showData: state.saloonsData,
        saloonNearBy: false,
      }));
    } else {
      if (this.state.permission) {
        const { longitude, latitude, saloonRadius } = this.state;
        const payload = {
          longitude,
          latitude,
          // radius:saloonRadius
        };

        this.props.get_Saloon_By_Category_NearBy(payload);
        this.setState({ saloonNearBy: true });
      } else {
        await this.requestLocationPermission();
        // const {longitude, latitude, saloonRadius} = this.state;
        // const payload = {
        //   longitude,
        //   latitude,
        //   // radius:saloonRadius
        // };
        // // const payload =  {"longitude": "67.0560109", "latitude": "24.8723881"}
        // console.log(payload, 'payloadDrawerSaloon');
        // await this.props.get_Saloon_By_Category_NearBy(payload);
        // this.setState({saloonNearBy: true});
      }
    }
  };

  onSelectedLocationSaloons = () => {
    const { longitude, latitude, saloonRadius } = this.state;
    const payload = {
      longitude,
      latitude,
      // radius:saloonRadius
    };
    console.log(payload, 'get_Saloon_By_Category_NearBy');
    this.props.get_Saloon_By_Category_NearBy(payload);
    this.setState({ selectedLocationSaloons: true, predictionsData: [] });
  };

  renderFilter() {
    return (
      <TouchableOpacity
        onPress={() => this.getSaloonNearBy()}
        style={[
          styles.textInput,
          this.state.saloonNearBy == true && { backgroundColor: '#FF3600' },
        ]}>
        <Text
          style={[
            this.state.saloonNearBy == true
              ? { color: Colors.white }
              : { color: Colors.taupeGrey },
          ]}>
          {' '}
          Salon within 10km
        </Text>
      </TouchableOpacity>
    );
  }

  onSelectedLocation = async (value) => {
    this.setState({
      selectedLocation: value.place_id,
      searchByLocation: value.description,
    });
    try {
      let response = await fetch(
        `${place_reverse_Geocoding_URL}place_id=${value.place_id}&key=${secret_Key}`,
      );

      let statusCode = response.status;

      let reverseGeocoding = await response.json();

      console.log(response, 'response');

      if (statusCode == 200) {
        let object = reverseGeocoding.results.pop();
        this.setState({
          latitude: object.geometry.location.lat,
          longitude: object.geometry.location.lng,
        });
        await this.onSelectedLocationSaloons();
        // console.log(this.state.latitude, 'latitude');
        // console.log(this.state.longitude, 'longitude');
      }
    } catch (e) {
      console.log(e, 'reverseGeocodingFetch');
    }
  };

  render() {
    const {
      searchByCategory,
      searchByLocation,
      byServices,
      saloonRadius,
      byRating,
    } = this.state;

    const { getSaloon, getSaloonNearBy, getSaloonByCategory } = this.props;

    // const {isFetching, failure, data} = this.props.getSaloon;
    // saloonsData = data.data;
    // categoriesData = this.props.getServices.data.data;
    // console.log(this.props.getSaloon, 'this.props.getSaloon');
    // console.log(this.state.saloonsNearByData, 'this.state.getSaloonNearBy');

    // const getSaloon = this.props.getSaloon;
    // const getSaloonNearBy = this.props.getSaloonNearBy;
    console.log(this.state.showData, 'showDatashowData');
    console.log(
      'predictionsDatapredictionsDatapredictionsData',
      this.state.predictionsData,
      'predictionsDatapredictionsDatapredictionsData',
    );
    return (
      <Footer navigation={this.props.navigation.navigate} screen={'saloon'}>
        <ScrollView>
          <View style={{ marginHorizontal: Metrics.ratio(15) }}>
            {this.renderTextInputWithLableRow(
              this.onChangeSearchBar,
              this.state.searchTerm,
              'Search Category',
            )}

            {this.state.suggestion.length != 0 && (
              <FlatList
                showsVerticalScrollIndicator={false}
                style={{ marginBottom: 10, marginTop: -20 }}
                data={this.state.suggestion}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => this.onChangeTextSelectedValue(item)}
                    style={{
                      width: '100%',
                      borderRadius: 3,
                      borderWidth: 0,
                      paddingLeft: Metrics.screenWidth * 0.03,
                      backgroundColor: '#FFFF',
                      height: 40,
                      justifyContent: 'center',
                      borderBottomLeftRadius:
                        this.state.suggestion.length == index + 1 ? 15 : 0,
                      borderBottomRightRadius:
                        this.state.suggestion.length == index + 1 ? 15 : 0,
                    }}>
                    <Text style={{ color: Colors.taupeGrey }}>{item?.name}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
            <View
              style={
                {
                  // flexDirection: 'row',
                  // justifyContent: 'space-between',
                }
              }>
              {this.renderTextInputWithLable(
                this.onChangeSearchByLocation,
                // searchByLocation,
                'Search By Location',
                this.state.searchByLocation,
                // 'inputPostalCode',
                // 'text',
                // 'numeric',
                // false,
              )}
            </View>

            {this.state.predictionsData.length != 0 && (
              <FlatList
                showsVerticalScrollIndicator={false}
                style={{ marginBottom: 10, marginTop: -20 }}
                data={this.state.predictionsData}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => this.onSelectedLocation(item)}
                    style={{
                      width: '100%',
                      borderRadius: 3,
                      borderWidth: 0,
                      paddingLeft: Metrics.screenWidth * 0.03,
                      backgroundColor: '#FFFF',
                      height: 40,
                      justifyContent: 'center',
                      borderBottomLeftRadius:
                        this.state.predictionsData.length == index + 1 ? 15 : 0,
                      borderBottomRightRadius:
                        this.state.predictionsData.length == index + 1 ? 15 : 0,
                    }}>
                    <Text style={{ color: Colors.taupeGrey }}>
                      {item.description}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            )}
            {this.renderFilter()}
          </View>

          {(getSaloon.isFetching ||
            getSaloonNearBy.isFetching ||
            getSaloonByCategory.isFetching) &&
            this._renderOverlaySpinner()}

          <FlatList
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}
            data={this.state.showData}
            renderItem={({ item, index }) => {
              console.log('itemeiejee', item);

              let title = item.saloon
                ? item.saloon.name
                : item.company?.name
                  ? item.company?.name
                  : item?.name;
              let description = item.saloon
                ? item.saloon?.companyShortDescription
                : item.company
                  ? item.company?.companyShortDescription
                  : item.companyShortDescription;

              let salonId = item.saloon
                ? item.saloon?._id
                : item.company
                  ? item.company?._id
                  : item._id;

              return (
                <Cards
                  title={title}
                  description={description}
                  image={
                    item.template?.coverImage.url
                      ? item.template?.coverImage.url
                      : item.templateID?.coverImage.url
                  }
                  // image={item.templateID?.coverImage.url}
                  onPress={() =>
                    this.props.navigation.navigate('Categories', {
                      id: salonId,
                    })
                  }
                />
              );
            }}
          />
        </ScrollView>
      </Footer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getSaloon: state.getSaloon,
    getSaloonNearBy: state.getSaloonNearBy,
    getCategories: state.getCategories,
    getSaloonByCategory: state.getSaloonByCategory,
    getServices: state.getServices,
  };
};

const action = {
  get_Saloon,
  get_Services,
  get_Saloon_By_Category,
  get_Saloon_By_Category_NearBy,
};

export default connect(mapStateToProps, action)(DrawerSaloons);
