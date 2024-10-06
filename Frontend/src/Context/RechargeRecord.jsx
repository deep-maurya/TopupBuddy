import { createContext, useState, useContext,useEffect } from 'react';
import { AxioPost } from '../utils/AxiosUtils';
import { Loading } from '../Components/Utils/Loading';
export const RechargeRecords = createContext({
    records : []
});

export const  RechargeContextProvider = ({children}) =>{
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async() => {
            try {
                const response =await AxioPost('recharge/records');
                console.log(response.data.Data)
                setRecords(response.data.Data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData();
    },[]);
    return (
        <>
            <RechargeRecords.Provider value={{records}}>
                {loading && <Loading/>}
                {!loading && children}
            </RechargeRecords.Provider>
        </>
    )
}

export const useRechargeContext = () => {
    return useContext(RechargeRecords);
}

