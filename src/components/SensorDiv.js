import React from 'react'
import { SafeAreaView, Text, View, TouchableOpacity, Animated, StyleSheet, Switch} from 'react-native'
import { AntDesign, Entypo} from '@expo/vector-icons'

import * as Animatable from 'react-native-animatable'
import { Feather } from "@expo/vector-icons"

export default function (props) {
    return (
        <SafeAreaView style={styles.dashboard__items}>
            <View style={styles.dashboard__switch}>
                <Text style={styles.switch__text}>ON/OFF</Text>
                <Switch
                    trackColor={{false: '#E94A35', true: '#37924e'}}
                    thumbColor={'#FFF'}
                    //onValueChange={altSwitch}
                    //value={isEnabled}
                    style={styles.box_switch}
                />
            </View>
            <View style={styles.dashboard__dados}>
                <View style={styles.item__div_logo}>
                    <Feather name={props.typeIcon} size={35} color="hsl(228, 8%, 98%)"/>
                </View>
                <View style={styles.item__div_info}>
                    <Text style={styles.item__title}>{props.title}</Text>
                    <Text style={[styles.item__text]}>Teste • Teste</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    dashboard__items: {
        width: 150,
        height: 150,
        backgroundColor: "hsl(228, 6%, 12%)",
        marginBottom: 25,
        borderRadius: 25,
    },

    dashboard__switch: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },

    switch__text: {
        fontFamily: 'Montserrat_600SemiBold',
        color: 'hsl(228, 8%, 70%)',
    },

    dashboard__dados: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 10
    },

    item__div_logo: {
        marginBottom: 5
    },

    item__div_info: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 5
    },

    item__title: {
        fontFamily: 'Montserrat_700Bold',
        color: 'hsl(228, 8%, 98%)',
        fontSize: 14
    },

    item__text: {
        fontFamily: 'Montserrat_400Regular',
        color: 'hsl(228, 8%, 98%)',
        fontSize: 12
    },
})