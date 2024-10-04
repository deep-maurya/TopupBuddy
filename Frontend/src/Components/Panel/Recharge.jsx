import { Loader2Icon } from 'lucide-react';
import React, { useState } from 'react';

const MobileRechargeForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mobileType, setMobileType] = useState('prepaid');
  const [formData, setFormData] = useState({
    operator: '',
    mobileNumber: '',
    amount: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', { ...formData, mobileType });
  };

  return (
    <div className="font-bold bg-white shadow-md p-6">
      <form onSubmit={handleSubmit}>
        <h1 className='text-lg mb-4 font-black'>Mobile Recharge</h1>
        <hr />
        
    
        <div className="mb-5 mt-4">
          <label className="block text-sm font-bold text-gray-700">Select Operator</label>
          <select
            name="operator"
            value={formData.operator}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="" disabled>Select your operator</option>
            <option value="Airtel">Airtel</option>
            <option value="Vodafone">Vodafone</option>
            <option value="Jio">Jio</option>
            <option value="BSNL">BSNL</option>
          </select>
        </div>

        
        <fieldset className="grid grid-cols-2 mb-5 gap-4">
          <div>
            <label
              htmlFor="prepaid"
              className={`block cursor-pointer rounded-lg border p-4 text-sm font-medium shadow-sm 
                          ${mobileType === 'prepaid' ? 'border-green-500 bg-green-100 ring-1 ring-green-500' : 'hover:border-gray-200'}`}
            >
              <p className="text-gray-700 font-bold text-center">Prepaid</p>
              <input
                type="radio"
                name="operatorType"
                value="prepaid"
                id="prepaid"
                className="sr-only"
                checked={mobileType === 'prepaid'}
                onChange={() => setMobileType('prepaid')}
              />
            </label>
          </div>
          <div>
            <label
              htmlFor="postpaid"
              className={`block cursor-pointer rounded-lg border p-4 text-sm font-medium shadow-sm 
                          ${mobileType === 'postpaid' ? 'border-green-500 bg-green-100 ring-1 ring-green-500' : 'hover:border-gray-200'}`}
            >
              <p className="text-gray-700 font-bold text-center">Postpaid</p>
              <input
                type="radio"
                name="operatorType"
                value="postpaid"
                id="postpaid"
                className="sr-only"
                checked={mobileType === 'postpaid'}
                onChange={() => setMobileType('postpaid')}
              />
            </label>
          </div>
        </fieldset>

      
        <div className="mb-5">
          <label className="block text-sm font-bold text-gray-700">Mobile Number</label>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            placeholder="Enter your mobile number"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

       
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            placeholder="Enter recharge amount"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <hr />
        <div className="mt-4 text-center">
          <button
            type="submit"
            disabled={loading}
            style={{ width: "100%" }}
            className={`bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <div className="flex justify-center">
                <Loader2Icon className="animate-spin" />
              </div>
            ) : (
              'Recharge Now'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MobileRechargeForm;
