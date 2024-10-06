
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { CookiesProvider } from 'react-cookie'
import { RechargeContextProvider } from './Context/RechargeRecord.jsx'


createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <ChakraProvider>
        <RechargeContextProvider>
          <CookiesProvider defaultSetOptions={{ path: '/' }}>
            <App />
          </CookiesProvider>
        </RechargeContextProvider>
      </ChakraProvider>
    </BrowserRouter>
  </>
)
