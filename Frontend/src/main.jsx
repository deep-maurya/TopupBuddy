
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { CookiesProvider } from 'react-cookie'
import { RechargeContextProvider } from './Context/RechargeRecord.jsx'
import { AuthProvider } from './Context/Auth.jsx'
import { MyBalanceContextProvider } from './Context/MyBalance.jsx'


createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <ChakraProvider>
        <AuthProvider>
          <RechargeContextProvider>
            <MyBalanceContextProvider>
              <CookiesProvider defaultSetOptions={{ path: '/' }}>
                <App />
              </CookiesProvider>
            </MyBalanceContextProvider>
          </RechargeContextProvider>
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  </>
)
