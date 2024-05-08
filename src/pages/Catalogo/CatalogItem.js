import React, {useState, useEffect} from 'react'
import { View, Text, SafeAreaView, Image, ScrollView} from 'react-native'

import { useSQLiteContext } from 'expo-sqlite/next';
import { useMQTT } from '../../components/Context'
import axios from 'axios'

import { Feather, MaterialIcons } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'
import styles from '../../styles/style_catalogItem'
import ReturnPage from '../../components/ReturnPage'
import InfoDados from  '../../components/InfoDados'

export default function CatalogItem() {
    const { indexCatalog, setIndexCatalog } = useMQTT()
    const [culturas, setCulturas] = useState(null)
    console.log(indexCatalog)

    useEffect(() => {
        (async () =>{
            try {
                const options = {
                    method: 'GET',
                    url: 'https://earthtechapi.up.railway.app/api/zoneamento',
                };
                let response = await axios.request(options)
                setCulturas(response.data)
                console.log(response.data[indexCatalog])
            }catch(err){
                console.log("Erro: ", err)
            }
        })()
    }, [])

    return (
        <SafeAreaView style={styles.container__item}>
            <ReturnPage nav={'CatalogoIndex'} />
            <View style={styles.item__header}>
                <View style={styles.header__icon}>
                    <MaterialIcons name='terrain' color={'hsl(228, 8%, 98%)'} size={60}/>
                </View>
                <View style={styles.header__info}>
                    <Text style={styles.header__title}>Nome</Text>
                    <Text style={styles.header__text}>Tipo</Text>
                </View>
            </View>
            <ScrollView style={styles.item__main}>
                <View style={styles.main__info}>
                    <InfoDados title={'Detalhes'} detail/>
                    <InfoDados title={"Descrição"} desc/>
                    <InfoDados title={"Galeria de Fotos"} images/>
                    <InfoDados title={"Tipo de Solo"} typeSolo/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}