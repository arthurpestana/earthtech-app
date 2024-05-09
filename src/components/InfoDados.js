import React, {useState} from "react";
import {Text, View, Image, StyleSheet, TouchableOpacity, ScrollView, FlatList} from 'react-native'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import { style } from "d3";

export default (props) => {
    
    const styles = StyleSheet.create({
        info: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            backgroundColor: 'hsl(228, 6%, 4%)',
            gap: 15,
            paddingVertical: 20,
            paddingHorizontal: 20,
            borderRadius: 10
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
    
        info__galeria: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            flexWrap: 'nowrap',
            gap: 20,
            marginVertical: 10,
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
            width: props.quantAgua,
            height: 35,
            backgroundColor: 'hsl(93, 40%, 30%)',
            borderRadius: 10
        },
    })

    const [viewMore, setViewMore] = useState(true)

    const dataImages = ['../images/soja.jpg', '../images/soja.jpg']

    const viewMoreFunction = () => {
        if (viewMore==false) {
            setViewMore(true)
        }
        else {
            setViewMore(false)
        }
    }

    return (
        <View style={[styles.info, styles.shadowProp]}>
            <View style={styles.info__header}>
                <Text style={styles.info__title}>{props.title}</Text>
                <TouchableOpacity style={styles.info__more} onPress={viewMoreFunction}>
                    {viewMore==false?<Feather name="chevron-down" color={'hsl(228, 8%, 98%)'} size={24}/>:<Feather name="chevron-down" color={'hsl(228, 8%, 98%)'} size={24} style={{transform: [{rotate: '180deg'}]}}/>}
                </TouchableOpacity>
            </View>
            {(viewMore==true && props.detail)?<View style={styles.info__dados}>
                <Text style={styles.info__text}>Clima Propício:     {props.text[0]}</Text>
                <Text style={styles.info__text}>Tempo de Crescimento:      {props.text[1]}</Text>
                <Text style={styles.info__text}>Necessidade de Água:       {props.text[2]<=30?'Baixa':props.text[2]<70?'Média':'Alta'}</Text>
            </View>:null}
            {(viewMore==true && props.desc)?<View style={styles.info__dados}>
                <Text style={styles.info__text}>{props.text}</Text>
            </View>:null}
            {(viewMore==true && props.images)?<View style={styles.info__dados}>
                <View style={styles.info__galeria}>
                    {props.loadImage!=''?<Image resizeMode={'cover'} source={require('../images/soja.jpg')} style={{width: '100%', height: 200, borderRadius: 15}}/>:<Text style={styles.info__text}>Não há imagens cadastradas!</Text>}
                    
                </View>
            </View>:null}
            {(viewMore==true && props.typeSolo)?<View style={styles.info__dados}>
                <Text style={styles.info__text}>Solo:</Text>
            </View>:null}
            {(viewMore==true && props.agua)?<View style={[styles.info__dados, styles.info__dadosAgua]}>
                <View style={styles.dados__bar}>
                    <View style={styles.loading_bar}></View>
                </View>
                <Text style={styles.info__text}>{props.quantAgua<=30?'Baixa':props.quantAgua<70?'Média':'Alta'}</Text>
            </View>:null}
        </View>
    )
}

/**<View style={styles.info__desc}>
                <Text style={styles.info__text}>Descrição da Cultura</Text>
            </View>
            <View style={styles.info__galeria}>
                <Text>Galeria de Fotos</Text>
                <View style={styles.view_images}>
                    <Image />
                </View>
            </View> */

