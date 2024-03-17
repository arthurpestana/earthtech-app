import React from 'react'
import { View, Text, TextInput } from "react-native";

import styles from '../styles/style_connect'

export default function (props) {
    return (
        <View style={[styles.forms, styles.form_1]}>
            <Text style={styles.form__text}></Text>
                <TextInput 
                style={styles.form__input}
                placeholder={props.placeholder}
                value={props.value}
                onChangeText={props.onChangeText}
                keyboardType={props.numeric?'numeric':'default'}
                secureTextEntry={props.password?true:false}
                />
        </View>
    )
}