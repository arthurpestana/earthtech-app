import React from "react";
import {StyleSheet} from 'react-native'

export default StyleSheet.create ({
    container_app: {
        flex: 1,
        backgroundColor: 'hsl(228, 6%, 8%)',
    },

    app__container_logo: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
    },

    app__main: {
        flex: 1,
        alignItems: 'center',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
    },

    main__title: {
        color: 'hsl(228, 8%, 98%)',
        fontSize: 18,
        marginTop: 28,
        marginBottom: 12,
        fontFamily: 'Montserrat_700Bold',
        textAlign: 'center'
    },

    main__text: {
        color: 'hsl(228, 8%, 70%)',
        fontFamily: 'Montserrat_400Regular'
    },

    main__button: {
        backgroundColor: 'hsl(93, 40%, 30%)',
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        padding: 10,
        position: 'absolute',
        bottom: '25%',
        alignSelf: 'center',
    },

    button_text: {
        color: 'hsl(228, 8%, 98%)',
        fontSize: 18,
        fontFamily: 'Montserrat_700Bold'
    },
})