import { Icon } from "@rneui/base"
import React from "react"
import { StyleSheet, Dimensions } from 'react-native'
import { RotateInDownLeft } from "react-native-reanimated"

export default StyleSheet.create ({
    container_login: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "#73DF5E",
    },
    upper__img: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: undefined,
    },
    app__container_logo: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
    },
    header__title_container: {
        flex: 1,
    },
    header__title: {
        textAlign: "center",
        color:"#FFF",
        fontSize: 32,
        fontWeight: '500'
    },
    login__header: {
        flex: 1,
        flexDirection: 'column'
    },
    container__main:{
        flex: 1,
        paddingStart: '8%',
        paddingEnd: '8%',
        paddingTop: '5%',
    },
    form__input: {
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#234682',
        borderRadius: 20,
        backgroundColor: 'white',
        width: '80%',
        height: '80%',
    },
    main__text: {
        color: '#a1a1a1',
        fontSize: 14,
        alignSelf: 'flex-end',
        marginTop: 5,
    },
    main__form: {
        width:  '100%',
        marginTop: '10%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    main__login: {
        flex: 1,
        alignItems: 'center',
        marginTop: '13%',

    },
    main__button: {
        width: '60%',
        backgroundColor: '#234682',
        padding: '3%',
        borderRadius: 1000,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        marginBottom: '15%',
    },  
    button_text: {
        color: 'white',
        fontSize: 15,
        fontWeight: '500'
    },
    account__text: {
        alignSelf: 'flex-end',
        color: 'white',
        textDecorationLine: 'underline'
    },
    hide_icon: {
        justifyContent: 'flex-end'
    },
    hyperlink__style: {
        color: 'blue',
        textDecorationLine: 'underline'
    }, 
    form__icon: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '3%',
        width: Dimensions.get('window').width * 0.12,
        height: Dimensions.get('window').width * 0.12,
        backgroundColor: '#234682',
        borderRadius: Dimensions.get('window').width * 0.12,
    },
    iconStyle: {
        width: '20%',
    },
    image_lower: {
        position: 'absolute', // Define a posição absoluta para a imagem
        bottom: 0, // Alinha a imagem ao fundo
        left: 0, // Alinha a imagem à esquerda
        width: '60%', // Largura da tela
        height: undefined,
        aspectRatio: 16 / 9, // Mantém a proporção da imagem
        resizeMode: 'contain', // Ajusta o comportamento de redimensionamento
        tintColor: '#234682', // Cor da imagem

    }
})
