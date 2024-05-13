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
        color: 'hsl(228, 8%, 98%)',
        textAlign: 'center',
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 18
    },

    confirm__container: {
        width: 300,
        height: 500,
        backgroundColor: '#FFF',
        position: 'absolute',
        borderRadius: 20
    },

    connect__button: {
        marginTop: '6%',
        alignSelf: 'center',
        width: '50%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'hsl(93, 40%, 30%)',
        marginBottom: 15,
    }, 
    
    button_text: {
        color: 'hsl(228, 8%, 98%)',
        fontSize: 16,
        fontFamily: 'Montserrat_600SemiBold',
    },
})