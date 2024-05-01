import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import init from 'react_native_mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useMQTT } from '../../components/Context';
import { useSQLiteContext } from 'expo-sqlite/next';
import { Feather } from "@expo/vector-icons"

import * as Animatable from 'react-native-animatable'
import styles from '../../styles/style_connect'
import InputText from '../../components/LoginCadastroInput';

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
    let dados_banco = false

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
        setNome(results.name)
        setUsername(results.username)
        setSenha(results.senha)
        setHost(results.host)
        setPort(results.port)
        setFromBd(true)
    }
    
    async function getData(){
        result = await db.getAllAsync(`SELECT * FROM mqtt`)
        console.log(result)
        if (result.length != 0 || result[0].port!="" || result[0].userName!="") {
            for (element of result) {
                if (element.port=='' || element.host=='') {
                    return console.log("Sem conexões registradas")
                }
                setData(element)
                const mqttClient = new Paho.MQTT.Client(element.host, parseInt(element.port), element.name);
                mqttClient.onConnectionLost = onConnectionLost;
                mqttClient.onMessageArrived = onMessageArrived;
                mqttClient.connect({ userName: element.username, password: element.senha, onSuccess: onSuccess, useSSL: false });
                setClient(mqttClient);
                dados_banco = true
            }
        }
        else {
            return console.log("Sem conexões registradas")
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
        setConnected(true)
        console.log("Conexão realizada")
    }

    function onConnectionLost(){
        setConnected(false)
        console.log("A conexão não foi realizada. Dados incorretos")
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
    }

    function publishMsg(){
        var message = new Paho.MQTT.Message(userMessage ); //criar variavel userMessage no formulário do publish
        message.destinationName = messageDestination; //criar variavel messageDestination no formulário do publish
        client.send(message);
    }

    return (
        <SafeAreaView style={styles.container__connect}>
            <View style={styles.container__main} keyboardShouldPersistTaps="handled">
                <View style={styles.main__info}>
                    <Text style={styles.info__title}>Realizar Conexão</Text>
                    <Text style={styles.info__text}>Conecte-se ao Broker MQTT para realizar as automações do seu cultivo.</Text>
                    <View style={styles.connection__box}>
                        <Text style={isConnected==true?[styles.connection_status, styles.connectionOn]:[styles.connection_status, styles.connectionOff]}>
                            {isConnected==true?"Conectado":"Desconectado"}
                        </Text>
                    </View>
                </View>
                <ScrollView>
                    <Animatable.View style={styles.main__forms} animation={'fadeInUp'}>
                        <InputText bancoDados={dados_banco} iconName="user" delay={500} placeholder="Nome" value={nome} onChangeText={setNome}/>
                        <InputText bancoDados={dados_banco} iconName="at-sign" delay={600} placeholder="Username" value={userName} onChangeText={setUsername}/>
                        <InputText bancoDados={dados_banco} iconName="lock" delay={700} placeholder="Senha" value={senha} onChangeText={setSenha} password={1}/>
                        <InputText bancoDados={dados_banco} iconName="link" delay={800} placeholder="Host" value={host} onChangeText={setHost}/>
                        <InputText bancoDados={dados_banco} iconName="hash" delay={900} placeholder="Porta" value={port} onChangeText={setPort} numeric = {1} maxLength/>
                    </Animatable.View>
                </ScrollView>
                <Animatable.View animation={'fadeIn'} delay={900} style={styles.main__connect}>
                    <TouchableOpacity style={styles.connect__button} onPress={connectBoard}>
                        <Text style={styles.button_text}>Conectar</Text>                           
                    </TouchableOpacity>                       
                </Animatable.View>
            </View>
        </SafeAreaView>
    )
}
