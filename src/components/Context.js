import { useNavigation } from '@react-navigation/native';
import React, { createContext, useContext, useState } from 'react';

const MQTTContext = createContext();

export const MQTTProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [isConnected, setConnected] = useState('Desconectado')
  const [userMail, setMail] = useState(null)
  const [userName, setName] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [userId, setId] = useState(null)
  const Navigation = useNavigation()

  function backToWelcome(){
    Navigation.navigate('Welcome')
  }

  React.useEffect(() => {
    if(loggedIn == false){
      backToWelcome()
    }
  }, [loggedIn]);

  return (
    <MQTTContext.Provider value={{ client, setClient, isConnected, setConnected, userMail, setMail, userName, setName, loggedIn, setLoggedIn, userId, setId }}>
      {children}
    </MQTTContext.Provider>
  );
};

export const useMQTT = () => useContext(MQTTContext);