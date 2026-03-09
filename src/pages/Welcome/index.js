import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

import * as Animatable from 'react-native-animatable' 
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {

  const navigation = useNavigation();

 return (
   <View style={styles.container}>

    <View style={styles.containerLogo}>
      <Animatable.Image
        source={require('../../assets/vetorWelcome.png')}
        style={{width:'100%', height:'100%'}}
        resizeMod='contain'
        animation='fadeInDown'
      />
    </View>

    <Animatable.View animation='fadeInUp' delay={600} style={styles.containerForm}>
      <Text style={styles.title}>Tenha tranquilidade e se acalme de qualquer lugar!</Text>
      <Text style={styles.text}>Faça o login para começar.</Text>

      <TouchableOpacity style={styles.button} onPress={ () => navigation.navigate('SignIn')}>
        <Text style={styles.buttonText}>Acessar</Text>
      </TouchableOpacity>
    </Animatable.View>

   </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#556aa9'
  },
  containerLogo:{
    flex:2,
    backgroundColor: '3a46e4',
    justifyContent: 'center',
    alignItems:'center'
  },
  containerForm:{
    flex:1,
    backgroundColor:'#fff',
    borderTopLeftRadius:25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%'
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold',
    marginTop:28,
    marginBottom:12
  },
  text:{
    color:'#a1a1a1'
  },
  button:{
    position: 'absolute',
    backgroundColor:'#556aa9',
    borderRadius: 50,
    paddingVertical: 8,
    width:'75%',
    alignSelf:"center",
    bottom:'30%',
    alignItems:'center',
    justifyContent:'center'
  },
  buttonText:{
    fontSize:22,
    color:'#fff',
    fontWeight:'bold'
  }

})