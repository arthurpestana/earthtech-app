import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container__topic: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: 'space-between',
        position: 'relative',
        backgroundColor: "hsl(228, 6%, 8%)",
    },

    container__main: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        width: '100%',
        marginTop: '22%',
        paddingHorizontal: '8%'
    },

    main__panel_title: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        marginVertical: "15%",
        width: '100%',
        position: 'relative'
    },

    form_box__textFocused: {
        display: 'none'
    },

    form_box__text: {
        position: 'absolute',
        display: 'flex',
    },

    form__text: {
        fontFamily: 'Montserrat_600SemiBold',
        color: 'hsl(228, 8%, 70%)',
        fontSize: 20,
    },

    form__input: {
        fontFamily: 'Montserrat_600SemiBold',
        color: 'hsl(228, 8%, 98%)',
        fontSize: 20,
    },

    main__panel: {
        marginBottom: "10%",
        width: '100%'
    },

    panel__subtitle: {
        fontSize: 16,
        fontFamily: 'Montserrat_600SemiBold',
        color: 'hsl(228, 8%, 98%)',
        marginBottom: 15
    },
    
    panel__text: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 13,
        color: 'hsl(228, 8%, 98%)',
    },

    panel__select: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        gap: 10,
        borderWidth: 1,
        width: 100,
        marginVertical: 10,
    },

    container__footer: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginBottom: '25%',
        paddingHorizontal: '8%'
    },

    button_save: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: 'hsl(93, 40%, 30%)',
        borderRadius: 8
    },

    button_text: {
        color: 'hsl(228, 8%, 98%)',
    },
})