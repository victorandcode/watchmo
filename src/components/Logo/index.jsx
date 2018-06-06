import React from "react";
import logo from "./logo.png";
import styles from "./Logo.scss";

const Logo = () => (
  <a href="#" className={styles.Logo}>
    <img src={logo} alt="Logo" className={styles.image} />
  </a>
);

export default Logo;
