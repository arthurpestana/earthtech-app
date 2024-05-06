import React from 'react'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    catalog__container: {
        flex: 1,
        width: "100%",
        height: '100%',
        paddingHorizontal: '8%',
        paddingVertical: '8%',
        backgroundColor: 'hsl(228, 6%, 8%)'
    },

    catalog__header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: '10%'
    }, 

    header__titles: {
        display: 'flex',
        gap: 10
    },

    title: {
        fontFamily: 'Montserrat_600SemiBold',
        color: 'hsl(228, 8%, 98%)',
        fontSize: 28,
    },

    header__search: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: '15%',
        flexDirection: 'row'
    },

    catalog__main: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
    },

    main__catalog_items: {
        width: '100%',
    },

    main__filters: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: '5%',
        marginBottom: '8%'
    },

    filter__text: {
        fontFamily: 'Montserrat_400Regular',
        color: 'hsl(228, 8%, 98%)',
        fontSize: 16,
    },

    filter__button: {
        paddingHorizontal: "15%",
        paddingVertical: 5,
    },
    
    main__catalog_items: {
        width: '100%',
    },
})