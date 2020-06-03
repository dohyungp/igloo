import React from "react";
import ExperimentItem from "./ExperimentItem";
import styles from "../styles/experimentlist.module.css";

export const ExperimentList = ({ experiments }) => {
  return (
    <div className={styles.centered}>
      {experiments?.map((experiment) => {
        return (
          <div className={styles.experimentwrapper} key={experiment.id}>
            <ExperimentItem experiment={experiment} />
          </div>
        );
      })}
    </div>
  );
};
