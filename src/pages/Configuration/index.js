import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import ReturnPage from '../../components/ReturnPage'
import { useSQLiteContext } from 'expo-sqlite'
import { Feather } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'
import { useMQTT } from '../../components/Context'
import { useNavigation } from '@react-navigation/native'

export default function Configuration() {
    const db = useSQLiteContext()
    const [items, setItems] = useState([])
    const { changeStatus, setChangeStatus} = useMQTT()
    const Navigation = useNavigation()

    
    async function getDashboardData(){
        try{
            const result = await db.getAllAsync(`SELECT * FROM dashboard`)
            console.log(result)
            setItems(result)
        }
        catch(err){
            console.log(err)
        }
    }

    async function deleteItem(id) {
        await db.execAsync(`DELETE FROM dashboard WHERE id = ${id}`)
        setChangeStatus(true)
        Navigation.navigate('StatusInformation')
    }

    useEffect(() => {
        getDashboardData()
    }, [db])

    return (
        <SafeAreaView style={styles.config__container}>
            <ReturnPage nav={'StatusInformation'}/>
            <View style = {{marginTop: '25%'}}>
                {items.length > 0?items.map((element, index) => {
                return(<Animatable.View animation={'fadeInLeft'} delay={600} style={styles.dashboard__items}>
                    <View style={styles.item__div_img}>
                        <Feather name={element.type==0?'alert-triangle':element.type==1?'droplet':element.type==2?'power':element.type==3?'power':'thermometer'} size={35} color="hsl(228, 8%, 98%)"/>
                    </View>
                    <View style={styles.dashboard__dados}>
                        <View style={styles.item__div_info}>
                            <Text style={styles.item__title}>{element.name}</Text>
                            <Text style={styles.item__text}>{index} • {element.type==0?'Monitor de Risco':element.type==1?'Umidade do ambiente':element.type==2?'Irrigação Automática':element.type==3?'Ligar Irrigador':'Temperatura do ambiente'}</Text> 
                        </View>
                    </View>
                    <View style={styles.dashboard__dados}>
                        <TouchableOpacity style={{marginRight: 5}}>
                            <Feather name='edit' size={25} color={'hsl(228, 8%, 98%)'}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deleteItem(element.id)}>
                            <Feather name='trash' size={25} color={'hsl(228, 8%, 98%)'}/>
                        </TouchableOpacity>                   
                    </View>
                </Animatable.View>)}):false}
            </View>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create ({
    config__container: {
        flex: 1,
        width: "100%",
        height: '100%',
        paddingHorizontal: '8%',
        paddingVertical: '8%',
        backgroundColor: 'hsl(228, 6%, 8%)'
    },
    dashboard__items: {
        width: "100%",
        height: 100,
        backgroundColor: "hsl(228, 6%, 12%)",
        borderRadius: 20,
        marginBottom: '5%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '5%'
    },

    dashboard__dados: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },

    item__div_img: {
        display: 'flex'
    },

    item__div_logo: {
        marginBottom: 5
    },

    item__div_info: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 5
    },

    item__title: {
        fontFamily: 'Montserrat_700Bold',
        color: 'hsl(228, 8%, 98%)',
        fontSize: 14
    },

    item__text: {
        fontFamily: 'Montserrat_400Regular',
        color: 'hsl(228, 8%, 98%)',
        fontSize: 12,
        textAlign: 'center',
        width: '100%'
    },
})