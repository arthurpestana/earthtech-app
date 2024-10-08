import React, { useEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity, View, Text, Image } from "react-native";

import styles from '../../styles/style_welcome'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from "@react-navigation/native";
import { useMQTT } from "../../components/Context";
import { useSQLiteContext } from 'expo-sqlite/next'

export default function Welcome() {
    const db = useSQLiteContext()
    const Navigation = useNavigation()
    const { setMail, setName, setLoggedIn, loggedIn, setId } = useMQTT()
    const [route, setRoute] = useState(null)

    async function verifyLogged() {
        /* ARRUMAR A CONEXÃO DA PLACA
        await db.execAsync(`DELETE FROM mqtt`)
        await db.execAsync(`INSERT INTO mqtt (id, name, username, senha, host, port) VALUES ("1", "Bruno", "brunolustosads@gmail.com", "12345678", "maqiatto.com", "8883")`)
        result = await db.getAllAsync(`SELECT * FROM mqtt`)
        console.log(result)*/
        result = await db.getAllAsync(`SELECT * FROM users WHERE logged = ${1}`)
        console.log(result[0])
        if (result[0] != undefined) {
            setMail(result[0].email)
            setName(result[0].name)
            setId(result[0].id)
            setLoggedIn(true)
            setRoute('TabRoutes')
        }
        else {
            setRoute(null)
        }
    }

    useEffect(() => {
        verifyLogged()
    }, [loggedIn]);
    
    return (
        <SafeAreaView style={styles.container_app}>
            <View style={styles.app__container_logo}>
                <Animatable.Image
                    animation={"flipInY"}
                    source={require('../../images/pngwing.png')}
                    style={{width: '70%'}}
                    resizeMode="contain"
                    tintColor={'#496b2e'}
                />
            </View>
            <Animatable.View delay={600} animation={"fadeInUp"} style={styles.app__main}>
                <Text style={styles.main__title}>Automatize, monitore e gerencie o seu cultivo de qualquer lugar!</Text>
                <Text style={styles.main__text}>Faça a conexão do sistema com o aplicativo.</Text>
                <TouchableOpacity style={styles.main__button} onPress={() => Navigation.navigate(route==null?'Login':'TabRoutes')}>
                    <Text style={styles.button_text}>Acessar</Text>
                </TouchableOpacity>
            </Animatable.View>
        </SafeAreaView>
    )
}