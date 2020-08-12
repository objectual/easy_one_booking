// @flow
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
  CheckBox,
  FlatList,
  StyleSheet,
  Modal,
} from 'react-native';
import styles from './style';
import Header from '../../components/Header/index';
import {Images, Metrics, Fonts, Colors} from '../../theme';
import {Actions} from 'react-native-router-flux';
import SubmitButton from '../../components/SubmitButton';
import {Footer} from './../../components';
import {request as get_wallet} from '../../redux/actions/GetWallet';
import SpinnerLoader from '../../components/SpinnerLoader';
import WalletCard from '../../components/WalletCard';
import {initializeToken} from '../../config/WebServices';

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerImage: this.props?.getCompany?.data?.data?.user?.profile_img,
      walletInfo: [],
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.getWallet) {
      if (
        !nextProps.getWallet.failure &&
        !nextProps.getWallet.isFetching &&
        nextProps.getWallet.data.data &&
        nextProps.getWallet.data.success
      ) {
        this.setState({
          walletInfo: nextProps.getWallet.data,
        });
      } else if (
        !nextProps.getWallet.failure &&
        !nextProps.getWallet.isFetching &&
        nextProps.getWallet.data.data &&
        !nextProps.getWallet.data.success
      ) {
        this.setState({isloading: false});
      }
    }
  }

  componentDidMount = () => {
    this.props.get_wallet();
  };

  _renderOverlaySpinner = () => {
    const {isloading} = this.props.getNotAssociateWithCompany;
    return <SpinnerLoader isloading={isloading} />;
  };
  renderHeaderHeading = () => {
    const {walletInfo} = this.state;

    console.log(
      'walletInfowalletInfowalletInfo =>>>>>>><<<<<<',
      walletInfo?.data?.totalAmount,
    );

    return (
      <View style={{marginVertical: Metrics.ratio(20), alignItems: 'center'}}>
        <Text numberOfLines={1} style={{fontSize: Metrics.ratio(20)}}>
          Wallet Points
        </Text>
        <Text
          numberOfLines={1}
          style={{fontSize: Metrics.ratio(25), color: '#FF3600'}}>
          {walletInfo?.data?.totalAmount} Pts
        </Text>
        <SubmitButton ButtonText={'1$ = 1 Point'} />
      </View>
    );
  };

  render() {
    const {headerImage, walletInfo} = this.state;

    console.log(walletInfo?.data?.transactions);

    return (
      <Footer navigation={this.props.navigation.navigate} screen={''}>
        <View style={styles.container}>
          <ScrollView>
            {this.renderHeaderHeading()}

            <FlatList
              data={walletInfo?.data?.transactions}
              renderItem={({item, index}) => {
                return <WalletCard disable={true} walletInfo={item} />;
              }}
            />
          </ScrollView>
        </View>
      </Footer>
    );
  }
}

const mapStateToProps = (state) => ({
  getCompany: state.getCompany,
  getWallet: state.getWallet,
});

const actions = {get_wallet};

export default connect(mapStateToProps, actions)(Wallet);