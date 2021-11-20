import React from 'react';
import s from './Loader.module.css';
import Loader from 'react-loader-spinner';

const Spinner = () => {
  return (
    <div className={s.spinner}>
      <Loader type="Hearts" color="#00BFFF" height={200} width={200} />
    </div>
  );
};

export default Spinner;
