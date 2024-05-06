import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView, Image } from 'react-native'
import { Feather } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'

export default function Catalog(props) {
    return (
        <Animatable.View animation={'fadeInLeft'} delay={600} style={styles.dashboard__items}>
            <View style={styles.item__div_img}>
                <Feather name='slack' size={40} color={'hsl(228, 8%, 98%)'}/>
            </View>
            <View style={styles.dashboard__dados}>
                <View style={styles.item__div_info}>
                    <Text style={styles.item__title}>{props.nome}</Text>
                    <Text style={styles.item__text}>{props.tipo} • {props.clima}</Text> 
                </View>
            </View>
            <View style={styles.dashboard__dados}>
                <TouchableOpacity>
                    <Feather name='chevron-right' size={25} color={'hsl(228, 8%, 98%)'}/>
                </TouchableOpacity>
            </View>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    dashboard__items: {
        width: "100%",
        height: 100,
        backgroundColor: "hsl(228, 6%, 12%)",
        borderRadius: 20,
        marginBottom: '5%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    dashboard__dados: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },

    item__div_img: {
        display: 'flex'
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