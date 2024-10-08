import {useState, useEffect} from 'react'
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons"
import * as Animatable from 'react-native-animatable'

export default function (props) {
    const [onFocusedInput, setFocusedInput] = useState(false)

    const customOnBlur = () => {
        if (props.value != '') {
            setFocusedInput(true)
        }
        else {
            setFocusedInput(false)
        }
        props.onFocused?props.onFocused(false):null
    }

    const customOnFocus = () => {
        setFocusedInput(true)
        props.onFocused?props.onFocused(true):null
    }

    const inputFocus = () => {
        props.onFocused?props.onFocused(true):null
    }

    return (
        <Animatable.View animation={'fadeInLeft'} delay={props.delay} style={[props.addTopic?styles.main__formTopic:styles.main__form]}>
            <View style={styles.form__icon}>
                {props.calc?<MaterialIcons name={props.iconName} size={20} color={"#fff"}/>:
                <Feather name={props.iconName} size={20} color={"#fff"}/>}
            </View>
            <View style={styles.form__container}>
                <View style={onFocusedInput ? styles.form_box__textFocused : styles.form_box__text}>
                    <Text style={styles.form__text}>{props.placeholder}</Text>
                </View>
                <TextInput
                    style={styles.form__input}
                    placeholder=''
                    value={props.value}
                    onChangeText={props.onChangeText}
                    keyboardType={props.numeric?'numeric':'default'}
                    maxLength={props.maxLength?4:30}
                    secureTextEntry={props.password?true:false}
                    onBlur={customOnBlur}
                    onFocus={inputFocus}
                    onPressIn={customOnFocus}
                    inputMode={props.numeric?'decimal':props.email?'email':'text'}
                />
            </View>
        </Animatable.View>
    )
}

const styles = StyleSheet.create ({
    main__form: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 60,
        paddingHorizontal: 25,
        borderRadius: 15,
        backgroundColor: "hsl(228, 6%, 4%)",
        marginBottom: 20,
    },

    main__formTopic: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 50,
        paddingHorizontal: 25,
        borderRadius: 10,
        backgroundColor: "hsl(228, 6%, 4%)",
        marginBottom: 20,
        marginTop: 20,
    },

    form__icon: {
        marginRight: 10
    },

    form__container: {
        width: "100%"
    },

    form__text: {
        display: 'flex',
        position: 'absolute',
        fontSize: 12,
        marginTop: 12,
        fontFamily: 'Montserrat_600SemiBold',
        textTransform: 'uppercase',
        color: "hsl(228, 8%, 70%)",
    },

    form_box__textFocused: {
        display: 'none'
    },

    form__input: {
        height: 40,
        fontSize: 12,
        fontFamily: 'Montserrat_600SemiBold',
        color: 'hsl(228, 8%, 98%)'
    },
})