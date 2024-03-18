import React from "react"
import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create ({
    container_connect: {
        flex: 1,
        backgroundColor: '#79927d', 
    },

    container__header:{
        marginTop: "25%",
        marginBottom: '15%',
        paddingStart: '5%'
    },

    header__title:{
        color:"#FFF",
        fontSize: 32,
        fontWeight: 'bold'
    },

    container__main:{
        flex: 1,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '8%',
        paddingEnd: '8%',
        paddingTop: '5%',
    },

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
        fontWeight: 'bold'
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

    main__button: {
        backgroundColor: '#0a8967',
        width: '100%',
        borderRadius: 10,
        paddingVertical: 10,
        marginTop: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    button_text: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },

    connection__box: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 10,
    },  

    connection_status:{
        color: '#a1a1a1',
        fontSize: 12,
        fontWeight: '400',
        backgroundColor: '#ccc',
        padding: 5,
        borderRadius: 10,
        fontWeight: 'bold'
    },

    connectionOff: {
        color: 'rgba(220, 20, 60, 0.600)'
    },

    connectionOn: {
        color: 'rgba(0, 128, 0, 0.600)'
    },
})
