import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { AntDesign, Entypo, Feather} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default (props) => {
    const Navigation = useNavigation()

    return (
        <View style={[styles.container__header, props.modalView?styles.modalView:false]}>
            <TouchableOpacity  onPress={() => Navigation.navigate(props.nav)}>
                <View style={[styles.button]}>
                    <Feather name={props.modalView?'x':'arrow-left'} size={25} color={"hsl(228, 8%, 98%)"}/>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container__header: {
        position: 'absolute',
        top: 50,
        left: 25,
        padding: 5,
        zIndex: 1000
    },

    modalView: {
        top: 20,
        left: 10,
    },
})