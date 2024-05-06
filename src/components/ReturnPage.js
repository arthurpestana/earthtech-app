import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { AntDesign, Entypo, Feather} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default (props) => {
    const Navigation = useNavigation()

    return (
        <View style={styles.container__header}>
            <TouchableOpacity  onPress={() => Navigation.navigate(props.nav)}>
                <View style={[styles.button]}>
                    <AntDesign name='plus' size={24} color="hsl(228, 8%, 98%)" style={{transform: [{rotate: '45deg'}]}}/>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container__header: {
        position: 'absolute',
        top: 50,
        paddingHorizontal: 25,
    },
})