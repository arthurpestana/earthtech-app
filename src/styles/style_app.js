import React from "react";
import {StyleSheet} from 'react-native'

export default StyleSheet.create ({
    container_app: {
        flex: 1,
        backgroundColor: '#79927d',
    },

    app__container_logo: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        backgroundColor: '#79927d',
    },

    app__main: {
        flex: 1,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
    },

    main__title: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 28,
        marginBottom: 12,
    },

    main__text: {
        color: '#a1a1a1',
    },

    main__button: {
        backgroundColor: '#79927d',
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        padding: 10,
        position: 'absolute',
        bottom: '25%',
        alignSelf: 'center',
    },

    button_text: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
})