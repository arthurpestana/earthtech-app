import React, { useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'

import { useSQLiteContext } from 'expo-sqlite/next'

import * as Animatable from 'react-native-animatable'
import styles from '../../styles/style_login-cadastro'
import LoginCadastroInput from '../../components/InputText';
import { useNavigation } from '@react-navigation/native'
import { Feather } from "@expo/vector-icons"
import ReturnPage from '../../components/ReturnPage'
import Toast from 'react-native-toast-message'

export default function Connect() {
    const db = useSQLiteContext()
    const Navigation = useNavigation()
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState('')

    const toastMessage = (textAlert) => {
        return Toast.show({
            position: 'top',
            type: 'error',
            text1: 'Erro',
            text2: textAlert,
            visibilityTime: 4000,
            autoHide: true
        });
    }

    async function signUp(){
        if (email!='' && senha!='' && nome!='') {
            if (!email.includes('@')) {
                toastMessage('O email deve incluir um endereço, Ex: @gmail.com')
            }
            else if (senha.length<8) {
                toastMessage('A senha deve ter 8 ou mais caracteres')
            }
            else {
                result = await db.getAllAsync(`SELECT * FROM users`)
                for (let element of result) {
                    if (element.email==email) {
                        return toastMessage('E-mail já cadastrado!')
                    }
                }
                await db.execAsync(`INSERT INTO users (name, password, email, logged) VALUES ("${nome}", "${senha}", "${email}", "${0}")`)
                console.log(nome, senha, email)
                console.log("singUP")
                Navigation.navigate('Login')
            }
        }
        else toastMessage('Preencha todos os campos!')
    }

    return (
        <SafeAreaView style={styles.container__cadastro}>
            <Toast text1Style = {{color: 'hsl(228, 8%, 98%)', fontSize: 16, fontFamily: 'Montserrat_700Bold'}} text2Style = {{fontSize: 13, color: 'hsl(228, 8%, 70%)',fontFamily: 'Montserrat_400Regular'}}/>
            <ReturnPage nav={"Login"}/>
            <View style={[styles.container__main, styles.container__register]} keyboardShouldPersistTaps="handled">
                <View style={styles.main__info}>
                    <Text style={styles.info__title}>Cadastro</Text>
                    <Text style={styles.info__text}>Por favor, preencha todos os espaços abaixo.</Text>
                </View>
                <KeyboardAvoidingView behavior={Platform.OS == 'ios'?'padding':'height'} keyboardVerticalOffset={100} style={[styles.main__forms]}>
                    <LoginCadastroInput delay={500} placeholder="NOME" value={nome} onChangeText={setNome} iconName="user"/>
                    <LoginCadastroInput delay={500} placeholder="EMAIL" value={email} onChangeText={setEmail} iconName="mail" email/>
                    <LoginCadastroInput delay={700} placeholder="SENHA" value={senha} onChangeText={setSenha} password={1} iconName="lock"/>
                </KeyboardAvoidingView>
                <Animatable.View animation={'fadeIn'} delay={900} style={styles.main__login}>
                    <TouchableOpacity style={styles.login__button} onPress={signUp}>
                        <Text style={styles.button_text}>Cadastrar</Text>                           
                    </TouchableOpacity>
                    <View style={styles.login__account}>
                        <Text style={styles.account__text}>Já possui uma conta?</Text>
                        <TouchableOpacity onPress={() => Navigation.navigate('Login')}>
                            <Text style={styles.account__signup}>Logar</Text>
                        </TouchableOpacity>
                    </View>                        
                </Animatable.View>
            </View>
        </SafeAreaView>
    )
}
