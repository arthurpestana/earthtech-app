import React, {useState, useEffect} from 'react'
import { View, Text, SafeAreaView, FlatList, Image, ScrollView} from 'react-native'

import { useMQTT } from '../../components/Context'

import { MaterialIcons } from '@expo/vector-icons'
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
        <InfoDados title={'Detalhes'} textClima={typeCatalog==0?dados.clima:dados.profundidade} textCrescimento={typeCatalog==0?dados.tempoDeCrescimento:dados.acidez} detail/>,

        <InfoDados title={"Descrição"} iconName={'alert-octagon'}  desc text={dados.descricao}/>,

        <InfoDados title={"Galeria de Fotos"} iconName={'camera'} images imagesList={dados.images}/>,

        typeCatalog==0?<InfoDados title={"Necessidade de Água"} iconName={'droplet'} quantAgua={dados.necessidadeDeAgua} agua/>:<InfoDados title={"Níveis de Solo"} nivelList={dados.nivel2} coresList={dados.cores} nivelSolo/>,

        <InfoDados title={"Solo"} soloTipo={typeCatalog==0?dados.solo.tipo:dados.tipo} soloDrenagem={typeCatalog==0?dados.solo.drenagem:dados.drenagem} soloPH={typeCatalog==0?dados.solo.phRecomendado:dados.pH} typeSolo/>,

        typeCatalog==0?<InfoDados title={"Painel de risco"} data culturas={typeCatalog==0?culturas[indexCatalog].nome:false}/>:<InfoDados title={"Composição do Solo"} listCompSolo={[dados.areia, dados.argila, dados.silte, dados.fosforo, dados.carbono, dados.nitro, dados.at]} cor={dados.cor} simbolSolo={dados.simbolo} compSolo/>,
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
                    {typeCatalog==0?<Image source={{uri: dados.icon}} style={{width: 60, height: 60}}/>
                    :<MaterialIcons name='terrain' color={'hsl(228, 8%, 98%)'} size={60}/>}
                </View>
                <View style={styles.header__info}>
                    <Text style={styles.header__title}>{dados.nome}</Text>
                    <Text style={styles.header__text}>Tipo de {typeCatalog==0?'Cultura':'Solo'}: {dados.tipo}</Text>
                </View>
            </View>
            <View style={styles.main__info}>
                <FlatList
                    style={styles.item__main}
                    data={listItems}
                    renderItem={({item}) => {
                        return(
                            item
                        )
                    }}
                />
            </View>
        </SafeAreaView>
    )
}