import {useState, useEffect} from 'react'
import { View, Text, TextInput } from "react-native";

import styles from '../styles/style_connect'
import * as Animatable from 'react-native-animatable'


export default function (props) {
    const [onFocusedInput, setFocusedInput] = useState(true)

    const customOnFocus = () => {
        setFocusedInput(true)
    }

    const customOnBlur = () => {
        if (props.value != '') {
            setFocusedInput(true)
        }
        else {
            setFocusedInput(false)
        }
    }

    return (
        <Animatable.View animation={'fadeInLeft'} delay={props.delay} style={styles.main__form}>
            <View style={onFocusedInput ? styles.form_box__textFocused : styles.form_box__text}>
                <Text style={styles.form__text}>{props.placeholder}</Text>
            </View>
            <TextInput 
                style={styles.form__input}
                placeholder=''
                value={props.value}
                onChangeText={props.onChangeText}
                keyboardType={props.numeric?'numeric':'default'}
                secureTextEntry={props.password?true:false}
                onPressIn={customOnFocus}
                onBlur={customOnBlur}
            />
        </Animatable.View>
    )
}