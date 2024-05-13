import React, { useState } from 'react'
import { SafeAreaView, View, Text,TouchableOpacity , KeyboardAvoidingView, Platform } from 'react-native'
import { useSQLiteContext } from 'expo-sqlite/next'
import { useMQTT } from '../../components/Context';
import * as Animatable from 'react-native-animatable'
import styles from '../../styles/style_login-cadastro'
import LoginCadastroInput from '../../components/InputText';
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message';


export default function Connect() {
    const Navigation = useNavigation()
    const db = useSQLiteContext()
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const { setMail, setName, setLoggedIn, setId } = useMQTT()

    async function loginAccount(){
        try{
            result = await db.getAllAsync(`SELECT * FROM users where email = "${email}" and password = "${senha}"`)
            console.log(result)

            if (senha!='' && email!='') {
                for (let element of result) {
                    if (email == element.email && senha == element.password) {
                        await db.execAsync(`UPDATE users SET logged = ${1} WHERE email = "${element.email}"`)
                        setMail(element.email)
                        setName(element.name)
                        setId(element.id)
                        setLoggedIn(true)
                        Navigation.navigate('TabRoutes')
                    }
                }
            }
            if(result.length < 1) {
                Toast.show({
                    position: 'top',
                    type: 'error',
                    text1: 'Erro',
                    text2: 'E-mail ou senha incorretos',
                    visibilityTime: 5000,
                    autoHide: true
                });
        }}catch(err){
            console.log(err)
        }
    }

    return (
        <SafeAreaView style={styles.container_login}>
            <Toast text1Style = {{color: 'hsl(228, 8%, 98%)', fontSize: 16, fontFamily: 'Montserrat_700Bold',}} text2Style = {{fontSize: 13, color: 'hsl(228, 8%, 70%)',fontFamily: 'Montserrat_400Regular'}}/>
            <Animatable.View animation={'fadeInLeft'} delay={400} style={styles.header__logo}>  
                <Animatable.Image 
                    animation={"flipInY"}
                    source={require('../../images/pngwing.png')}
                    style={{width: '60%'}}
                    resizeMode="contain"
                    tintColor={'#496b2e'}
                />
            </Animatable.View>
            <View style={styles.container__main} keyboardShouldPersistTaps="handled">
                <View style={styles.main__info}>
                    <Text style={styles.info__title}>Login</Text>
                    <Text style={styles.info__text}>Por favor, faça o login para continuar.</Text>
                </View>
                <KeyboardAvoidingView behavior={Platform.OS == 'ios'?'padding':'height'} style={styles.main__forms}>
                    <LoginCadastroInput delay={500} placeholder="EMAIL" value={email} onChangeText={setEmail} iconName="mail" email/>
                    <LoginCadastroInput delay={700} placeholder="SENHA" value={senha} onChangeText={setSenha} password={1} iconName="lock"/>
                </KeyboardAvoidingView>
                <Animatable.View animation={'fadeIn'} delay={900} style={styles.main__login}>
                    <TouchableOpacity style={styles.login__button} onPress={loginAccount}>
                        <Text style={styles.button_text}>Login</Text>                           
                    </TouchableOpacity>
                    <View style={styles.login__account}>
                        <Text style={styles.account__text}>Não tem uma conta?</Text>
                        <TouchableOpacity onPress={() => Navigation.navigate('Cadastro')}>
                            <Text style={styles.account__signup}>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>                        
                </Animatable.View>
            </View>
        </SafeAreaView>
    )
}
