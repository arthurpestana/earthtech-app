import {
    ScrollView,
    TouchableOpacity,
    View,
  } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { Feather } from '@expo/vector-icons'
import MessageModal from './MessageModal';
import data from '../../assets/adList.json'

export default function(props) {
    const tableHead = [
        "Limite inferior", 
        "Classes de AD", 
        "Limite superior"
    ]

    const [infoPressed, setInfoPressed] = useState(false)

    return (
        <View style={styles.container__table} >
            <ScrollView horizontal>
                <View>
                    <View style={styles.table__header}>
                    {
                        tableHead.map((element, key) => {
                            return(
                                <View key={key} style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style = {[styles.header__text]} key={key}>{element}</Text>
                                </View>
                            )
                        })
                    }
                    </View>
                    <View style = {styles}>
                        <FlatList
                            data={data}
                            keyExtractor={(item, index) => index.toString()} 
                            renderItem={({item, index}) => {
                                return (
                                    <View style = {styles.table__content}>
                                        <Text style = {[styles.table__text]}>{item.infLimit}</Text>
                                        <Text style = {[styles.table__text]}>≤</Text>
                                        <Text style = {[styles.table__text]}>{item.name}</Text>
                                        <Text style = {[styles.table__text]}>{"<"}</Text>
                                        <Text style = {[styles.table__text]}>{item.supLimit}</Text>
                                    </View>
                                )
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container__table: {
        flex: 1,
    },
    table__header: {
        paddingVertical: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff60',
        flexDirection: 'row',
    },
    header__text: {
        fontFamily: 'Montserrat_700Bold',
        color: 'hsl(228, 8%, 98%)',
        fontSize: 14,
        paddingVertical: 8,
        paddingHorizontal: 8,
        textAlign: 'center',
        width: 100
    },
    table__text: {
        fontFamily: 'Montserrat_400Regular',
        color: 'hsl(228, 8%, 98%)',
        fontSize: 14,
        width: 40
    },
    table__content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8,
        marginHorizontal: 1,
        elevation: 1,
        borderRadius: 3,
        paddingVertical: 10,
        paddingHorizontal: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff60',
    }
})