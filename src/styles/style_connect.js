import React from "react"
import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create ({
    container_connect: {
        flex: 1,
        backgroundColor: '#79927d',
        alignItems: 'center',
        justifyContent: 'center',    
    },
    container__main:{
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        height: Dimensions.get('window').height/1.4,
        borderRadius: 20,
    },
    container__header:{
        flex: 1,
        top: Dimensions.get('window').height/35,
    },
    container__form: {
        flex: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header__title:{
        color:'black',
        fontSize: 26,
        fontWeight: 'bold'
    },
    header__subtitle:{
        color: '#a1a1a1'
    },
    form__input: {
        backgroundColor: 'white',
        width: Dimensions.get('window').width/1.6,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 10,
        bottom: Dimensions.get('window').height/20,
        alignSelf: 'center',
        borderWidth: 1,
    },
    main__button: {
        backgroundColor: 'white',       
        width: Dimensions.get('window').width/4,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 8,
        bottom: '10%',
        alignSelf: 'center',
        borderWidth: 1,
    },
    button_text: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
    },
    statusTextNo: {
        color: 'crimson'
    },
    statusTextYes: {
        color: 'green'
    },
})