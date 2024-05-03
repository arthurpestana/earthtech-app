import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, Image, TouchableOpacity } from 'react-native'
import { useMQTT } from "../../components/Context";
import { useSQLiteContext } from "expo-sqlite/next";
import { useNavigation } from '@react-navigation/native'
import styles from '../../styles/style_profile'
import * as Animatable from 'react-native-animatable'
import { AntDesign, Entypo, Feather} from '@expo/vector-icons'

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
            <View style={styles.container__header}>
                <View style={[styles.header__close_button]}>
                    <TouchableOpacity style={[styles.button]} onPress={() => Navigation.navigate('StatusInformation')}>
                        <AntDesign name='plus' size={24} color="hsl(228, 8%, 98%)" style={{transform: [{rotate: '45deg'}]}}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.container__main}>
                <View style={styles.main__profile}>
                    <View style={styles.profile__image}>
                        <View style={styles.logo_image}>
                            <Text style={styles.logo_text}>{userName[0]}</Text>
                        </View>
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