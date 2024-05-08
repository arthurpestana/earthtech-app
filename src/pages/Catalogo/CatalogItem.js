import React from 'react'
import { View, Text, SafeAreaView, Image, ScrollView} from 'react-native'

import { useSQLiteContext } from 'expo-sqlite/next';
import { useMQTT } from '../../components/Context'

import { Feather, MaterialIcons } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'
import styles from '../../styles/style_catalogItem'
import ReturnPage from '../../components/ReturnPage'

export default function CatalogItem() {
    const { indexCatalog, setIndexCatalog } = useMQTT()
    console.log(indexCatalog)

    return (
        <SafeAreaView style={styles.container__item}>
            <ReturnPage nav={'CatalogoIndex'} catalog />
            <ScrollView style={styles.container__scroll}>
                <View style={styles.item__header}>
                    <Image />
                </View>
                <View style={styles.item__main}>
                
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}