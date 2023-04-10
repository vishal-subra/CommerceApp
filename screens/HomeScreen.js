import React, { Component, useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import CustomAppBar from '../component/customAppBar';
import Homepage from './HomepageScreen';
import Profile from './ProfileScreen';
import Leaderboard from './LeaderboardScreen';
import OrdersScreen from './OrdersScreen';
import { useSelector, useDispatch } from 'react-redux';
import { getProfile, logout } from '../actions/userActions';
const Tab = createBottomTabNavigator();



const HomeScreen = ({ route }) => {
    const { userInfo } = route.params;
    const dispatch = useDispatch();
    const userUpdate = useSelector(state => state.userUpdate);

    const { } = userUpdate;


    useEffect(() => {
        dispatch(getProfile(userInfo.id))
        return () => {
            //
        };
    }, [userUpdate.status]);

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === 'Profile') {
                return (
                  <Ionicons
                    name={'md-person'}
                    size={size}
                    color={color}
                  />
                );
              }
              else if (route.name === 'Leaderboard') {
                return (
                  <Ionicons
                    name={'md-podium'}
                    size={size}
                    color={color}
                  />
                );
    
              }
              else if (route.name === 'Order') {
                return (
                  <MaterialIcons name="history" size={size} color={color} />
                  // <Ionicons
                  //   name={'md-orders'}
                  //   size={size}
                  //   color={color}
                  // />
                );
    
              }
              else if (route.name === 'Home') {
                return (
                  <Ionicons
                    name={'md-home'}
                    size={size}
                    color={color}
                  />
                );
    
              }
    
    
            },
    
            tabBarInactiveTintColor: 'gray',
            tabBarActiveTintColor: 'tomato',
            header: (props) => <CustomAppBar {...props} logout={() => handleLogout()} />
    
          })}
        >
          <Tab.Screen name="Home" component={Homepage} />
          <Tab.Screen name="Leaderboard" component={Leaderboard} />
          <Tab.Screen name="Order" component={OrdersScreen}  />
          <Tab.Screen name="Profile" component={Profile}  />
        </Tab.Navigator>
      );
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});