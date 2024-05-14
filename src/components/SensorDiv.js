import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, View, StyleSheet, Switch, Platform} from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { Feather } from "@expo/vector-icons"
import { Canvas, Rect } from "@shopify/react-native-skia"
import { useMQTT } from './Context'

export default function (props) {
    const [isEnabled, setIsEnabled] = useState(false)
    const { client, userNameMQTT } = useMQTT()
    const [subscribed, setSubscribed] = useState(false);
    const [messagePayload, setMessagePayload] = useState(null)
    const [data, setData] = useState(0)

    const publishMsg = (messagePayload) => {
        try {
            var message = new Paho.MQTT.Message(messagePayload)
            message.destinationName = `${userNameMQTT}/${props.topic}` 
            client.send(message)
        }catch(err){
            console.log(err)
        }

    }   
    const altSwitch = () => {
        if(props.type == 2 && isEnabled == true){
            props.setChange(true)
        }else{
        let msg
        setIsEnabled(!isEnabled)
        isEnabled==true?msg='1':msg='0'        
        publishMsg(msg)
        }
    }
    
    const subscribeToTopic = () => {
        try{
            console.log('Subscrevendo no tópico...');
            client.subscribe(`${userNameMQTT}/${props.topic}`, { qos: 0 });
            setSubscribed(true);
        }catch(err){
            props.catchErr(err)
        }  
    };

    useEffect(() => {
        subscribeToTopic()
    }, [])

    useEffect(() => {
        if(props.data!=null){
            if(props.data.destinationName == `${userNameMQTT}/${props.topic}`){
                setData(props.data.payloadString)
                console.log(props.data.payloadString)
        }}
    }, [props.data])

    useEffect(() => {
        if(props.confirmation == true){
            let msg
            setIsEnabled(!isEnabled)
            isEnabled==true?msg='1':msg='0'        
            publishMsg(msg)
        }
    }, [props.confirmation])

    return (
        <SafeAreaView style={props.type==0?styles.dashboard__double:styles.dashboard__items}>
            {props.switch?<View style={styles.dashboard__switch}>
                <Text style={styles.switch__text}>ON/OFF</Text>
                <Switch
                    trackColor={{false: '#E94A35', true: '#37924e'}}
                    thumbColor={'#FFF'}
                    onValueChange={altSwitch}
                    value={isEnabled}
                    style={[styles.box_switch, Platform.OS=="ios"?{marginHorizontal: 5, marginVertical: 5}:false]}
                />
            </View>:false}
            <View style={[styles.dashboard__dados, props.type==0?{flexDirection: 'row'}:false]}>
                <View style={styles.item__div_logo}>
                    {props.type!=0?<Feather name={props.typeIcon} size={35} color="hsl(228, 8%, 98%)"/>:
                    <AnimatedCircularProgress
                    size={125}
                    width={12}
                    fill={data?parseInt(data):0}
                    arcSweepAngle={225}
                    rotation={248}
                    tintColor="#ff0000"
                    tintColorSecondary="#00ff00"
                    backgroundColor="#ffffff30"
                    backgroundWidth={5}
                    ref={null}
                    lineCap='round'
                    style= {{marginTop: 40, marginRight: 25}}>
                    {
                      (fill) => (
                        <Text style={[styles.item__title, {marginBottom: 20}]}>
                          { fill }%
                        </Text>
                      )
                    }
                  </AnimatedCircularProgress>}
                </View>
                <View style={styles.item__div_info}>
                    <Text style={styles.item__title}>{props.title}</Text>
                    {props.type!=0?<Text style={[styles.item__title, props.type==4?{color: "orange"}:false]}>{props.type==1||props.type==4?props.type==4?data+"ºC":data+"%":props.subscribeInfo}</Text>:  
                    <View style={{}}>
                        <Text style={[styles.item__text, {marginBottom: 7, fontFamily: 'Montserrat_700Bold', alignSelf: 'center'}]}>Umidade</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Canvas style={{width: 10, height: 10, flexDirection: 'row'}}>
                                <Rect width={256} height={256} color="#00ff00" />
                            </Canvas>
                            <Text style={[styles.item__text, {marginLeft: 5}]}>51 a 100%</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                            <Canvas style={{width: 10, height: 10}}>
                                <Rect width={256} height={256} color="orange" />
                            </Canvas>
                            <Text style={[styles.item__text, {marginLeft: 5}]}>31 a 50%</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                            <Canvas style={{width: 10, height: 10}}>
                                <Rect width={256} height={256} color="#ff0000" />
                            </Canvas>
                            <Text style={[styles.item__text, {marginLeft: 5}]}>0 a 30%</Text>
                        </View>
                    </View>
                    }
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    dashboard__items: {
        width: 150,
        height: 150,
        backgroundColor: "hsl(228, 6%, 12%)",
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,
        borderRadius: 25,
    },

    dashboard__double: {
        width: '100%',
        height: 150,
        backgroundColor: "hsl(228, 6%, 12%)",
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,
        borderRadius: 25,
    },

    dashboard__switch: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },

    switch__text: {
        fontFamily: 'Montserrat_600SemiBold',
        color: 'hsl(228, 8%, 70%)',
    },

    dashboard__dados: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 10
    },

    item__div_logo: {
        marginBottom: 5
    },

    item__div_info: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 5
    },

    item__title: {
        fontFamily: 'Montserrat_700Bold',
        color: 'hsl(228, 8%, 98%)',
        fontSize: 14
    },

    item__text: {
        fontFamily: 'Montserrat_400Regular',
        color: 'hsl(228, 8%, 98%)',
        fontSize: 12
    },
})