import React, { useState } from 'react';
import MobileRechargeForm from './Recharge';
import { SatelliteDish, SmartphoneIcon } from 'lucide-react';
import DTHRecharge from './DTH';

const Tab1 = () => <div>Service 1 Content</div>;
const Tab2 = () => <div>Service 2 Content</div>;
const Tab3 = () => <div>Service 3 Content</div>;
const Tab4 = () => <div>Service 4 Content</div>;
const Tab5 = () => <div>Service 5 Content</div>;
const Tab6 = () => <div>Service 6 Content</div>;

export const AllServices = () => {
  const [activeForm, setActiveForm] = useState(0);

  return (
    <div className="w-full">
      <div className="flex font-bold bg-white mb-2 pt-3 justify-center shadow-md overflow-x-auto scrollbar-hide">
        <button
          className={`px-4 flex gap-1 py-2 border-b-2 ${activeForm === 0 ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500'}`}
          onClick={() => setActiveForm(0)}
        >
           <SmartphoneIcon/> Mobile
        </button>
        <button
          className={`ml-4 flex gap-1 px-4 py-2 border-b-2 ${activeForm === 1 ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500'}`}
          onClick={() => setActiveForm(1)}
        >
          <SatelliteDish/> DTH
        </button>
        
        
      </div>
      <div className="">
        {activeForm === 0 && <MobileRechargeForm />}
        {activeForm === 1 && <DTHRecharge />}
      </div>
    </div>
  );
};
