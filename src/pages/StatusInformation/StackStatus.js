import React from "react";
import {} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer }  from '@react-navigation/native'

import StatusInformation from '../StatusInformation/index'
import AddTopic from '../StatusInformation/AddTopic'
import FabButton from "../../components/FabButton";

const Stack = createNativeStackNavigator();

export default function StackStatus() {
    return (
            <Stack.Navigator>
                <Stack.Screen
                    name='StatusInformation'
                    component={StatusInformation}
                />
                <Stack.Screen
                    name= 'AddTopic'
                    component={AddTopic}
                />
                <Stack.Screen
                    name= 'FabButton'
                    component={FabButton}
                />
            </Stack.Navigator>
    )
}
