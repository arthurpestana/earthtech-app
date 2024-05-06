import React, {useEffect, useState} from 'react'
import {SafeAreaView, View, Text, ScrollView, Switch, Image, TouchableOpacity} from 'react-native'
import {} from '@react-navigation/native'
import { useMQTT } from '../../components/Context';
import { useSQLiteContext } from 'expo-sqlite/next'
import { useNavigation } from '@react-navigation/native'
import { Feather } from "@expo/vector-icons"
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Animatable from 'react-native-animatable'
import styles from '../../styles/style_status'

import SensorDiv from '../../components/SensorDiv'
import HeaderMenu from '../../components/HeaderMenu';
import FabButton from '../../components/FabButton';

export default function StatusInformation() {
    const Navigation = useNavigation()
    const db = useSQLiteContext()
    const [items, setItems] = useState([])
    const { userNameMQTT, client, changeStatus, setChangeStatus } = useMQTT()
    const [data, setData] = useState(null)

    async function getDashboardData(){
        const result = await db.getAllAsync(`SELECT * FROM dashboard`)
        console.log(result)
        setItems(result)
        client.onMessageArrived = handleIncomingMessage
    }

    const handleIncomingMessage = (message) => {
        setData(message)
    };

    if(changeStatus==true){
        getDashboardData()
        setChangeStatus(false)
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
                                return(<SensorDiv key={element.id} title={element.title} type={element.type} data={data} topic = {element.topic}/>)
                            case 1:
                                return(<SensorDiv typeIcon='droplet' key={element.id} type={element.type} title={element.title} data={data} subscribeInfo={'Umidade do Ambiente'} topic = {element.topic}  />)
                            case 2:
                                return(<SensorDiv typeIcon='power' key={element.id} type={element.type} title={element.title} data={data} switch subscribeInfo={''} topic = {element.topic}/>)
                            case 3:
                                return(<SensorDiv typeIcon='power' key={element.id} type={element.type} title={element.title} data={data} switch subscribeInfo={''} topic = {element.topic}/>)
                            case 4: 
                                return(<SensorDiv typeIcon='thermometer' key={element.id} type={element.type} title={element.name} data={data}  subscribeInfo={'Temperatura do Ambiente'} topic = {element.topic}/>)
                        }
                    })}
                </View>
            </ScrollView>
            {items.length<5?<FabButton style={{bottom: 130, left: "80%"}}/>:false}
        </View>
    )
}

