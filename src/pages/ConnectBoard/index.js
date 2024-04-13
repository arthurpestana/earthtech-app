import React, { useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import init from 'react_native_mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useMQTT } from '../../components/Context';
import { useSQLiteContext } from 'expo-sqlite/next'

import * as Animatable from 'react-native-animatable'
import styles from '../../styles/style_connect'
import InputText from '../../components/InputText';

export default function Connect() {

    const db = useSQLiteContext()
    const { client, setClient, isConnected, setConnected } = useMQTT();
    const [nome, setNome] = useState('')
    const [userName, setUsername] = useState('')
    const [senha, setSenha] = useState('')
    const [host, setHost] = useState('')
    const [port, setPort] = useState('')

    init({
        size: 10000,
        storageBackend: AsyncStorage,
        defaultExpires: 1000 * 3600 * 24,
        enableCache: true,
        reconnect: true,
        sync : {
        }
    });
    React.useEffect(() => {
        db.withTransactionAsync(async() => {
            await getData();
        });
    }, [db]);
    async function addMQTT(){
        await db.execAsync(`INSERT INTO mqtt (name, username, senha, host, port) VALUES ("${nome}", "${userName}", 
        "${senha}", "${host}", "${port}")`)
    }
    async function getData(){
        result = await db.getAllAsync(`SELECT * FROM mqtt`)
        console.log(result)
    }
    function onSuccess(){
        setConnected('Conectado')
    }
    function onConnectionLost(){
        setConnected('Desconectado')
    }
    function onMessageArrived(){
        console.warn('Message arrived')
    }
    function connectBoard(){
        const mqttClient = new Paho.MQTT.Client(host, parseInt(port), nome);
        mqttClient.onConnectionLost = onConnectionLost;
        mqttClient.onMessageArrived = onMessageArrived;
        mqttClient.connect({ userName: userName, password: senha, onSuccess: onSuccess, useSSL: false });
        setClient(mqttClient);
        addMQTT()
    }
    function publishMsg(){
        var message = new Paho.MQTT.Message(userMessage ); //criar variavel userMessage no formulário do publish
        message.destinationName = messageDestination; //criar variavel messageDestination no formulário do publish
        client.send(message);
    }
    return (
        <SafeAreaView style={styles.container_connect}>
            <Animatable.View animation={'fadeInLeft'} delay={400} style={styles.container__header}>
                <Text style={styles.header__title}>Bem-vindo(a)</Text>
                <View style={styles.connection__box}>
                    <Text style={isConnected=='Conectado'?[styles.connection_status, styles.connectionOn]:[styles.connection_status, styles.connectionOff]}>
                        {isConnected}
                    </Text>
                </View> 
            </Animatable.View>
            <ScrollView style={styles.container__main}>
                <Animatable.View animation={'fadeInUp'}>
                    <InputText delay={500} placeholder="Nome" value={nome} onChangeText={setNome}></InputText>
                    <InputText delay={600} placeholder="Username" value={userName} onChangeText={setUsername}></InputText>
                    <InputText delay={700} placeholder="Senha" value={senha} onChangeText={setSenha} password={1}></InputText>
                    <InputText delay={800} placeholder="Host" value={host} onChangeText={setHost}></InputText>
                    <InputText delay={900} placeholder="Porta" value={port} onChangeText={setPort} numeric = {1}></InputText>
                    <Animatable.View animation={'fadeIn'} delay={900} style={styles.main__connection}>
                        <TouchableOpacity style={styles.main__button} onPress={connectBoard}>
                            <Text style={styles.button_text}>Conectar</Text>
                        </TouchableOpacity>
                                 
                    </Animatable.View>
                </Animatable.View>
            </ScrollView>
        </SafeAreaView>
    )
}
