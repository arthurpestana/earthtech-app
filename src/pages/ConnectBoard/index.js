import React, { useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native'
import init from 'react_native_mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from "@react-navigation/native";

import * as Animatable from 'react-native-animatable'
import styles from '../../styles/style_connect'
import InputText from '../../components/InputText';

export default function Connect() {

    const Navigation = useNavigation()

    var client
    const [isConnected, setConnected] = useState('Desconectado')
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
        client = new Paho.MQTT.Client(host, parseInt(port), nome)
        client.onConnectionLost = onConnectionLost;
        client.onMessageArrived = onMessageArrived;
        client.connect({ userName:userName, password: senha, onSuccess:onSuccess, useSSL: false });
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
            <Animatable.View animation={'fadeInUp'} style={styles.container__main}>
                <InputText delay={500} placeholder="Nome" value={nome} onChangeText={setNome}></InputText>
                <InputText delay={600} placeholder="Username" value={userName} onChangeText={setUsername}></InputText>
                <InputText delay={700} placeholder="Senha" value={senha} onChangeText={setSenha} password={1}></InputText>
                <InputText delay={800} placeholder="Host" value={host} onChangeText={setHost}></InputText>
                <InputText delay={900} placeholder="Porta" value={port} onChangeText={setPort} numeric = {1}></InputText>
                <Animatable.View animation={'fadeIn'} delay={900} style={styles.main__connection}>
                    <TouchableOpacity style={styles.main__button} onPress={connectBoard}>
                        <Text style={styles.button_text}>Connect</Text>
                    </TouchableOpacity>
                             
                </Animatable.View>
            </Animatable.View>
        </SafeAreaView>
    )
}