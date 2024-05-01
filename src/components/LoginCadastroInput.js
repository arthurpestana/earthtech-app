import {useState, useEffect} from 'react'
import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons"
import * as Animatable from 'react-native-animatable'

export default function (props) {
    const [onFocusedInput, setFocusedInput] = useState(false)

    useEffect((props) => {
        customOnBlur()
    }, [])

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
            <View style={styles.form__icon}>
                <Feather name={props.iconName} size={20} color={"#fff"}/>
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
                    onPressIn={customOnFocus}
                    onBlur={customOnBlur}
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