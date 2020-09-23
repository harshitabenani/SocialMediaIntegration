import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ImageBackground,
  Alert
} from 'react-native';
import firebase from './firebase';
import * as Facebook from 'expo-facebook'
import * as Google from 'expo-google-app-auth';
import { AuthSession } from 'expo';
import jwtDecode from 'jwt-decode';

const auth0ClientId = 'SuX6106nAjvSL8WbKHCvf0h5S143TNhw';
const auth0Domain = 'https://dev-95yde09f.us.auth0.com';

/**
 * Converts an object to a query string.
 */
function toQueryString(params) {
  return '?' + Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}


class Inputs extends React.Component {


  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      userInfo:null
    };
  }
  handleEmail = text => {
    this.setState({ email: text });
  };
  handlePassword = text => {
    this.setState({ password: text });
  };

 

  Login = (email, password) => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() =>
          this.props.navigation.navigate('About1'))
        .catch(error => {
          alert(error.message);
        });
    } catch (err) {
      alert(err);
    }
  };

  
async loginWithFacebook(){
    Facebook.initializeAsync('765862790875378', 'SocialMediaIntegration');
    const {type,token}=await Facebook.logInWithReadPermissionsAsync('765862790875378',{permissions:['public_profile','email']})
    
    if(type=='success'){
      const credential=firebase.auth.FacebookAuthProvider.credential(token)

      const response= await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`) 
      const userInfo= await response.json()
      this.setState({userInfo})

      this.props.navigation.navigate('MainHome',{email:this.state.userInfo.email,name:this.state.userInfo.name,uri:this.state.userInfo.picture.data.url})
      
      
      firebase.auth().signInWithCredential(credential).catch(()=>{
        alert("Error")
      })
    }

  }



async loginWithGoogle() {
    try {
      const result = await Google.logInAsync({
        //androidClientId: YOUR_CLIENT_ID_HERE,
        behavior:'web',
        iosClientId: '305951943986-4mi9skl8g7kqs106cmuvup91qqcdl29j.apps.googleusercontent.com',
        androidClientId:'305951943986-rq9gnlj68lesjn0la0rd5f10bf07eid7.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {

        const credential = firebase.auth.GoogleAuthProvider.credential(result);
        this.props.navigation.navigate('MainHome',{name:result.user.name,email:result.user.email,uri:result.user.photoUrl},)

 
        firebase.auth().signInWithCredential(credential)
        
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

async loginWithTwitter (){
   
    const redirectUrl = AuthSession.getRedirectUrl();
    console.log(`Redirect URL: ${redirectUrl}`);
    
   
    const queryParams = toQueryString({
      connection:'twitter',
      client_id: auth0ClientId,
      redirect_uri: redirectUrl,
      response_type: 'id_token', 
      scope: 'openid profile', 
      nonce: 'nonce',
    });
    const authUrl = `${auth0Domain}/authorize` + queryParams;

    
    const response = await AuthSession.startAsync({ authUrl });
    console.log('Authentication response', response);

    if (response.type === 'success') {
    
      this.handleResponse(response.params);
    }
  };

  handleResponse = (response) => {
    if (response.error) {
      Alert('Authentication error', response.error_description || 'something went wrong');
      return;
    }

    
    const jwtToken = response.id_token;
    const decoded = jwtDecode(jwtToken);
    
    this.props.navigation.navigate('About2',{name:decoded.name,uri:decoded.picture,email:decoded.email})
    
  };



  render() {
    return (
     
       <ImageBackground
        style={{height:'100%',width:'100%'}}
        source={require('./assets/background.png')}>

          <View style={{height:550,width:320,backgroundColor:"#9e9e9e",alignSelf:'center',marginTop:130,borderRadius:15}}>
           
           <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
           <Text style={{fontWeight:'bold',fontSize:27,textAlign:'center',marginTop:40}}>Welcome</Text>
             <Text style={{fontWeight:'bold',fontSize:27,textAlign:'center',marginTop:5}}>Let's Get Started...</Text>

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder=" Email"
          placeholderTextColor="black"
          autoCapitalize="none"
          onChangeText={this.handleEmail}
        />

        <TextInput
          style={styles.input1}
          underlineColorAndroid="transparent"
          placeholder=" Password"
          placeholderTextColor="black"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={this.handlePassword}
        />

<View
            style={{ justifyContent: 'center', alignItems: 'center',marginTop:30 }}>
            <TouchableOpacity
              onPress={() => this.Login(this.state.email, this.state.password)}
              style={{
                height: 50,
                width: 130,
                backgroundColor: '#e91e63',
                borderRadius:15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ color: '#FFF' }}>Sign In</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => this.props.navigation.replace('SignUp')}
              >
              <Text style={{ color: '#e91e63',textAlign:'center' ,marginTop:5,textDecorationLine:"underline"}}>Not a Member Yet? Sign Up</Text>
            </TouchableOpacity>

            <View style={{justifyContent:'space-around',flexDirection:'row'}}>

            <View style={{height:2,width:70,backgroundColor:"#707070",alignSlef:'center',marginTop:40,margin:5}}/>
            <Text style={{marginTop:30,color:"#707070",fontSize:14}}>or</Text>
            <View style={{height:2,width:70,backgroundColor:"#707070",alignSlef:'center',marginTop:40,margin:5}}/>

            </View>

            <View style={{justifyContent:'space-between',flexDirection:'row',marginTop:20}}>
            <TouchableOpacity onPress={()=>{this.loginWithTwitter()}}
              
              style={{
                height: 50,
                width: 50,
                backgroundColor: '#cfcfcf',
                borderRadius:25,
                margin:10,
               
              }}>
              <Image source={{uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAE20lEQVRoge3YW2yTdRgG8Odta8GBzh3KoIOd7BzxiGICISCi3GDigQQmEYMYgk4JckEGKGAaTTSiaAwCTsF5gSEuiiEGvSIalwWIohciCE4YbMDKtnbrTh3t9z5ebMWNfB/raRsXfe6+Nf+3v6f/r/2WP5BOOumkk04SkbF408LdVx5UkRVULiRlGkAniYtUHlEba3xr8g5BhGZrsz6+VBBY574QvbYsULa/290XyvA3vCihVMFLqvyZYeVuQJeREBIACBJg/wVIgsRREa5qfm3Kyeja7O3NswXGJqr86690rx+2wN1fdX1BSuYpZ0Y5ysVIFj9tR4ubDjks4PR+sCV+4FraCW4leS+IRSQLSPjtevWelg3FzTcs4PmB45z+nlaAEwF8OSl/wuqfF0gkUXxR9bnxRui2WoAPx4aH2WsRIZa0VeYfHDzbZvaG4/w99w/gQXJlc2P3gZlVzEi0QKR34tok8d0gl9t49VjWtguvZL3X9DpIsSxAgXvwYIBPdo0P1pXtDZbFrffSIYINSeABsJHA9jAclwFZB/btin7JTQuIoZ3/L44Okhm083hpdXsFvDRdZ5Z8V+s8ErlJ4EFiOsmpAJoiEXkqsOnOjuh8U0jYbjQMxV8bNIHEbk9Bx6/F1f55sRQQG+9LEj/wd/7uIGd1vjH1zOD5pgXO/JPZAEiD+SCA5ENiyC/FewK1hZ8FFqOGdqsCpM2VPB5nx4nzkdaNBZeun29+K3hFCe658ScHgJwr4IHCQNvloqq2qsJPrzxRsKs9a/AoobYmiQfJdl/l5G4zquVzwLOv7XZbxPEHiRJTvEUxgCRxhorTAjYaQB7IJYnjAYJ1wY0Fc82cDqsC9c/nBD3VHctBHgaQESMe7H/ClkFYpkR0QeL4/teCVk7TW6i0uuO5u6qDNYDhAvACSV+M+GR+Kq3wAHntf5/rY7EDbFFyKWBbGscnPzJ4EArWWxUw3QGbho8CCN8MeBIQ4nhcBU6vcnWS+t3NgCcZ7go7j8VVAADE4Fsk+sYYDwhq4XX3xF2g/qWcvwCuH1M8ACq+tTLesAAAnFudvZPK9QAiY4In+2yRyDcJFwCA8xU5H0Iwn2TdKOMBYH+X13MlqQKFVS1TDDXuEOhGAl4q/KOBJ6E2MbYP57N8Ekdjh71HaXytlIkkABkVPATY17XZc2I437A7cPbl7A6lvDNat80APkgxtgxni6kAAFzMzdkG8NBo4AFAicreLZ7GlBVAuRiRHn1Wge9HGg/yYGhr0ecxuWIuAMBXObm7eY3raSVXkWgYCTzJU71qrLA61DJLYidzNbS7mi7PgU3mULkMwIwU4M9D5dGQt7ghHkrMOzAk5WKEpe9PKksBPJAavP2xePFAAjvg/uBSbtiBCirWApiUAvwRux2LuzeX+OK1xFwg7yNfCYQLCH2clGdI3joUkhBeobqjl7ZN8BYnfP46tAApU3e2LIoAFSBzQbpITCajp3Sp+cIScgLUV0NvltQmCjcvMJD8T5pyIoZjM4DVKcVD6qn6dkiL98ErmizeskA0ee83T1Anl0CxkuR8AJIAPqDKHwnZG9pS+FM8P5FJFxiczHfPZ9lucc4W6iwRzlQin2Q2BDlUjCfZSSIA0KeUk4D+rWBtr6fot1Qcz6eTTjrppDMi+Q8fgF/hmeYFBwAAAABJRU5ErkJggg=='}}
              style={{height:40,width:40,marginTop:5,alignSelf:'center'}}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.loginWithGoogle()}}
              
              style={{
                height: 50,
                width: 50,
                backgroundColor: '#cfcfcf',
                borderRadius:25,
                margin:10,
               
              }}>
              <Image source={{uri:"data:image/png;base64,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"}}
              style={{height:40,width:40,marginTop:5,alignSelf:'center'}}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.loginWithFacebook()}}
              
              style={{
                height: 50,
                width: 50,
                backgroundColor: '#cfcfcf',
                borderRadius:25,
               margin:10
                
              }}>

             <Image source={{uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAFEklEQVRoge2ZW2gcVRjH/2c22SQ1aZLNRXNraFATvKFs0QdfTPTFiKCIQUwFwZQYkqIY8cELrKLFF2+0G4yVgpBgm4q0oO2DJvpgVUICKohtUFuSzcZoLrK7uezOzPn7kLRddmZ2ZjJJfGg+WHZ2zjnf/P7nfOc7c84CO7Zj17aJTfEyRF/TSvxuAM0SCIJsAlFFsJAECCQoGQVwgeQ4wZFL04FRhIT0+mhPAm77dLlO12Q3yf0kawCAJEgAWPte+xAmZRFKDug5Ijx9oCyyrQJuHIpX+JN4k8DTJPwWgNng0+4jBfKY7lNfi3ZWz225gFsHEk9KicMQDGQHdASfXmeeFD3RnorjWyIg2M/c1cJEn5SiwwjiGf5qHaB/JrfyIDqFumkCgv3ctXLd0mckHtxS+Kvtz/jy5ePRzuplOzbFAXzuNsMDQKu2itMI/er3LGC1MNG3zfBrZVI8UF5S+oEdX9YQumUw0U6JAS/wCoiWej/urc5FfbGCkjwFKZ1QdSKWIn6MpvDxTyuW7SX5xEJvzQnXApo+iZUJRTkPsHyj8HdW+vBecyH2FvssO+lcJIXHPl+08E0AWEhRNMZfNE+xliGkKOKQF/i7Kn0Yenh3Vvh0yxJ2gRzK1y05zW7eMbBcu75IbQjeJ4jD9xfB73OWpR3MmY7St6N7HAtQKXvoYYVtbchDbZFtfkgTkBUeJP1S0bvM2uYY7oSokIl2L9mmuS7XFHQypqN3OI5f/lavkKuSdvBrzyCfwhBfRZvQswpo2hu/h0TtRuFJ4PYKY78AwAvDcXw3lbRtb7FC1+y+GAnGgNF0n2bj3OwFniTKC4xu/1qSOLdReF7+LVsy/ZoJ2Od1kSryGyfvZEwHPcADACWCtgIkebMXeJJQTJJPPCm9wRMgZGOmX0OwkqjyAr9+aTBJR9kmax1SVGX6NQmh9W3ghuEtFMArPACwKNOj2Qi4cvzD/oAh5s1C6L76PEw8e73h/snfVvDS14tO4E1H15jviATJgBN4ACjOE6aTNtNyFaAk3zjg0bjmGJ5kPLO92SSecQpPsy5xaRPzmlN4CGDGVgCICa8T1o39vqA6ggcACVywFUBwzFW28ACvSeDPRc0R/Pr1WKYP4yQGR4zA1pP6ua9iyLncDetlRx8qMWw0fp5V8f5o/EodAFjViKQmncKDCkZsBVyaDozuqVqYAllnB08CZ/9YNZR9xBKIDAWzSzpOnV92M2EzO29SlQ3jmbzGORASEpKDTuCtyqzMAzwADJodRZq+tOs5Ikwi5eWVejPhCSZTqhY282sqYPpAWQTksc2CB4x1HMOTkMRRvNU47VgAANDvf4XknFv47CHkHp7EvC50d3tiAIh0FC+Q4qBbeLvFzSU8CHYh1Gh56Jt14xrtqThOoP9/hA/rb9x0MptP2533TGVlN8FTTuEtRbiEB/ClrkSet+OzPzpoE7ovT7aDPOPi4Wb8zuHJLzRlVxtCzZp3AQCindXLswU3PELBD+3h3Wei9PYEw5ov8ihC9ifTgNnrtJV1CnUO6Aq8M/2tAhyRRPlGFrIs8P8Q7LaL+Uxzfvq0bgu9NSeSSTaR7AOQdLMWWC1SEjiiKckmt/CAmxFIs/jLtfMAusvenTqkaegB2E6iziX8FIABVdXDVouUE9ucv1lDVHYXRPaRsoUSwe+fqWoN5Iv80gKfIgTw74qUwxeXFztOz31DcowCI6psGN+Mv1l3bMeudfsPP8EkRZOLDr8AAAAASUVORK5CYII='}}
              style={{height:40,width:40,marginTop:5,alignSelf:'center'}}></Image>
              
            </TouchableOpacity>
            </View>

       
        </View>
        </View>
        </View>
        </ImageBackground>
     
    );
  }
}

const styles = StyleSheet.create({
  input: {
    marginTop: 60,
    height: 40,
    width: 270,
    alignSelf: 'center',
    borderColor: '#424242',
    borderWidth: 1,
    padding:10,
    borderRadius:20
  },
  input1: {
    marginTop: 15,
    height: 40,
    width: 270,
    alignSelf: 'center',
    borderColor: '#424242',
    borderWidth: 1,
    padding:10,
    borderRadius:20
  },

  /* submit:
   {
     marginTop:25,
     backgroundColor:'blue',
     height:40,
     width:50
   }*/
});

export default Inputs
