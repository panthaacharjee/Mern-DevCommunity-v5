import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Project from "../../../Projects/Project";
import { RxCross1 } from "react-icons/rx";
import Bidder from "./Bidder";
import Loader from "../../../Loader/Loader";

const ClientProject = () => {
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.completeProject);
  // Project Options
  const options = {
    save: false,
    applyDev: true,
  };
  const ongoingOptions = {
    save: false,
    appliedDev: false,
    complite: true,
  };
  const completeOptions = {
    save: false,
    appliedDev: false,
    complite: false,
  };
  const [appliedDev, setAppliedDev] = useState(false);
  const [appliedDevData, setAppliedDevData] = useState();

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="client-project-container">
            <div className="client-create-project-container">
              <Link to={"/create-client-project"} target="_blank">
                <img src={user.avatar.url} alt="profile" />
                <p>Create Project</p>
              </Link>
            </div>
            <div className="client-all-project">
              <h3>All Projects</h3>
              {user.myProjects.length <= 0 && (
                <p>No Projects Found! Create a Project.</p>
              )}
              {user.myProjects.map((val, ind) => {
                return (
                  <Project
                    val={val}
                    key={ind}
                    options={options}
                    setAppliedDev={setAppliedDev}
                    setAppliedDevData={setAppliedDevData}
                  />
                );
              })}
            </div>
            <div className="client-all-project">
              <h3>Ongoing Projects</h3>
              {user.ongoingProjectsClient.length <= 0 && (
                <p>No Projects Found!</p>
              )}
              {user.ongoingProjectsClient.map((val, ind) => {
                return <Project val={val} key={ind} options={ongoingOptions} />;
              })}
            </div>
            <div className="client-all-project">
              <h3>Complete Projects</h3>
              {user.completeProjectsClient.length <= 0 && (
                <p>No Projects Found!</p>
              )}
              {user.completeProjectsClient.map((val, ind) => {
                return (
                  <Project val={val} key={ind} options={completeOptions} />
                );
              })}
            </div>
          </div>
          {appliedDev && (
            <div className="applied-developer-container">
              <div className="applied-developer-box">
                <div className="applied-developer-header">
                  <p>All Developer</p>
                  <button onClick={() => setAppliedDev(false)}>
                    <RxCross1 style={{ marginTop: "5px" }} />
                  </button>
                </div>
                <div className="applied-developer-middle">
                  {appliedDevData.proposers &&
                    appliedDevData.proposers.map((val, ind) => {
                      return <Bidder val={val} key={ind} />;
                    })}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ClientProject;
