import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, Text, FlatList, Image } from 'react-native'
import { useSQLiteContext } from 'expo-sqlite/next'
import * as Animatable from 'react-native-animatable'
import init from 'react_native_mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles/style_home'
import * as Location from 'expo-location';
import { useMQTT } from '../../components/Context'
import axios from 'axios'
import NextWeather from '../../components/NextWeather'
import HomeChart from '../../components/HomeChart'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
 
export default function Home() {
    const db = useSQLiteContext()
    const [location, setLocation] = useState('');
    const [weather, setWeather] = useState('')
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fromBd, setFromBd] = useState(false)

    const { setLatitude, setLongitude, userName, setClient, setConnected, setNome, setUsernameMQTT, setSenha, setHost, setPort } = useMQTT()

    init({
        size: 10000,
        storageBackend: AsyncStorage,
        defaultExpires: 1000 * 3600 * 24,
        enableCache: true,
        reconnect: true,
        sync : {
        }
    });

    function onSuccess(){
        setConnected(true)
        console.log("Conexão realizada")
    }

    function onConnectionLost(){
        setConnected(false)
        console.log("A conexão não foi realizada. Dados incorretos")
    }

    async function setDataBd(results){
        setNome(results.name)
        setUsernameMQTT(results.username)
        setSenha(results.senha)
        setHost(results.host)
        setPort(results.port)
        setFromBd(true)
    }
    
    async function getData(){
        result = await db.getAllAsync(`SELECT * FROM mqtt`)
        console.log(result)
        if (result.length != 0) {
            setDataBd(result[0])
            const mqttClient = new Paho.MQTT.Client(result[0].host, parseInt(result[0].port), result[0].name);
            mqttClient.onConnectionLost = onConnectionLost;
            mqttClient.connect({ userName: result[0].username, password: result[0].senha, onSuccess: onSuccess, useSSL: false });
            setClient(mqttClient);
            dados_banco = true
            }
        else {
            return console.log("Sem conexões registradas")
        }
    }

    const fetchWeather = async (url) => {
        const results = await fetch(url)
        const data = await results.json()
        setWeather(data)
        console.log(JSON.stringify(data, null, 2))
    }
    useEffect(() => {
        getData()
    }, [db])
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
                        case "Rain":
                            weatherImage = require("../../images/moderaterain.png");
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
                <Animatable.View animation={'fadeInLeft'} delay={400} style={styles.container__header}>
                    <Text style={styles.header__title}>Bem-vindo(a) {userName}</Text>
                    <View style={styles.connection__box}>
                        <Text style={styles.header__text}>Gerencie sua plantação!</Text>
                    </View> 
                </Animatable.View>
                <Animatable.View animation={'fadeInLeft'} delay={400} style={styles.container__weather}>
                    <View style={{flexDirection:'row', justifyContent: 'space-evenly'}}>
                        <View style={{flexDirection:'row'}}>
                            {data.length > 0?
                            <Image source={data[0].clouds} style={{width: 60, height: 'auto' }}/>:
                            false}
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
                        ? <Text style={{color: '#FFF', fontFamily: 'Montserrat_700Bold',}}>Aguardando dados...</Text> : error ? (
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
                <Animatable.View style={styles.container__graphic} animation={"fadeInLeft"}>
                    <HomeChart/>
                </Animatable.View>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}
