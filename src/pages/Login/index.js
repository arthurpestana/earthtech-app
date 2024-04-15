import React, { useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { useSQLiteContext } from 'expo-sqlite/next'
import { useMQTT } from '../../components/Context';
import * as Animatable from 'react-native-animatable'
import styles from '../../styles/style_connect'
import InputText from '../../components/InputText';
import { useNavigation } from '@react-navigation/native'

export default function Connect() {
    const Navigation = useNavigation()
    const db = useSQLiteContext()
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const { userMail, setMail, userName, setName, loggedIn, setLoggedIn, userId, setId } = useMQTT()

    async function loginAccount(){
        result = await db.getAllAsync(`SELECT * FROM users`)

        if(senha == result[0].password){
            await db.execAsync(`UPDATE users SET logged = ${1} WHERE email = "${result[0].email}"`)
            setMail(result[0].email)
            setName(result[0].name)
            setId(result[0].id)
            setLoggedIn(true)
            Navigation.navigate('ConnectBoard')
        }
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
                    <InputText delay={500} placeholder="Email" value={email} onChangeText={setEmail}></InputText>
                    <InputText delay={700} placeholder="Senha" value={senha} onChangeText={setSenha} password={1}></InputText>
                    <Animatable.View animation={'fadeIn'} delay={900} style={styles.main__connection}>
                        <TouchableOpacity style={styles.main__button} onPress={loginAccount}>
                            <Text style={styles.button_text}>Entrar</Text>                           
                        </TouchableOpacity>
                        <Text style={styles.main__text}>
                            Não tem uma conta?{' '}  
                            <Text style={[styles.main__text, styles.hyperlink__style]} onPress={() => Navigation.navigate('Cadastro')}>
                                Cadastre-se 
                            </Text>
                        </Text>
                        
                    </Animatable.View>
                </Animatable.View>
            </ScrollView>
        </SafeAreaView>
    )
}