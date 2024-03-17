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
    const [senha, setSenha] = useState()
    const [host, setHost] = useState('')
    const [port, setPort] = useState()

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
            <Animatable.View animation={'fadeInUp'} style={styles.container__main}>
                <Animatable.View animation={'fadeInLeft'} delay={500} style={styles.container__header}>
                    <Text style={styles.header__title}>Bem-vindo(a)</Text>
                    <Text style={isConnected=='Conectado'?[styles.header__subtitle, styles.statusTextYes]: 
                    [styles.header__subtitle, styles.statusTextNo]}>Status: {isConnected}</Text>
                </Animatable.View>
                <Animatable.View animation={'fadeInUp'} style={styles.container__form}>
                    <InputText placeholder="Nome" value={nome} onChangeText={setNome}></InputText>
                    <InputText placeholder="Username" value={userName} onChangeText={setUsername}></InputText>
                    <InputText placeholder="Senha" value={senha} onChangeText={setSenha} password={1}></InputText>
                    <InputText placeholder="Host" value={host} onChangeText={setHost}></InputText>
                    <InputText placeholder="Porta" value={port} onChangeText={setPort} numeric = {1}></InputText>
                    <View style={styles.button__box}>
                        <TouchableOpacity style={styles.main__button} onPress={connectBoard}>
                            <Text style={styles.button_text}>Connect</Text>
                        </TouchableOpacity>              
                    </View>
                </Animatable.View>
            </Animatable.View>
        </SafeAreaView>
    )
}