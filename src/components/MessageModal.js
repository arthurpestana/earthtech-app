import React from 'react'
import { Modal, Pressable, View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

import ReturnPage from './ReturnPage';

export default function MessageModal(props) {
    const positiveConfirmation = () => {
        props.confirmation?props.confirmation(true):false
        props.setChange(false)
    }
    const negativeConfirmation = () => {
        props.confirmation(false)
        props.setChange(false)
    }

    return (
        <Modal animationType='slide' visible={true} transparent= {true}>
            <Pressable style={styles.modal__container}>
                <View style={styles.modal__content}>
                    {props.closeX && <ReturnPage modalView modalButton={positiveConfirmation}/>}
                    <View style={styles.modal__icon}>
                        <Image 
                        source={require('../images/pngwing.png')}
                        style={{width: '150%'}}
                        resizeMode="contain"
                        tintColor={'#496b2e'}/>
                    </View>
                    <View style={styles.modal__lower}>
                        <Text style={styles.modal__title}>{props.confirmation?'Tem certeza?':props.title}</Text>
                        {props.classeTexto &&<Text style={styles.modal__message}>{props.classeTexto}</Text>}
                        <Text style={props.classeTexto?styles.modal__text:styles.modal__message}>{props.message}</Text>
                        {!props.closeX && <View style={{flexDirection: 'row', marginTop: '8%'}}>
                            <TouchableOpacity style={styles.modal__button} onPress={positiveConfirmation}>
                                <Text style={styles.button__text}>{props.confirmation?"Sim":"Entendi"}</Text>
                            </TouchableOpacity>
                            {props.confirmation && <TouchableOpacity style={[styles.modal__button, {backgroundColor: 'hsl(93, 40%, 30%)'}]} onPress={negativeConfirmation}>
                                <Text style={styles.button__text}>Não</Text>
                            </TouchableOpacity>}
                        </View>}
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal__container: {
        flex: 1,
        padding: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)'
    },

    modal__content: {
        width: '100%',
        elevation: 5,
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: "hsl(228, 6%, 8%)",
        paddingTop: '15%'
    },

    modal__button: {
        width: 'auto',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'hsl(93, 40%, 30%)',
    }, 
    
    button__text: {
        color: 'hsl(228, 8%, 98%)',
        fontSize: 14,
        fontFamily: 'Montserrat_700Bold',
    },

    modal__icon: {       
        height: 100,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: "-30%",
        elevation: 5,
    },

    modal__lower: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '8%',
        paddingHorizontal: '8%',

    },

    modal__title: {
        color: 'hsl(228, 8%, 98%)',
        fontSize: 18,
        fontFamily: 'Montserrat_700Bold',
        textAlign: 'center',
        marginBottom: 10
    },

    modal__message: {
        color: 'hsl(228, 8%, 98%)',
        fontSize: 16,
        fontFamily: 'Montserrat_400Regular',
        textAlign: 'justify',
        marginBottom: 10
    },

    modal__text: {
        color: 'hsl(228, 8%, 70%)',
        fontSize: 14,
        fontFamily: 'Montserrat_400Regular',
        textAlign: 'center',
    }

})