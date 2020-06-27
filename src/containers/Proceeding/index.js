import {connect} from 'react-redux';
import React, {Component, useState} from 'react';
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
  Button,
  Picker,
  FlatList,
} from 'react-native';
import FloatingLabel from 'react-native-floating-labels';
import styles from './styles';
import {Images, Metrics, Fonts, Colors} from '../../theme';
import SpinnerLoader from '../../components/SpinnerLoader';
import Header from '../../components/Header/index';
import {add as addToCard,remove as removeFromCard, removeAll } from '../../redux/actions/Cart';
// import {initializeToken, token} from '../../config/WebServices'
import {request as create_Booking, hideModal } from '../../redux/actions/CreateBooking';
import {initializeToken, token, getUserInfo,} from '../../config/WebServices'
import BookedSuccessModal from '../../components/BookedSuccessModal';




class Proceeding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: '',
      cscNumber: '',
      selectedMonth: '',
      selectedYear: '',
      selectedPaymentMethod: '',
      totalServicesSum: null,
      services: [],
      cart: {},
      showBookedModal:  false,
      data: [],
      createBooking:''
      
    };
  }

  static getDerivedStateFromProps(props, state) {

    console.log(JSON.stringify(props.createBooking),'props.createBooking.data')
    console.log(JSON.stringify(props.cart),'props.createBooking.data')



    if (JSON.stringify(props.cart) != JSON.stringify(state.cart)) {
      return {
        cart: props.cart,
        createBooking: props.createBooking

      };
    }

    console.log(JSON.stringify(props.createBooking.data),'props.createBooking.data')

    if (props.createBooking.success) {
      return {showBookedModal: true}
    }
    

  }



  renderServicesSum = () => {
    const {services} = this.state;
    let price;
    for (i = 0; i < services.length; i++) {
      price = price + services.servicePrice;
    }
    this.setState({totalServicesSum: '0'});
  };

  renderServicesRow = () => {
    const {services,cart} = this.state;
    console.log(this.state.cart,'cartstate')


    return (
      <View>
        <FlatList
          // horizontal
          data={cart.data}
          renderItem={({item, index}) => this.renderService(item,index)}
          // keyExtractor={item => item.id}
          // extraData={selected}
        />
      </View>
    );
  };

   getRows = (label,value) =>
  {
    return(
      <View style={{ width: '90%',flexDirection:'row', marginBottom: 5}}>
      <View style={{ width: '50%'}}>
          <Text  style={{ fontSize: 18 }} >
            {label}
          </Text>
      </View>
      <View style={{ width: '50%', }}>
          <Text style={{ fontSize: 18, color:Colors.taupeGrey }} >
           {value}
          </Text>
      </View>


    </View>
    )
  
  }


  getCancelRow = (index) =>
  {
    return(
      <TouchableOpacity onLongPress={async ()=> await this.props.removeFromCard({index})} style={{ width: '90%',flexDirection:'row', justifyContent:'flex-end', marginBottom: 5,}}>
          <View style={{width:'14%', height:40, borderWidth:0, justifyContent:'center',alignItems:'center'}}>
            <Text  style={{ fontSize: 18 }}>
              x
            </Text>
          </View>
    </TouchableOpacity>
    )
  
  }

  getRows = (label,value) =>
  {
    return(
      <View style={{ width: '90%',flexDirection:'row', marginBottom: 5, }}>
      <View style={{ width: '50%'}}>
          <Text  style={{ fontSize: 18 }} >
            {label}
          </Text>
      </View>
      <View style={{ width: '50%', }}>
          <Text style={{ fontSize: 18, color:Colors.taupeGrey }} >
           {value}
          </Text>
      </View>


    </View>
    )
  
  }

  renderService = (object,index) => {
    // let object = {"payload":{"checkIn": "12:00", "checkOut": "21:00","date":"6/24/2020","employee":{"firstName":"Another","lastName":"Fayzee","userName":null,"bio":null,"dob":"2012-12-08T19:00:00.000Z","address":"Khalid bin waleed road","postalCode":"921","city":"Sharjah","province":null,"_id":"5ef0c1c9d93dd409408cace4","email":"anotherfayzee@mailinator.com","phoneNo":90078601,"password":"$2a$10$J.j7ETAVvL8XyiqLPKXgMuxV2gAsLI5NJ9bmsbfalai/bS/F3yZh6","gcm_id":"string123","profile_img":"https://easy-1-jq7udywfca-uc.a.run.app/public/images/user.png","createdDate":"2020-06-22T14:35:53.626Z","__v":0,"platform":"ios"},"price":150,"servicesName":"","serviceId":"5eee2ebe6e24b64cfc018a97","categoryId":"5eee2ebe6e24b64cfc018a97","_id":"5eee4536634bb82ea4c480f5","name":"Hair dressing","isActive":1,"companyId":"5ef2027efcd846363c6aabab","image":"http://res.cloudinary.com/dxwbz4wlo/image/upload/v1592673591/serviceImage/e66lt87us0s0akmmiuep.jpg","__v":0}}
    return (
      <>
        <View style={[styles.servicebody,]}>
         {this.getCancelRow(index)}
         {this.getRows('Name',`${object.payload.employee.firstName} ${object.payload.employee.lastName}`)}
         {this.getRows('Service Name',object.payload.name)}
         {this.getRows('Price',`$${object.payload.price}`)}
         {this.getRows('Date',object.payload.date)}
         {this.getRows('Time',object.payload.checkIn)}

         <View style={{ width: '90%',borderBottomWidth:1, marginTop: 35, borderColor:'#dedede' }}/>
        
        </View>
      </>
    );
  };
  renderServiceHead = () => {
    return (
      <View>
        <View style={[styles.servicehead, styles.containerForRow]}>
          <Text style={[styles.serviceheadfont, styles.employeebody]}>
            Employee
          </Text>
          <Text style={[styles.serviceheadfont, styles.servicesbody]}>
            Services
          </Text>
          <Text style={[styles.serviceheadfont, styles.timebody]}>Time</Text>
          <Text style={[styles.serviceheadfont, styles.pricebody]}>Price</Text>
        </View>
        <View style={styles.horizontalLine}></View>
      </View>
    );
  };

  getTotalPrice=  ()=>
  {
    const { cart } = this.state

   let price = 0
     for (let i = 0; i < cart.data.length; i++) {
        console.log(cart.data[i].payload.price,'cart.data[i].payload.price')
    
        price = price + cart.data[i].payload.price
      }

      return  price.toString()

  }

  
  renderTotalServices = () => {
    const {totalServicesSum} = this.state;
    console.log(this.getTotalPrice(),'price')
    return (
      <View>
        <View style={{width:'80%', flexDirection:'row', borderWidth:0}}>
          <Text style={styles.serviceheadfontRed}>TOTAL</Text>
          <Text style={styles.serviceheadfontRed}>${this.getTotalPrice()}</Text>
        </View>
      </View>
    );
  };

  booKNow = async () =>
  {
    if(token == null)
    {
      this.props.navigation.navigate('Login')
    }

    else 
    {
      await this.createPayload()
    }
   
  }




  createPayload = async () =>
  {
    const {login} = this.props
    const {cart} = this.props
    console.log(JSON.stringify(cart.data),'login.cart')
    let userInfo = JSON.parse(await getUserInfo())
    console.log(userInfo,'userInfo')

    let services = []

   for (let i = 0; i < cart.data.length; i++) {

    console.log(cart.data[i].payload.checkIn,'paylodof Services')

    let dateFormat = cart.data[i].payload.date.split('/')
    let timeArray = [cart.data[i].payload.checkIn]
    let dateArray = [`${dateFormat[0]}-${dateFormat[1]}-${dateFormat[2]}`]
    // await timeArray.push(cart.data.payload[i].checkIn)
    // await dateArray.push(`${dateFormat[0]}-${dateFormat[1]}-${dateFormat[2]}`)


    let object = {
        // companyId: cart.data[i].payload.companyId,
        serviceId: cart.data[i].payload.serviceId,
        employeeId: cart.data[i].payload.employee._id,
        categoryId:  cart.data[i].payload.categoryId,
        date: dateArray,
        time: timeArray
    }

    console.log(object,'paylodof Services')
    services.push(object)

    // return await console.log(payload,'paylodof Services')
    //  services.push(payload)
    
   }

   let payload = {
    services:services,
    // userName: "Test", 
    postalCode: "021",
    email: userInfo.data.email,
    companyId: cart.data[0].payload.companyId,
    phoneNo: "090078601",
    status: "1",
    access_token:userInfo.data.access_token

   }

   

   console.log(JSON.stringify(payload),'postbody')
   this.props.create_Booking(payload)
   
   

  }



  renderPayNowButton = () => {
    return (
      <View style={[styles.containerForRow, {alignItems: 'center'}]}>
        <TouchableOpacity
          onPress={() =>this.booKNow()}
          style={styles.submitBtn2}>
          <Text style={styles.submitBtnText2}>Book Now</Text>
        </TouchableOpacity>
      </View>
    );
  };


  render() {
    const {services} = this.state;
    const {cart} = this.props
    const {createBooking} = this.props
    {cart.data.length == 0 && createBooking.success == false && this.props.navigation.navigate('Home') }

    console.log(cart,'cartarray')
    return (
      <View style={styles.container}>
        <Header
          headerText={'Proceeding'}
          leftIcon={Images.pagination_back}
          leftBtnPress={() => this.props.navigation.goBack()}
        />
        {createBooking.isFetching &&
        <SpinnerLoader isloading={true} />
        }

        {this.state.showBookedModal && (
          <BookedSuccessModal
            onPress={() => {
              this.props.removeAll()
              this.props.hideModal()
              this.setState({showBookedModal: false,  })
              this.props.navigation.navigate('Home')

            }}
            onCancel={() => this.setState({showBookedModal: false,  })}
          />
        )}

        <ScrollView>
          <View>
            {this.renderServicesRow()}
            {this.renderTotalServices()}
            {this.renderPayNowButton()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  login: state.login,
  createBooking: state.createBooking
});

const action = {removeFromCard,create_Booking,hideModal,removeAll};

export default connect(mapStateToProps, action)(Proceeding);
