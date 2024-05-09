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
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const Navigation = useNavigation()
  const [nome, setNome] = useState('')
  const [userNameMQTT, setUsernameMQTT] = useState('')
  const [senha, setSenha] = useState('')
  const [host, setHost] = useState('')
  const [port, setPort] = useState('')
  const [changeStatus, setChangeStatus] = useState(false)
  const [indexCatalog, setIndexCatalog] = useState('')
  const [typeCatalog, setTypeCatalog] = useState('')

  function backToWelcome(){
    Navigation.navigate('Welcome')
  }

  React.useEffect(() => {
    if(loggedIn == false){
      backToWelcome()
    }
  }, [loggedIn]);

  return (
    <MQTTContext.Provider value={{ client, setClient, isConnected, setConnected, userMail, setMail, userName, setName, loggedIn, setLoggedIn, userId, setId, latitude, setLatitude, longitude, setLongitude, nome, setNome, userNameMQTT, setUsernameMQTT, senha, setSenha, host, setHost, port, setPort, changeStatus, setChangeStatus, indexCatalog, setIndexCatalog, typeCatalog, setTypeCatalog }}>
      {children}
    </MQTTContext.Provider>
  );
};

export const useMQTT = () => useContext(MQTTContext);