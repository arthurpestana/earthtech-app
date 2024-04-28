import { View, Text, TextInput } from "react-native";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import styles from '../styles/style_home'
import { Ionicons } from "@expo/vector-icons"

export default function (props) {
    function transformDate(date){
        let parts = date.split('/');
        let dateNew = new Date(parts[2], parts[0] - 1, parts[1]);
        let parsedDate = new Date(dateNew);
        let dayOfWeek = format(parsedDate, 'EEEEEE', { locale: ptBR });
        return dayOfWeek
    }
    return (
        <View style={styles.next__weather}>
            <Text style={styles.next_text}>{transformDate(props.date)}.</Text>
            <Ionicons name='partly-sunny' size={35} color={'#696969'}></Ionicons>
            <View style={styles.next_subarea}>
                <Text style={styles.next_subtext}>{props.maxTemp.split(".")[0]}º</Text>
                <Text style={[styles.next_subtext, styles.next_subtext_color]}>{props.minTemp.split(".")[0]}º</Text>
            </View>
        </View>
    )
}