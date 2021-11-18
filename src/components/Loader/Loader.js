import React from 'react';
import Loader from 'react-loader-spinner';

import './Loader.css';

const Spinner = () => {
  return (
    <div className={Spinner}>
      <Loader type="Hearts" color="#00BFFF" height={200} width={200} />
    </div>
  );
};

export default Spinner;
