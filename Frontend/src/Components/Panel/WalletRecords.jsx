import React, { useState } from 'react';
import InfoModelWallet from './InfoModelWallet';
import { Loading } from '../Utils/Loading';


export const Status = ({ color, text }) => {
  const bgColorClass = `bg-${color}-100`;
  const textColorClass = `text-${color}-500`;
  return (
    <span className={`p-2 border ${bgColorClass} ${textColorClass} rounded-sm ml-2`}>
      {text}
    </span>
  );
};

export const WalletRecords = ({ loading,records }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(records.length / recordsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const openModal = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRecord(null);
    setIsModalOpen(false);
  };
  
  const pageRange = 3;
  const startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
  const endPage = Math.min(totalPages, startPage + pageRange - 1);

  return (
    <div className="font-bold bg-white shadow-md p-6">
      <div className="bg-white text-xl font-bold text-gray-500 mb-4">
        Wallet Topup Records
      </div>
      {loading && <Loading/>}
      {!loading && records.length === 0 ? (
        <p className="text-center text-xl font-bold">No records available</p>
      ) : (
        <>
          {currentRecords?.map((record, index) => (
            <div key={index} onClick={() => openModal(record)} className="p-5 border rounded-md grid grid-cols-2 items-center mb-4">
              <div className="font-medium items-center text-gray-400">
                <span className="font-bold text-black">Rs.{record.amount}</span> <br />
                <div className="text-xs font-bold items-center">
                  Razorpay OrderID : {record.razorpayOrderId} <br /> 
                  Razorpay PaymentID : {record.razorpayPaymentId?record.razorpayPaymentId:"NA"} <br />
                  <span>{new Date(record.timestamp).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</span>
                </div>
              </div>
              <div className="text-end">
                {record.status === 'success' && (
                  <span className="p-2 border border-green-500 bg-green-100 text-green-500 rounded-sm ml-2">
                    {record.status.toUpperCase()}
                  </span>
                )}
                {record.status === 'failed' && (
                  <span className="p-2 border border-red-500 bg-red-100 text-red-500 rounded-sm ml-2">
                    {record.status.toUpperCase()}
                  </span>
                )}
                {record.status === 'pending' && (
                  <span className="p-2 border border-yellow-500 bg-yellow-100 text-yellow-500 rounded-sm ml-2">
                    {record.status.toUpperCase()}
                  </span>
                )}
              </div>
            </div>
          ))}

          <InfoModelWallet isOpen={isModalOpen} onClose={closeModal} record={selectedRecord} />

          <div className="flex justify-center mt-6">
            <button
              className="px-3 py-1 bg-gray-200 rounded-md mx-1 disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}
            >
              Previous
            </button>
            {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
              <button
                key={i + startPage}
                className={`px-3 py-1 mx-1 rounded-md ${currentPage === i + startPage ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                onClick={() => paginate(i + startPage)}
              >
                {i + startPage}
              </button>
            ))}
            <button
              className="px-3 py-1 bg-gray-200 rounded-md mx-1 disabled:opacity-50"
              disabled={currentPage === totalPages}
              onClick={() => paginate(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};
