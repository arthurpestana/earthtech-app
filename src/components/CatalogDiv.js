import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView, Image } from 'react-native'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'
import { useSQLiteContext } from 'expo-sqlite/next';
import { useMQTT } from './Context'

export default function CatalogDiv(props) {
    const Navigation = useNavigation()
    const { setIndexCatalog, setTypeCatalog } = useMQTT()
    const [iconImage, setIconImage] = useState(null)

    function NavigateCatalogItem() {
        setIndexCatalog(props.index)
        props.cultivo?setTypeCatalog(0):setTypeCatalog(1)
        Navigation.navigate('CatalogItem')
    }

    return (
        <Animatable.View animation={'fadeInLeft'} delay={600} style={styles.dashboard__items}>
            <View style={styles.item__div_img}>
                {props.cultivo?<Image source={{uri: props.iconName}} style={{width: 50, height: 50}}/>:<MaterialIcons name='terrain' size={40} color={props.color}/>}
            </View>
            <View style={styles.dashboard__dados}>
                <View style={styles.item__div_info}>
                    <Text style={styles.item__title}>{props.nome}</Text>
                    <Text style={[styles.item__text, {width: 200}]}>{props.tipo} • {props.estado}</Text> 
                </View>
            </View>
            <View style={styles.dashboard__dados}>
                <TouchableOpacity onPress={NavigateCatalogItem}>
                    <Feather name='chevron-right' size={25} color={'hsl(228, 8%, 98%)'}/>
                </TouchableOpacity>
            </View>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
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
        display: 'flex',
        right: -15
    },

    item__div_logo: {
        marginBottom: 5
    },

    item__div_info: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 5,
        width: '70%',
    },

    item__title: {
        fontFamily: 'Montserrat_700Bold',
        color: 'hsl(228, 8%, 98%)',
        fontSize: 16
    },

    item__text: {
        fontFamily: 'Montserrat_400Regular',
        color: 'hsl(228, 8%, 98%)',
        fontSize: 12,
        textAlign: 'center',
        width: '100%',
    },
})
