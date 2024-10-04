
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { CookiesProvider } from 'react-cookie'


createRoot(document.getElementById('root')).render(
  <>
  <>
    <BrowserRouter>
      <ChakraProvider>
        <CookiesProvider defaultSetOptions={{ path: '/' }}>
          <App />
        </CookiesProvider>
      </ChakraProvider>
    </BrowserRouter>
  </>
  </>
)
