import React, { useEffect, useState } from 'react';
import { Layout } from '../Components/Panel/Layout';
import { WalletTopup } from '../Components/Panel/WalletTopup';

export const WalletPage = () => {
  return (
    <Layout>
      <h1 className='text-3xl mb-3 font-black'>My Wallet</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-4">
        <div className="">
        <WalletTopup/>
        </div>
        <div className="lg:col-span-2 ">
          
        </div>
      </div>
      
    </Layout>
  );
};
