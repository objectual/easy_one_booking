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
import Cards from '../..//components/Card';
import {Icon} from 'react-native-vector-icons/MaterialIcons';

class DrawerSaloons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchByCategory: '',
      searchByLocation: '',
      saloonRadius: '',
      byRating: '',
      byServices: '',
    };
  }

  onChangeSearchBar = value => this.setState({searchByCategory: value});
  onChangeSearchByLocation = value => this.setState({searchByLocation: value});
  onChangeSaloonRadius = value => this.setState({saloonRadius: value});
  onChangeByRating = value => this.setState({byRating: value});
  onChangeByServices = value => this.setState({byServices: value});

  _renderOverlaySpinner = () => {
    const {isloading} = this.state;
    return <SpinnerLoader isloading={isloading} />;
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
    lable,
    ref,
    returnKeyType,
    onChangeText,
    icon,
    value,
    placeholder,
    keyboardType,
    onSubmitEditing,
    secureTextEntry,
    CustomTextInput,
  ) => {
    return (
      <View>
        <View style={styles.textInputRow}>
          <TextInput
            placeholderTextColor="#81788B"
            ref={o => {
              ref = o;
            }}
            returnKeyType={returnKeyType}
            onChangeText={onChangeText}
            icon={icon}
            value={this.state.value}
            placeholder={placeholder}
            rightIcon={Images.arrow}
            autoCompleteType="off"
            keyboardType={keyboardType}
            // onSubmitEditing={() => {
            //   this.onSubmit(onSubmitEditing);
            // }}
            secureTextEntry={secureTextEntry}
          />
          <Image
            source={Images.arrow} //Change your icon image here
            style={styles.ImageStyle}
          />
        </View>
        {/* <TextInput
          style={[styles.textInputRow, CustomTextInput]}
          placeholderTextColor="#81788B"
          ref={o => {
            ref = o;
          }}
          returnKeyType={returnKeyType}
          onChangeText={onChangeText}
          icon={icon}
          value={value}
          placeholder={placeholder}
          rightIcon={Images.arrow}
          autoCompleteType="off"
          keyboardType={keyboardType}
          // onSubmitEditing={() => {
          //   this.onSubmit(onSubmitEditing);
          // }}
          secureTextEntry={secureTextEntry}
        /> */}
      </View>
    );
  };

  renderTextInputWithLable = (
    lable,
    ref,
    returnKeyType,
    onChangeText,
    value,
    placeholder,
    keyboardType,
    onSubmitEditing,
    secureTextEntry,
    CustomTextInput,
  ) => {
    return (
      <View>
        {/* <Text style={styles.labelText}>{lable}</Text> */}
        <TextInput
          style={[styles.textInput, CustomTextInput]}
          placeholderTextColor="#81788B"
          ref={o => {
            ref = o;
          }}
          returnKeyType={returnKeyType}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          autoCompleteType="off"
          keyboardType={keyboardType}
          // onSubmitEditing={() => {
          //   this.onSubmit(onSubmitEditing);
          // }}
          secureTextEntry={secureTextEntry}
        />
      </View>
    );
  };

  render() {
    const {
      searchByCategory,
      searchByLocation,
      byServices,
      saloonRadius,
      byRating,
    } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{marginHorizontal: Metrics.ratio(15)}}>
            {this.renderTextInputWithLableRow(
              '',
              'inputName',
              'next',
              this.onChangeSearchBar,
              searchByCategory,
              '',
              'Search Category',
              'inputPostalCode',
              false,
            )}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              {this.renderTextInputWithLable(
                '',
                'inputName',
                'next',
                this.onChangeSearchByLocation,
                searchByLocation,
                'Search By Location',
                'text',
                'inputPostalCode',
                false,
              )}
              {this.renderTextInputWithLable(
                '',
                'inputName',
                'next',
                this.onChangeSaloonRadius,
                saloonRadius,
                'Saloon within 25km Radius',
                'text',
                'inputPostalCode',
                false,
              )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              {this.renderTextInputWithLable(
                '',
                'inputName',
                'next',
                this.onChangeByRating,
                byRating,
                'By Rating',
                'text',
                'inputPostalCode',
                false,
              )}
              {this.renderTextInputWithLable(
                '',
                'inputName',
                'next',
                this.onChangeByServices,
                byServices,
                'By Services',
                'text',
                'inputPostalCode',
                false,
              )}
            </View>
            {this.renderShowCategoryButton()}
          </View>
          <Cards />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const action = {};

export default connect(mapStateToProps, action)(DrawerSaloons);
