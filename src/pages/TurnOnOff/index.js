import React, {useState} from 'react'
import {SafeAreaView, View, Switch} from 'react-native'

import styles from '../../styles/style_turn'
import * as Animatable from 'react-native-animatable'
import {} from '@react-navigation/native'
import init from 'react_native_mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TurnOnOff() {
    
    const [isEnabled, setIsEnabled] = useState(false)

    init({
        size: 10000,
        storageBackend: AsyncStorage,
        defaultExpires: 1000 * 3600 * 24,
        enableCache: true,
        reconnect: true,
        sync : {
        }
    });

    function onMessageArrived() {
        console.log("onMessageArrived");
    }

    function onConnect() {
        console.log("onConnect");
    }
    
    function onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:"+responseObject.errorMessage);
        }
    }

    function connectBoard(){
        client = new Paho.MQTT.Client('maqiatto.com', 8883, 'Arthur')
        client.onConnectionLost = onConnectionLost;
        client.onMessageArrived = onMessageArrived;
        client.connect({ userName:'arthurpestana@unitins.br', password: '12345678', onSuccess: onConnect, useSSL: false });
    }

    function publishMsg(){
        var message = new Paho.MQTT.Message('true'); //criar variavel userMessage no formulário do publish
        message.destinationName = 'topic1'; //criar variavel messageDestination no formulário do publish
        client.send(message)
    }

    const altSwitch = () => {
        setIsEnabled(previousState => !previousState)
        publishMsg()
    }

    connectBoard()

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container__box_switch}>
                <Switch 
                    trackColor={{false: '#E94A35', true: '#30C454'}}
                    thumbColor={'#FFF'}
                    onValueChange={altSwitch}
                    value={isEnabled}
                    style={styles.box__switch}
                />
            </View>
        </SafeAreaView>
    )
}