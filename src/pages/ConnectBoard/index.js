import React, { useState, useEffect } from 'react'
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
    const { userId, setId, client, setClient, isConnected, setConnected } = useMQTT();
    const [nome, setNome] = useState('')
    const [userName, setUsername] = useState('')
    const [senha, setSenha] = useState('')
    const [host, setHost] = useState('')
    const [port, setPort] = useState('')
    const [fromBd, setFromBd] = useState(false)
    const [controle, setControle] = useState('1')

    init({
        size: 10000,
        storageBackend: AsyncStorage,
        defaultExpires: 1000 * 3600 * 24,
        enableCache: true,
        reconnect: true,
        sync : {
        }
    });
    async function setData(results){
        setNome(results[0].name)
        setUsername(results[0].username)
        setSenha(results[0].senha)
        setHost(results[0].host)
        setPort(results[0].port)
        setFromBd(true)
    }
    async function getData(){
        result = await db.getAllAsync(`SELECT * FROM mqtt WHERE id = "${userId}"`)
        if(result[0].username){
            setData(result)
            const mqttClient = new Paho.MQTT.Client(result[0].host, parseInt(result[0].port), result[0].name);
            mqttClient.onConnectionLost = onConnectionLost;
            mqttClient.onMessageArrived = onMessageArrived;
            mqttClient.connect({ userName: result[0].username, password: result[0].senha, onSuccess: onSuccess, useSSL: false });
            setClient(mqttClient);
        }
    }
    useEffect(() => {
        getData()
    }, [db]);
    
    async function addMQTT() {
        await db.execAsync(`DELETE FROM mqtt`)
        await db.execAsync(`INSERT INTO mqtt (id, name, username, senha, host, port) VALUES ("${userId}", "${nome}", "${userName}", "${senha}", "${host}", "${port}")`)
        console.log("Dados cadastrada")
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
        addMQTT()
        const mqttClient = new Paho.MQTT.Client(host, parseInt(port), nome);
        mqttClient.onConnectionLost = onConnectionLost;
        mqttClient.onMessageArrived = onMessageArrived;
        mqttClient.connect({ userName: userName, password: senha, onSuccess: onSuccess, useSSL: false });
        setClient(mqttClient);
        if (isConnected) {
            console.log("Conexão realizada")
        }
        else {
            console.log("A conexão não foi realizada. Dados incorretos")
        }
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
