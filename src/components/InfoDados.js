
import * as Animatable from 'react-native-animatable'
import React, {useEffect, useState} from "react";
import {Text, View, Image, StyleSheet, TouchableOpacity, ScrollView, FlatList, Dimensions} from 'react-native'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import axios from 'axios'
import MethodDropdown from "./MethodDropdown";
import CatalogTable from "./CatalogTable";
import CatalogRiskView from './CatalogRiskView';
import { Canvas, Rect } from "@shopify/react-native-skia"
import { useMQTT } from './Context'
import AdTable from './AdTable';

export default (props) => {    
    const { indexCatalog, setIndexCatalog, typeCatalog, setTypeCatalog } = useMQTT()
    const [viewMore, setViewMore] = useState(true)
    let phNiveis = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]
    const [activeCity, setActiveCity] = useState(null)
    const [citiesData, setCitiesData] = useState([])
    const [apiData, setApiData] = useState([])
    const [dados, setDados] = useState(null)

    const viewMoreFunction = () => {
        if (viewMore==false) {
            setViewMore(true)
        }
        else {
            setViewMore(false)
        }
    }    

    function normalizeWord(word){
        return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    }

    useEffect(() => {
        if(props.data){    
            (async () =>{
                if(props.culturas!=false && typeCatalog==0){
                    try {
                        const options = {
                            method: 'GET',
                            url: `https://earthtechapi.up.railway.app/api/${props.culturas=="Café Arábica"?"cafe":normalizeWord(props.culturas)}`,
                        };
                        let response = await axios.request(options)
                        setDados(response)
                        let dataTemp = []                      
                        for(let i = 0; i < response.data.length; i++){
                            if(!dataTemp.includes(response.data[i].municipio)){
                                dataTemp.push(response.data[i].municipio)
                            }
                        }
                        setCitiesData(dataTemp)
                    }catch(err){
                        console.log("Erro: ", err)
                    }
                }   
            })()
        }
    }, [])

    useEffect(() => {
        if(dados!=null && typeCatalog==0){
            list_dados = []
            for(let i = 0; i < dados.data.length; i++){
                if(dados.data[i].municipio == activeCity) {
                    list_dados.push(dados.data[i])
                }
            }
            setApiData(list_dados)
        }
    }, [activeCity, dados])

    return (
        <View style={[styles.info, styles.shadowProp]}>
            <View style={styles.info__header}>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10}}>
                    {props.iconName!==null?<Feather name={props.iconName} color={'hsl(228, 8%, 98%)'} size={18} style={props.desc?{transform: [{rotate: '180deg'}]}:null}/>:null}
                    <Text style={styles.info__title}>{props.title}</Text>
                </View>
                <TouchableOpacity style={styles.info__more} onPress={viewMoreFunction}>
                    {viewMore==false?<Feather name="chevron-down" color={'hsl(228, 8%, 98%)'} size={24}/>:<Feather name="chevron-down" color={'hsl(228, 8%, 98%)'} size={24} style={{transform: [{rotate: '180deg'}]}}/>}
                </TouchableOpacity>
            </View>
            {(viewMore==true && props.detail)?<View style={styles.info__dados}>
                <View style={styles.info__text_dados}>
                    <View style={{gap: 5}}>
                        <Text style={[styles.info__text, styles.info__text_desc]}>{typeCatalog==0?'Clima Propício:':'Profundidade do Solo:'}</Text>
                        <Text style={[styles.info__text, styles.info__text_desc]}>{typeCatalog==0?'Tempo de Crescimento:':'Acidez do Solo:'}</Text>
                    </View>
                    <View style={[styles.info__text_props, {gap: 5}]}>
                        <Text style={[styles.info__text,{width: 130}]}>{props.textClima}</Text>
                        <Text style={[styles.info__text, {width: 130}]}>{props.textCrescimento}</Text>
                    </View>
                </View>
            </View>:null}
            {(viewMore==true && props.desc)?<View style={styles.info__dados}>
                <Text style={styles.info__text}>{props.text}</Text>
            </View>:null}
            {(viewMore==true && props.images)?<View style={styles.info__dados}>
                {props.imagesList.length!==0?<FlatList
                    style={{
                        display: 'flex',
                        width: '100%',
                        flexDirection: 'row',
                        gap: 15
                    }}
                    data={props.imagesList}
                    horizontal
                    keyExtractor={(item, index) => index.toString()} 
                    renderItem={({ item, index }) => {
                        console.log(item)
                        return(
                            <View style={styles.info__galeria} key={index}>
                                <Image resizeMode={'cover'} fadeDuration={300} src={item} style={{width: '100%', height: 200, borderRadius: 15}}/>
                            </View>
                        )
                    }}
                />:<Text style={styles.info__text}>Não há imagens cadastradas!</Text>}
            </View>:null} 
            {(viewMore==true && props.agua)?<View style={[styles.info__dados, styles.info__dadosAgua]}>
                <Animatable.View animation={'fadeInLeft'} delay={300} style={styles.dados__bar}>
                    <Animatable.View animation={'fadeInLeft'} delay={400} style={[styles.loading_bar, props.quantAgua!=undefined?{width: props.quantAgua+'%'}:{width: 0}]}>
                        <Text style={{color: 'hsl(228, 8%, 98%)', fontFamily: 'Montserrat_400Regular'}}>{props.quantAgua}%</Text>
                    </Animatable.View>
                </Animatable.View>
                <Text style={styles.info__text}>{props.quantAgua<=30?'Evite umidade excessiva!':props.quantAgua<70?'Mantenha uma irrigação média':'Evite condições secas!'}</Text>
            </View>:null}
            {(viewMore==true && props.nivelSolo)?<View style={styles.info__dados}>
                <View style={styles.info__text_dados}>
                    <View style={styles.info__text_props}>
                        <FlatList
                            style={{gap: 5}}
                            data={props.coresList}
                            keyExtractor={(item, index) => index.toString()} 
                            renderItem={({ item, index }) => {
                                return(
                                    <Canvas style={{width: 17, height: 17}}>
                                        <Rect width={256} height={256} color={item} />
                                    </Canvas>
                                )
                            }}
                        />
                    </View>
                    <View style={{marginLeft: -10}}>
                        <FlatList
                            style={{gap: 5}}
                            data={props.nivelList}
                            keyExtractor={(item, index) => index.toString()} 
                            renderItem={({ item, index }) => {
                                return(
                                    <Text style={[styles.info__text, styles.info__text_desc, {textTransform: 'capitalize'}]}>{item}</Text>
                                )
                            }}
                        />
                    </View>
                </View>
            </View>:null}
            {(viewMore==true && props.typeSolo)?<View style={styles.info__dados}>
                <View style={styles.info__text_dados}>
                    <View style={{gap: 5}}>
                        <Text style={[styles.info__text, styles.info__text_desc]}>Tipo:</Text>
                        <Text style={[styles.info__text, styles.info__text_desc]}>Drenagem:</Text>
                    </View>
                    <View style={[styles.info__text_props, {gap: 5}]}>
                        <Text style={styles.info__text}>{props.soloTipo}</Text>
                        <Text style={[styles.info__text, {maxWidth: '80%', textAlign: 'left'}]}>{props.soloDrenagem}</Text>
                    </View>
                </View>
                <View style={styles.info__solo_ph}>
                    <View style={styles.info__solo_ph_items}>
                        {phNiveis.map((element, key) => {
                            
                            return(
                                typeCatalog==0?
                                    element>=Number(props.soloPH.slice(0, 3))&&element<=Number(props.soloPH.slice(4, props.soloPH.length))?
                                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: 15, height: 35, backgroundColor: `hsl(93, 40%, 30%)`, borderRadius: 3}} key={key}>
                                        <Text style={[styles.info__text, {fontSize: 10}]}>{element}</Text>
                                    </View>
                                    :<View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: 15, height: 35, backgroundColor: `hsl(228, 6%, 12%)`, borderRadius: 3}} key={key}>
                                        <Text style={[styles.info__text, {fontSize: 10}]}>{element}</Text>
                                    </View>
                                :
                                    element==Math.round(Number(props.soloPH)) || element==Number(props.soloPH.toFixed(2).slice(0,1))?
                                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: 15, height: 35, backgroundColor: `hsl(93, 40%, 30%)`, borderRadius: 3}} key={key}>
                                        <Text style={[styles.info__text, {fontSize: 10}]}>{element}</Text>
                                    </View>
                                    :<View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: 15, height: 35, backgroundColor: `hsl(228, 6%, 12%)`, borderRadius: 3}} key={key}>
                                        <Text style={[styles.info__text, {fontSize: 10}]}>{element}</Text>
                                    </View>
                            )
                        })}
                    </View>
                    <View style={styles.info__ph_view}>
                        {typeCatalog==0?
                        <Text style={[styles.info__text, {fontSize: 12, fontFamily: 'Montserrat_600SemiBold'}]}>{props.soloPH.slice(0, 3)} pH - {props.soloPH.slice(4, props.soloPH.length)} pH</Text>
                        :
                        <Text style={[styles.info__text, {fontSize: 12, fontFamily: 'Montserrat_600SemiBold'}]}>{props.soloPH} pH</Text>}
                    </View>
                </View>
            </View>:null}
            {(viewMore==true && props.compSolo)?<View style={styles.info__dados}>
                <View style={[styles.info__text_dados, {width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: '5%'}]}>
                    <View style={{gap: 7, width: '30%'}}>
                        <Text style={[styles.info__text, styles.info__text_desc]}>Areia:</Text>
                        <Text style={[styles.info__text, styles.info__text_desc]}>Argila:</Text>
                        <Text style={[styles.info__text, styles.info__text_desc]}>Silte:</Text>
                        <Text style={[styles.info__text, styles.info__text_desc]}>Fósforo:</Text>
                        <Text style={[styles.info__text, styles.info__text_desc]}>Carbono:</Text>
                        <Text style={[styles.info__text, styles.info__text_desc]}>Nitrogênio:</Text>
                        <Text style={[styles.info__text, styles.info__text_desc]}>Alumínio:</Text>
                    </View>
                    <View style={styles.info__text_props}>
                        <FlatList
                            style={{gap: 7}}
                            data={props.listCompSolo}
                            keyExtractor={(item, index) => index.toString()} 
                            renderItem={({ item, index }) => {
                                return(
                                    <Text style={[styles.info__text, {textTransform: 'capitalize'}]}>{item}</Text>
                                )
                            }}
                        />
                    </View>
                </View>
            </View>:null}
            {(viewMore==true && props.data)?<View style={[styles.info__dados,]}>
                <Text style={[styles.info__text, {minWidth: '100%'}]}>Abaixo temos um painel de risco pego diretamente do ZARC (Zoneamento Agrícola de Risco Climático).</Text>
                <Text style={[styles.info__text, {minWidth: '100%'}]}>Nesse painel estão dispostas informações da safra 2023/2024 em todas as cidades do Tocantins que tem uma safra para a cultura correspondente a essa página.</Text>
                <Text style={[styles.info__text, {minWidth: '100%'}]}>Do número 1 ao 36 são os decêndios do ano, e abaixo de cada um tem os riscos climáticos envolvidos na condução das lavouras que podem ocasionar perdas na produção, apresentados em porcentagem.</Text>
                <MethodDropdown typeMethod={setActiveCity} methods_list={citiesData} resetData={setApiData} table dropdownRisk/>
                <CatalogTable data={apiData} />
            </View>:null}
            {(viewMore==true && props.soja)?<View style={[styles.info__dados, styles.info__table]}>
                <Text style={[styles.info__text, {minWidth: '100%'}]}>Abaixo temos uma tabela com as classes de AD (Água Disponível) do solo, com seus respectivos limites inferiores e superiores em (mm cm^-1).</Text>
                <AdTable/>
            </View>:null}
        </View>
    )
}

