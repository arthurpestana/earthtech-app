import { Circle, Group, Path, Skia } from '@shopify/react-native-skia';
import * as React from 'react';
import { View } from 'react-native-animatable';
import { useDerivedValue } from 'react-native-reanimated';


export default function(props) {
    const path = useDerivedValue(() => {
        const dottedLine = Skia.Path.Make().lineTo(0, props.chartHeight - props.cy.value)
        dottedLine.dash(10,10,0)
        const matrix = Skia.Matrix()
        matrix.translate(props.cx.value, props.cy.value)
        dottedLine.transform(matrix)
        return dottedLine
    })
    return (
        <Group>
            <Path 
                path={path}
                color={'#0bb861'}
                style={'stroke'}
                strokeWidth={2}
                strokeCap={'round'}
            />
            <Circle  
                cx={props.cx} 
                cy={props.cy} 
                r={3} 
                style={'stroke'} 
                strokeWidth={6} 
                color={'#0bb861'}
            />
                <Circle  
                cx={props.cx} 
                cy={props.cy} 
                r={4} 
                style={'fill'} 
                color={'#000'}
            />
        </Group>
    );
}