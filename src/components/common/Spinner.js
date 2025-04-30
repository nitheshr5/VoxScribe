// components/common/Spinner.js
import React from 'react';

const Spinner = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12',
  };

  return (
    <div className={`${className} flex justify-center items-center`}>
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-t-2 border-b-2 border-black`}></div>
    </div>
  );
};

export default Spinner;