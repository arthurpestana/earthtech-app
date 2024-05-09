import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container__item: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'hsl(228, 6%, 8%)',
        
        paddingVertical: '8%'
    },

    item__header: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        gap: 30,
        marginTop: '25%',
        paddingHorizontal: '8%',
    },

    header__icon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 20,
        backgroundColor: 'hsl(228, 6%, 4%)',
    },

    header__info: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        gap: 10
    },

    header__title: {
        fontFamily: 'Montserrat_700Bold', 
        fontSize: 24,
        color: 'hsl(228, 8%, 98%)',
    },

    header__text: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 16,
        color: 'hsl(228, 8%, 70%)',
    },

    item__main: {
        width: '100%',
        height: '100%',
        marginTop: '10%',
        marginBottom: '10%',
    },

    main__info: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 10,
        paddingHorizontal: '4%',
    },
})