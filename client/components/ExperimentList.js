import React from "react";
import ExperimentItem from "./ExperimentItem";

export const ExperimentList = ({ experiments }) => {
  return (
    <div>
      {experiments?.map((experiment) => {
        return <ExperimentItem experiment={experiment} key={experiment.id} />;
      })}
    </div>
  );
};
