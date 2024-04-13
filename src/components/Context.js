import React, { createContext, useContext, useState } from 'react';

const MQTTContext = createContext();

export const MQTTProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [isConnected, setConnected] = useState()

  return (
    <MQTTContext.Provider value={{ client, setClient, isConnected, setConnected }}>
      {children}
    </MQTTContext.Provider>
  );
};

export const useMQTT = () => useContext(MQTTContext);