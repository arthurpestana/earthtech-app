import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native'
import { AntDesign, Entypo, Feather} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default (props) => {
    const Navigation = useNavigation()

    return (
        <View style={[Platform.OS=='ios'?styles.container__headerIOS:styles.container__headerAnd, props.modalView?styles.modalView:false]}>
            <TouchableOpacity style={styles.button} onPress={props.modalView?props.modalButton:() => Navigation.navigate(props.nav)}>
                <View>
                    <Feather name={props.modalView?'x':'arrow-left'} size={25} color={"hsl(228, 8%, 98%)"}/>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container__headerAnd: {
        position: 'absolute',
        top: 45,
        left: 20,
        zIndex: 1000
    },

    container__headerIOS: {
        position: 'absolute',
        top: 60,
        left: 20,
        zIndex: 1000
    },

    button: {
        padding: 10,
        borderRadius: 10,
        zIndex: 1000
    },

    modalView: {
        top: 15,
        left: 10,
    },
})