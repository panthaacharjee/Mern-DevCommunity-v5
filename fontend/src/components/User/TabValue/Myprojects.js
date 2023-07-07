import React, { useState } from "react";
import { useSelector } from "react-redux";
import Project from "../../Projects/Project";

const Myprojects = () => {
  const { user } = useSelector((state) => state.user);

  const options = {
    save: true,
    applyDev: false,
  };

  return (
    <div className="developer-project-container">
      <div className="applied-project-container">
        <h4>Applied Project</h4>
        {user.projects &&
          user.projects.map((val, ind) => {
            return <Project val={val} key={ind} options={options} />;
          })}
      </div>
    </div>
  );
};

export default Myprojects;
