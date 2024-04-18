import { useNavigation } from "@react-navigation/native";
import { useMQTT } from "../components/Context";
import { useSQLiteContext } from "expo-sqlite/next";

export default function (props) {
    const db = useSQLiteContext()
    const { userId, setId, userName, setName, mail, setMail, loggedIn, setLoggedIn, client, setClient, isConnected, setConnected } = useMQTT()
    const Navigation = useNavigation()

    async function LogoutAccount(){
        await db.execAsync(`UPDATE users SET logged = ${0} WHERE id = ${userId}`)
        setLoggedIn(false)
        setName(null)
        setId(null)
        setMail(null)
        setConnected('Desconectado')
        setClient(null)
        Navigation.navigate('Welcome')
    }
}