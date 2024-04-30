import { Icon } from "@rneui/base"
import React from "react"
import { StyleSheet } from "react-native"

export default StyleSheet.create ({
    /*LOGIN STYLE*/

    container_login: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "hsl(228, 6%, 8%)",
    },

    header__logo: {
        flex: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    container__main:{
        flex: 3,
        paddingStart: '8%',
        paddingEnd: '8%',
    },

    main__info: {
        display: 'flex',
        flexDirection: 'column',
        gap: 15,
        marginBottom: 20,
    },

    info__title: {
        fontSize: 24,
        color: 'hsl(228, 8%, 98%)',
        fontFamily: 'Montserrat_700Bold',
    },

    info__text: {
        fontSize: 14,
        color: 'hsl(228, 8%, 70%)',
        fontFamily: 'Montserrat_400Regular',
    },

    main__forms: {
        marginVertical: 15,
    },

    main__login: {
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        justifyContent: 'center',
        flexDirection: 'column'
    },

    login__button: {
        width: '60%',
        padding: 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'hsl(93, 40%, 30%)',
        marginBottom: 15,
    }, 
    
    button_text: {
        color: 'hsl(228, 8%, 98%)',
        fontSize: 16,
        fontFamily: 'Montserrat_700Bold',
    },

    login__account: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 5
    },

    account__text: {
        fontSize: 12,
        color: 'hsl(228, 8%, 70%)',
        fontFamily: 'Montserrat_400Regular',
    },

    account__signup: {
        fontSize: 13,
        color: 'hsl(228, 8%, 98%)',
        fontFamily: 'Montserrat_700Bold',
    },


    /*CADASTRO STYLE*/

    container__cadastro: {
        width: "100%",
        height: "100%",
        backgroundColor: "hsl(228, 6%, 8%)",
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
    },

    container__register: {
        marginTop: '50%'
    },

    return__container: {
        position: 'absolute',
        top: 40,
        left: 15,
    },
})
