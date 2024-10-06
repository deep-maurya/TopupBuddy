import { createContext, useState, useContext,useEffect } from 'react';
import { AxioPost } from '../utils/AxiosUtils';
export const RechargeRecords = createContext({
    records : []
});

export const  RechargeContextProvider = ({children}) =>{
    const [records, setRecords] = useState([]);
    useEffect(() => {
        const fetchData = async() => {
            try {
                const response =await AxioPost('recharge/records');
                console.log(response.data.Data)
                setRecords(response.data.Data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, []);
    return (
        <>
            <RechargeRecords.Provider value={{records}}>
                {children}
            </RechargeRecords.Provider>
        </>
    )
}

export const useRechargeContext = () => {
    return useContext(RechargeRecords);
}

