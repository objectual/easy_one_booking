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
import {request as get_Saloon_By_Category} from '../../redux/actions/GetSaloonByCategory';

class Saloons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getSelectedSaloon: [],
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.getSaloonByCategory) {
      if (
        //   !nextProps.getSaloonByCategory.failure &&
        //   !nextProps.getSaloonByCategory.isFetching &&
        nextProps.getSaloonByCategory.data
        // nextProps.getSaloonByCategory.data.success
      ) {
        this.setState({
          getSelectedSaloon: nextProps.getSaloonByCategory.data.data,
        });
        console.log(
          nextProps.getSaloonByCategory.data.data,
          'getSaloonByCategoryDatagetSaloonByCategoryDatagetSaloonByCategoryDatagetSaloonByCategoryData',
        );
      } else if (
        !nextProps.getSaloonByCategory.failure &&
        !nextProps.getSaloonByCategory.isFetching &&
        nextProps.getSaloonByCategory.data &&
        !nextProps.getSaloonByCategory.data.success
      ) {
        // this.setState({isloading: false}, () => {
        //   setTimeout(() => {
        //     Alert.alert('Error', nextProps.getSaloonByCategory.data.msg);
        //   }, 3000);
        // });
        this.setState({isloading: false});

      }
    }
  }

  _renderOverlaySpinner = () => {
    const {isloading} = this.state;
    return <SpinnerLoader isloading={isloading} />;
  };
  componentDidMount = () => {
    this.handleGetSaloonByCategory();
  };

  handleGetSaloonByCategory = () => {
    const {id} = this.props.route.params;
    this.setState({isLoading: true});
    const payload = {
      serviceId: id,
    };
    console.log(payload, 'categoryID');
    this.props.get_Saloon_By_Category(payload);
  };

  renderService = (saloons, index) => {
    const {getSelectedSaloon} = this.state;
    const {id} = this.props.route.params;
    console.log(saloons,'jjdsjakj')
    return (
      <TouchableOpacity 
      onPress={() =>
        this.props.navigation.navigate('SaloonServicesByCategory', {categoryId:id, companyId:saloons._id})
      }
      style={styles.containerForRow}>
        <View style={[styles.servicebox, {flexDirection: 'row'}]}>
          <View>
            {saloons && saloons.image ? (
              <Image
                source={{uri: saloons.image}}
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
            style={styles.dataContainer}>
            <Text numberOfLines={1} style={styles.textsize18}>
              {saloons && saloons.company.name ? saloons.company.name : 'name'}
            </Text>
            <Text numberOfLines={1} style={styles.textsize15}>
              City : {saloons && saloons.company.city
                ? saloons.company.city
                : 'City'}
            </Text>
            <Text numberOfLines={2} style={styles.textsize15}>
              Adress : {saloons && saloons.company.address
                ? saloons.company.address
                : null}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  renderRow = () => {
    const {getSelectedSaloon} = this.state;
    console.log(getSelectedSaloon, 'getSelectedSaloon1212');
    if (getSelectedSaloon.length == 0) {
      return (
        <View style={styles.textContainer}>
          <Text style={styles.textNotFound}>No Saloon Found</Text>
        </View>
      );
    } else {
      return (
        <View>
          <FlatList
            data={getSelectedSaloon}
            renderItem={({item, index}) => this.renderService(item, index)}
            // keyExtractor={item => item.id}
            // extraData={selected}
          />
        </View>
      );
    }
  };

  render() {
    const {getSelectedSaloon} = this.state;
    const {isFetching, failure} = this.props.getSaloonByCategory;
    return (
      <View style={styles.container}>
        <Header
          headerText={'Salon'}
          leftIcon={Images.pagination_back}
          leftBtnPress={() => this.props.navigation.goBack()}
        />
        {<SpinnerLoader isloading={isFetching} />}

        {isFetching == false && failure == false && (
          <ScrollView>
            <View>{this.renderRow()}</View>
          </ScrollView>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  getSaloonByCategory: state.getSaloonByCategory,
});

const action = {get_Saloon_By_Category};

export default connect(mapStateToProps, action)(Saloons);
