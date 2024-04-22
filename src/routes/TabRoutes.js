import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons'

import ConnectBoard from '../pages/ConnectBoard'
import StatusInformation from '../pages/StatusInformation'; 

const Tab = createBottomTabNavigator()

export default function TabRoutes() {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen
                    name='connection'
                    component={ConnectBoard}
                    options={{
                        tabBarIcon: ({color, size}) => <Feather name="activity" color={color} size={size}/>,
                        tabBarLabel: "Status"
                    }}
                />
                <Tab.Screen
                    name='status'
                    component={StatusInformation}
                    options={{
                        tabBarIcon: ({color, size}) => <Feather name="power" color={color} size={size}/>,
                        tabBarLabel: "Conexão"
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}