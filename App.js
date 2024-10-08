import React, { useState } from 'react'

import { NavigationContainer }  from '@react-navigation/native'
import Routes from './src/routes/Routes'
import { MQTTProvider } from './src/components/Context';
import { SQLiteProvider } from 'expo-sqlite/next';
import * as FileSystem from 'expo-file-system'
import { Asset } from 'expo-asset';

import {useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold} from "@expo-google-fonts/montserrat"
import { Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins'

const loadDatabase = async () => {
    const dbName = "earthtech_db.db";
    const dbAsset = require("./assets/earthtech_db.db");
    const dbUri = Asset.fromModule(dbAsset).uri;
    const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;
    const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
    if(!fileInfo.exists) {
      await FileSystem.makeDirectoryAsync(
        `${FileSystem.documentDirectory}SQLite`,
        { intermediates: true }
      );
      await FileSystem.downloadAsync(dbUri, dbFilePath)
    }
  }
  
export default function App() {
    const [dbLoaded, setDbLoaded] = useState(false);
  
    React.useEffect(() => {
        loadDatabase()
          .then(() => setDbLoaded(true))
          .catch((e) => console.error(e));
      }, []);

    const [fontsLoaded, fontError] = useFonts({
      Montserrat_400Regular, 
      Montserrat_600SemiBold, 
      Montserrat_700Bold,
      Poppins_400Regular, 
      Poppins_600SemiBold, 
      Poppins_700Bold,
    });
  
    if (!fontsLoaded && !fontError) {
      return null;
    }

    return (
        <NavigationContainer>
            <SQLiteProvider databaseName='earthtech_db.db'> 
                <MQTTProvider>
                    <Routes/>
                </MQTTProvider>
            </SQLiteProvider>  
        </NavigationContainer>
    )
}