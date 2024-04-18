import React, { useEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity, View, Text, Image } from "react-native";

import styles from '../../styles/style_welcome'
import * as Animatable from 'react-native-animatable'
import * as FileSystem from 'expo-file-system'
import { useNavigation } from "@react-navigation/native";
import { useMQTT } from "../../components/Context";
import { useSQLiteContext } from 'expo-sqlite/next'

export default function Welcome() {
    const db = useSQLiteContext()
    const Navigation = useNavigation()
    const { userMail, setMail, userName, setName, loggedIn, setLoggedIn, userId, setId } = useMQTT()
    const [route, setRoute] = useState(null)
    const [ controle, setControle ] = useState(false)

    async function verifyLogged() {
        result = await db.getAllAsync(`SELECT * FROM users WHERE logged = ${1}`)
        console.log(result[0])
        if(result[0].name){
            setMail(result[0].email)
            setName(result[0].name)
            setId(result[0].id)
            setLoggedIn(true)
            setRoute('Drawer')
        }
        else {
            setRoute(null)
        }
    }
    useEffect(() => {
        verifyLogged()
    }, []);
    return (
        <SafeAreaView style={styles.container_app}>
            <View style={styles.app__container_logo}>
                <Animatable.Image
                    animation={"flipInY"}
                    source={require('../../images/logo.png')}
                    style={{width: '150%'}}
                    resizeMode="contain"
                />
            </View>
            <Animatable.View delay={600} animation={"fadeInUp"} style={styles.app__main}>
                <Text style={styles.main__title}>Automatize, monitore e gerencie o seu cultivo de qualquer lugar!</Text>
                <Text style={styles.main__text}>Faça a conexão do sistema com o aplicativo.</Text>
                <TouchableOpacity style={styles.main__button} onPress={() => Navigation.navigate(route==null?'Login':'Drawer')}>
                    <Text style={styles.button_text}>Acessar</Text>
                </TouchableOpacity>
            </Animatable.View>
        </SafeAreaView>
    )
}