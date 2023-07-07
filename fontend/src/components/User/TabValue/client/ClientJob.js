import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./client.css";
import Job from "../../../Job/Job";
import AppliedDeveloper from "./AppliedDeveloper";

const ClientJob = () => {
  const { user } = useSelector((state) => state.user);
  const [appliedDev, setAppliedDev] = useState(false);
  const [appliedDevData, setAppliedDevData] = useState();
  // Job Options
  const options = {
    save: false,
    applyDev: true,
  };
  return (
    <>
      <div className="client-job-container">
        <div className="client-create-job-container">
          <Link to={"/create-client-job"} target="_blank">
            <img src={user.avatar.url} alt="profile" />
            <p>Create Job</p>
          </Link>
        </div>
        <div className="client-all-job">
          <h3>All Jobs</h3>
          {user.myJobs.length <= 0 && <p>No Jobs Found! Create a Job.</p>}
          {user.myJobs.map((val, ind) => {
            return (
              <Job
                options={options}
                val={val}
                key={ind}
                setAppliedDev={setAppliedDev}
                setAppliedDevData={setAppliedDevData}
              />
            );
          })}
        </div>
      </div>
      {appliedDev && (
        <div className="applied-developer-container">
          <AppliedDeveloper
            setAppliedDev={setAppliedDev}
            appliedDevData={appliedDevData}
          />
        </div>
      )}
    </>
  );
};

export default ClientJob;
