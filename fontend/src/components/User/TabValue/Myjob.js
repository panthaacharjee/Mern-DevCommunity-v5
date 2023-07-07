import React from "react";
import { useSelector } from "react-redux";
import Job from "../../Job/Job";
import { Link } from "react-router-dom";

const Myjob = () => {
  const { user } = useSelector((state) => state.user);
  const options = {
    save: false,
  };
  return (
    <div className="my-job-container">
      <h3>Applied Jobs</h3>
      {user.jobs.length <= 0 && (
        <div>
          <p>No Jobs has applied by you!</p>
          <Link
            to="/jobs"
            style={{
              background: "black",
              padding: "8px 20px",
              borderRadius: "8px",
              color: "#fff",
              marginTop: "10px",
              display: "block",
              width: "12%",
            }}
          >
            Apply A Job
          </Link>
        </div>
      )}
      {user.jobs.map((val, ind) => {
        return <Job val={val} key={ind} options={options} />;
      })}
    </div>
    // <></>
  );
};

export default Myjob;
