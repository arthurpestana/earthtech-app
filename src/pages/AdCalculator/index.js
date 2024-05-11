import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'

import * as Animatable from 'react-native-animatable'
import styles from '../../styles/style_connect'
import InputText from '../../components/InputText';
import MessageModal from '../../components/MessageModal';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

export default function AdCalculator() {
    const [areiaTotalState, setAreiaTotal] = useState(Number)
    const [silteState, setSilte] = useState(Number)
    const [argilaState, setArgila] = useState(Number)
    const [ad, setAd] = useState(0)
    const [confirmation, setConfirmation] = useState(false)
    const [calc, setCalc] = useState(false)

    const Navigation = useNavigation()

    function calcAD() {
        let argila = parseInt(argilaState)
        let areiaTotal = parseInt(areiaTotalState)
        let silte = parseInt(silteState)
        if(argila+areiaTotal+silte == 100){
            let AD = 1 + (0.3591*((-0.02128887*areiaTotal) + (-0.01005814*silte) + (-0.01901894*argila) + (0.0001171219*areiaTotal*silte) + (0.0002073924*areiaTotal*argila) + (0.00006118707*silte*argila) + (-0.000006373789*areiaTotal*silte*argila)))
            AD = Math.pow(AD, 2.78474)
            AD = AD * 10
            console.log(AD)
            setAd(AD)
            setCalc(true)
        }else{
            Toast.show({
                position: 'top',
                type: 'error',
                text1: 'Erro',
                text2: 'A soma dos valores deve ser igual a 100',
                visibilityTime: 5000,
                autoHide: true
            });
        }
    }

    useEffect(() => {
        if(confirmation == true){
            Navigation.navigate('Conexão') //Arrumar quando tiver páginas para cada classe de solo AD
        }
    }, [confirmation])

    return (
        <SafeAreaView style={styles.container__connect}>
            <Toast text1Style = {styles.toastText} text2Style = {{fontSize: 13, color: 'hsl(228, 8%, 70%)',fontFamily: 'Montserrat_400Regular'}}/>
            <View style={[styles.container__main, {marginTop: '28%'}]} keyboardShouldPersistTaps="handled">
                <View style={[styles.main__info, {marginBottom: '15%'}]}>
                    <Text style={styles.info__title}>Calculadora de AD Solo</Text>
                    <Text style={styles.info__text}>Instrução para o cálculo da Água Disponível (AD - mm/cm) no solo:</Text>
                    <Text style={[styles.info__text, {fontSize: 12}]}>- Informe a Areia Total, Silica e Argila, todos os dados devem ser informados em porcentagem (%). Totalizando 100%</Text>
                </View>
                <ScrollView>
                    <Animatable.View style={styles.main__forms} animation={'fadeInUp'}>
                        <InputText iconName="codesandbox" delay={500} placeholder={!areiaTotalState?"Areia Total":false} value={areiaTotalState} onChangeText={setAreiaTotal} numeric/>
                        <InputText iconName="codesandbox" delay={600} placeholder={!silteState?"Silte":false} value={silteState} onChangeText={setSilte} numeric/>
                        <InputText iconName="codesandbox" delay={700} placeholder={!argilaState?"Argila":false} value={argilaState} onChangeText={setArgila} numeric/>
                    </Animatable.View>
                </ScrollView>
                <Animatable.View animation={'fadeIn'} delay={900} style={[styles.main__connect, {marginTop: '15%'}]}>
                    <TouchableOpacity style={styles.connect__button} onPress={calcAD}>
                        <Text style={styles.button_text}>Calcular AD</Text>                           
                    </TouchableOpacity>                       
                </Animatable.View>
            </View>
            {calc?<MessageModal confirmation={setConfirmation} setChange= {setCalc}/>:null}
        </SafeAreaView>
    )
}