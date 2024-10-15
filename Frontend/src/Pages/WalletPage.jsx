import React, { useEffect, useState } from 'react';
import { Layout } from '../Components/Panel/Layout';
import { WalletTopup } from '../Components/Panel/WalletTopup';
import { useWalletContext } from '../Context/WalletRecord';
import { WalletRecords } from '../Components/Panel/WalletRecords';
import { Loading } from '../Components/Utils/Loading';

export const WalletPage = () => {
  const {records,loading,reloadRecords} = useWalletContext();
  return (
    <Layout>
      <h1 className='text-3xl mb-3 font-black'>My Wallet</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-4">
        <div className="">
        <WalletTopup reloadRecords={reloadRecords}/>
        </div>
        <div className="lg:col-span-2 ">
          {!loading?<WalletRecords records={records}/>:<Loading/>}
        </div>
      </div>
      
    </Layout>
  );
};
