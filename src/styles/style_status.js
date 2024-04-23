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
        top: 35,
        backgroundColor: '#FFF',
        paddingHorizontal: 25,
    },

    menu__dados: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 260
    },

    header__logo: {
        height: 300,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },

    menu__title: {
        fontSize: 20,
        color: '#3e5c43'
    },

    container__automation: {
        flex: 1,
        display: 'flex',
        height: '50vh',
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
        fontSize: 18,
        color: "#3e5c43",
        marginBottom: '10%'
    },

    dashboard__items: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 25,
        width: "100%",
        borderRadius: 10,
        backgroundColor: "#11ce8f50",
        marginBottom: 10,
    },

    dashboard__dados: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 20
    },

    item__div_logo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    item__div_info: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 2
    },

    dashboard__text: {
        color: "#000",
        fontSize: 12
    },

    item__title: {
        fontSize: 14,
        fontWeight: 500
    },
})