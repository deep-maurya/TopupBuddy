import React from 'react';
import 'animate.css';
import { BadgeCheck, BadgeInfo, BadgeXIcon } from 'lucide-react';


const InfoModelWallet = ({ isOpen, onClose, record }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed text-center inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white p-6 rounded-md shadow-lg z-10 w-full max-w-lg animate__animated animate__fadeIn">
        
        <h2 className="text-xl font-bold mb-4 border-b-4 pb-4 border-green-100">Details</h2>
        <p><strong>Amount:</strong> Rs.{record.amount}</p>
        <p className='flex justify-center items-center'>
          <strong className='mr-1'>Status: </strong> {record.status.toUpperCase()} 
          {record.status==='success' && <BadgeCheck color={'white'} fill='#1fc55c'/>}
          {record.status==='failed' && <BadgeXIcon color={'white'} fill='#e3605e'/>}
          {record.status==='pending' && <BadgeInfo color={'white'} fill='#eab306'/>}
        </p>
        <p><strong>Order ID:</strong> {record.orderID}</p>
        <p><strong>Razorpay OrderID:</strong> {record.razorpayOrderId}</p>
        <p><strong>Razoprpay PaymentID:</strong> {record.razorpayPaymentId?record.razorpayPaymentId:"NA"}</p>
        <p><strong>Timestamp:</strong> {new Date(record.timestamp).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
        <hr className='mt-5'/>
        <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default InfoModelWallet;
