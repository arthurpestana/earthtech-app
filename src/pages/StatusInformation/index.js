import React, {useState} from 'react'
import {SafeAreaView, View, Text, ScrollView, Switch, Image, TouchableOpacity} from 'react-native'
import {} from '@react-navigation/native'
import { useMQTT } from '../../components/Context';
import FabButton from '../../components/FabButton';
import { Feather } from "@expo/vector-icons"

import * as Animatable from 'react-native-animatable'
import styles from '../../styles/style_status'

import SensorDiv from '../../components/SensorDiv'

export default function StatusInformation() {
    const { client } = useMQTT();
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

    return (
        <View style={{flex: 1}}>
            <View style={styles.container__header}>
                    <View style={styles.header__menu}>
                        <View style={styles.menu__dados}>
                            <Text style={styles.menu__title}>Status</Text>
                            <View style={styles.menu__profile}>
                                <TouchableOpacity>
                                    <Feather name="user" size={20} color={"#FFF"} style={{
                                        padding: 5,
                                        backgroundColor: "#3e5c43",
                                        borderRadius: 20/2,
                                    }}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            <ScrollView style={styles.switch__container}>
                <View style={styles.container__automation}>
                    <View style={styles.header__logo}>
                        <Animatable.Image
                            animation={"fadeInRightBig"}
                            source={require('../../images/irrigacao.png')}
                            style={{width: '100%', height: '100%'}}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.titles}>Automações</Text>
                    <View style={styles.automation__items}>
                        <View style={styles.automation__box_switch}>
                            <Switch
                                trackColor={{false: '#E94A35', true: '#37924e'}}
                                thumbColor={'#FFF'}
                                onValueChange={altSwitch}
                                value={isEnabled}
                                style={styles.box_switch}
                            />
                            <Text style={[styles.dashboard__text, styles.item__title]}>Irrigação Automática</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.container__dashboards}>
                    <Text style={styles.titles}>Informações do Cultivo</Text>
                    <View>
                        <SensorDiv title="Classificação do Solo" info="Seco" typeIcon="grid"/>
                        <SensorDiv title="Temperatura do Ambiente" info="12" typeIcon="grid"/>
                        <SensorDiv title="Umidade do Ar" info="12" typeIcon="grid"/>
                    </View>
                </View>
            </ScrollView>
            <FabButton style={{bottom: 80, right: 80}}/>
        </View>
    )
}
