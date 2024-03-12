import React from "react";
import {} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Welcome from '../pages/Welcome'
import ConnectBoard from '../pages/ConnectBoard'

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
                name="ConnectBoard"
                component={ConnectBoard}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}

