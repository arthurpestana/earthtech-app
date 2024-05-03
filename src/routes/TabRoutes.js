import React from 'react'
import {View, TouchableOpacity, Text } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Feather } from '@expo/vector-icons'

import ConnectBoard from '../pages/ConnectBoard'
import Profile from '../pages/Profile/index'
import StatusInformation from '../pages/StatusInformation/index';
import AddTopic from '../pages/StatusInformation/AddTopic';
import Home from '../pages/Home'
import Configuration from '../pages/Configuration'
import Cadastro from '../pages/Cadastro/index'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
export default function TabRoutes() {

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({route}) => ({
                tabBarStyle: {
                    backgroundColor: 'hsl(228, 6%, 12%)',
                    borderColor: 'transparent',
                    height: 55,
                    position: 'absolute',
                    bottom: 0,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                },
                tabBarHideOnKeyboard: true,
                tabBarActiveTintColor: 'hsl(93, 40%, 30%)',
                tabBarInactiveTintColor: 'hsl(228, 8%, 98%)',
                headerShown: false
            })}
        >
            <Tab.Group>
                <Tab.Screen
                    name='Home'
                    component={Home}
                    options={{
                        tabBarShowLabel: false,
                        tabBarLabel: '',
                        tabBarIcon: ({size, color}) => (<Feather name='home' color={color} size={20}/>)
                    }}
                />
                <Tab.Screen
                    name='StatusPageStack'
                    component={StatusPageStack}
                    options={{
                        tabBarShowLabel: false,
                        tabBarLabel: '',
                        tabBarIcon: ({size, color}) => (<Feather name='activity' color={color} size={20}/>)
                    }}
                />
                <Tab.Screen
                    name='Conexão'
                    component={ConnectBoard}
                    options={{
                        tabBarShowLabel: false,
                        tabBarLabel: '',
                        tabBarIcon: ({size, color}) => (<Feather name='edit' color={color} size={20}/>)
                    }}
                />
            </Tab.Group>
        </Tab.Navigator>
    )
}

function StatusPageStack() {
    return (
        <Stack.Navigator  initialRouteName="StatusInformation">
            <Stack.Screen
                name='StatusInformation'
                component={StatusInformation}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name= 'AddTopic'
                component={AddTopic}
                options={{
                    headerShown: false,
                    title: "",
                }}
            />
            <Stack.Screen
                name= 'Profile'
                component={Profile}
                options={{
                    headerShown: false,
                    title: "",
                }}
            />
            <Stack.Screen
                name= 'Configuration'
                component={Configuration}
                options={{
                    headerShown: false,
                    title: "",
                }}
            />
        </Stack.Navigator>
    )
}