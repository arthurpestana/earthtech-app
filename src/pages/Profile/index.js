import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, Image, TouchableOpacity } from 'react-native'
import { useMQTT } from "../../components/Context";
import { useSQLiteContext } from "expo-sqlite/next";
import { useNavigation } from '@react-navigation/native'
import styles from '../../styles/style_profile'
import * as Animatable from 'react-native-animatable'
import { AntDesign, Entypo, Feather} from '@expo/vector-icons'
import ReturnPage from '../../components/ReturnPage';

export default function Profile() {
    const Navigation = useNavigation()
    const db = useSQLiteContext()
    const [mail, setMail] = useState('')
    const { userId, setId, userName, setName, loggedIn, setLoggedIn, client, setClient, isConnected, setConnected } = useMQTT()
    
    async function loginAccount(){
        element = await db.getAllAsync(`SELECT * FROM users WHERE id = ${userId}`)
        console.log(element[0])
        setMail(element[0].email)
    }

    async function LogoutAccount(){
        await db.execAsync(`UPDATE users SET logged = ${0} WHERE id = ${userId}`)
        setName('')
        setId('')
        setMail('')
        setConnected(false)
        setClient('')
        setLoggedIn(false)
        Navigation.navigate('Welcome')
    }


    useEffect(() => {
        loginAccount()
    }, [])

    return(
        <SafeAreaView style={styles.container__profile}>
            <ReturnPage nav={'StatusInformation'}/>
            <View style={styles.container__main}>
                <View style={styles.main__profile}>
                    <View style={styles.profile__image}>
                        <Feather name="user" size={50} color={"hsl(228, 8%, 98%)"} style={styles.logo_image}/>
                    </View>
                    <View style={styles.profile__info}>
                        <Text style={styles.profile_name}>{userName}</Text>
                        <Text style={styles.profile_email}>{mail}</Text>
                    </View>
                </View>
                <View style={styles.main__logout}>
                    <TouchableOpacity style={styles.logout__button} onPress={() => LogoutAccount()}>
                        <Text style={styles.logout__text}>Desconectar</Text>
                        <Feather name='log-out' size={18} color={'hsl(228, 8%, 98%)'}/>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}