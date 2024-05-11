import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'

import * as Animatable from 'react-native-animatable'
import styles from '../../styles/style_connect'
import InputText from '../../components/InputText';
import MessageModal from '../../components/MessageModal';

export default function AdCalculator() {
    const [areiaTotal, setAreiaTotal] = useState('')
    const [silica, setSilica] = useState('')
    const [argila, setArgila] = useState('')
    const [ad, setAd] = useState(0)

    function calcAD() {
        let AD = 1 + (0.3591*((-0.02128887*areiaTotal) + (-0.01005814*silica) + (-0.01901894*argila) + (0.0001171219*areiaTotal*silica) + (0.0002073924*areiaTotal*argila) + (0.00006118707*silica*argila) + (-0.000006373789*areiaTotal*silica*argila)))
        AD = Math.pow(AD, 2,78474)
        AD = AD * 10
        console.log(AD)
        setAd(AD)
    }

    return (
        <SafeAreaView style={styles.container__connect}>
            <View style={styles.container__main} keyboardShouldPersistTaps="handled">
                <View style={[styles.main__info, {marginBottom: '15%'}]}>
                    <Text style={styles.info__title}>Calculadora de AD Solo</Text>
                    <Text style={styles.info__text}>Instrução para o cálculo da Água Disponível (AD - mm/cm) no solo:</Text>
                    <Text style={[styles.info__text, {fontSize: 12}]}>- Informe a Areia Total, Silica e Argila, todos os dados devem ser informados em porcentagem (%). Totalizando 100%</Text>
                </View>
                <ScrollView>
                    <Animatable.View style={styles.main__forms} animation={'fadeInUp'}>
                        <InputText iconName="codesandbox" delay={500} placeholder={!areiaTotal?"Areia Total":false} value={areiaTotal} onChangeText={setAreiaTotal} numeric/>
                        <InputText iconName="codesandbox" delay={600} placeholder={!silica?"Silica":false} value={silica} onChangeText={setSilica} numeric/>
                        <InputText iconName="codesandbox" delay={700} placeholder={!argila?"Argila":false} value={argila} onChangeText={setArgila} numeric/>
                    </Animatable.View>
                </ScrollView>
                <Animatable.View animation={'fadeIn'} delay={900} style={[styles.main__connect, {marginTop: '15%'}]}>
                    <TouchableOpacity style={styles.connect__button} onPress={calcAD}>
                        <Text style={styles.button_text}>Calcular AD</Text>                           
                    </TouchableOpacity>                       
                </Animatable.View>
            </View>
            {ad!==0?<MessageModal />:null}
        </SafeAreaView>
    )
}