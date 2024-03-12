import React from 'react'
import {} from 'react-native'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native-safe-area-context'

import * as Animatable from 'react-native-animatable'
import styles from '../../styles/style_connect'

export default function Connect() {
    return (
        <SafeAreaView style={styles.container_connect}>
            <Animatable.View animation={'fadeInLeft'} delay={500} style={styles.container__header}>
                <Text style={styles.header__title}>Bem-vindo(a)</Text>
            </Animatable.View>
            <Animatable.View animation={'fadeInUp'} style={styles.container__form}>
                <View style={[styles.forms, styles.form_1]}>
                    <Text style={styles.form__text}></Text>
                    <TextInput 
                        style={styles.form__input}
                        placeholder=''
                    />
                </View>
                <View style={[styles.forms, styles.form_1]}>
                    <Text style={styles.form__text}></Text>
                    <TextInput 
                        style={styles.form__input}
                        placeholder=''
                    />
                </View>
                <TouchableOpacity>
                    <Text></Text>
                </TouchableOpacity>
                
            </Animatable.View>
        </SafeAreaView>
    )
}