import React, { useState } from 'react';



const CustomDropdown = ({list}) => {
  const [selectedOption, setselectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (operator) => {
    setselectedOption(operator);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center border p-3 px-4 rounded-md"
      >
        {selectedOption ? (
          <div className="flex items-center">
            <img
              src={selectedOption.img}
              alt={selectedOption.label}
              className="w-6 h-6 mr-5"
            />
            {selectedOption.label}
          </div>
        ) : (
          'Select Operator'
        )}
        <span className="ml-2">▼</span>
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-full bg-white border mt-2 p-2 rounded-md shadow-md">
          {list.map((operator) => (
            <li
              key={operator.value}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(operator)}
            >
              <img
                src={operator.img}
                alt={operator.label}
                className="w-6 h-6 mr-2"
              />
              {operator.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
