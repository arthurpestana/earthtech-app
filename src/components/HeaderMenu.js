import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

import { Feather } from "@expo/vector-icons"
import * as Animatable from 'react-native-animatable'

export default function HeaderMenu() {
    return (
        <View style={styles.container__header}>
            <View style={styles.header__menu}>
                <View style={styles.menu__dados}>
                    <View style={styles.menu__config}>
                        <TouchableOpacity>
                            <Feather name="settings" size={20} color={"hsl(228, 8%, 98%)"} style={{
                                padding: 15,
                                backgroundColor: "hsl(228, 6%, 12%)",
                                borderRadius: 20,
                            }}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.menu__profile}>
                        <TouchableOpacity>
                            <Feather name="user" size={20} color={"hsl(228, 8%, 98%)"} style={{
                                padding: 15,
                                backgroundColor: "hsl(228, 6%, 12%)",
                                borderRadius: 20,
                            }}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container__header: {
        backgroundColor: 'hsl(228, 6%, 8%)',
        position: 'relative',
        height: "13%"
    },

    header__menu: {
        position: 'absolute',
        top: 40,
        paddingHorizontal: 25,
    },

    menu__dados: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: "100%"
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