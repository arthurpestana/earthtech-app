import React, { useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'

import { useSQLiteContext } from 'expo-sqlite/next'

import * as Animatable from 'react-native-animatable'
import styles from '../../styles/style_connect'
import InputText from '../../components/InputText';
import { useNavigation } from '@react-navigation/native'

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
        <SafeAreaView style={styles.container_connect}>
            <Animatable.View animation={'fadeInLeft'} delay={400} style={styles.container__header}>
                <Text style={styles.header__title}>Bem-vindo(a)</Text>
                <View style={styles.connection__box}>
                </View> 
            </Animatable.View>
            <ScrollView style={styles.container__main}>
                <Animatable.View animation={'fadeInUp'}>
                    <InputText delay={500} placeholder="Nome" value={nome} onChangeText={setNome}></InputText>
                    <InputText delay={700} placeholder="Email" value={email} onChangeText={setEmail}></InputText>
                    <InputText delay={700} placeholder="Senha" value={senha} onChangeText={setSenha} password={1}></InputText>
                    <Animatable.View animation={'fadeIn'} delay={900} style={styles.main__connection}>
                        <TouchableOpacity style={styles.main__button} onPress={signUp}>
                            <Text style={styles.button_text}>Cadastrar</Text>
                        </TouchableOpacity>
                        <Text style={styles.main__text}>
                            Já tem uma conta?{' '}  
                            <Text style={[styles.main__text, styles.hyperlink__style]} onPress={() => Navigation.navigate('Login')}>
                                Fazer login
                            </Text>
                        </Text>         
                    </Animatable.View>
                </Animatable.View>
            </ScrollView>
        </SafeAreaView>
    )
}
