import { createContext, useState, useContext, useEffect } from 'react';
import { AxioPost } from '../utils/AxiosUtils';
import { useAuthContext } from './Auth';

export const WalletRecords = createContext({
  records: []
});

export const WalletContextProvider = ({ children }) => {
  const { authUser } = useAuthContext();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await AxioPost('wallet/wallet_record', { userId: authUser.id });
      console.log(response.data.records)
      setRecords(response.data.records);
      setError(null);
    } catch (error) {
      console.error('Error fetching records:', error);
      setError('Failed to load Wallet records');
    } finally {
      setLoading(false);
    }
  };

  const reloadRecords = () => {
    fetchData();
  };

  useEffect(() => {
    if (!authUser) return;
    fetchData();
  }, [authUser]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <WalletRecords.Provider value={{ records, reloadRecords, loading }}>
      {children}
    </WalletRecords.Provider>
  );
};

export const useWalletContext = () => {
  return useContext(WalletRecords);
};
