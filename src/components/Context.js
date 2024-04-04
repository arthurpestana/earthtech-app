import React, { createContext, useContext, useState } from 'react';

const MQTTContext = createContext();

export const MQTTProvider = ({ children }) => {
  const [client, setClient] = useState(null);

  return (
    <MQTTContext.Provider value={{ client, setClient }}>
      {children}
    </MQTTContext.Provider>
  );
};

export const useMQTT = () => useContext(MQTTContext);