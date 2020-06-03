import React from "react";
import styles from "../styles/experimentitem.module.css";
const ExperimentItem = ({ experiment }) => {
  return (
    <div className={styles.container}>
      <h3>
        {experiment.code} - {experiment.title}
      </h3>
      <table>
        <tbody>
          <tr>
            <th>impact</th>
            <th>cofidence</th>
            <th>ease</th>
          </tr>
          <tr>
            <td>{experiment.impact || "N/A"}</td>
            <td>{experiment.confidence || "N/A"}</td>
            <td>{experiment.ease || "N/A"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ExperimentItem;
