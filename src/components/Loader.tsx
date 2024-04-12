import React from "react";
import styles from "./page.module.scss";

const Loader = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <span className={styles.loader}></span>
    </div>
  );
};
export default Loader;
