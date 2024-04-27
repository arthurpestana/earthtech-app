import React from "react";
import { SafeAreaView, View, Image, Text} from 'react-native'
import { createDrawerNavigator, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler'
import { Feather } from "@expo/vector-icons"

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer }  from '@react-navigation/native'

import AddTopic from '../pages/StatusInformation/AddTopic'
import TabRoutes from './TabRoutes'

const Stack = createNativeStackNavigator();

import Welcome from '../pages/Welcome/index'
import ConnectBoard from '../pages/ConnectBoard/index'
import StatusInformation from "../pages/StatusInformation/index"
import StackNav from './Stack'
import { color } from "@rneui/base";
import { useMQTT } from "../components/Context";
import { useSQLiteContext } from "expo-sqlite/next";
import { useNavigationState } from "@react-navigation/native";


export default function Routes() {
    const Tab = createBottomTabNavigator()
    const Drawer = createDrawerNavigator();
    const db = useSQLiteContext()
    const { userId, setId, userName, setName, mail, setMail, loggedIn, setLoggedIn, client, setClient, isConnected, setConnected } = useMQTT()

    async function LogoutAccount(){
        await db.execAsync(`UPDATE users SET logged = ${0} WHERE id = ${userId}`)
        setName(null)
        setId(null)
        setMail(null)
        setConnected('Desconectado')
        setClient(null)
        setLoggedIn(false)
    }
    return (
        <Drawer.Navigator
            initialRouteName="Conexão" 
            drawerContent={
                (props) => {
                    return (
                        <SafeAreaView>
                            <View style={{
                                height: 100,
                                width: "100%",
                                display: "flex",
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                flexDirection: 'row',
                                borderBottomColor: "#79927d",
                                borderBottomWidth: 1,
                                marginTop: 20,
                                marginBottom: 50,
                                paddingHorizontal: 20,
                            }}>
                                <Feather name="user" size={30} style={{
                                    padding: 5,
                                    backgroundColor: "lightgray",
                                    borderRadius: 50,
                                }}/>
                                <Text style={{
                                    fontSize: 25,
                                    fontFamily: "sans-serif",
                                    marginHorizontal: 10,
                                    color: "#507957"
                                }}>
                                    {userName}
                                </Text>
                            </View>
                            <DrawerItemList {...props}/>
                            <DrawerItem
                                label="Sair"
                                onPress={() => LogoutAccount()}
                                inactiveTintColor="red"
                                icon= {({color, size}) => <Feather name="log-out" color={color} size={size}/>}
                                style= {{marginTop: "100%"}}
                            />
                        </SafeAreaView>
                    )
                }
            }
            screenOptions={{
                headerTransparent: true,
                headerTitle: '',
                drawerStyle: {
                    width: 250,
                },
                drawerLabelStyle: {
                    fontSize: 16,
                } 
            }}>
            <Drawer.Screen
                name="Home"
                component={ConnectBoard}
                headerShown= {false}
                options={{
                    drawerIcon: ({color, size}) => <Feather name="home" color={color} size={size}/>,
                    drawerLabel: "Home"
                }}
            />
            <Drawer.Screen
                name="Conexão"
                component={ConnectBoard}
                headerShown={false}
                options={{
                    drawerIcon: ({color, size}) => <Feather name="power" color={color} size={size}/>,
                    drawerLabel: "Connection"
                }}
            />
            <Drawer.Screen
                name="StatusPage"
                component={StatusPage}
                headerShown={false}
                options={{
                    headerShown: false,
                    drawerIcon: ({color, size}) => <Feather name="activity" color={color} size={size}/>,
                    drawerLabel: "Status"
                }}
            />
        </Drawer.Navigator>
    )
}

function StatusPage() {
    return (
        <Stack.Navigator  initialRouteName="StatusInformation">
            <Stack.Screen
                name='TabRoutes'
                component={TabRoutes}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name= 'AddTopic'
                component={AddTopic}
                options={{
                    headerShown: false,
                    title: "",
                    headerStyle: {
                        backgroundColor: '#fff',
                    },
                    headerTintColor: '#000',
                }}
            />
        </Stack.Navigator>
    )
}

