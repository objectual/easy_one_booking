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
} from 'react-native';
import FloatingLabel from 'react-native-floating-labels';
import styles from './styles';
import { Images, Metrics, Fonts } from '../../theme';
import SpinnerLoader from '../../components/SpinnerLoader';
import Icon from 'react-native-vector-icons/dist/Feather';
import { addCollectionWith, getDataByKey, saveMsg, getMsgs } from '../../config/firebase'
import { getCurrentUser, getUserInfo } from '../../config/WebServices';
import moment from 'moment'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class ChartBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      msgText:'',
      user:null,
      roomData:null,
      isLoading: false,
      allMsg:[]
    };
  }
  onChangeText = value => this.setState({ text: value });

  _renderOverlaySpinner = () => {
    const { isloading } = this.state;
    return <SpinnerLoader isloading={isloading} />;
  };

  componentDidMount () {
     this.getUser()
     
  }

  getUser = async () => {
    const userJson = await getUserInfo()
    console.log("ChartBox -> getUser -> userJson------------------------------------------------------------------------------", userJson)
    const user = JSON.parse(userJson)
    if(user) {
      this.checkRoomFounded(user.data)
      this.setState({user: user.data})
    }else {
      alert("Please login first")
    }
  }

  checkRoomFounded = async (user) => {
    const payload = {
      collectionName: 'chatRooms',
      key: 'userId',
      value: user._id
    }

    const res = await getDataByKey(payload)
    if(!res.size){
      this.createRoom()
      return
    }
    res.forEach(doc => {
      const roomData = { _id: doc.id, ...doc.data()}
      this.setState({roomData})
      this.getMsg(roomData)
    })
  }

  createRoom = async () => {
    const { user } = this.state
    try {
    const payload = {
      collectionName: 'chatRooms',
      data: { 
        createdAt: Date.now(),
        userData: user,
        userId: user._id
      }
    }
      await addCollectionWith(payload)
    } catch (error) {
      console.log("ChartBox -> createRoom -> error", error)
    }
  }

  getMsg = async (roomData) => {
    const { user } =  this.state
    if( !user || !roomData ) return

    const payload = {
      collectionName: 'messages',
      id:roomData._id,
    }

    try {
      getMsgs(payload).onSnapshot(querySnapshot => {
        let allMsg = [];
        querySnapshot.forEach(function(doc) {
            allMsg.push(doc.data());
        });
        allMsg = allMsg.sort((a,b)=> a.createdAt - b.createdAt)
        this.setState({allMsg})
      })
    } catch (error) {
      console.log("ChartBox -> sendMsg -> error", error)
    }
  }

  sendMsg = async () => {
    const { msgText, user, roomData, isLoading } =  this.state
    if(!msgText || !user || !roomData || isLoading ) return
    this.setState({isLoading:true})
    const payload = {
      collectionName: 'messages',
      id:roomData._id,
      data: { 
        createdAt: Date.now(),
        type:'text',
        msg:msgText,
        userId: user._id,
        senderName:user.firstName,
      }
    }
    try {
      await saveMsg(payload)
      this.setState({isLoading:false, msgText:''})
    } catch (error) {
    console.log("ChartBox -> sendMsg -> error", error)
    this.setState({isLoading: false})
    }
  }

  renderSender = (data) => {
    console.log("ChartBox -> renderSender -> data", data)
    return (
      <View key={data.createdAt} style={styles.containerForRow}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <View>
            <Image
              source={Images.select_services}
              style={styles.servicesImagesender}
            />
          </View>
          <View style={styles.serviceboxsender}>
            <Text style={styles.textmiddlesender}>
               {data.msg}
            </Text>
            <Text style={{fontSize:12, color:'gray'}}>{moment(data.createdAt).fromNow()}</Text>
          </View>
        </View>
      </View>
    );
  };

  renderReciver = (data) => {
    const { user } = this.state
    return (
      <View key={data.createdAt} style={styles.containerForRow}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <View style={styles.serviceboxreciver}>
            <Text style={styles.textmiddlereciver}>
              {data.msg}
            </Text>
            <Text style={{fontSize:10, color:'gray'}}>{moment(data.createdAt).fromNow()}</Text>
          </View>
          <View>
            <Image
              source={{uri: user.profile_img}}
              style={styles.servicesImagereciver}
            />
          </View>
        </View>
      </View>
    );
  };

  renderTextInputWithLabel = (
    returnKeyType,
    onChangeText,
    value,
    placeholder,
    keyboardType,
    secureTextEntry,
    CustomTextInput,
  ) => {
    return (
      <View>
        <TextInput
          style={[styles.textInput, CustomTextInput]}
          placeholderTextColor="#81788B"
          urnKeyType={returnKeyType}
          onChangeText={msgText => this.setState({msgText})}
          value={value}
          placeholder={placeholder}
          autoCompleteType="off"
          keyboardType={keyboardType}
        />
      </View>
    );
  };

  renderSend = () => {
    const { msgText } = this.state;
    return (
      <View>
        <View style={{
          flexDirection: 'row', alignItems: 'center',
          borderTopWidth: Metrics.ratio(1), justifyContent: 'space-between', paddingHorizontal:10
        }}>
          <Image source={Images.select_services} style={styles.camera} />
          <View style={{ width: Metrics.screenWidth * 0.7 }}>
            {this.renderTextInputWithLabel(
              'inputEmail',
              'next',
              msgText,
              // email,
              'Enter your message.',
              'email-address',
              false,
              styles.textInput,
            )}
          </View>
          <TouchableOpacity onPress={this.sendMsg}>
              <Icon name="navigation" size={25} color="black" />
        </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    const { allMsg, user } = this.state
    return (
      <View style={styles.container}>
        {/* <ScrollView
        ref={ref => {this.scrollView = ref}}
        onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}>
          <View style={styles.container}>
            {allMsg.map(value => {
              if(user._id === value.userId){
                return this.renderReciver(value)
              }
              return this.renderSender(value)
            })}
          </View>
        </ScrollView> */}
        {/* {this.renderSend()} */}
        <KeyboardAwareScrollView
        ref={ref => {this.scrollView = ref}}
        onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
        keyboardShouldPersistTaps='always'>
        {/* <ScrollView
        keyboardShouldPersistTaps='always'
        ref={ref => {this.scrollView = ref}}
        onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}> */}
          <View style = {{flex:1, justifyContent: "space-between"}}>
          <View style={{height: Metrics.screenHeight * 0.8, }}>
          <ScrollView
            keyboardShouldPersistTaps='always'
            ref={ref => {this.scrollView = ref}}
            onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}>
            {allMsg.map(value => {
              if(user._id === value.userId){
                return this.renderReciver(value)
              }
              return this.renderSender(value)
            })}
            </ScrollView>
          </View>
        {/* </ScrollView> */}
        <View style = {{height: Metrics.screenHeight * 0.1}}> 
        {this.renderSend()}
        </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const action = {};

export default connect(mapStateToProps, action)(ChartBox);
