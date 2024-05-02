import React, { useState } from 'react'
import { SafeAreaView, Text, View, TouchableOpacity, Animated, StyleSheet, Switch} from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { Feather } from "@expo/vector-icons"
import { Canvas, Rect } from "@shopify/react-native-skia"

export default function (props) {
    const [isEnabled, setIsEnabled] = useState(false)

    const altSwitch = (() => {
        setIsEnabled(!isEnabled)
        props.subscribe()
    })

    return (
        <SafeAreaView style={props.double?styles.dashboard__double:styles.dashboard__items}>
            {props.switch?<View style={styles.dashboard__switch}>
                <Text style={styles.switch__text}>ON/OFF</Text>
                <Switch
                    trackColor={{false: '#E94A35', true: '#37924e'}}
                    thumbColor={'#FFF'}
                    onValueChange={altSwitch}
                    value={isEnabled}
                    style={styles.box_switch}
                />
            </View>:false}
            <View style={[styles.dashboard__dados, props.double?{flexDirection: 'row'}:false]}>
                <View style={styles.item__div_logo}>
                    {!props.risk?<Feather name={props.typeIcon} size={35} color="hsl(228, 8%, 98%)"/>:
                    <AnimatedCircularProgress
                    size={125}
                    width={12}
                    fill={props.risk}
                    arcSweepAngle={225}
                    rotation={248}
                    tintColor="#ff0000"
                    tintColorSecondary="#00ff00"
                    backgroundColor="#ffffff30"
                    backgroundWidth={5}
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
                    {!props.risk?<Text style={[styles.item__text]}>Teste • Teste</Text>:
                    <View style={{}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Canvas style={{width: 10, height: 10, flexDirection: 'row'}}>
                                <Rect width={256} height={256} color="#00ff00" />
                            </Canvas>
                            <Text style={[styles.item__text, {marginLeft: 5}]}>Verde</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                            <Canvas style={{width: 10, height: 10}}>
                                <Rect width={256} height={256} color="orange" />
                            </Canvas>
                            <Text style={[styles.item__text, {marginLeft: 5}]}>Laranja</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                            <Canvas style={{width: 10, height: 10}}>
                                <Rect width={256} height={256} color="#ff0000" />
                            </Canvas>
                            <Text style={[styles.item__text, {marginLeft: 5}]}>Vermelho</Text>
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