import React, {useState} from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Animated} from 'react-native'
import { Feather } from "@expo/vector-icons"
import { AntDesign, Entypo} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import StatusInformation from './index';
import { RotateInDownLeft } from 'react-native-reanimated';
import MethodDropdown from '../../components/MethodDropdown';
import InputText from '../../components/InputText';
import styles from '../../styles/style__addtopic'
import * as Animatable from 'react-native-animatable'


export default function AddTopic() {

    const [title, setTitle] = useState('')
    const [topic, setTopic] = useState("")
    const Navigation = useNavigation()
    const [onFocusedInput, setFocusedInput] = useState(false)

    function customOnFocus() {
        setFocusedInput(true)
    }

    function customOnBlur() {
        if (title!="") {
            setFocusedInput(true)
        }
        else {
            setFocusedInput(false)
        }
    }

    return (
        <SafeAreaView style={styles.container__topic}>
            <View style={styles.container__header}>
                <View style={[styles.header__close_button]}>
                    <TouchableOpacity  onPress={() => Navigation.navigate('StatusInformation')}>
                        <Animated.View style={[styles.button]}>
                            <AntDesign name='plus' size={24} color="hsl(228, 8%, 98%)" style={{transform: [{rotate: '45deg'}]}}/>
                        </Animated.View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.container__main}>
                <Animatable.View animation={'fadeInLeft'} delay={500} style={styles.main__panel_title}>
                    <View style={{width: '40%'}}>
                        {onFocusedInput==false?<View style={onFocusedInput ? styles.form_box__textFocused : styles.form_box__text} >
                            <Text style={styles.form__text}>Sem Título</Text>
                        </View>:false}
                        <TextInput
                            style={styles.form__input}
                            placeholder=''
                            value={title}
                            onChangeText={setTitle}
                            keyboardType={'default'}
                            maxLength={20}
                            onPressIn={customOnFocus}
                            onBlur={customOnBlur}
                        />
                    </View>
                    <Feather name="edit" color={'hsl(228, 8%, 98%)'} size={24}/>
                </Animatable.View>
                <View style={styles.main__panel}>
                    <Text style={styles.panel__subtitle}>Método</Text>
                    <Text style={[styles.panel__text, {marginBottom: 20}]}>Escolha a função que você deseja adicionar.</Text> 
                    <MethodDropdown />
                </View>
                <View style={styles.main__panel}>
                    <Text style={styles.panel__subtitle}>Topic</Text>
                    <Text style={styles.panel__text}>Escreva o nome do topic cadastrado no seu MQTT Broker.</Text> 
                    <InputText addTopic iconName="key" delay={500} placeholder={!topic?"Topic":false} value={topic} onChangeText={setTopic}/>
                </View>
            </View>
            <View style={styles.container__footer}>
                <View style={[styles.container__button]}>
                    <TouchableOpacity style={styles.button_save}  onPress={() => Navigation.navigate('StatusInformation')}>
                        <Text style={styles.button_text}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}