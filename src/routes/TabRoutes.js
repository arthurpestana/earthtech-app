import React from 'react'
import {View, TouchableOpacity, Text, Platform} from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Feather, MaterialIcons } from '@expo/vector-icons'

import AdCalculator from '../pages/AdCalculator';

import ConnectBoard from '../pages/ConnectBoard'

import Home from '../pages/Home'

import StatusInformation from '../pages/StatusInformation/index';
import AddTopic from '../pages/StatusInformation/AddTopic';
import Configuration from '../pages/Configuration'
import Profile from '../pages/Profile/index'

import Catalogo from '../pages/Catalogo/index';
import CatalogItem from '../pages/Catalogo/CatalogItem';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
export default function TabRoutes() {

    const heightTabBar = Platform.OS=='ios'?100:55

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({route}) => ({
                tabBarStyle: {
                    backgroundColor: 'hsl(228, 6%, 12%)',
                    borderTopColor: 'hsl(228, 6%, 12%)',
                    height: heightTabBar,
                    
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
                    name='StatusStack'
                    component={StatusStack}
                    options={{
                        tabBarShowLabel: false,
                        tabBarLabel: '',
                        tabBarIcon: ({size, color}) => (<Feather name='activity' color={color} size={20}/>)
                    }}
                />
                <Tab.Screen
                    name='CatalogStack'
                    component={CatalogStack}
                    options={{
                        tabBarShowLabel: false,
                        tabBarLabel: '',
                        tabBarIcon: ({size, color}) => (<Feather name='book' color={color} size={20}/>)
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
                <Tab.Screen
                    name='AdCalculator'
                    component={AdCalculator}
                    options={{
                        tabBarShowLabel: false,
                        tabBarLabel: '',
                        tabBarIcon: ({size, color}) => (<MaterialIcons name='calculate' color={color} size={20}/>)
                    }}
                />
            </Tab.Group>
        </Tab.Navigator>
    )
}

function StatusStack() {
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

function CatalogStack() {
    return (
        <Stack.Navigator  initialRouteName="CatalogoIndex">
            <Stack.Screen
                name='CatalogoIndex'
                component={Catalogo}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name= 'CatalogItem'
                component={CatalogItem}
                options={{
                    headerShown: false,
                    title: "",
                }}
            />
        </Stack.Navigator>
    )
}