import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet,Image ,Button,ScrollView,SafeAreaView} from 'react-native'
import firebase from '../firebase';


class About1Screen extends React.Component{



   constructor(props) {     
super(props);     
this.state = {   

  email:'',
  displayName:'',
  uri:null,
   
} 
} 

componentDidMount(){
 const {displayName,email}=firebase.auth().currentUser
 this.setState({displayName,email})
  
}






render() {
    return (
  <View style={{height:'100%',backgroundColor:"#424242"}}>
          
      
     
 
      <SafeAreaView>
    
          <View style={{height:200,width:200,borderRadius:100,alignSelf:'center',marginTop:100,borderColor:'#e91e63',borderWidth:10}}>
            <Text style={{color:"#fff",fontWeight:'bold',textAlign:'center',fontSize:27,marginTop:70}}>NO IMAGE</Text>
          </View>
              <Text style={{ color: '#fff',fontWeight:'bold',textAlign:'center',marginTop:60,fontSize:30 }}>{this.state.displayName}</Text>
              <Text style={{ color: '#fff',fontWeight:'bold',textAlign:'center',marginTop:10,fontSize:20 }}>{this.state.email}</Text>
             
              
              
        </SafeAreaView>

      <TouchableOpacity
       
      onPress={()=>this.props.navigation.replace('Login')} >
       

      <View style={styles.submitButton}>
      <Text style={{color: '#FFF',textAlign:'center',paddingTop:11,fontSize:20,fontWeight:'bold'}}>Logout</Text>
      </View>
       
     
      </TouchableOpacity>
      
     
      </View>

    );
  }
}
const styles=StyleSheet.create({



  submitButton:{
    height:50,
    width:150,
    marginTop:80,
    alignSelf:'center',
    
    borderRadius:100,
    backgroundColor:'#e91e63',
    borderColor:'#FFF'},

 


})
export default About1Screen