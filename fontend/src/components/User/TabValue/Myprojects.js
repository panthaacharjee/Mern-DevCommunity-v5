import React, { useState } from "react";
import { useSelector } from "react-redux";
import Project from "../../Projects/Project";

const Myprojects = () => {
  const { user } = useSelector((state) => state.user);

  const options = {
    save: true,
    applyDev: false,
  };
  console.log(user);
  return (
    <div className="developer-project-container">
      <div className="applied-project-container">
        <h4>Applied Project</h4>
        {user.projects.length <= 0 && <p>No Projects Found!</p>}
        {user.projects &&
          user.projects.map((val, ind) => {
            return <Project val={val} key={ind} options={options} />;
          })}
      </div>
      <div className="ongoing-project-container">
        <h4>Ongoing Project</h4>
        {user.ongoingProjectsDev.length <= 0 && <p>No Projects Found!</p>}
        {user.ongoingProjectsDev &&
          user.ongoingProjectsDev.map((val, ind) => {
            return <Project val={val} key={ind} options={options} />;
          })}
      </div>
      <div className="ongoing-project-container">
        <h4>Complete Project</h4>
        {user.completeProjectsDev.length <= 0 && <p>No Projects Found!</p>}
        {user.completeProjectsDev &&
          user.completeProjectsDev.map((val, ind) => {
            return <Project val={val} key={ind} options={options} />;
          })}
      </div>
    </div>
  );
};

export default Myprojects;
