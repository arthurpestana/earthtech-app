import React from "react";
import { SafeAreaView, View, Image, Text} from 'react-native'
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer'
import 'react-native-gesture-handler'
import { Feather } from "@expo/vector-icons"

import Welcome from '../pages/Welcome/index'
import ConnectBoard from '../pages/ConnectBoard/index'
import TurnOnOff from "../pages/TurnOnOff";
import StatusInformation from "../pages/StatusInformation"
import Profile from '../pages/Profile'
import Stack from './Stack'
import { color } from "@rneui/base";

const Drawer = createDrawerNavigator();

export default function Routes() {
    return (
        <Drawer.Navigator 
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
                                paddingHorizontal: 20
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
                                    User
                                </Text>
                            </View>
                            <DrawerItemList {...props}/>
                        </SafeAreaView>
                    )
                }
            }
            screenOptions={{
                headerTransparent: true,
                headerTitle: '',
                headerShown: true,
                drawerStyle: {
                    width: 250,
                },
                drawerLabelStyle: {
                    fontSize: 16,
                } 
            }}>
            <Drawer.Screen
                name="Home"
                component={Stack}
                headerShown= {false}
                options={{
                    drawerIcon: ({color, size}) => <Feather name="home" color={color} size={size}/>,
                    drawerLabel: "Home"
                }}
            />
            <Drawer.Screen
                name="Profile"
                component={Profile}
                headerShown= {false}
                options={{
                    drawerIcon: ({color, size}) => <Feather name="user" color={color} size={size}/>,
                    drawerLabel: "Profile"
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
                name="TurnOnOff"
                component={TurnOnOff}
                headerShown={false}
                options={{
                    drawerIcon: ({color, size}) => <Feather name="toggle-right" color={color} size={size}/>,
                    drawerLabel: "ON/OFF"
                }}
            />
            <Drawer.Screen
                name="StatusInformation"
                component={StatusInformation}
                headerShown={false}
                options={{
                    drawerIcon: ({color, size}) => <Feather name="activity" color={color} size={size}/>,
                    drawerLabel: "Status"
                }}
            />
        </Drawer.Navigator>
    )
}

