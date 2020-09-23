import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet,Image ,Button,ScrollView,SafeAreaView} from 'react-native'
import firebase from '../firebase';


class AboutScreen extends React.Component{



   constructor(props) {     
super(props);     
this.state = {   

  email:'',
  name:'',
  uri:''
   
} 
} 

componentDidMount(){

  
  this.setState({email:this.props.navigation.state.params.email})
  this.setState({name:this.props.navigation.state.params.name})
  this.setState({uri:this.props.navigation.state.params.uri})
  
 
}


render() {
    return (
  <View style={{height:'100%',backgroundColor:"#424242"}}>
          
      
     
 {this.state.name!=null?
      <SafeAreaView>
    
    <Image source={{uri:this.state.uri}} style={{height:200,width:200,borderRadius:100,alignSelf:'center',marginTop:100,borderColor:'#e91e63',borderWidth:10}}></Image>
            <Text style={{ color: '#fff',fontWeight:'bold',textAlign:'center',marginTop:60,fontSize:30 }}>{this.state.name}</Text>
            <Text style={{ color: '#fff',fontWeight:'bold',textAlign:'center',marginTop:10,fontSize:20 }}>{this.state.email}</Text>
           
            
            
      </SafeAreaView>:null}

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
export default AboutScreen