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
  PermissionsAndroid
} from 'react-native';
import FloatingLabel from 'react-native-floating-labels';
import styles from './styles';
import {Images, Metrics, Fonts, Colors} from '../../theme';

import SpinnerLoader from '../../components/SpinnerLoader';
import Cards from '../..//components/Card';
import {Icon} from 'react-native-vector-icons/MaterialIcons';
import {request as get_Saloon} from '../../redux/actions/GetSaloon';
import Geolocation from '@react-native-community/geolocation';
// import {request as ge} from '../../redux/actions/GetCategories';
import {Dropdown} from 'react-native-material-dropdown';
import Immutable from 'seamless-immutable';
import {request as get_Saloon_By_Category} from '../../redux/actions/GetSaloonByCategory';
import {request as get_Saloon_By_Category_NearBy} from '../../redux/actions/GetSaloonNearBy';
import {
  place_reverse_Geocoding_URL,
  place_Autocomplete_URL,
  secret_Key,
} from '../../config/WebServices';
import {request as get_Services} from '../../redux/actions/GetServices';

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
      saloonsData: [],
      categoriesData: [],
      searchTerm: '',
      suggestion: [],
      categoryId: '',
      predictionsData: [],
      selectedLocation: '',
      saloonNearBy: false,
      saloonsNearByData: [],
      selectedLocationSaloons: false,
      permission: false
    };
  }

 

  static getDerivedStateFromProps(props, state) {
    console.log(props.getSaloonByCategory.data.data, 'props.getSaloonByCategory.data.data');

    if (
      JSON.stringify(props.getSaloonByCategory.data.data) !==
      JSON.stringify(state.saloonsData)
    ) {
      return {
        saloonsData: props.getSaloonByCategory.data.data,
      };
    }
    if (state.suggestion.length == 0) {
      return {saloonsData: []};
    }

    if (props.getSaloonNearBy.data != undefined) {
      return {saloonsNearByData: props.getSaloonNearBy.data.data};
    }
  }

  // onChangeSearchBar = (value) => this.setState({searchByCategory: value});

  onChangeSaloonRadius = (value) => this.setState({saloonRadius: value});
  onChangeByRating = (value) => this.setState({byRating: value});
  onChangeByServices = (value) => this.setState({byServices: value});
  onChangeTextSelectedValue = async (value) => {
    // this.setState({categoryId: value});
    await this.props.get_Saloon_By_Category({serviceId: value._id});
    this.setState({suggestion:[],searchTerm:value.name})
  };

  onChangeSearchBar = async (searchTerm) => {
    this.setState({searchTerm, saloonNearBy: false});
    try {
      if (searchTerm.trim().length >= 1 && categoriesData.length != 0) {
        var suggestion = await Immutable.asMutable(categoriesData).filter(
          (x) => {
            return new RegExp(searchTerm, 'i').test(x.name);
          },
        );

        console.log(categoriesData, 'suggestion');

        if (suggestion.length == 0) {
          this.setState({suggestion: []});
        } else {
          this.setState({suggestion: suggestion});
        }
      } else {
        this.setState({suggestion: []});
      }
    } catch (e) {
      this.setState({suggestion: []});
    }
  };

  onChangeSearchByLocation = async (value) => {
    this.setState({searchByLocation: value});

    if (value.length == 0) {
      this.setState({predictionsData: [], selectedLocationSaloons: false});
    }
    if (value.length > 1) {
      let response = await fetch(
        `${place_Autocomplete_URL}input=${value}&key=${secret_Key}`,
      );

      let prediction = await response.json();

      console.log(prediction, 'prediction');

      try {
        if (prediction.predictions.length !== 0) {
          this.setState({predictionsData: prediction.predictions});
        }
      } catch (e) {
        this.setState({predictionsData: []});
      }
    }
    // else {
    //   await this.setState({predictionsData: [], selectedLocationSaloons: false});
    // }
  };


  requestLocationPermission = async () => {
    if(Platform.OS == 'android')
    {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            this.getLocationHandler()
        } else {
          console.log("Location permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
   }
   else
   {
     this.getLocationHandler()
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

        console.log(pos,'getCurrentPosition')
        this.setState(
          {
            longitude: pos.coords.longitude,
            latitude: pos.coords.latitude,
            permission: true
            // radius: 5000,
          },
          async () => await this.handleGetSaloon(),
        );
        console.log('latitude: ', pos.coords.longitude);
        console.log('longitude: ', pos.coords.latitude);
      },
      (error) => console.log(error,'error') ,
      {enableHighAccuracy: false, timeout: 5000, maximumAge: 10000},
    );
  };
  handleGetSaloon = () => {
    const {longitude, latitude, saloonRadius} = this.state;
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
    const {selectCard} = this.state;
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
            style = {[styles.textInputWithLabel, value.length != 0 && { borderRadius:0 } ]}
            placeholderTextColor="#81788B"
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
          style={[styles.textInput,value.length != 0 && { borderRadius:0 }]}
          placeholderTextColor="#81788B"
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
      this.setState({saloonNearBy: false});
    } else {

      if(this.state.permission)
      {
        const {longitude, latitude, saloonRadius} = this.state;
        const payload = {
          longitude,
          latitude,
          // radius:saloonRadius
        };
        console.log(payload, 'payloadDrawerSaloon');
        this.props.get_Saloon_By_Category_NearBy(payload);
        this.setState({saloonNearBy: true});
     }
     else
     {
      await this.requestLocationPermission()
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
    const {longitude, latitude, saloonRadius} = this.state;
    const payload = {
      longitude,
      latitude,
      // radius:saloonRadius
    };
    console.log(payload, 'get_Saloon_By_Category_NearBy');
    this.props.get_Saloon_By_Category_NearBy(payload);
    this.setState({selectedLocationSaloons: true, predictionsData:[] });
  };

  renderFilter() {
    return (
      <TouchableOpacity
        onPress={() => this.getSaloonNearBy()}
        style={[
          styles.textInput,
          this.state.saloonNearBy == true && {backgroundColor: '#FF3600'},
        ]}>
        <Text style={[this.state.saloonNearBy == true ? {color: Colors.white} : {color: Colors.taupeGrey} ]}> Saloon within 2km</Text>
      </TouchableOpacity>
    );
  }

  onSelectedLocation = async (value) => {
    this.setState({selectedLocation: value.place_id, searchByLocation: value.description });
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
    const {isFetching, failure, data} = this.props.getSaloon;
    saloonsData = data.data;
    categoriesData = this.props.getServices.data.data;
    console.log(this.props.getSaloon, 'this.props.getSaloon');
    console.log(this.state.saloonsNearByData, 'this.state.getSaloonNearBy');

    const getSaloon = this.props.getSaloon;
    const getSaloonNearBy = this.props.getSaloonNearBy;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{marginHorizontal: Metrics.ratio(15)}}>
            {this.renderTextInputWithLableRow(
              // '',
              // 'inputName',
              // 'next',
              this.onChangeSearchBar,
              // searchByCategory,
              this.state.searchTerm,
              // searchByCategory,
              // '',
              'Search Category',
              // 'numeric',
              // false,
            )}

            {this.state.suggestion.length != 0 && (
              // <Dropdown
              //   label={'Please select category'}
              //   labelExtractor={(x) => x.name}
              //   valueExtractor={(x) => x._id}
              //   dropdownOffset={{top: 32, left: 10}}
              //   containerStyle={{
              //     width: '100%',
              //     borderWidth: 0,
              //     marginTop: -20,
              //     marginBottom: 10,
              //   }}
              //   pickerStyle={{width: '95%'}}
              //   data={this.state.suggestion}
              //   onChangeText={(value) => this.onChangeTextSelectedValue(value)}
              // />
              <FlatList
              showsVerticalScrollIndicator={false}
                style={{marginBottom: 10,  marginTop: -20,}}
                data={this.state.suggestion}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    onPress={() => this.onChangeTextSelectedValue(item)}
                    style={{
                      width: '100%',
                      borderRadius: 3,
                      borderWidth: 0,
                      paddingLeft: Metrics.screenWidth * 0.03,
                      backgroundColor:'#FFFF',
                      height: 40,
                      justifyContent: 'center',
                    }}>
                    <Text style={{color: Colors.taupeGrey}}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
            <View
              style={{
                // flexDirection: 'row',
                // justifyContent: 'space-between',
              }}>
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
              // <Dropdown
              //   value={this.state.selectedLocation}
              //   label={'Please select location'}
              //   labelExtractor={(x) => x.description}
              //   valueExtractor={(x) => x.place_id}
              //   dropdownOffset={{top: 32, left: 10}}
              //   containerStyle={{
              //     width: '100%',
              //     borderWidth: 0,
              //     marginTop: -20,
              //     marginBottom: 10,
              //   }}
              //   pickerStyle={{width: '95%'}}
              //   data={this.state.predictionsData}
              //   onChangeText={(value) => this.onSelectedLocation(value)}
              // />
              <FlatList
                showsVerticalScrollIndicator={false}
                style={{ marginBottom: 10, marginTop: -20 }}
                data={this.state.predictionsData}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    onPress={() => this.onSelectedLocation(item)}
                    style={{
                      width: '100%',
                      borderRadius: 3,
                      borderWidth: 0,
                      paddingLeft: Metrics.screenWidth * 0.03,
                      backgroundColor:'#FFFF',
                      height: 40,
                      justifyContent: 'center',
                    }}>
                    <Text style={{color: Colors.taupeGrey}}>
                      {item.description}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            )}

             {this.renderFilter()}


            {/* {this.renderShowCategoryButton()} */}
          </View>

          {(this.props.getSaloonByCategory.isFetching ||
            this.props.getSaloon.isFetching) &&
            this._renderOverlaySpinner()}

          {(getSaloonNearBy.isFetching || this.props.getSaloon.isFetching) &&
            this._renderOverlaySpinner()}

          {this.state.searchTerm.length != 0 && this.state.saloonsData != 0 && (
            <FlatList
              showsVerticalScrollIndicator={false}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: 'space-between',
                paddingHorizontal: 10,
              }}
              data={this.state.saloonsData}
              renderItem={({item, index}) => {
                console.log(item,'////oooooo')
                return(
                  <Cards
                  // item={{saloon: item}}
                  title = {item.company.name}
                  description = {item.company.companyShortDescription}
                  image = {item.template.coverImage.url}
                  onPress={() =>
                    this.props.navigation.navigate('Categories', {
                      id: item.company._id,
                    })
                  }
                />
                )
              }}
            />
          )}

          {this.state.saloonNearBy == false &&
            this.state.selectedLocationSaloons == false &&
            getSaloon.isFetching == false &&
            this.state.searchTerm.length == 0 &&
            getSaloon.failure == false &&
            getSaloon.data != undefined &&
            getSaloon.data.data.length != 0 && (
              <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={2}
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                }}
                data={getSaloon.data.data}
                renderItem={({item, index}) => (
                  <Cards
                  title = {item.saloon.name}
                  description = {item.saloon.companyShortDescription}
                  image = {item.template.coverImage.url}
                    onPress={() => {
                      console.log(item, 'mainDrawerSaloonsItem');
                      this.props.navigation.navigate('Categories', {
                        id: item.saloon._id,
                      });
                    }}
                  />
                )}
              />
            )}

          {console.log(
            getSaloonNearBy.data,
            'this.props.getSaloonNearBy.data.data',
          )}
          {(this.state.saloonNearBy == true ||
            this.state.selectedLocationSaloons == true) &&
            getSaloonNearBy.data &&
           (
              <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={2}
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                }}
                data={getSaloonNearBy.data.data}
                renderItem={({item, index}) => (
                  console.log(item, 'this.state.saloonNearBy == true'),
                  (
                    <Cards
                    title = {item.saloon.name}
                    description = {item.saloon.companyShortDescription}
                    image = {item.template.coverImage.url}
                      onPress={() =>
                        this.props.navigation.navigate('Categories', {
                          id: item.saloon._id,
                        })
                      }
                    />
                  )
                )}
              />
            )}
          {/*((this.state.saloonNearBy == true ||
            this.state.selectedLocationSaloons == true) &&
            getSaloonNearBy.isFetching &&
            getSaloonNearBy.data && 
            getSaloonNearBy.data.data && 
            getSaloonNearBy.data.data.length == 0 && (
              <View
                style={{
                  width: '100%',
                  borderWidth: 0,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>No Saloons Found</Text>
              </View>
            ))*/}
             
        </ScrollView>
      </View>
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
