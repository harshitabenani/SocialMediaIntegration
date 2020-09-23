import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet,Image ,Button,ScrollView,ImageBackground, Dimensions} from 'react-native'
import firebase from './firebase'
import {Ionicons} from "@expo/vector-icons"


const devHeight = Dimensions.get('screen').height ;
const devWidth = Dimensions.get('screen').width; 

class SignInputs extends React.Component {


    state = {
      name:'',
      email: '',
      contact:'',
      password: '',
      cp:''

   }
   
   handlename = (text) => {
      this.setState({ name: text })
   }
   handleemail = (text) => {
      this.setState({ email: text })
   }
   handlecontact = (text) => {
      this.setState({ contact: text })
   }
   handlepassword = (text) => {
      this.setState({ password: text })
   }
   handleconfirmpassword = (text) => {
      this.setState({ cp: text })
   }

 
 
  SignUp = (email,password) => {
      try{
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(userCredentials => {

      this.props.navigation.navigate('About1')
      
      return userCredentials.user.updateProfile({
        displayName:this.state.name
        
       })
      }).catch(error => {   
        alert(error.message);
     })
   }catch(err){
      alert(err);
   }
  };




check=()=>
{

  if(this.state.password != '' && this.state.cp != '' && this.state.name != '' && this.state.email != '' && this.state.contact != '' )
  {
    if( this.state.password!=this.state.cp)
    {
      alert("PASSWORDS DO NOT MATCH ")
    }
  
    else
    {
     this.SignUp(this.state.email,this.state.password)
    }
  }
  else
  {
    alert("PLEASE ENTER THE EMPTY FIELD(S)")
  }
}




   render()
   {
     return(

      <ImageBackground
      style={{height:'100%',width:'100%'}}
      source={require('./assets/background.png')}>

<View style={{paddingHorizontal:35,paddingTop:75}}>

<TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
      <Ionicons name="md-arrow-back" size={30} color="#000" ></Ionicons>
  </TouchableOpacity>

  </View>

        <View style={{height:550,width:320,backgroundColor:"#9e9e9e",alignSelf:'center',marginTop:40,borderRadius:15}}>
         
         <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>

       <ScrollView style={{flex:1}}>
       <Text style={{fontWeight:'bold',fontSize:27,textAlign:'center',marginTop:30}}>Welcome</Text>
             <Text style={{fontWeight:'bold',fontSize:27,textAlign:'center',marginTop:5}}>Join Us Now !</Text>

       
       <View style={{width: '100%', height: devHeight + devHeight*0.1/100 }}>
       <View>

       
       </View>

        <TextInput style={styles.inputfirst}
               underlineColorAndroid = "transparent"
               placeholder = " Name"
               placeholderTextColor = "black"
               autoCapitalize = "none"
               onChangeText = {this.handlename}
               const names={this.state.name}/>

                 <TextInput style={styles.input}
               underlineColorAndroid = "transparent"
               placeholder = " Email"
               placeholderTextColor = "black"
               autoCapitalize = "none"
               onChangeText = {this.handleemail}/>


                 <TextInput style={styles.input}
               underlineColorAndroid = "transparent"
               placeholder = " Contact"
               placeholderTextColor = "black"
               autoCapitalize = "none"
               onChangeText = {this.handlecontact}
               keyboardType={'numeric'} 
               maxLength={10}/>


                 <TextInput style={styles.input}
               underlineColorAndroid = "transparent"
               placeholder = " Password"
               placeholderTextColor = "black"
               autoCapitalize = "none"
               onChangeText = {this.handlepassword}
               secureTextEntry={true}
               />


                 <TextInput style={styles.input}
               underlineColorAndroid = "transparent"
               placeholder = " Confirm Password"
               placeholderTextColor = "black"
               autoCapitalize = "none"
               onChangeText = {this.handleconfirmpassword}
               secureTextEntry={true}
               />

                   <TouchableOpacity
       
      onPress={()=>this.check()} >
       

      <View style={styles.submitButton}>
      <Text style={{color: '#FFF',textAlign:'center',paddingTop:11,fontSize:20,fontWeight:'bold'}}>Submit</Text>
      </View>
       
     
      </TouchableOpacity>
               </View>
</ScrollView>
</View>
</View>
</ImageBackground>


     )
   }
  
}

const styles = StyleSheet.create({

  weltext: {
    marginTop:30,
    fontSize:22,
    fontWeight:'bold',
    textAlign:'center',
    color:'#091D99'
  },

    inputfirst: {
      marginTop: 40,
      height: 40,
      width: 270,
      alignSelf: 'center',
      borderColor: '#424242',
      borderWidth: 1,
      padding:10,
      borderRadius:20
   },


    input: {
      marginTop: 20,
      height: 40,
      width: 270,
      alignSelf: 'center',
      borderColor: '#424242',
      borderWidth: 1,
      padding:10,
      borderRadius:20
   },
      
     

       submitButton:{
  height:50,
  width:150,
  marginTop:40,
  alignSelf:'center',
  
  borderRadius:100,
  backgroundColor:'#e91e63',
  borderColor:'#FFF'},
    
})

  export default SignInputs