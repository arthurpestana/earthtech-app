import React, {useEffect, useState} from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
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
        try{
            let result = await db.getAllAsync(`SELECT * FROM dashboard`)
            console.log(result)
            setItems(result)
            client.onMessageArrived = handleIncomingMessage
        }catch(err){
            console.log(err)
        }
    }

    const handleIncomingMessage = (message) => {
        setData(message)
    };

    function catchErr(err){
        setError(err)
    }

    useEffect(() => {
        if (changeStatus) {
          getDashboardData()
          setChangeStatus(false)
        }
      }, [changeStatus])
    
    useEffect(() => {
        getDashboardData()
    }, [db])

    return (
        
        <View style={styles.status__page}>
            <HeaderMenu/>
            {error==null && isConnected==true?<ScrollView style={styles.switch__container}>
                <View style={styles.switch__items}>
                    {items.map((element) => {
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
                    })}
                </View>
            </ScrollView>:
            <View style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={[styles.error_text]}>Faça a conexão MQTT para iniciar.</Text>
                <TouchableOpacity style={styles.connect__button} onPress={() => Navigation.navigate('Conexão')}>
                    <Text style={styles.button_text}>Conexão</Text>                           
                </TouchableOpacity>
            </View>}
            {items.length < 1 && isConnected == true? <View style={{flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', height: '100%'}}><Text style={[styles.error_text]}>Adicione itens para iniciar.</Text></View>: false}
            {changeAutoIrriga==true?<MessageModal setChange = {setChangeAutoIrriga} confirmation = {setConfirmation} message = "Desligar a irrigação automática pode acarretar em problemas na sua plantação, deseja continuar?"/>:false}
            {items.length<5 && isConnected == true?<FabButton style={{bottom: 130, left: "80%"}}/>:false}
        </View>
    )
}

