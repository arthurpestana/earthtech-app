import React from "react";
import { SafeAreaView, TouchableOpacity, View, Text, Image } from "react-native";

import styles from '../../styles/style_welcome'
import * as Animatable from 'react-native-animatable'

import { useNavigation } from "@react-navigation/native";

export default function Welcome() {

    const Navigation = useNavigation()

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
                <TouchableOpacity style={styles.main__button} onPress={() => Navigation.navigate('ConnectBoard')}>
                    <Text style={styles.button_text}>Acessar</Text>
                </TouchableOpacity>
            </Animatable.View>
        </SafeAreaView>
    )
}