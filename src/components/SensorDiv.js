import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'

import * as Animatable from 'react-native-animatable'
import styles from '../styles/style_switch'
import { Feather } from "@expo/vector-icons"

export default function (props) {
    return (
        <SafeAreaView style={styles.dashboard__items}>
            <View style={styles.item__div_title}>
                <Feather name={props.typeIcon} size={18}/>
                <Text style={[styles.dashboard__text, styles.item__title]}>{props.title}</Text>
            </View>
            <View style={styles.item__div_info}>
                <Text style={[styles.dashboard__text, styles.item__info]}>{props.info}</Text>
            </View>
        </SafeAreaView>
    )
}