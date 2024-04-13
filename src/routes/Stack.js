import React from "react";
import {} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Welcome from '../pages/Welcome/index'
import ConnectBoard from '../pages/ConnectBoard/index'
import Login from '../pages/Login/index'
import Cadastro from '../pages/Cadastro/index'

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='Welcome'
                component={Welcome}
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name= 'ConnectBoard'
                component={ConnectBoard}
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name= 'Login'
                component={Login}
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name= 'Cadastro'
                component={Cadastro}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}

