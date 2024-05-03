import React, {useState} from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Animated} from 'react-native'
import { AntDesign, Entypo, Feather} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import MethodDropdown from '../../components/MethodDropdown';
import InputText from '../../components/InputText';
import styles from '../../styles/style_addtopic'
import * as Animatable from 'react-native-animatable'
import { useSQLiteContext } from 'expo-sqlite/next';
import { useMQTT } from '../../components/Context'


export default function AddTopic() {
    const db = useSQLiteContext()

    const [title, setTitle] = useState('')
    const [topic, setTopic] = useState("")
    const [type_method, setTypeMethod] = useState(0)
    const { setChangeStatus } = useMQTT()
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

    async function addDashboardDB() {
        //await db.execAsync(`DELETE FROM dashboard`)
        await db.execAsync(`INSERT INTO dashboard (type, topic, name) VALUES ("${type_method}", "${topic}", "${title}")`)
        setChangeStatus(true)
        console.log("Dashboard cadastrada")
    }
        
    function saveDashboardConfig(){
        if (title=="" || topic=="") {
            return console.log("Preencha todos os campos!")
        }
        addDashboardDB()
        Navigation.navigate('StatusInformation')
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
                    <MethodDropdown typeMethod={setTypeMethod}/>
                </View>
                <View style={styles.main__panel}>
                    <Text style={styles.panel__subtitle}>Topic</Text>
                    <Text style={styles.panel__text}>Escreva o nome do topic cadastrado no seu MQTT Broker.</Text> 
                    <InputText addTopic iconName="key" delay={500} placeholder={!topic?"Topic":false} value={topic} onChangeText={setTopic}/>
                </View>
            </View>
            <View style={styles.container__footer}>
                <View style={[styles.container__button]}>
                    <TouchableOpacity style={styles.button_save}  onPress={saveDashboardConfig}>
                        <Text style={styles.button_text}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}