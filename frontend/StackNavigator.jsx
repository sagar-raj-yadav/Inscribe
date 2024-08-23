import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Home from './screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ThreadsScreen from './screens/ThreadsScreen';
import ActivityScreen from './screens/ActivityScreen'
import ProfileScreen from './screens/ProfileScreen';
import Comment from './screens/Comment';
import Explore from './explore/Explore';

import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab=createBottomTabNavigator();

  const BottomTabs=()=>{
    return (
      <Tab.Navigator
      screenOptions={{
        tabBarStyle:{height:80,borderTopWidth: 1, paddingBottom:20,
        paddingTop:12,
          elevation: 0,
          shadowOpacity: 0, }
      }}
    >

    {/* home */}
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarLabel:"HOME",
          tabBarLabelStyle:{color:"black"},
          headerShown:false,
          tabBarIcon:({focused})=>
          focused?(
            <Entypo name="home" size={35} color="black" />
          ):(
            <AntDesign name="home" size={30} color="black" />
          )
          }}
          
      />

      

      {/* Explore */}
      <Tab.Screen
        name="explore"
        component={Explore}
        options={{
          tabBarLabel:"explore",
          tabBarLabelStyle:{color:"black"},
          headerShown:false,
          tabBarIcon:({focused})=>
            <Octicons name="video" size={24} color="black" />
          }}
      />

{/* Post thread */}
<Tab.Screen
        name="thread"
        component={ThreadsScreen}
        options={{
          tabBarLabel:"create Post",
          tabBarLabelStyle:{color:"black"},
          headerShown:false,
          tabBarIcon:({focused})=>
          focused?(
            <Ionicons name="create" size={32} color="black" />
          ):(
            <Ionicons name="create-outline" size={32} color="black" />
          )
          }}
          
      />

  
{/* activity */}
<Tab.Screen
        name="activity"
        component={ActivityScreen}
        options={{
          tabBarLabel:"Activity",
          tabBarLabelStyle:{color:"black"},
          headerShown:false,
          tabBarIcon:({focused})=>
          focused?(
            <Entypo name="heart" size={36} color="red" />
          ):(
            <AntDesign name="hearto" size={30} color="black" />
          )
          }}
          
      />

{/* ProfileScreen */}
<Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarLabel:"Profile",
          tabBarLabelStyle:{color:"black"},
          headerShown:false,
          tabBarIcon:({focused})=>
          focused?(
            <Ionicons name="person" size={32} color="black" />
          ):(
            <Ionicons name="person-outline" size={32} color="black" />
          )
          }}
          
      />
      
    </Tab.Navigator>
    
    )
  }
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}} />
      <Stack.Screen name="main" component={BottomTabs} options={{headerShown:false}}    /> 
      <Stack.Screen name="comment" component={Comment} options={{headerShown:false}}   />
      <Stack.Screen name="explore" component={Explore} options={{headerShown:false}}   />
    </Stack.Navigator>
  </NavigationContainer>
  )
}
//<Stack.Screen name="main" component={BottomTabs} options={{headerShown:false}}  />  -> upar ka header remove ho jayega

const styles = StyleSheet.create({
  
})

export default StackNavigator
