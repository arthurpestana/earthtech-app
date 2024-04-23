import React, {useState} from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Animated} from 'react-native'
import InputText from '../../components/InputText';
import { Feather } from "@expo/vector-icons"
import { AntDesign, Entypo} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import StatusInformation from './index';
import { RotateInDownLeft } from 'react-native-reanimated';


export default function AddTopic() {

    const [title, setTitle] = useState('')
    const Navigation = useNavigation()

    return (
        <SafeAreaView style={styles.container__topic}>
            <View style={styles.container__header}>
                <View style={[styles.header__close_button]}>
                    <TouchableOpacity  onPress={() => Navigation.navigate('StatusInformation')}>
                        <Animated.View style={[styles.button]}>
                            <AntDesign name='plus' size={24} color="#000" style={{transform: [{rotate: '45deg'}]}}/>
                        </Animated.View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.container__main}>
                <View style={styles.main__panel_title}>
                    <TextInput 
                        style={styles.form__input}
                        placeholder='Sem Título'
                        value={title}
                        onChangeText={setTitle}
                    />
                    <Feather name="edit" color={'#000'} size={24}/>
                </View>
                <View style={styles.main__panel}>
                    <Text style={styles.subtitle}>Método</Text>
                    <View style={styles.panel}>
                        <Text>Escolha o tipo de método a ser adicionado</Text> 
                        <TouchableOpacity style={styles.panel__select}>
                            <AntDesign name='plus' size={18} color="#000"/>
                            <Text>Adicionar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.main__panel}>
                    <Text style={styles.subtitle}>Funções</Text>
                    <View style={styles.panel}>
                        <Text>Escolha o tipo de função a ser adicionada</Text> 
                        <TouchableOpacity style={styles.panel__select}>
                            <AntDesign name='plus' size={18} color="#000"/>
                            <Text>Adicionar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.container__footer}>
                <View style={[styles.container__button]}>
                    <TouchableOpacity  onPress={() => Navigation.navigate('StatusInformation')}>
                        <Text>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container__topic: {
        flex: 1,
        width: "100%",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        position: 'relative',
        backgroundColor: "#FFF"
    },

    container__header: {
        position: 'absolute',
        top: 40,
        backgroundColor: '#FFF',
        paddingHorizontal: 25,
    },

    container__main: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column',
        marginHorizontal: 30,
    },

    main__panel_title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
        marginVertical: 20
    },

    main__panel: {
        marginBottom: 20,
    },

    panel: {
        marginVertical: 10,
    },

    form__input: {
        fontSize: 20
    },

    subtitle: {
        fontSize: 16,
        fontWeight: "bold"
    },

    panel__select: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        gap: 10,
        borderWidth: 1,
        width: 100,
        marginVertical: 10,
    },

    container__footer: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: '#FFF',
        paddingHorizontal: 25,
    },

    panel_dados__select: {

    },
})