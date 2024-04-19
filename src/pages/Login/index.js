import React, { useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native'
import { useSQLiteContext } from 'expo-sqlite/next'
import { useMQTT } from '../../components/Context';
import * as Animatable from 'react-native-animatable'
import styles from '../../styles/style_login'
import InputText from '../../components/LoginText';
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from "@expo/vector-icons"


export default function Connect() {
    const Navigation = useNavigation()
    const db = useSQLiteContext()
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const { userMail, setMail, userName, setName, loggedIn, setLoggedIn, userId, setId } = useMQTT()

    async function loginAccount(){
        result = await db.getAllAsync(`SELECT * FROM users`)
        console.log(result)

        if (senha!='' && email!='') {
            for (let element of result) {
                if (email == element.email && senha == element.password) {
                    await db.execAsync(`UPDATE users SET logged = ${1} WHERE email = "${element.email}"`)
                    setMail(element.email)
                    setName(element.name)
                    setId(element.id)
                    setLoggedIn(true)
                    Navigation.navigate('Drawer')
                }
            }
        }
        else {
            console.log('E-mail ou senha incorretos.')
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
                    <InputText delay={500} placeholder="Email" value={email} onChangeText={setEmail} iconName="mail"></InputText>
                    <InputText delay={700} placeholder="Senha" value={senha} onChangeText={setSenha} password={1} iconName="lock-closed"></InputText>
                    <Animatable.View animation={'fadeIn'} delay={900} style={styles.main__login}>
                        <TouchableOpacity style={styles.main__button} onPress={loginAccount}>
                            <Text style={styles.button_text}>Login</Text>                           
                        </TouchableOpacity>
                        <Text style={styles.account__text} onPress={() => Navigation.navigate('Cadastro')}>
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
