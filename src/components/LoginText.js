import {useState} from 'react'
import { View, Text, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons"
import styles from '../styles/style_login'
import * as Animatable from 'react-native-animatable'
import { color } from '@rneui/base';


export default function (props) {
    return (
        <Animatable.View animation={'fadeInLeft'} delay={props.delay} style={styles.main__form}>
            <View style={styles.form__icon}>
                <Ionicons name={props.iconName} size={30} style={{color: '#73DF5E'}}/>
            </View>
            <TextInput 
                style={styles.form__input}
                placeholder={props.placeholder}
                placeholderTextColor={'black'}
                value={props.value}
                onChangeText={props.onChangeText}
                keyboardType={props.numeric?'numeric':'default'}
                secureTextEntry={props.password?true:false}
            >
            </TextInput>
        </Animatable.View>
    )
}