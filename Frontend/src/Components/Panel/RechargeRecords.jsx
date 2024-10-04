import React, { useState } from 'react';


export const Status = ({ color, text }) => {
  return (
    <span className={`p-2 border bg-${color}-100 text-${color}-500 rounded-sm border-${color}-400 ml-2`}>
      {text}
    </span>
  );
};

export const RechargeRecords = ({ records }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(records.length / recordsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="font-bold bg-white shadow-md p-6">
      <div className="bg-white text-xl font-bold text-gray-500 mb-4">
        Recharge Records
      </div>
      {records.length === 0 ? (
        <p className="text-center text-xl font-bold">No records available</p>
      ) : (
        <>
          {currentRecords.map((record, index) => (
            <div key={index} className="p-5 border rounded-md grid grid-cols-2 items-center mb-4">
              <div className="font-medium items-center text-gray-400">
                <span className="font-bold text-black">{record.mobile}</span> <br />
                <div className="flex font-normal items-center">
                  {record.operator} | {record.planType}  | Rs.{record.amount}
                </div>
              </div>
              <div className="text-end">
                <Status
                  color={record.status === 'Success' ? 'green' : record.status === 'Failed' ? 'red' : 'yellow'}
                  text={record.status}
                />
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-6">
            <button
              className="px-3 py-1 bg-gray-200 rounded-md mx-1 disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`px-3 py-1 mx-1 rounded-md ${currentPage === i + 1 ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
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
