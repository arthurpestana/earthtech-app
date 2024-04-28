import React from "react"
import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create ({
    container_home: {
        alignItems: "center",
        flex: 1,
        backgroundColor: "#4C9A2A", 
    },

    container__header:{
        marginTop: "25%",
        marginBottom: '15%',
        paddingStart: '5%',
        alignSelf: "flex-start"
    },

    header__title:{
        color:"#FFF",
        fontSize: 32,
        fontWeight: 'bold',
    },
    header__text: {
        color: '#FFF',
    },
    container__weather:{
        width: "98%",
        padding: "6%",
        backgroundColor: "#FFF",
        borderRadius: 20,
        shadowColor: "grey",
    },
    container__title: {
        marginLeft: '5%',
        fontSize: 36,
        fontWeight: '400',
        alignSelf: 'center'
    },
    weather__celsius: {
        marginLeft: '1%',
        marginBottom: '5%',
        fontSize: 18,
        fontWeight: '500',
        alignSelf: 'center'
    },
    weather__details: {
        marginLeft: '5%'
    },
    details_text: {
        fontSize: 16,
        color: "#9e9e9e"
    },  
    next__container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: '5%'
    },
    next__weather: {
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center'
    },
    next_text: {
        fontSize: 20,
        fontWeight: '500'
    },
    next_subarea: {
        flexDirection: 'row'
    },
    next_subtext: {
        margin: 2,
        fontSize: 15,
        fontWeight: '500'
    },
    next_subtext_color: {
        color: '#696969'
    }
})
