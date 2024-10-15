import { Ellipsis, RefreshCw } from 'lucide-react';
import React from 'react';
import { useMyBalanceContext } from '../../Context/MyBalance';

export const MyBalance = () => {
  const { Balance, updateBalance, loading } = useMyBalanceContext();

  return (
    <div className="font-bold bg-white shadow p-6 mb-5">
      <div className="flex justify-between">
        <h1 className="mb-2 text-xl">Available Balance</h1>
        <RefreshCw 
          className={`cursor-pointer ${loading ? "animate-spin" : ""}`}
          onClick={updateBalance}
        />
      </div>
      <span className="inline-flex items-center">
        Rs. <span className="text-3xl ml-2">{!loading ? Balance : <Ellipsis />}</span>
      </span>
    </div>
  );
};
