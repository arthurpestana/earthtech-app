import React, { createContext, useContext, useState } from 'react';

const MQTTContext = createContext();

export const MQTTProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [isConnected, setConnected] = useState('Desconectado')
  const [userMail, setMail] = useState(null)
  const [userName, setName] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [userId, setId] = useState(null)

  return (
    <MQTTContext.Provider value={{ client, setClient, isConnected, setConnected, userMail, setMail, userName, setName, loggedIn, setLoggedIn, userId, setId}}>
      {children}
    </MQTTContext.Provider>
  );
};

export const useMQTT = () => useContext(MQTTContext);