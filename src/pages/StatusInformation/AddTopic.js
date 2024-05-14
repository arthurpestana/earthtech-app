import React, {useState} from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Animated, KeyboardAvoidingView, Platform} from 'react-native'
import { AntDesign, Entypo, Feather} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import MethodDropdown from '../../components/MethodDropdown';
import InputText from '../../components/InputText';
import ReturnPage from '../../components/ReturnPage';
import styles from '../../styles/style_addtopic'
import * as Animatable from 'react-native-animatable'
import { useSQLiteContext } from 'expo-sqlite/next';
import { useMQTT } from '../../components/Context'
import { style } from 'd3';


export default function AddTopic(props) {
    const db = useSQLiteContext()
    const methods_list = ['Risco', 'Umidade do Ambiente', 'Irrigação Automática', 'Ligar Irrigador', 'Temperatura do Ambiente']
    const [title, setTitle] = useState(props.route.params && props.route.params.name?props.route.params.name:'')
    const [topic, setTopic] = useState(props.route.params && props.route.params.topic?props.route.params.topic:'')
    const [type_method, setTypeMethod] = useState(props.route.params && props.route.params.type?props.route.params.type:0)
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
    
    async function editDashboardDB() {
        //await db.execAsync(`DELETE FROM dashboard`)
        await db.execAsync(`UPDATE dashboard SET name = "${title}", topic = "${topic}", type = "${type_method}" WHERE id = ${props.route.params.id}`)
        setChangeStatus(true)
        console.log("Dashboard atualizada")
    }
        
    function saveDashboardConfig(){
        if (title=="" || topic=="") {
            return console.log("Preencha todos os campos!")
        }
        if(props.route.params && props.route.params.edit){
            editDashboardDB()
        }else{
            addDashboardDB()
        }
        Navigation.navigate('StatusInformation')
    }

    return (
        <SafeAreaView style={styles.container__topic}>
            <ReturnPage nav={'StatusInformation'}/>
            <KeyboardAvoidingView behavior={Platform.OS == 'ios'?'padding':'height'}>
                <View style={styles.container__main}>
                    <Animatable.View animation={'fadeInLeft'} delay={500} style={styles.main__panel_title}>
                        <View style={{width: '40%'}}>
                            {onFocusedInput==false?<View style={onFocusedInput ? styles.form_box__textFocused : styles.form_box__text} >
                                <Text style={styles.form__text}>{title==''?'Sem Título':false}</Text>
                            </View>:false}
                            <TextInput
                                style={styles.form__input}
                                placeholder=''
                                value={title}
                                onChangeText={setTitle}
                                keyboardType={'default'}
                                maxLength={15}
                                onPressIn={customOnFocus}
                                onBlur={customOnBlur}
                            />
                        </View>
                        <Feather name="edit" color={'hsl(228, 8%, 98%)'} size={24}/>
                    </Animatable.View>
                    <View style={styles.main__panel}>
                        <Text style={styles.panel__subtitle}>Método</Text>
                        <Text style={[styles.panel__text, {marginBottom: 20}]}>Escolha a função que você deseja adicionar.</Text> 
                        <MethodDropdown addTopicDropdown typeMethod={setTypeMethod} methods_list={methods_list}/>
                    </View>
                    <View style={styles.main__panel}>
                        <Text style={styles.panel__subtitle}>Topic</Text>
                        <Text style={styles.panel__text}>Escreva o nome do topic cadastrado no seu MQTT Broker.</Text> 
                        <InputText addTopic iconName="key" delay={500} placeholder={!topic?"Topic":false} value={topic} onChangeText={setTopic}/>
                    </View>
                </View>
            </KeyboardAvoidingView>
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