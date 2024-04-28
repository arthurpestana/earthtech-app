import React, { useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native'

import { useSQLiteContext } from 'expo-sqlite/next'

import * as Animatable from 'react-native-animatable'
import styles from '../../styles/style_login'
import InputText from '../../components/LoginText';
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
    }

    return (
        <SafeAreaView style={styles.container_login}>
            <Animatable.View animation={'fadeInLeft'} delay={400} style={styles.login__header}>  
                <View style={styles.upper__img}>
                    <Animatable.Image
                        source={require('../../images/login-cadastro-upper.png')}
                        style={{width: "90%"}}
                        resizeMode="contain"
                        tintColor={'#234682'}
                    />
                </View>
                <View style={styles.app__container_logo}>
                    <Animatable.Image
                        animation={"flipInY"}
                        source={require('../../images/logo.png')}
                        style={{width: '120%'}}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.header__title_container}>
                    <Text style={styles.header__title}>Bem-vindo(a)</Text>
                </View>           
                    
            </Animatable.View>
            <ScrollView style={styles.container__main} keyboardShouldPersistTaps="handled">
                <Animatable.View animation={'fadeInUp'}>
                    <InputText delay={500} placeholder="Nome" value={email} onChangeText={setNome} iconName="user"></InputText>
                    <InputText delay={500} placeholder="Email" value={email} onChangeText={setEmail} iconName="mail"></InputText>
                    <InputText delay={700} placeholder="Senha" value={senha} onChangeText={setSenha} password={1} iconName="lock-closed"></InputText>
                    <Animatable.View animation={'fadeIn'} delay={900} style={styles.main__login}>
                        <TouchableOpacity style={styles.main__button} onPress={signUp}>
                            <Text style={styles.button_text}>Login</Text>                           
                        </TouchableOpacity>
                        <Text style={styles.account__text} onPress={() => Navigation.navigate('Login')}>
                            Não tem uma conta?  
                        </Text>                        
                    </Animatable.View>
                </Animatable.View>               
            </ScrollView>
            <Image
                source={require('../../images/login-cadastro-lower.png')}
                style={styles.image_lower}
                resizeMode="contain"
                tintColor={'#234682'}
            />
        </SafeAreaView>
    )
}
