import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/index';
//import 'react-native-gesture-handler';
import AuthProvider from './src/context/auth';

export default function App(){
  
    return (
      <NavigationContainer>
        <AuthProvider>
          <StatusBar backgroundColor='#556aa9' barStyle='light-content'/> 
          <Routes/>
        </AuthProvider>
      </NavigationContainer>
    );
}