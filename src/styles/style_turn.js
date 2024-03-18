import React from 'react'
import { StyleSheet } from 'react-native'

export default StyleSheet.create ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#79927d',
    },

    box__switch: {
        transform: [{scaleX: 4.0}, {scaleY: 4.0}]
    }
})