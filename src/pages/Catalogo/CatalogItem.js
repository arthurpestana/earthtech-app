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
import culturas from '../../../assets/culturasList.json'
import solos from '../../../assets/solosList.json'

export default function CatalogItem() {
    const { indexCatalog, setIndexCatalog, typeCatalog, setTypeCatalog } = useMQTT()
    const [dados, setDados] = useState('')
    
    function tryType() {
        if (typeCatalog==0) {
            setDados(culturas[indexCatalog])
        }
        else {
            setDados(solos[indexCatalog])
        }
    }


    useEffect(() => {
        tryType()
        /*(async () =>{
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
        })()*/
    }, [])

    return (
        <SafeAreaView style={styles.container__item}>
            <ReturnPage nav={'CatalogoIndex'} />
            <View style={styles.item__header}>
                <View style={styles.header__icon}>
                    {typeCatalog==0?<Text style={{fontSize: 48, height: 60}}>{dados.icon}</Text>
                    :<MaterialIcons name='terrain' color={'hsl(228, 8%, 98%)'} size={60}/>}
                </View>
                <View style={styles.header__info}>
                    <Text style={styles.header__title}>{dados.nome}</Text>
                    <Text style={styles.header__text}>Tipo de {typeCatalog==0?'Cultura':'Solo'}: {dados.tipo}</Text>
                </View>
            </View>
            <ScrollView style={styles.item__main}>
                <View style={styles.main__info}>
                    <InfoDados title={'Detalhes'} detail text={[dados.clima, dados.tempoDeCrescimento, dados.necessidadeDeAgua]}/>
                    <InfoDados title={"Descrição"} desc text={dados.descricao}/>
                    <InfoDados title={"Galeria de Fotos"} images loadImage={''}/>
                    <InfoDados title={"Tipo de Solo"} typeSolo/>
                    <InfoDados title={"Necessidade de Água"} agua quantAgua={dados.necessidadeDeAgua}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}