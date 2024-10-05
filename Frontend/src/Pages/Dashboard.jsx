import React, { useEffect, useState } from 'react';
import { Layout } from '../Components/Panel/Layout';
import MobileRechargeForm from '../Components/Panel/Recharge';
import { RechargeRecords } from '../Components/Panel/RechargeRecords';
const data = [
  { mobile: '9370891272', planType: 'Prepaid', operator: 'Airtel', amount: 199, status: 'Success', timestamp: '2023-10-02T10:46:30.123Z' },
  { mobile: '9370891234', planType: 'Postpaid', operator: 'Vodafone', amount: 399, status: 'Failed', timestamp: '2023-10-02T10:45:30.123Z' },
  { mobile: '9370891265', planType: 'Prepaid', operator: 'Jio', amount: 299, status: 'Processing', timestamp: '2023-10-02T10:44:30.123Z'}
];

export const Dashboard = () => { 
  return (
    <Layout>
      <h1 className='text-3xl mb-3 font-black'>Dashboard</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-4">
        <div className="">
          <MobileRechargeForm/>
        </div>
        <div className="lg:col-span-2 ">
          <RechargeRecords records={data}/>
        </div>
      </div>
    </Layout>
  );
};
