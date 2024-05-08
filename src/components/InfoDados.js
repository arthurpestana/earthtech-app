import React, {useState} from "react";
import {Text, View, Image, StyleSheet, TouchableOpacity, ScrollView, FlatList} from 'react-native'
import { Feather, MaterialIcons } from '@expo/vector-icons'

export default (props) => {
    const [viewMore, setViewMore] = useState(false)

    const dataImages = ['../images/soja.jpg', '../images/soja.jpg']

    const viewMoreFunction = () => {
        if (viewMore==false) {
            setViewMore(true)
        }
        else {
            setViewMore(false)
        }
    }

    return (
        <View style={[styles.info, styles.shadowProp]}>
            <View style={styles.info__header}>
                <Text style={styles.info__title}>{props.title}</Text>
                <TouchableOpacity style={styles.info__more} onPress={viewMoreFunction}>
                    {viewMore==false?<Feather name="chevron-down" color={'hsl(228, 8%, 98%)'} size={24}/>:<Feather name="chevron-down" color={'hsl(228, 8%, 98%)'} size={24} style={{transform: [{rotate: '180deg'}]}}/>}
                </TouchableOpacity>
            </View>
            {(viewMore==true && props.detail)?<View style={styles.info__dados}>
                <Text style={styles.info__text}>Ano da Safra:</Text>
                <Text style={styles.info__text}>Município:</Text>
                <Text style={styles.info__text}>Microrregião:</Text>
            </View>:null}
            {(viewMore==true && props.desc)?<View style={styles.info__dados}>
                <Text style={styles.info__text}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
            </View>:null}
            {(viewMore==true && props.images)?<View style={styles.info__dados}>
                <View style={styles.info__galeria}>
                    <Image resizeMode={'cover'} source={require('../images/soja.jpg')} style={{width: '100%', height: 200, borderRadius: 15}}/>
                </View>
            </View>:null}
            {(viewMore==true && props.typeSolo)?<View style={styles.info__dados}>
                <Text style={styles.info__text}>Solo:</Text>
            </View>:null}
        </View>
    )
}

/**<View style={styles.info__desc}>
                <Text style={styles.info__text}>Descrição da Cultura</Text>
            </View>
            <View style={styles.info__galeria}>
                <Text>Galeria de Fotos</Text>
                <View style={styles.view_images}>
                    <Image />
                </View>
            </View> */

const styles = StyleSheet.create({
    info: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: 'hsl(228, 6%, 4%)',
        gap: 15,
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 10
    },

    shadowProp: {
        shadowColor: '#0000003f',
        shadowOffset: {width: 5, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 10
    },

    info__header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    info__title: {
        fontFamily: 'Montserrat_600SemiBold',
        color: 'hsl(228, 8%, 98%)',
        fontSize: 17
    },

    info__dados: {
        paddingHorizontal: 10,
        gap: 10
    },

    info__text: {
        fontFamily: 'Montserrat_400Regular',
        color: 'hsl(228, 8%, 70%)',
        fontSize: 13,
        textAlign: 'justify'
    },

    info__galeria: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'nowrap',
        gap: 20,
        marginVertical: 10,
    },
})