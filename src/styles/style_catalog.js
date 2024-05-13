import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    catalog__container: {
        flex: 1,
        width: "100%",
        height: '100%',
        backgroundColor: 'hsl(228, 6%, 8%)'
    },

    catalog__header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: '10%',
        paddingHorizontal: '8%',
        paddingTop: '8%',
        width: '100%'
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
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: '8%',
        flexDirection: 'row',
        gap: 10
    },

    search_button: {
        backgroundColor: 'hsl(228, 6%, 4%)',
        padding: 12,
        borderRadius: 10
    },

    catalog__main: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: '8%',
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
        marginBottom: '10%'
    },

    filter__text: {
        fontFamily: 'Montserrat_400Regular',
        color: 'hsl(228, 8%, 98%)',
        fontSize: 16,
    },

    filter__button: {
        width: '45%',
        paddingVertical: 5,
        display: 'flex',
        alignItems: 'center',
    },
    
    filter_on: {
        borderBottomColor: 'hsl(93, 40%, 30%)',
        borderBottomWidth: 1,
    },
    
    main__catalog_items: {
        alignSelf: 'center',
        width: '110%',
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 10,
        height: '55%',
        bottom: 10
    },
})