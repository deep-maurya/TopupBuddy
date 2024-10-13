import { Loader2Icon } from 'lucide-react';
import React, { useState } from 'react';
import { AxioPost } from '../../utils/AxiosUtils';
import swal from 'sweetalert';
import { useRechargeContext } from '../../Context/RechargeRecord';


const MobileRechargeForm = () => {
  const [loading, setLoading] = useState(false);
  const { reloadRecords } = useRechargeContext();
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
      [name]: name === 'amount' ? Number(value) : value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await AxioPost('recharge/mobile', {amount:formData.amount,service:mobileType,operator:formData.operator,mobileno:formData.mobileNumber});
      // console.log("j");
      console.log(response);
      swal({
        text: response.data.Status=='success'?'Recharge Success':'Recharge Failed',
        //text: response.data.Status=='Success'?'Re':'warning',
        icon: response.data.Status=='success'?'success':'warning',
        buttons: false,
        timer: 3000,
      });
      if(response.data.Status==='success'){
        setFormData((prevData) => ({
          ...prevData,
          operator: '',
          mobileNumber: '',
          amount: '',
        }));
      }
    } catch (error) {
      //console.log(error.response.data.message)
      setError('Something went wrong. Please try again.');
      swal({
        title: "Recharge Failed",
        text: error.response.data.message,
        icon: "warning",
        buttons: false,
        timer: 3000,
      });
    } finally {
      setTimeout(()=>{
        reloadRecords()
      },2500)
    }
    setLoading(false);
  };

  return (
    <div className="font-bold bg-white shadow-md p-6 sticky top-0 z-10">
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
