import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Feather } from "@expo/vector-icons"
import * as Animatable from 'react-native-animatable'
import { useMQTT } from './Context'

export default function HeaderMenu() {
    const Navigation = useNavigation()
    const { isConnected } = useMQTT()

    return (
        <View style={styles.container__header}>
            <View style={[styles.header__menu, Platform.OS=='ios' && styles.headerIOS]}>
                <View style={styles.menu__dados}>
                    {isConnected==true?
                        <TouchableOpacity style={styles.menu__button} onPress={() => Navigation.navigate('Configuration')}>
                            <View style={styles.menu__config}>
                                <Feather name="settings" size={20} color={"hsl(228, 8%, 98%)"}/>
                            </View>
                        </TouchableOpacity>
                    :false}
                    <TouchableOpacity style={styles.menu__button} onPress={() => Navigation.navigate('Profile')}>
                        <View style={styles.menu__profile}>
                            <Feather name="user" size={20} color={"hsl(228, 8%, 98%)"}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container__header: {
        backgroundColor: 'hsl(228, 6%, 8%)',
        position: 'relative',
        height: '13%'
    },

    header__menu: {
        position: 'absolute',
        top: 50,
        paddingHorizontal: 25,
    },

    headerIOS: {
        top: 65
    },

    menu__dados: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: "100%"
    },

    menu__button: {
        padding: 15,
        backgroundColor: "hsl(228, 6%, 12%)",
        borderRadius: 15,
    },

    header__logo: {
        height: 300,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },

    menu__title: {
        fontSize: 20,
        color: '#3e5c43'
    },
    
})