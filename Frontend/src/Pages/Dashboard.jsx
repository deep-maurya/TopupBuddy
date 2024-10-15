import React, { useEffect, useState } from 'react';
import { Layout } from '../Components/Panel/Layout';
import MobileRechargeForm from '../Components/Panel/Recharge';
import { RechargeRecords } from '../Components/Panel/RechargeRecords';
import { useRechargeContext } from '../Context/RechargeRecord';
import { Loading } from '../Components/Utils/Loading';


export const Dashboard = () => { 
  const {records,loading} = useRechargeContext();
  return (
    <Layout>
      <h1 className='text-3xl mb-3 font-black'>Dashboard</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-4">
        <div className="">
          <MobileRechargeForm/>
        </div>
        <div className="lg:col-span-2 ">
          {!loading?(<RechargeRecords records={records}/>):(<Loading/>)}
        </div>
      </div>
    </Layout>
  );
};
