import { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { AxioPost } from '../utils/AxiosUtils';
import { useAuthContext } from './Auth';

export const RechargeRecords = createContext({
  records: []
});

export const RechargeContextProvider = ({ children }) => {
  const { authUser } = useAuthContext();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await AxioPost('recharge/records', { userId: authUser.id });
      setRecords(response.data.Data);
      setError(null);
    } catch (error) {
      console.error('Error fetching records:', error);
      setError('Failed to load recharge records');
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

  const memoizedValue = useMemo(() => ({ records, reloadRecords, loading }), [records, loading]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <RechargeRecords.Provider value={memoizedValue}>
      {children}
    </RechargeRecords.Provider>
  );
};

export const useRechargeContext = () => {
  return useContext(RechargeRecords);
};
