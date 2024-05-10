import * as React from 'react';
import {Text, useFont} from '@shopify/react-native-skia';
import { fonts } from '@rneui/base';

export default function(props) {
    const font = useFont(require('@expo-google-fonts/montserrat/Montserrat_400Regular.ttf'), 11)
    const [fontLoaded, setFontLoaded] = React.useState(false)
    const yPos = props.y + 10

    React.useEffect(() => {
        if (font) {
            setFontLoaded(true);
        }
    }, [font]);

    if(props.text.split("-")[1] == "01"){
        if(!fontLoaded){
            return null
        }
        const fontSize = font.measureText(props.text.split("-")[0])
        return (
            <Text text={props.text.split("-")[0]} color={'#FFF'} x={props.x} y={props.y+fontSize.height*2} font={font}/>
        );
    }
    else{
        return null
    }
}