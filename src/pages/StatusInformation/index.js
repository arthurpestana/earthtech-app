import React, {useState} from 'react'
import {SafeAreaView, View, Text, ScrollView, Switch, Image} from 'react-native'
import {} from '@react-navigation/native'
import { useMQTT } from '../../components/Context';

import * as Animatable from 'react-native-animatable'
import styles from '../../styles/style_status'

import SensorDiv from '../../components/SensorDiv'

export default function StatusInformation() {
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
        <ScrollView style={styles.switch__container}>
            <View style={styles.container__header}>
                <View style={styles.header__menu}>
                    <Text style={styles.menu__title}>Automações</Text>
                    <View style={styles.menu__profile}>
                        
                    </View>
                </View>
                <View style={styles.header__logo}>
                    <Animatable.Image
                        animation={"fadeInRightBig"}
                        source={require('../../images/irrigacao.png')}
                        style={{width: '100%', height: '80%'}}
                        resizeMode="contain"
                    />
                </View>
            </View>
            <View style={styles.container__automation}>
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
                        <Text style={styles.dashboard__text}>Ativar Irrigador</Text>
                    </View>
                </View>
            </View>
            <View style={styles.container__dashboards}>
                <Text style={styles.titles}>Informações do Plantio</Text>
                <View>
                    <SensorDiv title="Classificação do Solo: " info="Seco" typeIcon="a"/>
                    <SensorDiv title="Temperatura do Ambiente: " info="12" typeIcon="a"/>
                    <SensorDiv title="Umidade do Ar: " info="12" typeIcon="a"/>
                </View>
            </View>
        </ScrollView>
    )
}
