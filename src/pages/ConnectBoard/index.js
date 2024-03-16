import React from 'react'
import {SafeAreaView, View, Text, TextInput, TouchableOpacity} from 'react-native'

import * as Animatable from 'react-native-animatable'
import styles from '../../styles/style_connect'

init ({
    size: 10000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    reconnect: true,
    sync: {

    }
});

export default function ConnectBoard() {

    const options = {
        host: 'maqiatto.com',
        port: 8883,
        path: '/switch1',
        id: '1'
    }

    function onConnect() {
        console.warn("onConnect")
    }

    function onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
            console.warn(`onConnectionLost: ${responseObject.errorMessage}`)
        }
    }

    function sendMessage() {
        client.publish('heitorfiuza@unitins.br/switchs1', '0npm install sp-react-native-mqtt --save')
    }

    const client = new Paho.MQTT.Client(options.host, options.port, options.id)
    client.onConnectionLost = onConnectionLost
    client.sendMessage = sendMessage
    client.connect({usarName: 'heitorfiuza@unitins.br', password: '12345678', onSucess: onConnect, useSSL: false})

    return (
        <SafeAreaView style={styles.container_connect}>
            <Animatable.View animation={'fadeInLeft'} delay={500} style={styles.container__header}>
                <Text style={styles.header__title}>Bem-vindo(a)</Text>
            </Animatable.View>
            <Animatable.View animation={'fadeInUp'} style={styles.container__form}>
                <View style={[styles.forms, styles.form_1]}>
                    <Text style={styles.form__text}></Text>
                    <TextInput 
                        style={styles.form__input}
                        placeholder=''
                    />
                </View>
                <View style={[styles.forms, styles.form_1]}>
                    <Text style={styles.form__text}></Text>
                    <TextInput 
                        style={styles.form__input}
                        placeholder=''
                    />
                </View>
                <TouchableOpacity style={styles.connect__button} onPress={sendMessage}>
                    <Text style={styles.button_text}>Conectar</Text>
                </TouchableOpacity>
                
            </Animatable.View>
        </SafeAreaView>
    )
}