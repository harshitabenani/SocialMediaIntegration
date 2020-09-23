import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet,Image ,Button} from 'react-native'


class ImageScreen extends React.Component
{
    static navigationOptions={
      
      alignItems:'center',
     
     header: null,
}
     
     componentDidMount() 
     {
    setTimeout(() => {this.props.navigation.navigate('Login')
      
      }, 2000);
  }
  render()
  {
    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'#424242' }}>
     
          
        
      
      
     <Image
  source={{uri:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAACJUlEQVRoge2Zu07jQBSGx7RcHgKloAw9WhAg7YokvA+XAmkR7wBvAB0FHYkRL5GGFgkKit2kzreFj5Hxjp1je3yRmF+KHCnnzPk/jz2jnDHGy6t5ASMgBObymQBDZe4x8Aegbp/LjFyRrcucvAC4ABZxcJO+02ZGORCx/psZYAO4Twe2wRAbChUg41TOFjC1BbbFYYCZAuRvIv7zfcgDyfh5LjfgBjhwDTJXgMwcgaQVAj1XIBNFwcdUTqlHC1gF+sAZ8CYpH8COC5BdBcgPS16llx1YB24TMNVnBjglsYQmtABOcvIqLb+Sfyepk8ogMugAeEpAhMCRMrf0higz8y413S0AZe6sg5rnUvba5aBtgPSl7NTloG2ArEnZ2fJo/aCNgxStu1K3mabkQbomD9I1eZCuyYN0TR6ka/IgXZMH6Zo8SNekBZkbE/39rNFLJWlBXuW6WZeRqtKCPMt1VJeRRgQcSB/gDVgvkY80646V8b+Ah0Rj8AH4Wdy5ffBQBr0FgoK5sRZE7dTMfGnMZbVqz1yA9IgayxD1ZtUzYzF1D2xY4vYssWntuoDZScC8y93bZslqlmFoCmyl4kIFyDirTlGYHrrzE80Bz5f3hoIHTEkV3hCDIHgJgmDfGHNojLkxxkyN7DMOpOkqtnomaZPt0dLMtJtHq4wsZrJe9qECZNAGQ2wwlmb5vcyB+N2kb5s5KLYhDoEx0TH5TL63NxNe31n/ADRBdoye5JrMAAAAAElFTkSuQmCC"}}
  style={{marginTop:40,height:170,width:170,alignSelf:'center',borderRadius:200}}
  />
  
</View>
   
    )

  }

 

}



export default ImageScreen