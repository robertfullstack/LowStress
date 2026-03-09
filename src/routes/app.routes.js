import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Home from "../pages/Home";
import Music from '../pages/Music/index';
import Relax from '../pages/Music/relax';
import Concentration from '../pages/Music/concentration';
import CalmDown from '../pages/Music/calmDown';
import Happy from '../pages/Music/happy';
import Profile from '../pages/Profile/index';
import About from '../pages/Profile/about';
import Exercises from '../pages/Exercises/index';
import Ansiedade from '../pages/Exercises/ansiedade';
import Estresse from '../pages/Exercises/estresse'
import Notepad from '../pages/Notepad/index';
import Write from '../pages/Notepad/write';
import SelectButtons from '../pages/Notepad/selectButtons';
import SwitchEmotion from '../pages/Notepad/switchEmotion';
import ChooseEmotion from "../pages/Notepad/AnotherDay/chooseEmotion";
import ADSelectButtons from "../pages/Notepad/AnotherDay/selectButtons";
import ADWrite from "../pages/Notepad/AnotherDay/write";
import ADSwitchEmotion from "../pages/Notepad/AnotherDay/switchEmotion";
import Edit from "../pages/Notepad/Edit/index";
import ESwitchEmotion from "../pages/Notepad/Edit/switchButtons";
import ESelectButtons from "../pages/Notepad/Edit/selectButtons";

const AppStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AppRoutes() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="HomeMain" component={TabNavigator} />
      <AppStack.Screen name="Ansiedade" component={Ansiedade}/>
      <AppStack.Screen name="Estresse" component={Estresse}/>
    </AppStack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#556aa9',
          borderTopColor: 'transparent'
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#8896d7'
      }}>

      <Tab.Screen
        name="Início"
        component={HomeNavigation}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name='home' size={size} color={color} focused={focused} />
          )
        }}
      />

      <Tab.Screen
        name="Músicas"
        component={MusicNavigation}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="music" size={size} color={color} />
          )
        }}
      />

      <Tab.Screen
        name="Exercícios"
        component={ExercisesNavigation}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="weather-windy" size={size} color={color} />
          )
        }}
      />

      <Tab.Screen
        name="Diário"
        component={NotepadNavigation}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="book" size={size} color={color} />
          )
        }}
      />

      <Tab.Screen
        name="Configurações"
        component={ProfileNavigation}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="settings" size={size} color={color} />
          )
        }}
      />

    </Tab.Navigator>
  );
}

const HeaderTitleWithImage = () => (
  <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
    <Image
      source={require('../assets/logo/logoTitle.png')}
      style={{ width: wp('100%'), height: hp('7%'),marginRight: wp('5.5%') }}
      resizeMode="contain"
    />
  </View>
);

function HomeNavigation() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="HomeScreen" component={Home}
        options={{
          headerShown: true,
          headerTitle: () => <HeaderTitleWithImage/>,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#556aa9',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {

            fontWeight: 'bold',
          },
        }}
      />
    </AppStack.Navigator>
  );
}

function ExercisesNavigation() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Exercises" component={Exercises}
        options={{
          headerShown: true,
          headerTitle: () => <HeaderTitleWithImage/>,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#556aa9',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {

            fontWeight: 'bold',
          },
        }}
      />
    </AppStack.Navigator>
  );
}

function MusicNavigation() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Music" component={Music}
        options={{
          headerShown: true,
          headerTitle: () => <HeaderTitleWithImage/>,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#556aa9',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {

            fontWeight: 'bold',
          },
        }}
      />
      <AppStack.Screen name="Relax" component={Relax} />
      <AppStack.Screen name="CalmDown" component={CalmDown} />
      <AppStack.Screen name="Concentration" component={Concentration} />
      <AppStack.Screen name="Happy" component={Happy} />
    </AppStack.Navigator>
  );
}

function NotepadNavigation() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen
        name="Notepad"
        component={Notepad}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitle: () => <HeaderTitleWithImage/>,
          headerStyle: {
            backgroundColor: '#556aa9',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <AppStack.Screen name="SelectButtons" component={SelectButtons} />
      <AppStack.Screen name="Write" component={Write} />
      <AppStack.Screen name="ChooseEmotion" component={ChooseEmotion} />
      <AppStack.Screen name="SwitchEmotion" component={SwitchEmotion} />
      <AppStack.Screen name="ADSelectButtons" component={ADSelectButtons} />
      <AppStack.Screen name="ADSwitchEmotion" component={ADSwitchEmotion} />
      <AppStack.Screen name="ADWrite" component={ADWrite} />
      <AppStack.Screen name="Edit" component={Edit} />
      <AppStack.Screen name="ESelectButtons" component={ESelectButtons} />
      <AppStack.Screen name="ESwitchEmotion" component={ESwitchEmotion} />
    </AppStack.Navigator>
  );
}

function ProfileNavigation() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: true,
          headerTitle: () => <HeaderTitleWithImage/>,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#556aa9',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <AppStack.Screen name="About" component={About} />
    </AppStack.Navigator>
  );
}

export default AppRoutes;