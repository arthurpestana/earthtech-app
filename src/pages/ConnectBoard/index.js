import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform} from 'react-native'
import init from 'react_native_mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useMQTT } from '../../components/Context';
import { useSQLiteContext } from 'expo-sqlite/next';

import * as Animatable from 'react-native-animatable'
import styles from '../../styles/style_connect'
import InputText from '../../components/InputText';
import Toast from 'react-native-toast-message';

export default function Connect() {
    const db = useSQLiteContext()
    const { userId, client, setClient, isConnected, setConnected, nome, setNome, userNameMQTT, setUsernameMQTT, senha, setSenha, host, setHost, port, setPort } = useMQTT();

    init({
        size: 10000,
        storageBackend: AsyncStorage,
        defaultExpires: 1000 * 3600 * 24,
        enableCache: true,
        reconnect: true,
        sync : {
        }
    });
    
    async function addMQTT() {
        await db.execAsync(`DELETE FROM mqtt`)
        await db.execAsync(`INSERT INTO mqtt (id, name, username, senha, host, port) VALUES ("${userId}", "${nome}", "${userNameMQTT}", "${senha}", "${host}", "${port}")`)
        console.log("Dados cadastrada")
    }
    
    function onSuccess(){
        setConnected(true)
        console.log("Conexão realizada")
    }

    function onConnectionLost(){
        setConnected(false)
        Toast.show({
            position: 'top',
            type: 'error',
            text1: 'Erro',
            text2: 'Dados incorretos',
            visibilityTime: 5000,
            autoHide: true
        });
    }
    
    function connectBoard(){
        addMQTT()
        const mqttClient = new Paho.MQTT.Client(host, parseInt(port), nome);
        mqttClient.onConnectionLost = onConnectionLost;
        mqttClient.connect({ userName: userNameMQTT, password: senha, onSuccess: onSuccess, useSSL: false });
        setClient(mqttClient);
    }

    function publishMsg(){
        var message = new Paho.MQTT.Message(userMessage ); //criar variavel userMessage no formulário do publish
        message.destinationName = messageDestination; //criar variavel messageDestination no formulário do publish
        client.send(message);
    }

    return (
        <SafeAreaView style={styles.container__connect}>
            <Toast text1Style = {{color: 'hsl(228, 8%, 98%)', fontSize: 16, fontFamily: 'Montserrat_700Bold',}} text2Style = {{fontSize: 13, color: 'hsl(228, 8%, 70%)',fontFamily: 'Montserrat_400Regular'}}/>
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
                <KeyboardAvoidingView behavior={Platform.OS == 'ios'?'padding':'height'} keyboardVerticalOffset={100}>
                    <ScrollView>
                        <Animatable.View style={styles.main__forms} animation={'fadeInUp'}>
                            <InputText iconName="user" delay={500} placeholder={!nome?"Nome":false} value={nome} onChangeText={setNome}/>
                            <InputText iconName="at-sign" delay={600} placeholder={!userNameMQTT?"Username":false} value={userNameMQTT} onChangeText={setUsernameMQTT}/>
                            <InputText iconName="lock" delay={700} placeholder={!senha?"Senha":false} value={senha} onChangeText={setSenha} password={1}/>
                            <InputText iconName="link" delay={800} placeholder={!host?"Host":false} value={host} onChangeText={setHost}/>
                            <InputText iconName="hash" delay={900} placeholder={!port?"Porta":false} value={port} onChangeText={setPort} numeric = {1} maxLength/>
                        </Animatable.View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <Animatable.View animation={'fadeIn'} delay={900} style={styles.main__connect}>
                    <TouchableOpacity style={styles.connect__button} onPress={connectBoard}>
                        <Text style={styles.button_text}>Conectar</Text>                           
                    </TouchableOpacity>                       
                </Animatable.View>
            </View>
        </SafeAreaView>
    )
}
