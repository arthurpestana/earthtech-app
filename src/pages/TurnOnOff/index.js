import React, {useState} from 'react'
import {SafeAreaView, View, Switch} from 'react-native'

import styles from '../../styles/style_turn'
import {} from '@react-navigation/native'
import { useMQTT } from '../../components/Context';

export default function TurnOnOff() {
    const { client } = useMQTT();
    const [isEnabled, setIsEnabled] = useState(false)
    const [messagePayload, setMessagePayload] = useState('0')

    function publishMsg(){
        var message = new Paho.MQTT.Message(messagePayload); //criar variavel userMessage no formulário do publish
        message.destinationName = 'brunolustosads@gmail.com/switch'; //criar variavel messageDestination no formulário do publish
        client.send(message)
    }

    const altSwitch = () => {
        setIsEnabled(previousState => !previousState)
        isEnabled==false?setMessagePayload('0'):setMessagePayload('1')
        publishMsg()
    }

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