import {
    Modal,
    Pressable,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image
  } from 'react-native';

export default function MessageModal(props) {
    const positiveConfirmation = () => {
        props.confirmation(true)
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
                    <View style={styles.modal__icon}>
                        <Image 
                        source={require('../images/pngwing.png')}
                        style={{width: '150%'}}
                        resizeMode="contain"
                        tintColor={'#496b2e'}/>
                    </View>
                    <View style={styles.modal__lower}>
                        <Text style={styles.modal__title}>Tem certeza?</Text>
                        <Text style={styles.modal__message}>Desligar a irrigação automática pode acarretar em problemas na sua plantação, deseja continuar?</Text>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity style={styles.modal__button} onPress={positiveConfirmation}>
                                <Text style={styles.modal__text}>Sim</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modal__button, {backgroundColor: '#8b0000'}]} onPress={negativeConfirmation}>
                                <Text style={styles.modal__text}>Não</Text>
                            </TouchableOpacity>
                        </View>
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
    modal__text: {
        color: 'hsl(228, 8%, 98%)',
        fontSize: 16,
        fontFamily: 'Montserrat_700Bold',
    },
    modal__button: {
        width: '30%',
        padding: 15,
        borderRadius: 10,
        marginHorizontal: '3%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'hsl(93, 40%, 30%)',
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
        padding: 20
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
        textAlign: 'center',
        marginBottom: 20
    }
})