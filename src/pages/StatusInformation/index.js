import React, {useEffect, useState} from 'react'
import {SafeAreaView, View, Text, ScrollView, Switch, Image, TouchableOpacity} from 'react-native'
import {} from '@react-navigation/native'
import { useMQTT } from '../../components/Context';
import FabButton from '../../components/FabButton';
import { Feather } from "@expo/vector-icons"

import * as Animatable from 'react-native-animatable'
import styles from '../../styles/style_status'

import SensorDiv from '../../components/SensorDiv'
import HeaderMenu from '../../components/HeaderMenu';

export default function StatusInformation() {
    const { client } = useMQTT();
    const [subscribed, setSubscribed] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false)
    const [messagePayload, setMessagePayload] = useState('0')

    function publishMsg(){
        var message = new Paho.MQTT.Message(messagePayload); //criar variavel userMessage no formulário do publish
        message.destinationName = 'brunolustosads@gmail.com/switch1'; //criar variavel messageDestination no formulário do publish
        client.send(message)
    }

    const altSwitch = () => {
        console.log(client)
        setIsEnabled(previousState => !previousState)
        isEnabled==false?setMessagePayload('1'):setMessagePayload('0')
        publishMsg()
    }
    const handleIncomingMessage = (message) => {
        console.log('Mensagem recebida:', message.payloadString);
    };

    const subscribeToTopic = () => {
        console.log('Subscrevendo no tópico "umidade_solo"...');
        client.subscribe('brunolustosads@gmail.com/umidade_solo', { qos: 0 });
        client.onMessageArrived = handleIncomingMessage
        setSubscribed(true);
    };
    

    return (
        <View style={styles.status__page}>
            <HeaderMenu/>
            <ScrollView style={styles.switch__container}>
                <View style={styles.switch__items}>
                    <SensorDiv typeIcon='1' title='Teste' subscribe = {subscribeToTopic} double = {true}/>
                    <SensorDiv typeIcon='1' title='Teste'/>
                    <SensorDiv typeIcon='1' title='Teste'/>
                    <SensorDiv typeIcon='1' title='Teste'/>
                    <SensorDiv typeIcon='1' title='Teste'/>
                </View>
            </ScrollView>
            <FabButton style={{bottom: 130, left: "80%"}}/>
        </View>
    )
}
