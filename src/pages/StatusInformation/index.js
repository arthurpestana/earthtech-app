import React, {useEffect, useState} from 'react'
import { View, Text, ScrollView } from 'react-native'
import {} from '@react-navigation/native'
import { useMQTT } from '../../components/Context';
import { useSQLiteContext } from 'expo-sqlite/next'
import { useNavigation } from '@react-navigation/native'
import MessageModal from '../../components/MessageModal';

import styles from '../../styles/style_status'

import SensorDiv from '../../components/SensorDiv'
import HeaderMenu from '../../components/HeaderMenu';
import FabButton from '../../components/FabButton';

export default function StatusInformation() {
    const Navigation = useNavigation()
    const db = useSQLiteContext()
    const [error, setError] = useState(null)
    const [items, setItems] = useState([])
    const [changeAutoIrriga, setChangeAutoIrriga] = useState(false)
    const [confirmation, setConfirmation] = useState(false)
    const { userNameMQTT, client, changeStatus, setChangeStatus, isConnected } = useMQTT()
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

    function catchErr(err){
        setError(err)
    }

    if(changeStatus == true){
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
                    {error==null?items.map((element) => {
                        switch (element.type) {
                            case 0:
                                return(<SensorDiv key={element.id} title={element.name} type={element.type} data={data} topic = {element.topic} catchErr = {() => catchErr}/>)
                            case 1:
                                return(<SensorDiv typeIcon='droplet' key={element.id} type={element.type} title={element.name} data={data} subscribeInfo={'Umidade do Ambiente'} topic = {element.topic} catchErr = {() => catchErr}/>)
                            case 2:
                                return(<SensorDiv typeIcon='power' key={element.id} type={element.type} title={element.name} data={data} switch subscribeInfo={''} topic = {element.topic} catchErr = {() => catchErr} setChange = {setChangeAutoIrriga} confirmation = {confirmation}/>)
                            case 3:
                                return(<SensorDiv typeIcon='power' key={element.id} type={element.type} title={element.name} data={data} switch subscribeInfo={''} topic = {element.topic} catchErr = {() => catchErr}/>)
                            case 4: 
                                return(<SensorDiv typeIcon='thermometer' key={element.id} type={element.type} title={element.name} data={data}  subscribeInfo={'Temperatura do Ambiente'} topic = {element.topic} catchErr = {() => catchErr}/>)
                        }
                    }):<Text style={[styles.error_text]}>Faça a conexão MQTT para iniciar.</Text>
                    }
                    {items.length < 1? <Text style={[styles.error_text]}>Adicione itens para iniciar.</Text>: false}
                </View>
            </ScrollView>
            {changeAutoIrriga==true?<MessageModal setChange = {setChangeAutoIrriga} confirmation = {setConfirmation}/>:false}
            {items.length<5?<FabButton style={{bottom: 130, left: "80%"}}/>:false}
        </View>
    )
}

