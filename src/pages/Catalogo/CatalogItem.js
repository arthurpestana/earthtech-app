import React, {useState, useEffect} from 'react'
import { View, Text, SafeAreaView, FlatList, Image, ScrollView} from 'react-native'

import { useMQTT } from '../../components/Context'

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
    const [dados, setDados] = useState(typeCatalog==0?culturas[indexCatalog]:solos[indexCatalog])
    const [apiData, setApiData] = useState(null)
    const listItems = [
        <InfoDados title={'Detalhes'} textClima={dados.clima} textCrescimento={dados.tempoDeCrescimento} detail/>,
        <InfoDados title={"Descrição"} iconName={'alert-octagon'}  desc text={dados.descricao}/>,
        <InfoDados title={"Galeria de Fotos"} images imagesList={dados.imagens}/>,
        <InfoDados title={"Necessidade de Água"} iconName={'droplet'} quantAgua={dados.necessidadeDeAgua} agua/>,
        <InfoDados title={"Solo"} soloTipo={dados.solo.tipo} soloDrenagem={dados.solo.drenagem} soloPH={dados.solo.phRecomendado} typeSolo/>,
        <InfoDados title={"Painel de risco"} data culturas={typeCatalog==0?culturas[indexCatalog].nome:false}/>,
    ]

    useEffect(() => {    
        try {
            let dadosTemp
            if (typeCatalog==0) {
                dadosTemp = culturas[indexCatalog]
                setDados(dadosTemp)
            }
            else {
                dadosTemp = solos[indexCatalog]
                setDados(dadosTemp)
            }
        }catch(err){
            console.log("Erro: ", err)
        }
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
                <FlatList
                    style={styles.item__main}
                    contentContainerStyle={styles.main__info}
                    data={listItems}
                    renderItem={({item}) => {
                        return(
                            item
                        )
                    }}
                />   
        </SafeAreaView>
    )
}