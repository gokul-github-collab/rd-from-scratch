import React from 'react';

const Card = ({ children, bg = 'bg-gray-100' }) => {
  return (
    <div className={`${bg} p-6 rounded-lg shadow-md bg-gradient-to-tr from-[#ffe6f0] to-[#ebe9ff]`}>
      {children}
    </div>
  );
};

export default Card;
