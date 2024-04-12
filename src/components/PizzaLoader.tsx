import React from "react";
import styles from "./page.module.scss";

const PizzaLoader = () => {
  const slices = [];

  for (let i = 0; i < 13; i++) {
    slices.push(<div key={i} className={styles.slice}></div>);
  }

  return (
    <div className="h-[100vh] flex text-gray-500 justify-center items-center flex-col gap-7">
      <h1 className="bebas-neue-regular">Loading...</h1>
      <div className={styles.pizza}>{slices}</div>
    </div>
  );
};

export default PizzaLoader;
