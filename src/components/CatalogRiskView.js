import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { Feather } from '@expo/vector-icons'
import MessageModal from './MessageModal';


export default function CatalogRiskTable(props) {
    let risks_color = [{baixo: '#008000', medio: '#C4C400',  alto: '#D50000'}]

    let media_risks = []
    props.data.map((element, index) => {
        let soma = 0
        let quant = 0
        for (let i=1; i<=36; i++) {
            if (element[`risk${i}`]>0) {
                quant+=1
            }
            soma += Number(element[`risk${i}`])
        }
        media_risks.push(Number(soma/quant))
    })

    return (
        <ScrollView style={{height: 400}}>
            <FlatList 
                data={props.data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => {
                    return (
                        <View style={styles.container__risk_view}>
                            <View style={styles.risk__info}>
                                <Text style={styles.info__title}>{item.municipio} - {item.uf}</Text>
                                <View style={styles.info__dados}>
                                    <Text style={styles.info_text}>{item.solo} • {item.grupo}</Text>
                                </View>
                            </View>
                            <View style={styles.risk__bar}>
                                <View style={[styles.loading_bar, {backgroundColor: media_risks[index]<30?risks_color[0].baixo:media_risks[index]<40?risks_color[0].medio:risks_color[0].alto}, {width: `${media_risks[index].toFixed(0)}%`}]}>
                                    <Text style={styles.bar_text}>{media_risks[index].toFixed(1)}%</Text>
                                </View>
                            </View>
                        </View>
                    )
                }}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container__risk_view: {
        backgroundColor: 'hsl(228, 6%, 12%)',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderRadius: 10,
        marginBottom: '5%',
        paddingHorizontal: '8%',
        paddingVertical: '5%',
    },

    risk__info: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        alignItems: 'left',
        justifyContent: 'center',
        width: '65%'
    },

    info__title: {
        fontFamily: 'Montserrat_600SemiBold',
        color: 'hsl(228, 8%, 98%)',
        fontSize: 16
    },

    info_text: {
        fontFamily: 'Montserrat_400Regular',
        color: 'hsl(228, 8%, 70%)',
        fontSize: 12
    },

    risk__bar: {
        width: '100%',
        backgroundColor: 'hsl(228, 6%, 4%)',
        borderRadius: 10,
    },

    loading_bar: {
        borderRadius: 10,
        paddingVertical: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    bar_text: {
        fontFamily: 'Montserrat_400Regular',
        color: 'hsl(228, 8%, 98%)',
        fontSize: 12
    }
})