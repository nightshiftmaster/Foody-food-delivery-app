import React from "react";
import styles from "./page.module.scss";

const PizzaLoader = () => {
  const slices = [];

  for (let i = 0; i < 13; i++) {
    slices.push(<div key={i} className={styles.slice}></div>);
  }

  return (
    <div className="h-[100vh] flex justify-center items-center">
      <div className={styles.pizza}>{slices}</div>
    </div>
  );
};

export default PizzaLoader;
