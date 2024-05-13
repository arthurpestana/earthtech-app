import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView } from 'react-native'

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
    const [calc, setCalc] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        setAd(0)
    }, [])

    function calcAd() {
        let argila = parseFloat(argilaState)
        let areiaTotal = parseFloat(areiaTotalState)
        let silte = parseFloat(silteState)
        if(argila+areiaTotal+silte == 100){
            let AD = 1 + (0.3591*((-0.02128887*areiaTotal) + (-0.01005814*silte) + (-0.01901894*argila) + (0.0001171219*areiaTotal*silte) + (0.0002073924*areiaTotal*argila) + (0.00006118707*silte*argila) + (-0.000006373789*areiaTotal*silte*argila)))
            AD = Math.pow(AD, 2.78474)
            AD = AD * 10
            if(AD < 0.33){
                setAd("AD0")
                setMessage("Solo arenoso com pouca capacidade de retenção de água, inadequado para agricultura.")
            }
            else if(AD < 0.46){
                setAd("AD1")
                setMessage("Baixa capacidade de retenção de água, exigindo irrigação cuidadosa para suplementar.")
            }
            else if(AD < 0.61){
                setAd("AD2")
                setMessage('Capacidade moderada de retenção de água, requer monitoramento da irrigação.')
            }
            else if(AD < 0.80){
                setAd("AD3")
                setMessage('Boa capacidade de retenção de água, favorecendo o crescimento das plantas.')
            }   
            else if(AD < 1.06){ 
                setAd("AD4")
                setMessage('Excelente capacidade de retenção de água, proporcionando um suprimento constante para as plantas.')
            }
            else if(AD < 1.40){
                setAd("AD5")
                setMessage('Solo saturado, com altissíma retenção de água no solo, permitindo longos períodos sem irrigação.')
            }
            else {
                setAd("AD6")
                setMessage('Solo altamente saturado, maior período em que uma cultura conseguirá sobreviver sem a necessidade de chuvas ou irrigação, já que apenas absorve a água armazenada no solo.')
            }
            setCalc(true)
        }
        else{
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

    return (
        <SafeAreaView style={styles.container__connect}>
            <Toast text1Style = {styles.toastText} text2Style = {{fontSize: 13, color: 'hsl(228, 8%, 70%)',fontFamily: 'Montserrat_400Regular'}}/>
            <View style={[styles.container__main, {marginTop: '28%'}]} keyboardShouldPersistTaps="handled">
                <View style={[styles.main__info, {marginBottom: '15%'}]}>
                    <Text style={styles.info__title}>Calculadora de Classe AD</Text>
                    <Text style={styles.info__text}>Instrução para o cálculo da Água Disponível (AD - mm/cm) no solo:</Text>
                    <Text style={[styles.info__text, {fontSize: 12}]}>- Informe a Areia Total, Silte e Argila, todos os dados devem ser informados em porcentagem (%). Totalizando 100%</Text>
                </View>
                <KeyboardAvoidingView behavior={Platform.OS == 'ios'?'padding':'height'} keyboardVerticalOffset={80}>
                    <ScrollView>
                        <Animatable.View style={styles.main__forms} animation={'fadeInUp'}>
                            <InputText calc iconName="percent" delay={500} placeholder={!areiaTotalState?"Areia Total":false} value={areiaTotalState} onChangeText={setAreiaTotal} numeric/>
                            <InputText calc iconName="percent" delay={600} placeholder={!silteState?"Silte":false} value={silteState} onChangeText={setSilte} numeric/>
                            <InputText calc iconName="percent" delay={700} placeholder={!argilaState?"Argila":false} value={argilaState} onChangeText={setArgila} numeric/>
                        </Animatable.View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <Animatable.View animation={'fadeIn'} delay={900} style={[styles.main__connect, {marginTop: '15%'}]}>
                    <TouchableOpacity style={styles.connect__button} onPress={calcAd}>
                        <Text style={styles.button_text}>Calcular AD</Text>                           
                    </TouchableOpacity>                       
                </Animatable.View>
            </View>
            {calc && ad!=0?<MessageModal closeX setChange={setCalc} classeTexto={`Seu solo é de classe ${ad}`} message={message} title={"Classe AD do Solo"}/>:null}
        </SafeAreaView>
    )
}