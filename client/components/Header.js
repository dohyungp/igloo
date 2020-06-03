import Link from "next/link";
import React from "react";
import styles from "../styles/header.module.css";

export const Header = () => {
  return (
    <div className={styles.container}>
      <Link href="/">
        <a className={styles.logo}>igloo</a>
      </Link>
    </div>
  );
};
