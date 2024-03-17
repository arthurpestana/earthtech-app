import React from "react";
import {} from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import 'react-native-gesture-handler';

import Welcome from '../pages/Welcome/index'
import ConnectBoard from '../pages/ConnectBoard/index'
import Stack from './Stack'

const Drawer = createDrawerNavigator();

export default function Routes() {
    return (
        <Drawer.Navigator screenOptions={{
            headerTransparent: true,
            headerTitle: '',
            headerShown: true
            }}>
            <Drawer.Screen
                name="Home"
                component={Stack}
                headerShown= {false}
            />
            <Drawer.Screen
                name="Conexão"
                component={ConnectBoard}
                headerShown={false}
            />
        </Drawer.Navigator>
    )
}

