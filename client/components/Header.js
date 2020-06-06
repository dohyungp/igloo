import Link from "next/link";
import React from "react";
import styles from "../styles/header.module.css";

export const Header = () => {
  return (
    <div className={styles.container}>
      <Link href="/">
        <a className={styles.logo}>
          <img src="/igloo.svg" alt="igloo" />
        </a>
      </Link>
    </div>
  );
};
