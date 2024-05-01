import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create ({
    container_home: {
        alignItems: "center",
        flex: 1,
        backgroundColor: "#4C9A2A", 
    },

    container__header:{
        marginTop: "22%",
        marginBottom: '13%',
        paddingStart: '5%',
        alignSelf: "flex-start"
    },

    header__title:{
        color:"#FFF",
        fontSize: 32,
        fontFamily: 'Montserrat_700Bold',
    },
    header__text: {
        color: '#FFF',
        fontFamily: 'Montserrat_400Regular',
    },
    container__weather:{
        width: "98%",
        padding: "6%",
        backgroundColor: "#ffffff15",
        borderRadius: 20,
    },
    container__title: {
        marginLeft: '7%',
        fontSize: 36,
        fontFamily: 'Montserrat_700Bold',
        alignSelf: 'center',
        color: '#FFF'
    },
    weather__celsius: {
        marginLeft: '1%',
        marginBottom: '5%',
        fontSize: 18,
        fontFamily: 'Montserrat_700Bold',
        alignSelf: 'center',
        color: '#FFF'
    },
    weather__details: {
        marginLeft: '5%'
    },
    details_text: {
        fontSize: 16,
        color: "#FFF",
        fontFamily: 'Montserrat_400Regular'
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
        fontSize: 21,
        fontFamily: 'Montserrat_400Regular',
        color: '#FFF'
    },
    next_subarea: {
        flexDirection: 'row'
    },
    next_subtext: {
        margin: 2,
        fontSize: 15,
        fontFamily: 'Montserrat_700Bold',
        color: '#FFF'
    },
    next_subtext_color: {
        color: '#ffffff99',
        fontFamily: 'Montserrat_700Bold',
    },
    container__graphic: {
        width: "98%",
        padding: "6%",
        marginTop: "2%",
        alignItems: 'center',
        justifyContent: 'center',
        height: 'auto',
        backgroundColor: "#ffffff15",
        borderRadius: 20,
    },
    floating__container: {
        position: 'absolute',
        backgroundColor: '#093039',
        borderRadius: 8,
        padding: 16,
        zIndex: 999,
    },
    dropdown__container: {
        height: 50,
        flexDirection: 'row',
        width: "60%",
        marginBottom: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#09303950',
    },
    textDropdown: {
        fontFamily: 'Montserrat_700Bold',
        color: 'white'
    },
    dropdown__area: {
        width: "60%",
        height: 200,
        marginTop: 60,
        position: 'absolute', 
        backgroundColor: '#093039',
        elevation: 5,
        borderRadius: 8,
        zIndex: 1000
    },
    dropdownItem: {
        justifyContent: 'center',
        marginVertical: 3,
        alignItems: 'center',
        width: '80%',
        height: 50,
        borderBottomWidth: 2,
        borderBottomColor: '#ffffff60',
    }
})
