import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'

export default StyleSheet.create({
    status__page: {
        flex: 1,
        backgroundColor: 'hsl(228, 6%, 8%)',
        height: "100%",
        width: '100%'
    },

    switch__container: {
        flex: 1,
        backgroundColor: 'hsl(228, 6%, 8%)',
    },

    switch__items: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingStart: '8%',
        paddingEnd: '8%',
        marginTop: "8%"
    },

    error_text: {
        color: '#FFF',
        textAlign: 'center',
        margin: 'auto',
        fontFamily: 'Montserrat_700Bold',
        fontSize: 18
    },
    confirm__container: {
        width: 300,
        height: 500,
        backgroundColor: '#FFF',
        position: 'absolute',
        borderRadius: 20
    }
})