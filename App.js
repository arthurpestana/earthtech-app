import React from 'react'
import { StatusBar } from "react-native";

import { NavigationContainer }  from '@react-navigation/native'
import Routes from './src/routes/index'
import { MQTTProvider } from './src/components/Context';

export default function App() {
    return (
        <NavigationContainer>   
            <MQTTProvider>
                <Routes/>
            </MQTTProvider>
        </NavigationContainer>
    )
}