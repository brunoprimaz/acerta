import React from 'react';

import ClipLoader from "react-spinners/ClipLoader";

const Spinner: React.FC = () => {
  
  return (
    <div className="spinner">
        <ClipLoader color="white" size={150} />
    </div>
  );
};

export default Spinner;
