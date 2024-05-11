import React, { useEffect, useState } from "react";
import {SafeAreaView, View, TouchableOpacity, Text, StyleSheet, FlatList, ScrollView} from 'react-native'

import { Feather } from "@expo/vector-icons"
import * as Animatable from 'react-native-animatable'

export default function MethodDropdown(props) {
    const [clicked, setIsClicked] = useState(false);
    const [selectedOption, setSelectedOption] = useState(props.methods_list[0])

    useEffect(() => {
        setSelectedOption(props.methods_list[0])
        if(props.table){
            props.typeMethod(props.methods_list[0])
        }
    }, [props.methods_list])

    function isClicked(){
        clicked==true?setIsClicked(false):setIsClicked(true)
    }

    function setOption(option, index){
        setSelectedOption(option)
        setIsClicked(false)
        console.log(index)
        if(props.table){
            props.resetData([])
            props.typeMethod(option)
        }else{
            props.typeMethod(index)
        }       
    }

    return (
        <Animatable.View delay={500} animation={'fadeInLeft'} style={{display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1000, width: '100%'}}>
            <TouchableOpacity style={styles.dropdown__container} onPress={isClicked}>
                <Text style={styles.textDropdown}>{selectedOption}</Text>
                <Feather name="chevron-down" size={30} color={"hsl(228, 8%, 98%)"} style={clicked?{transform: [{rotate: '180deg'}]}:null}/>
            </TouchableOpacity>
            {clicked?
            <Animatable.View style={[styles.dropdown__area, props.dropdownRisk?styles.dropdown__area_risks:null]} animation={'fadeInUp'}>
                <FlatList
                    style={styles.dropdown__flatlist}
                    data={props.methods_list}
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
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        marginTop: -15,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        width: "100%",
    },

    /*dropdown__area_risks: {
        position: 'absolute',
        top: '130%',
        backgroundColor: 'hsl(228, 6%, 12%)',
        height: 250,
        borderBottomLeftRadius: 10,
    },*/

    dropdown__flatlist: {
        width: '100%',
        display: 'flex',
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