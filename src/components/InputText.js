import {useState, useEffect} from 'react'
import { View, Text, TextInput, StyleSheet} from "react-native";
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
                maxLength={props.maxLength?4:30}
                secureTextEntry={props.password?true:false}
                onPressIn={customOnFocus}
                onBlur={customOnBlur}
            />
        </Animatable.View>
    )
}

const styles = StyleSheet.create ({
    main__form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },

    form_box__text: {
        marginBottom: 12,
    },

    form_box__textFocused: {
        marginBottom: 40,
    },

    form__text: {
        position: 'absolute',
        fontSize: 16,
        color: "#0a8967",
        marginTop: 20,
        fontWeight: 'bold',
    },

    main__text: {
        color: '#a1a1a1',
        fontSize: 14,
        alignSelf: 'flex-end',
        marginTop: 5,
    },

    hyperlink__style: {
        color: 'blue',
        textDecorationLine: 'underline'
    }, 

    blur_text: {
        backgroundColor: '#000'
    },  

    focus_text: {
        backgroundColor: "#555"
    },

    form__input: {
        borderBottomWidth: 1,
        borderBottomColor: '#0a8967',
        height: 40,
        marginBottom: 10,
        fontSize: 14,
        color: '#a1a1a1'
    },
})