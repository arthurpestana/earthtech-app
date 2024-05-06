import React, {useState} from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView} from 'react-native'
import styles from '../../styles/style_catalog'
import CatalogItem from '../../components/CatalogItem'
import InputText from '../../components/InputText'
import { Feather } from '@expo/vector-icons'


export default function Catalogo() {
    const [search, setSearch] = useState('')

    return (
        <SafeAreaView style={styles.catalog__container}>
            <View style={styles.catalog__header}>
                <View style={styles.header__titles}>
                    <Text style={styles.title}>Catálogo</Text>
                </View>
                <View style={styles.header__search}>
                    <InputText iconName="search" delay={500} placeholder={!search?"Pesquisar a Cultura":false} value={search} onChangeText={setSearch}/>
                </View>
            </View>
            <View style={styles.catalog__main}>
                <View style={styles.main__filters}>
                    <TouchableOpacity style={styles.filter__button}>
                        <Text style={styles.filter__text}>Culturas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filter__button}>
                        <Text style={styles.filter__text}>Solos</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.main__catalog_items}>
                    <CatalogItem />
                    <CatalogItem />
                    <CatalogItem />
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

