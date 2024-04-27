import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons'

import StatusInformation from "../pages/StatusInformation/index"
import Drawer from './Drawer'
import ConnectBoard from '../pages/ConnectBoard/index'
import Welcome from '../pages/Welcome/index'

const Tab = createBottomTabNavigator()

export default function TabRoutes() {
    return (
        <Tab.Navigator initialRouteName="StatusInformation"  screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name='Home'
                component={Drawer}
                options={{
                    tabBarIcon: ({color, size}) => <Feather name="home" color={color} size={size}/>,
                    tabBarLabel: "Home",
                    tabBarStyle: { display: 'none' }
                }}
            />
            <Tab.Screen
                name='StatusInformation'
                component={StatusInformation}
                options={{
                    tabBarIcon: ({color, size}) => <Feather name="activity" color={color} size={size}/>,
                    tabBarLabel: "Status"
                }}
            />
        </Tab.Navigator>
    )
}