import { StyleSheet } from 'react-native'

export default StyleSheet.create ({
    container__connect: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "hsl(228, 6%, 8%)",
    },

    container__main:{
        display: 'flex',
        flexDirection: 'column',
        paddingStart: '8%',
        paddingEnd: '8%',
        marginTop: '20%'
    },

    main__info: {
        display: 'flex',
        flexDirection: 'column',
        gap: 15,
        marginBottom: 20,
    },

    info__title: {
        fontSize: 24,
        color: 'hsl(228, 8%, 98%)',
        fontFamily: 'Montserrat_700Bold',
    },

    info__text: {
        fontSize: 14,
        color: 'hsl(228, 8%, 70%)',
        fontFamily: 'Montserrat_400Regular',
    },
    
    connection__box: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 10,
    },  

    connection_status:{
        color: 'hsl(228, 8%, 98%)',
        fontSize: 12,
        fontWeight: '400',
        backgroundColor: 'hsl(228, 6%, 12%)',
        padding: 5,
        borderRadius: 10,
        fontWeight: 'bold'
    },

    connectionOff: {
        color: 'hsl(228, 8%, 70%)'
    },

    connectionOn: {
        color: 'hsl(93, 40%, 30%)'
    },

    main__forms: {
        marginTop: 15,
    },

    main__connect: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: 15,
    },

    connect__button: {
        width: '60%',
        padding: 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'hsl(93, 40%, 30%)',
    }, 
    
    button_text: {
        color: 'hsl(228, 8%, 98%)',
        fontSize: 16,
        fontFamily: 'Montserrat_700Bold',
    },
    toastText: {
        color: 'hsl(228, 8%, 98%)',
        fontSize: 16,
        fontFamily: 'Montserrat_700Bold',
    }

})
