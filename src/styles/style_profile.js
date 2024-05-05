import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container__profile: {
        flex: 1,
        width: "100%",
        height: '100%',
        backgroundColor: 'hsl(228, 6%, 8%)',
        paddingHorizontal: '10%'
    },

    container__header: {
        position: 'absolute',
        top: 40,
        left: 30,
    },

    container__main: {
        display: 'flex',
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        flexDirection: 'column'
    },

    main__profile: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },

    logo_image: {
        padding: 25,
        backgroundColor: "hsl(228, 6%, 12%)",
        borderRadius: 35,
    },

    profile__info: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        marginLeft: "10%",
        gap: 10
    },

    profile_name: {
        fontFamily: 'Montserrat_600SemiBold',
        color: 'hsl(228, 8%, 98%)',
        textTransform: 'capitalize',
        fontSize: 22
    },

    profile_email: {
        fontFamily: 'Montserrat_400Regular',
        color: 'hsl(228, 8%, 70%)',
        textTransform: 'lowercase',
        fontSize: 14
    },

    
    main__logout: {
        width: '100%',
        alignItems: 'flex-end',
    },

    logout__button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 10,
        backgroundColor: 'hsl(228, 6%, 12%)',
        gap: 10
    },

    logout__text: {
        fontFamily: 'Montserrat_400Regular',
        color: 'hsl(228, 8%, 98%)',
        fontSize: 16
    }
})