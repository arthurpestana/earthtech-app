import React from 'react'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    switch__container: {
        flex: 1,
        backgroundColor: '#FFF'
    },

    container__header: {
        backgroundColor: '#FFF',
        position: 'relative',
        height: "10%"
    },

    header__menu: {
        position: 'absolute',
        top: 30,
        display: 'flex',
        flexDirection: 'row',
        gap: 170,
        alignItems: 'flex-start',
        backgroundColor: '#FFF',
        paddingHorizontal: 40,
        paddingVertical: 10,
    },

    header__logo: {
        height: 300,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },

    menu__title: {
        fontSize: 20
    },

    container__automation: {
        flex: 1,
        display: 'flex',
        height: '50vh',
        marginTop: "25%",
        paddingHorizontal: '5%',
    },

    automation__items: {
        display: "flex",
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },

    automation__box_switch: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: "100%",
        borderRadius: 15,
        backgroundColor: "#11ce8f70",
        marginBottom: 10,
    },

    box_switch: {
        transform: [{scaleX: 1.2}, {scaleY: 1.2}]
    },

    container__dashboards: {
        flex: 1,
        height: '50vh',
        marginTop: "10%",
        marginBottom: '15%',
        paddingHorizontal: '5%',
    },

    titles: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "#0a8967",
        marginBottom: '10%'
    },

    dashboard__items: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 25,
        width: "100%",
        borderRadius: 15,
        backgroundColor: "#11ce8f50",
        marginBottom: 10,
    },

    item__div_title: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    dashboard__text: {
        color: "#000",
        fontSize: 15
    },

    item__title: {
        fontSize: 16,
        marginLeft: 12,
        fontWeight: 500
    },

    item__info: {
        fontSize: 15,
    },
})