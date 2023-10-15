import React, { createContext, useState, useContext } from 'react';

// Create a context
const AppContext = createContext();

// Create a provider component
export function AppProvider({ children }) {
  // Define your state or any data you want to share
  const [searchPrompt, setSearchPrompt] = useState('');
  const [productInfo, setProductInfo] = useState([]);




  // You can define other state or functions here as well

  return (
    <AppContext.Provider value={{ searchPrompt, setSearchPrompt, productInfo, setProductInfo }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
      throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
  }

