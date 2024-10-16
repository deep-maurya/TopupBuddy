import { Loader2Icon } from 'lucide-react';
import React, { useState } from 'react';
import { AxioPost } from '../../utils/AxiosUtils';
import swal from 'sweetalert';
import { useRechargeContext } from '../../Context/RechargeRecord';


const DTHRecharge = () => {
  const [loading, setLoading] = useState(false);
  const { reloadRecords } = useRechargeContext();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    operator: '',
    customerId: '',
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
      const response = await AxioPost('recharge/dth', {amount:formData.amount,operator:formData.operator,customerId:formData.customerId});
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
          customerId: '',
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
        <h1 className='text-lg mb-4 font-black'>DTH Recharge</h1>
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
            <option value="ADT">Airtel Digital TV</option>
            <option value="SD">Sun Direct</option>
            <option value="DTV">Dish TV</option>
            <option value="VDT">Videocon D2H</option>
          </select>
        </div>

      
        <div className="mb-5">
          <label className="block text-sm font-bold text-gray-700">Customer ID / Register Mobile</label>
          <input
            type="text"
            name="customerId"
            value={formData.customerId}
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

export default DTHRecharge;
