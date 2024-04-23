import React, { Component } from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Animated} from 'react-native'
import { AntDesign, Entypo} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function FabButton(props) {
    const Navigation = useNavigation()
    return (
        <View style={[styles.container__button, props.style]}>
            <TouchableOpacity  onPress={() => Navigation.navigate('AddTopic')}>
                <Animated.View style={[styles.button]}>
                    <AntDesign name='plus' size={24} color="#FFF"/>
                </Animated.View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container__button: {
        display: 'flex',
        alignItems: 'center',
        position: 'absolute'
    },

    button: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 60/4,
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
        shadowOpacity: 0.3,
        shadowColor: "#00213B",
        shadowOffset: {
            height: 10,
        },
        backgroundColor: '#3e5c43'
    },
})