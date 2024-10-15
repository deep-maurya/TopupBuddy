import { createContext, useState, useContext, useEffect } from 'react';
import { AxioPost } from '../utils/AxiosUtils';
import { useAuthContext } from './Auth';

export const MyBalance = createContext({
  Balance: 0,
  updateBalance: () => {}
});

export const MyBalanceContextProvider = ({ children }) => {
  const { authUser } = useAuthContext();
  const [Balance, setBalance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateBalance = async () => {
    try {
      setLoading(true);
      const response = await AxioPost('wallet/wallet_balance', { userId: authUser.id });
      setBalance(response.data.wallet);
      setError(null);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setError('Failed to load MyBalance records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authUser) return;
    updateBalance();
  }, [authUser]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <MyBalance.Provider value={{ Balance, updateBalance, loading }}>
      {children}
    </MyBalance.Provider>
  );
};

export const useMyBalanceContext = () => {
  return useContext(MyBalance);
};
