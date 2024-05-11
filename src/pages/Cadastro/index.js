import React, { useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'

import { useSQLiteContext } from 'expo-sqlite/next'

import * as Animatable from 'react-native-animatable'
import styles from '../../styles/style_login-cadastro'
import LoginCadastroInput from '../../components/InputText';
import { useNavigation } from '@react-navigation/native'
import { Feather } from "@expo/vector-icons"

export default function Connect() {
    const db = useSQLiteContext()
    const Navigation = useNavigation()
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState('')

    async function signUp(){
        if(email.includes('@') && senha.length >= 8 && nome != ''){
            await db.execAsync(`INSERT INTO users (name, password, email, logged) VALUES ("${nome}", "${senha}", "${email}", "${0}")`)
            console.log(nome, senha, email)
        }
        else{
            if(!email.includes('@') && email != ''){
                console.log('O email deve incluir um endereço, Ex: @gmail.com')
            }
            if(!senha.length >= 8){
                console.log('A senha deve ter 8 ou mais caracteres')
            }
            if(!nome != ''){
                console.log('O nome não pode estar vazio')
            }
            if(!email != ''){
                console.log('O email não pode estar vazio')
            }
        }
        console.log("singUP")
    }

    return (
        <SafeAreaView style={styles.container__cadastro}>
            <View style={styles.return__container}>
                <TouchableOpacity style={styles.return__button} onPress={() => Navigation.navigate('Login')}>
                    <Feather name='arrow-left' size={25} color={"hsl(93, 40%, 30%)"}/>
                </TouchableOpacity>
            </View>
            <View style={[styles.container__main, styles.container__register]} keyboardShouldPersistTaps="handled">
                <View style={styles.main__info}>
                    <Text style={styles.info__title}>Cadastro</Text>
                    <Text style={styles.info__text}>Por favor, preencha todos os espaços abaixo.</Text>
                </View>
                <Animatable.View style={styles.main__forms} animation={'fadeInUp'}>
                    <LoginCadastroInput delay={500} placeholder="NOME" value={nome} onChangeText={setNome} iconName="user"/>
                    <LoginCadastroInput delay={500} placeholder="EMAIL" value={email} onChangeText={setEmail} iconName="mail" email/>
                    <LoginCadastroInput delay={700} placeholder="SENHA" value={senha} onChangeText={setSenha} password={1} iconName="lock"/>
                </Animatable.View>
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
