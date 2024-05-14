import { ScrollView, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { Feather } from '@expo/vector-icons'
import MessageModal from './MessageModal';

export default function(props) {
    const tableHead = [
        "Safra", "Solo", "UF","Cultura", "Grupo", "Município", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36
    ]

    const [infoPressed, setInfoPressed] = useState(false)

    return (
        <View style={styles.container__table} >
            {infoPressed==true?<MessageModal setChange={setInfoPressed} title={'Grupo'} message= "O grupo é..."/>:false}
            <ScrollView horizontal>
                <View>
                    <View style={styles.table__header}>
                    {
                        tableHead.map((element, key) => {
                            return(
                                <View key={key} style={{flexDirection: 'row', width: element=="Safra"?100:element=="Solo"?100:element=="UF"?60:element=="Cultura"?125:element=="Grupo"?100:element=="Município"?125:45,  alignItems: 'center'}}>
                                    <Text style = {[styles.header__text]} key={key}>{element}</Text>
                                    {element=="Grupo"&&
                                    <TouchableOpacity onPress={() => setInfoPressed(true)}>
                                        <Feather name='info' color={'hsl(228, 8%, 98%)'} size={15} style={{top: 1.5}}/>
                                    </TouchableOpacity>
                                    }
                                </View>
                            )
                        })
                    }
                    </View>
                    <View style = {styles}>
                        <FlatList
                            data={props.data}
                            keyExtractor={(item, index) => index.toString()} 
                            renderItem={({item, index}) => {
                                return (
                                    <View style = {styles.table__content}>
                                        <Text style = {[styles.table__text, {width: 100}]}>{item.safra}</Text>
                                        <Text style = {[styles.table__text, {width: 100}]}>{item.solo}</Text>
                                        <Text style = {[styles.table__text, {width: 60}]}>{item.uf}</Text>
                                        <Text style = {[styles.table__text, {width: 125}]}>{item.cultura}</Text>
                                        <View style={{flexDirection: 'row'}}>
                                            <Text style = {[styles.table__text, {width: 100}]}>{item.grupo}</Text>
                                            
                                        </View>
                                        <Text style = {[styles.table__text, {width: 125}]}>{item.municipio}</Text>
                                        <Text style = {[styles.table__text, {width: 45}]}>{item.risk1}</Text>
                                        <Text style = {[styles.table__text, {width: 45}]}>{item.risk2}</Text>
                                        <Text style = {[styles.table__text, {width: 45}]}>{item.risk3}</Text>
                                        <Text style = {[styles.table__text, {width: 45}]}>{item.risk4}</Text>
                                        <Text style = {[styles.table__text, {width: 45}]}>{item.risk5}</Text>
                                        <Text style = {[styles.table__text, {width: 45}]}>{item.risk6}</Text>
                                        <Text style = {[styles.table__text, {width: 45}]}>{item.risk7}</Text>
                                        <Text style = {[styles.table__text, {width: 45}]}>{item.risk8}</Text>
                                        <Text style = {[styles.table__text, {width: 45}]}>{item.risk9}</Text>
                                        <Text style = {[styles.table__text, {width: 45}]}>{item.risk10}</Text>
                                        <Text style = {[styles.table__text, {width: 45}]}>{item.risk11}</Text>
                                        <Text style = {[styles.table__text, {width: 45}]}>{item.risk12}</Text>
                                        <Text style = {[styles.table__text, {width: 45}]}>{item.risk13}</Text>
                                        <Text style = {[styles.table__text, {width: 45}]}>{item.risk14}</Text>
                                        <Text style = {[styles.table__text, {width: 45}]}>{item.risk15}</Text>
                                        <Text style = {[styles.table__text, {width: 45}]}>{item.risk16}</Text>
                                        <Text style = {[styles.table__text, {width: 45}]}>{item.risk17}</Text>
                                        <Text style = {[styles.table__text, {width: 45}]}>{item.risk18}</Text>
                                        <Text style = {[styles.table__text, {width: 45}]}>{item.risk19}</Text>
                                        <Text style = {[styles.table__text, {width: 45}]}>{item.risk20}</Text>
                                        <Text style = {[styles.table__text, {width: 45}]}>{item.risk21}</Text>
                                        <Text style = {[styles.table__text, {width: 45}]}>{item.risk22}</Text>
                                        <Text style = {[styles.table__text, {width: 45}]}>{item.risk23}</Text>
                                        <Text style = {[styles.table__text, {width: 45}]}>{item.risk24}</Text>
                                        <Text style = {[styles.table__text, {width: 45}]}>{item.risk25}</Text>
                                        <Text style = {[styles.table__text, {width: 45}]}>{item.risk26}</Text>
                                        <Text style = {[styles.table__text, {width: 45}]}>{item.risk27}</Text>
                                        <Text style = {[styles.table__text, {width: 45}]}>{item.risk28}</Text>
                                        <Text style = {[styles.table__text, {width: 45}]}>{item.risk29}</Text>
                                        <Text style = {[styles.table__text, {width: 45}]}>{item.risk30}</Text>
                                        <Text style = {[styles.table__text, {width: 45}]}>{item.risk31}</Text>
                                        <Text style = {[styles.table__text, {width: 45}]}>{item.risk32}</Text>
                                        <Text style = {[styles.table__text, {width: 45}]}>{item.risk33}</Text>
                                        <Text style = {[styles.table__text, {width: 45}]}>{item.risk34}</Text>
                                        <Text style = {[styles.table__text, {width: 45}]}>{item.risk35}</Text>
                                        <Text style = {[styles.table__text, {width: 45}]}>{item.risk36}</Text>
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
        flex: 1
    },
    table__header: {
        paddingVertical: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff60',
        flexDirection: 'row'
    },
    header__text: {
        fontFamily: 'Montserrat_700Bold',
        color: 'hsl(228, 8%, 98%)',
        fontSize: 16,
        padding: 8,
    },
    table__text: {
        fontFamily: 'Montserrat_400Regular',
        color: 'hsl(228, 8%, 98%)',
        fontSize: 15,
    },
    table__content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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