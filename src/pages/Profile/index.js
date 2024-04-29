import React from 'react'
import { SafeAreaView, View, Text, Image, TouchableOpacity } from 'react-native'

export default function Profile() {
    return(
        <SafeAreaView>
            <View>
                <View>
                    <TouchableOpacity  onPress={() => {}}>
                        <Animated.View>
                            <AntDesign name='plus' size={24} color="#000" style={{transform: [{rotate: '45deg'}]}}/>
                        </Animated.View>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <View>
                    <View>
                        <Image></Image>
                    </View>
                    <View>
                        <Text></Text>
                        <Text></Text>
                    </View>
                </View>
                <View>
                    <TouchableOpacity>
                        x
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}