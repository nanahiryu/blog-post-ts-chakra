import React, { useState } from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './router/Router';
import { createContext } from 'react';

type ContextType = {
  setTargetURL: (value: string) => void;
  targetURL: string;
};

export const LoginUser = createContext<ContextType>({} as ContextType);

function App() {
  const [targetURL, setTargetURL] = useState('http://localhost:8000/');
  const value = { targetURL, setTargetURL };
  return (
    <ChakraProvider>
      <BrowserRouter>
        <LoginUser.Provider value={value}>
          <Router />
        </LoginUser.Provider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
