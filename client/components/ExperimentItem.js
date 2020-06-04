import Link from "next/link";
import React from "react";
import styles from "../styles/experimentitem.module.css";
const ExperimentItem = ({ experiment }) => {
  return (
    <Link href={`/experiments/[id]`} as={`/experiments/${experiment.id}`}>
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
              <td>{experiment.impact}</td>
              <td>{experiment.confidence}</td>
              <td>{experiment.ease}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Link>
  );
};

export default ExperimentItem;