//<CatalogRiskView cityRisk={activeCity} data={apiData}/>

const styles = StyleSheet.create({
    info: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'hsl(228, 6%, 4%)',
        gap: 15,
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: '100%',
        marginBottom: '2%'
    },

    shadowProp: {
        shadowColor: '#0000003f',
        shadowOffset: {width: 5, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 10
    },

    info__header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    info__title: {
        fontFamily: 'Montserrat_600SemiBold',
        color: 'hsl(228, 8%, 98%)',
        fontSize: 17
    },

    info__dados: {
        paddingHorizontal: 10,
        gap: 10,
        width: '100%'
    },

    info__text: {
        fontFamily: 'Montserrat_400Regular',
        color: 'hsl(228, 8%, 70%)',
        fontSize: 13,
        textAlign: 'justify'
    },

    info__text_desc: {
        fontFamily: 'Montserrat_600SemiBold',
    },

    info__galeria: {
        display: 'flex',
        flexDirection: 'row',
        width: 300,
        flexWrap: 'nowrap',
        marginVertical: 10,
        marginRight: 10
    },

    info__dadosAgua: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    dados__bar: {
        width: '100%',
        height: 35,
        borderRadius: 10,
        backgroundColor: 'hsl(228, 6%, 12%)',
        marginTop: 10,
        marginBottom: 10
    },

    loading_bar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        backgroundColor: 'hsl(93, 40%, 30%)',
        borderRadius: 10
    },

    info__text_dados: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        width: '100%',
        gap: 20,
    },

    info__text_props: {
        paddingLeft: '5%',
        borderLeftWidth: 1,
        borderLeftColor: 'hsl(93, 40%, 30%)'
    },

    info__solo_ph: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 20,
        marginTop: '5%'
    },

    info__solo_ph_items: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 5,
    },

    info__ph_view: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'hsl(93, 40%, 30%)',
        paddingVertical: 2,
        paddingHorizontal: 5,
        borderRadius: 5,
    },
    
    info__table: {
        flex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
})