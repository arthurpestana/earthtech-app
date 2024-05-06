import React from 'react'
import { View, Text, SafeAreaView, } from 'react-native'


import { Feather, MaterialIcons } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'
import styles from '../../styles/style_catalogItem'
import ReturnPage from '../../components/ReturnPage'


export default function CatalogItem() {
    return (
        <SafeAreaView style={styles.container__item}>
            <ReturnPage nav={'CatalogoIndex'}/>
            <View style={styles.item__main}>

            </View>
        </SafeAreaView>
    )
}