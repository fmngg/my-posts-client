import React from "react";

import styles from "./NotFound.module.scss";

import notFound from "../../assets/not-found.svg";

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <h1>404</h1>
      <img src={notFound} alt="Not Found" />
    </div>
  );
};

export default NotFound;
