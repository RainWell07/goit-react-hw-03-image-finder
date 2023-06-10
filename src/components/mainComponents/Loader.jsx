import React from "react";
import { ClockLoader } from "react-spinners";
import css from '../Modules/ImageFinder.module.css';

const Loader = () => {
  return (
    <div className={css.fullScreenLoader}>
      <ClockLoader color="#ffffff" size={50} />
    </div>
  );
};

export default Loader;
