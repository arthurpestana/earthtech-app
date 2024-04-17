import React from "react";
import {} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Drawer from './Drawer.js'
import StackScrn from './Stack.js'

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator initialRouteName="Stack">
            <Stack.Screen 
                name='Drawer'
                component={Drawer}
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name= 'Stack'
                component={StackScrn}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}

