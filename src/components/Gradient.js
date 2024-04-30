import * as React from 'react';
import { View, Text, Dimensions } from 'react-native';
import {LinearGradient, Path, Skia} from '@shopify/react-native-skia';

export default function(props) {
    const getGradient = () => {
        const gradientAreaSplit = Skia.Path.MakeFromSVGString(props.curvedLine, props.chartWidth, props.chartHeight)
        if(gradientAreaSplit){
            gradientAreaSplit
            .lineTo(props.chartWidth - props.chartMargin, props.chartHeight)
            .lineTo(props.chartMargin, props.chartHeight)
            .lineTo(props.chartMargin, gradientAreaSplit.getPoint(0).y)
        }
        return gradientAreaSplit
    }
    return (
        <Path path={getGradient()} color={'pink'}>
            <LinearGradient start={{x: 0, y: 0}} end={props.animationGradient}
                colors={['rgba(45, 245, 45, 0.603)', 'rgba(45, 245, 45, 0)']}
            />
        </Path>
    );
}