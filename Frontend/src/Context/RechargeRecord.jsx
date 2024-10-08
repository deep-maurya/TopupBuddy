import { createContext, useState, useContext, useEffect } from 'react';
import { AxioPost } from '../utils/AxiosUtils';
import { Loading } from '../Components/Utils/Loading';
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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <RechargeRecords.Provider value={{ records, reloadRecords }}>
      {children}
    </RechargeRecords.Provider>
  );
};

export const useRechargeContext = () => {
  return useContext(RechargeRecords);
};
