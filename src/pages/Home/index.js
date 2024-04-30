import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, Image } from 'react-native'
import { useSQLiteContext } from 'expo-sqlite/next'
import * as Animatable from 'react-native-animatable'
import styles from '../../styles/style_home'
import { Ionicons } from "@expo/vector-icons"
import * as Location from 'expo-location';
import { useMQTT } from '../../components/Context'
import axios from 'axios'
import NextWeather from '../../components/NextWeather'
import HomeChart from '../../components/HomeChart'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function Connect() {
    const db = useSQLiteContext()
    const [location, setLocation] = useState('');
    const [weather, setWeather] = useState('')
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const { latitude, setLatitude, longitude, setLongitude } = useMQTT()

    const fetchWeather = async (url) => {
        const results = await fetch(url)
        const data = await results.json()
        setWeather(data)
        console.log(JSON.stringify(data, null, 2))
    }

    useEffect(() => {
        (async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setError('Permissão negada');
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords);
            let latitude = location.coords.latitude
            let longitude = location.coords.longitude
            setLatitude(location.coords.latitude)
            setLongitude(location.coords.longitude)
            console.log(latitude, longitude)
            const options = {
                method: 'GET',
                url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',
                params: {
                aggregateHours: '24',
                location: `${latitude},${longitude}`,
                unitGroup: 'uk',
                shortColumnNames: '0'
                },
                headers: {
                'X-RapidAPI-Key': '',
                'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
                }
            };
            let response = await axios.request(options);
            let lines = response.data.split('\n')
            const newData = [];
                for (let i = 1; i < lines.length - 1; i++) {
                    const columns = lines[i].split(',');
                    let newDate = columns[2].replaceAll('"', '')
                    let cloudImage = columns[24]
                    cloudImage = cloudImage.replaceAll('"', '')
                    let weatherImage
                    
                    switch (cloudImage) {
                        case "Clear":
                            weatherImage = require("../../images/sun.png");
                            break;
                        case "Partially cloudy":
                            weatherImage = require("../../images/partlycloudy.png");
                            break;
                        case "Overcast":
                            weatherImage = require("../../images/cloud.png");
                            break;
                        case "Heavy rain":
                            weatherImage = require("../../images/heavyrain.png");
                            break;
                        default:
                            weatherImage = require("../../images/mist.png");
                            break;
                    }
                    newData.push({
                        temps: parseFloat(columns[12]),
                        precip: parseFloat(columns[16]),
                        umid: parseFloat(columns[21]),
                        wind: parseFloat(columns[13]),
                        clouds: weatherImage,     
                        dates: newDate,
                        minTemps:columns[10],
                        maxTemps:columns[11],
                        id: i
                    });
                }
                setData(newData);
                setIsLoading(false);
                
        } catch (error) {
            setError(error);
            console.log(error)
        }
        })();
    }, []);
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <SafeAreaView style={styles.container_home}>
                <Image blurRadius={90} source={require("../../images/bg.png")} style={{width: "100%", height: "100%", position: "absolute"}}/>
                <Animatable.View animation={'fadeInLeft'} delay={400} style={styles.container__header}>
                    <Text style={styles.header__title}>Bem-vindo(a)</Text>
                    <View style={styles.connection__box}>
                        <Text style={styles.header__text}>Gerencie sua plantação!</Text>
                    </View> 
                </Animatable.View>
                <Animatable.View animation={'fadeInLeft'} delay={400} style={styles.container__weather}>
                    <View style={{flexDirection:'row', justifyContent: 'space-evenly'}}>
                        <View style={{flexDirection:'row'}}>
                            <Image source={data.length > 0 ? data[0].clouds : '-'} style={{width: 60, height: 'auto' }}/>
                            <Text style={styles.container__title}>{data.length > 0 ? data[0].temps : '-'}</Text>
                            <Text style={styles.weather__celsius}>ºC</Text>
                        </View>
                        <View style={styles.weather__details}>
                            <Text style={styles.details_text}>Chuva: {data.length > 0 ? data[0].precip : '-'}% </Text>
                            <Text style={styles.details_text}>Umidade: {data.length > 0 ? data[0].umid : '-'}%</Text>
                            <Text style={styles.details_text}>Vento: {data.length > 0 ? data[0].wind : '-'} km/h</Text>
                        </View>
                    </View>
                    <View style={styles.next__container}>
                        {isLoading 
                        ? <Text style={{color: '#FFF'}}>Aguardando dados...</Text> : error ? (
                            <Text style={{color: '#FFF'}}>Ocorreu um erro: {error.message}</Text>
                        ): (
                            <FlatList
                                data={data}
                                renderItem={({ item }) => (
                                    <NextWeather
                                        minTemp={item.minTemps}
                                        maxTemp={item.maxTemps}
                                        date={item.dates}
                                        clouds={item.clouds}
                                        id={item.id}
                                    />
                                )}
                                horizontal
                                contentContainerStyle={{ columnGap: 20 }}
                            />
                        )}                    
                    </View>
                </Animatable.View>
                <HomeChart/>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}
