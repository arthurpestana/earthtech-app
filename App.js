import React from "react";
import { SafeAreaView, TouchableOpacity, View, Text, Image } from "react-native";

import styles from './src/styles/style_app'
import * as Animatable from 'react-native-animatable'

export default class App extends React.Component {

    constructor (props) {
        super()
    }

    render() {
        return (
            <SafeAreaView style={styles.container_app}>
                <View style={styles.app__container_logo}>
                    <Animatable.Image
                        animation={"flipInY"}
                        source={require('./src/images/logo.png')}
                        style={{width: '150%'}}
                        resizeMode="contain"
                    />
                </View>
                <Animatable.View animation={"fadeInUp"} style={styles.app__main}>
                    <Text style={styles.main__title}>Automatize, monitore e gerencie o seu cultivo de qualquer lugar!</Text>
                    <Text style={styles.main__text}>Faça a conexão do sistema com o aplicativo.</Text>
                    <TouchableOpacity style={styles.main__button}>
                        <Text style={styles.button_text}>Acessar</Text>
                    </TouchableOpacity>
                </Animatable.View>
            </SafeAreaView>
        )
    }
}