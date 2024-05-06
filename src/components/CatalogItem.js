import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView, Image } from 'react-native'
import { Feather } from '@expo/vector-icons'

export default function Catalog() {
    return (
        <SafeAreaView style={styles.dashboard__items}>
            <View style={styles.item__div_img}>
                <Feather name='slack' size={40} color={'hsl(228, 8%, 98%)'}/>
            </View>
            <View style={styles.dashboard__dados}>
                <View style={styles.item__div_info}>
                    <Text style={styles.item__title}>Teste</Text>
                    <Text style={styles.item__text}>Teste • Teste</Text> 
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    dashboard__items: {
        width: "100%",
        height: 100,
        backgroundColor: "hsl(228, 6%, 12%)",
        borderRadius: 20,
        marginTop: '5%',
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
        alignItems: 'flex-start',
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
