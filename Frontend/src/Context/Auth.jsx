import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { AxioPost } from '../utils/AxiosUtils';
import { Loading } from '../Components/Utils/Loading';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authStatus, setAuthStatus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get('auth_token');
      if (token) {
        try {
          const response = await AxioPost('token_verify');
          setAuthUser(response.data.user);
          setAuthStatus(true);
        } catch (error) {
          console.error('Error verifying token:', error);
          setAuthStatus(false);
          Cookies.remove('auth_token');
          navigate('/');
        } finally {
          setLoading(false);
        }
      } else {
        setAuthStatus(false);
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (token, response) => {
    Cookies.set('auth_token', token);
    setAuthUser(response.data.data.user);
    setAuthStatus(true);
  };

  const logout = () => {
    Cookies.remove('auth_token');
    setAuthUser(null);
    setAuthStatus(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ authUser, authStatus, loading, login, logout }}>
      {loading && <Loading/>}
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook to access AuthContext
export const useAuthContext = () => {
  return useContext(AuthContext);
};
