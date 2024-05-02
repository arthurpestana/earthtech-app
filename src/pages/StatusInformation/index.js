import React, {useEffect, useState} from 'react'
import {SafeAreaView, View, Text, ScrollView, Switch, Image, TouchableOpacity} from 'react-native'
import {} from '@react-navigation/native'
import { useMQTT } from '../../components/Context';
import { useSQLiteContext } from 'expo-sqlite/next'
import { Feather } from "@expo/vector-icons"
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Animatable from 'react-native-animatable'
import styles from '../../styles/style_status'

import SensorDiv from '../../components/SensorDiv'
import HeaderMenu from '../../components/HeaderMenu';
import FabButton from '../../components/FabButton';

export default function StatusInformation() {
    const db = useSQLiteContext()
    const [items, setItems] = useState([])
    const { client } = useMQTT();
    const [subscribed, setSubscribed] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false)
    const [messagePayload, setMessagePayload] = useState('0')
    //const [items, setItems] = useState([])

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

    async function getDashboardData(){
        const result = await db.getAllAsync(`SELECT * FROM dashboard`)
        console.log(result)
        setItems(result)
    }

    useEffect(() => {
        getDashboardData()
    }, [db])

    return (
        <View style={styles.status__page}>
            <HeaderMenu/>
            <ScrollView style={styles.switch__container}>
                <View style={styles.switch__items}>
                    {items.map((element) => {
                        switch (element.type) {
                            case 0:
                                return(<SensorDiv title={element.title} subscribe={subscribeToTopic} double={true} risk={true}/>)
                            case 1:
                                return(<SensorDiv typeIcon='droplet' title={element.title} subscribe={subscribeToTopic} double={false} risk={false} subscribeInfo={'Teste • Teste'}/>)
                            case 2:
                                return(<SensorDiv typeIcon='power' title={element.title} subscribe={subscribeToTopic} double={false} risk={false} switch subscribeInfo={'Teste • Teste'}/>)
                            case 3:
                                return(<SensorDiv typeIcon='power' title={element.title} subscribe={subscribeToTopic} double={false} risk={false} switch subscribeInfo={'Teste • Teste'}/>)
                            case 4: 
                                return(<SensorDiv typeIcon='thermometer' title={element.title} subscribe={subscribeToTopic} double={false} risk={false} subscribeInfo={'Teste • Teste'}/>)
                        }
                    })}
                </View>
            </ScrollView>
            <FabButton style={{bottom: 130, left: "80%"}}/>
        </View>
    )
}

