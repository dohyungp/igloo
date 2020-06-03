import Head from "next/head";
import React from "react";
import { Header } from "./Header";

import styles from "../styles/mainlayout.module.css";

export const MainLayout = ({ title, children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className={styles.header}>
        <Header />
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
};
