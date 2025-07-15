import React from "react";

const LoadingSpinner = () => {
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 rounded-full border-4 border-t-transparent border-b-transparent border-primary animate-spin"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
