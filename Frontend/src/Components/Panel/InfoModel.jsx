import React from 'react';
import 'animate.css';


const InfoModel = ({ isOpen, onClose, record }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed text-center inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white p-6 rounded-md shadow-lg z-10 w-full max-w-lg animate__animated animate__fadeIn">
        
        <h2 className="text-xl font-bold mb-4 border-b-4 pb-4 border-green-100">Recharge Record Details</h2>
        <p><strong>Mobile:</strong> {record.mobile}</p>
        <p><strong>Operator:</strong> {record.operator}</p>
        <p><strong>Plan Type:</strong> {record.planType}</p>
        <p><strong>Amount:</strong> Rs.{record.amount}</p>
        <p><strong>Status:</strong> {record.status}</p>
        <p><strong>Timestamp:</strong> {new Date(record.timestamp).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
        <hr className='mt-5'/>
        <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default InfoModel;
