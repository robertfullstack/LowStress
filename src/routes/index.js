import React, { useContext } from "react";
import { AuthContext } from '../context/auth';

import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";
import { View, ActivityIndicator } from "react-native";

function Routes(){
  const { signed, loading } = useContext(AuthContext);

  if(loading){
    return(
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" color="#0066CC"/>
      </View>
    )
  }

  return(
    signed ?<AppRoutes/> : <AuthRoutes/>
  )
}

export default Routes;