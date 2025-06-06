import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App'
import { CartProvider } from './context/CartContext'
import theme from './theme'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <ChakraProvider theme={theme}>
      <CartProvider>
        <App />
      </CartProvider>
    </ChakraProvider>
  // </React.StrictMode>
)
