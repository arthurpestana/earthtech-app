import React, { useState } from "react";
import {SafeAreaView, View, TouchableOpacity, Text, StyleSheet, FlatList,} from 'react-native'

import { Feather } from "@expo/vector-icons"
import * as Animatable from 'react-native-animatable'

export default function MethodDropdown(props) {
    const methods_list = ['Risco', 'Umidade', 'Irrigação Automática', 'Ligar Irrigador', 'Temperatura do Ambiente']
    const [clicked, setIsClicked] = useState(false);
    const [selectedOption, setSelectedOption] = useState(methods_list[0])

    function isClicked(){
        clicked==true?setIsClicked(false):setIsClicked(true)
    }

    function setOption(option, index){
        setSelectedOption(option)
        setIsClicked(false)
        console.log(index)
        props.typeMethod(index)
    }

    return (
        <Animatable.View delay={500} animation={'fadeInLeft'}>
            <TouchableOpacity style={styles.dropdown__container} onPress={isClicked}>
                <Text style={styles.textDropdown}>{selectedOption}</Text>
                <Feather name="chevron-down" size={30} color={"hsl(228, 8%, 98%)"}/>
            </TouchableOpacity>
            {clicked?
            <Animatable.View style={styles.dropdown__area} animation={'fadeInUp'}>
                <FlatList
                    style={styles.dropdown__flatlist}
                    data={methods_list}
                    renderItem={({item, index}) => {
                        return (
                            <TouchableOpacity onPress={() => {setOption(item, index)}} style={styles.dropdownItem}>
                                <Text style={[styles.textDropdown_area]}>{item}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </Animatable.View>:false}
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    dropdown__container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: "100%",
        backgroundColor: 'hsl(228, 6%, 4%)',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10
    },

    textDropdown: {
        fontFamily: 'Montserrat_400Regular',
        color: 'hsl(228, 8%, 98%)',
        fontSize: 15,
    },

    dropdown__area: {
        backgroundColor: 'hsl(228, 6%, 4%)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        marginTop: -15,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        width: "100%"
    },

    dropdown__flatlist: {
        width: '100%'
    },

    dropdownItem: {
        marginBottom: 15,
    },

    textDropdown_area: {
        fontFamily: 'Montserrat_400Regular',
        color: 'hsl(228, 8%, 70%)',
        fontSize: 14,
    },  
})
