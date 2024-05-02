import * as React from 'react';
import { View, Text, Dimensions } from 'react-native';
import styles from '../styles/style_home'
import {Canvas, Path, Skia} from '@shopify/react-native-skia';
import {curveBasis, line, scaleLinear, scalePoint} from 'd3';
import JSONs from './Cities'
import Palmas from '../../assets/json/Palmas.json'
import Gradient from './Gradient'
import XAxisText from './XAxisText';
import { clamp, runOnJS, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import Cursor from './Cursor'
import {
    Gesture,
    GestureDetector,
  } from 'react-native-gesture-handler';
import {getYForX, parse} from 'react-native-redash';
import CitiesDropdown from './CitiesDropdown';



export default function () {
    const [showCursor, setShowCursor] = React.useState(false)
    const [selectedDate, setSelectedDate] = React.useState(null)
    const [selectedIndex, setSelectedIndex] = React.useState(null)
    const [data, setData] = React.useState(Palmas)
    const [floatingContainerWidth, setFloatingContainerWidth] = React.useState(0)
    const [floatingContainerHeight, setFloatingContainerHeight] = React.useState(0)
    const animationLine = useSharedValue(0)
    const animationGradient = useSharedValue({x: 0, y: 0})
    const cx = useSharedValue(0)
    const cy = useSharedValue(0)

    React.useEffect(() => {
        animationLine.value = withTiming(1, {duration:2000})
        animationGradient.value = withDelay(2000, withTiming({x: 0, y: chartHeight}, {duration: 1000}))
    }, [])

    const chartHeight = 150
    const chartWidth = Dimensions.get('window').width
    const chartMargin = 20

    const xDomain = data.map((dataPoint) => dataPoint.Data)
    const xRange = [chartMargin, chartWidth - chartMargin]
    const x = scalePoint().domain(xDomain).range(xRange).padding(0)
    const stepX = x.step()
    const max = Math.max(...data.map(val => val.Precipitacao))
    const min = Math.min(...data.map(val => val.Precipitacao))

    const yDomain = [min, max]
    const yRange = [chartHeight, 0]
    const y = scaleLinear().domain(yDomain).range(yRange)

    const curvedLine = line()
    .x(d => x(d.Data))
    .y(d => y(d.Precipitacao))
    .curve(curveBasis)(data)

    const linePath = Skia.Path.MakeFromSVGString(curvedLine)
    const path = parse(linePath.toSVGString())
    let timeoutId

    function handleGestureEvent(e){    
        const index = Math.floor(e.absoluteX / stepX)
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            runOnJS(setSelectedDate)(index>=0&&index<=data.length-1
                ?data[index].Data.split('-')[0]+'/'+data[index].Data.split('-')[1]
                :index<0
                    ?data[0].Data.split('-')[0]+'/'+data[0].Data.split('-')[1]
                    :data[data.length-1].Data.split('-')[0]+'/'+data[data.length-1].Data.split('-')[1]);
            runOnJS(setSelectedIndex)(index>=0&&index<=data.length-1?data[index].Precipitacao:index<0?data[0].data:data[data.length-1].Precipitacao)
        }, 50);
        const clampValue = clamp(
            Math.floor(e.absoluteX / stepX) * stepX + chartMargin,
            chartMargin,
            chartWidth - chartMargin,
        )
        cx.value = clampValue
        cy.value = getYForX(path, Math.floor(clampValue))
    }
    const pan = Gesture.Pan()
        .runOnJS(true)
        .onTouchesDown(() => {
            setShowCursor(true)
        })
        .onTouchesUp(() => {
            setShowCursor(false)
        })
        .onBegin(handleGestureEvent)
        .onChange(handleGestureEvent)

    function isCursorTooFarRight() {
        return Dimensions.get('window').width - cx.value < floatingContainerWidth;
    }
    function isCursorCenter(){
        return cx.value > Dimensions.get('window').width/4 && cx.value < (Dimensions.get('window').width/4)*3
    }
    return (
    <View>
        <CitiesDropdown 
            setData = {setData}
        />
        {showCursor && 
        <View style={[styles.floating__container, 
            {left: isCursorTooFarRight() && !isCursorCenter() ? cx.value - floatingContainerWidth - 10 : isCursorCenter()?cx.value - floatingContainerWidth/2:cx.value + 10, 
            top: cy.value - 30,
            }]}
            onLayout={(event) => {
                const { width, height } = event.nativeEvent.layout;
                setFloatingContainerWidth(width);
                setFloatingContainerHeight(height);
        }}>
            <Text style={{fontSize: 16, fontFamily: 'Montserrat_400Regular', color: '#FFF'}}>Data: {selectedDate}</Text>
            <Text style={{fontSize: 16, fontFamily: 'Montserrat_400Regular', color: '#FFF', }}>Precipitação (mm): {selectedIndex}</Text>
        </View>}

        <GestureDetector gesture={pan}>
            <Canvas
            style={{
                width: chartWidth, 
                height: chartHeight+30,
            }}>
                <Path 
                path={linePath} 
                style={'stroke'} 
                strokeWidth={2} 
                color={'#0bb861'} 
                strokeCap={'round'}
                start={0}
                end={animationLine}/>
                <Gradient
                    chartHeight = {chartHeight}
                    chartMargin = {chartMargin}
                    chartWidth = {chartWidth}
                    curvedLine = {curvedLine}
                    animationGradient = {animationGradient}
                />
                {data.map((dataPoint, index) => (
                    <XAxisText
                        x={x(dataPoint.Data)}
                        y={chartHeight}
                        text={dataPoint.Data}
                        key={index}
                    />
                ))}
                {showCursor && 
                <Cursor 
                    cx = {cx}
                    cy = {cy}
                    chartHeight = {chartHeight}
                />}
                
            </Canvas>
        </GestureDetector>
    </View>
    );
}