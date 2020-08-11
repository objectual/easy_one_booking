import {connect} from 'react-redux';
import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import styles from './style';
import {Images, Metrics} from '../../theme';
import PropTypes from 'prop-types';

class WalletCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      setModalVisible: false,
    };
  }
  render() {
    const {
      customerName,
      serviceName,
      paymentMethod,
      amount,
      status,
      customerImage,
      disable,
      walletInfo,
    } = this.props;
    // const { setModalVisible } = this.state;

    console.log('walletinfo', walletInfo?.reciver?.profile_img);

    let name =
      walletInfo?.reciver?.firstName + ' ' + walletInfo?.reciver?.lastName;

    let type = walletInfo.type == 'Debit' ? '-' : '+';

    return (
      <TouchableOpacity
        disabled={this.props.disable}
        // onPress={() => this.setState({ setModalVisible: !setModalVisible })}
        onPress={this.props.onpressGo}>
        <View style={styles.container}>
          <View style={styles.servicebox}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.containerServiceBox}>
                <View>
                  <Image
                    source={{uri: walletInfo?.reciver?.profile_img}}
                    style={styles.image}
                  />
                </View>
                <View
                  style={{
                    paddingLeft: Metrics.ratio(15),
                    width: Metrics.screenWidth * 0.38,
                  }}>
                  <Text numberOfLines={1} style={styles.titleText}>
                    {name}
                  </Text>

                  <Text numberOfLines={1} style={styles.descriptionText}>
                    ID: {walletInfo?._id}
                  </Text>
                  <Text numberOfLines={1} style={styles.descriptionText}>
                    {walletInfo?.createdDate}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: Metrics.screenWidth * 0.3,
                  paddingVertical: Metrics.ratio(10),
                  alignItems: 'flex-end',
                }}>
                <Text numberOfLines={1} style={styles.titleText}>
                  <Text style={{color: '#FF3600'}}>
                    {walletInfo?.paidAmount}
                  </Text>{' '}
                  Pts
                </Text>

                <Text numberOfLines={1} style={styles.descriptionText}>
                  {type} {walletInfo?.paidAmount}
                </Text>
                <Text numberOfLines={1} style={styles.descriptionText}>
                  Remaining: {walletInfo?.totalAmount}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

// const mapStateToProps = () => ({});

// const actions = {};

// export default connect(
//   mapStateToProps,
//   actions
// )(Empty);

export default WalletCard;
