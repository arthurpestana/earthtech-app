import React from 'react'
import { SafeAreaView, Text, View, TouchableOpacity, Animated} from 'react-native'
import { AntDesign, Entypo} from '@expo/vector-icons'

import * as Animatable from 'react-native-animatable'
import styles from '../styles/style_status'
import { Feather } from "@expo/vector-icons"

export default function (props) {
    return (
        <SafeAreaView style={styles.dashboard__items}>
            <View style={styles.dashboard__dados}>
                <View style={styles.item__div_logo}>
                    <Feather name={props.typeIcon} size={18}/>
                </View>
                <View style={styles.item__div_info}>
                    <Text style={[styles.dashboard__text, styles.item__title]}>{props.title}</Text>
                    <Text style={[styles.dashboard__text]}>Teste • Teste</Text>
                </View>
            </View>
            <View style={styles.item__div_button}>
                <TouchableOpacity>
                    <Animated.View style={[styles.button]}>
                        <Entypo name='chevron-right' size={24} color="#000"/>
                    </Animated.View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}