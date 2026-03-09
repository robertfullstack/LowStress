import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Welcome from '../pages/Welcome';

const AuthStack = createNativeStackNavigator();

function AuthRoutes(){
    return(
        <AuthStack.Navigator>

            <AuthStack.Screen 
            name="Welcome" 
            component={Welcome}
            options={{headerShown:false}}
            />

            <AuthStack.Screen 
            name="SignIn" 
            component={SignIn}
            options={{headerShown:false}}
            />

            <AuthStack.Screen 
            name="SignUp" 
            component={SignUp}
            options={{headerShown:false}}
            />
            
        </AuthStack.Navigator>
    );
}

export default AuthRoutes;