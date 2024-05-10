import React, {useEffect, useState} from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView} from 'react-native'
import styles from '../../styles/style_catalog'
import CatalogDiv from '../../components/CatalogDiv'
import InputText from '../../components/InputText'
import solos from '../../../assets/solosList.json'
import culturas from '../../../assets/culturasList.json'
import * as Animatable from 'react-native-animatable'
import axios from 'axios'


export default function Catalogo() {
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState(0)

    /*useEffect(() => {
        (async () =>{
            try {
                const options = {
                    method: 'GET',
                    url: 'https://earthtechapi.up.railway.app/api/zoneamento',
                };
                let response = await axios.request(options)
                let culturasList = []
                culturasList.push(response.data[0])
                culturasList.push(response.data[2504])
                culturasList.push(response.data[3755])
                culturasList.push(response.data[4589])
                culturasList.push(response.data[4643])
                culturasList.push(response.data[5921])
                setCulturas(culturasList)
            }catch(err){
                console.log("Erro: ", err)
            }
        })()
    }, [])*/
    
    return (
        <SafeAreaView style={styles.catalog__container}>
            <View style={styles.catalog__header}>
                <View style={styles.header__titles}>
                    <Text style={styles.title}>Catálogo</Text>
                </View>
                <View style={styles.header__search}>
                    <InputText iconName="search" delay={500} placeholder={!search?"Pesquisar":false} value={search} onChangeText={setSearch} addTopic/>
                </View>
            </View>
            <View style={styles.catalog__main}>
                <View style={styles.main__filters}>
                    <TouchableOpacity style={[styles.filter__button, filter==0?styles.filter_on:false]} onPress={() => setFilter(0)}>
                        <Text style={styles.filter__text}>Culturas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.filter__button, filter==1?styles.filter_on:false]} onPress={() => setFilter(1)}>
                        <Text style={styles.filter__text}>Solos</Text>
                    </TouchableOpacity>
                </View>
                
                {filter==0?
                    <ScrollView style={styles.main__catalog_items}>
                        {culturas!=undefined?culturas.map((element, key) => {
                            if (search!='') {
                                if (search.toLocaleLowerCase()==element.nome.slice(0, search.length).toLocaleLowerCase()) {
                                    return(<CatalogDiv cultivo iconName={element.icon} nome={element.nome} tipo={element.tipo} clima={element.clima} key={key} index={key}/>)
                                }
                            }
                            else {
                                return(<CatalogDiv cultivo iconName={element.icon} nome={element.nome} tipo={element.tipo} clima={element.clima} key={key} index={key}/>)
                            }
                        }):undefined}
                    </ScrollView>:
                    <ScrollView style={styles.main__catalog_items}>
                        {solos.map((element, key) => {
                            if (search!='') {
                                if (search.toLocaleLowerCase()==element.nome.slice(0, search.length).toLocaleLowerCase()) {
                                    return(<CatalogDiv nome={element.nome} tipo={element.tipo} clima={element.profundidade} key={key} index={key}/>)
                                }
                            }
                            else {
                                return(<CatalogDiv nome={element.nome} tipo={element.tipo} clima={element.profundidade} key={key} index={key}/>)
                            }
                        })}
                    </ScrollView>
                }
            </View>
        </SafeAreaView>
    )
}

