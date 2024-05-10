import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
  } from 'react-native';
import React, {useState} from 'react';
import JSONs from './Cities'
import styles from '../styles/style_home'
import * as Animatable from 'react-native-animatable'

export default function(props) {
    const cityNames = [
        "Almas",
        "Araguaçu",
        "Araguaína",
        "Araguatins",
        "Campos Lindos",
        "Colinas",
        "Dianópolis",
        "Formoso do Araguaia",
        "Gurupi",
        "Lagoa da Confusão",
        "Marianópolis",
        "Mateiros",
        "Palmas",
        "Paranã",
        "Pedro Afonso",
        "Peixe",
        "Pium",
        "Rio Sono",
        "Santa Fé do Araguaia",
        "Santa Rosa do Tocantins"
      ];
    const [clicked, setClicked] = useState(false);
    const data = JSONs
    const [selectedCity, setSelectedCity] = useState('Palmas');

    function setIsClicked(){
        clicked==true?setClicked(false):setClicked(true)
    }
    function setCity(data, city){
        setSelectedCity(city)
        props.setData(data)
        setClicked(false)
    }

    return (
        <View>
            <TouchableOpacity style={styles.dropdown__container} onPress={setIsClicked}>
                <Text style={styles.textDropdown}>{selectedCity}</Text>
                <Image source={require('../images/dropdown.png')} style={{width: 15, height: 15, tintColor: 'white'}}/>
            </TouchableOpacity>
            {clicked && 
            <Animatable.View style={styles.dropdown__area} animation={'fadeInUp'}>
                <FlatList
                    data={props.citiesList?props.citiesList:cityNames}
                    contentContainerStyle= {{alignItems: 'center'}}
                    renderItem={({item, index}) => {
                        return (
                        <TouchableOpacity onPress={props.citiesList?props.setCity(item):() => {setCity(data[index], item)}} style={styles.dropdownItem}>
                            <Text style={[styles.textDropdown, {textAlign: 'center'}]}>{item}</Text>
                        </TouchableOpacity>
                        )
                    }}
                />
            </Animatable.View>}
        </View>
    );
}