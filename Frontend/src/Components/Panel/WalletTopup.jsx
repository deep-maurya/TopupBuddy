import React, { useState } from 'react';
import { AxioPost } from '../../utils/AxiosUtils';
import { AlertCircle, Loader, Loader2Icon, LoaderPinwheelIcon } from 'lucide-react';
import swal from 'sweetalert';

export const WalletTopup = ({reloadRecords}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [amount, setAmount] = useState(100);

  const handlePayment = (orderId, amount) => {
    const options = {
      key: 'rzp_test_47z3psFlpBCp15',
      amount: amount * 100,
      currency: 'INR',
      name: 'TopupBuddy',
      description: 'Wallet Top-up',
      order_id: orderId,
      handler: async (response) => {
        console.log('Payment successful:', response);
        try {
          const verifyResponse = await AxioPost('wallet/verify_payment', {
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature
          });
          console.log(verifyResponse);
          if (verifyResponse.data.status === 1) {
            swal({
                title: "Transaction Successfull",
                text: `Rs.${amount} Added in you wallet.`,
                icon: "success",
                buttons: false,
                timer: 3000,
            });
            setTimeout(()=>{
              reloadRecords();
            },3000)
          } else {
            setError(verifyResponse.data.message);
          }
        } catch (error) {
          setError('Payment verification failed. Please try again.');
        }
      },
      prefill: {
        // name: 'John Doe',
        // email: 'john@example.com',
        // contact: '9999999999',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await AxioPost('wallet/create_order', { amount });
      console.log(response);
      if (response.data.status === 1) {
        const orderId = response.data.data.razorpayOrderId; 
        handlePayment(orderId, amount);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <>
      {error && (
        <div className="rounded-md mb-5 border-l-4 border-green-500 bg-green-100 p-4">
          <div className="flex items-center space-x-4">
            <AlertCircle className="h-6 w-6 text-green-600" />
            <p className="text-sm font-medium text-green-600">{error}</p>
          </div>
        </div>
      )}
      <div className="font-bold bg-white shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <h1 className="text-lg mb-4 font-black">Wallet Topup</h1>
          <hr />

          {/* Amount Input */}
          <div className="mb-4 mt-5">
            <label className="block text-sm font-bold text-gray-700">Amount</label>
            <input
              type="number"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Enter amount"
              min={100}
              max={5000}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <hr />

          {/* Submit Button */}
          <div className="mt-4 text-center">
            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%" }}
              className={`bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <div className="flex justify-center">
                  <Loader2Icon className="animate-spin" />
                </div>
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
