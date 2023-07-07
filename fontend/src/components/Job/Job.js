import React, { useState } from "react";
import "./jobs.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import ReactTimeAgos from "../CustomComponent/ReactTimeAgos";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteJob } from "../../redux/actions/jobActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";

const Job = ({ val, options, setAppliedDev, setAppliedDevData }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.jobs);
  const [save, setSave] = useState(true);
  const handleSave = (props) => {
    if (props === "save") {
      setSave(false);
      toast("Job Saved");
    } else {
      setSave(true);
      toast("Job Unsaved");
    }
  };
  const handleApplyDev = () => {
    setAppliedDev(true);
    setAppliedDevData(val);
  };

  const handleDelete = () => {
    dispatch(deleteJob(val._id));
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="job-container">
          <Link to={`/job/${val._id}`}>
            <img src={val.owner.avatar.url} alt="client-avatar" />
            <div className="job-box">
              <h4>{val.name}</h4>
              <p>{val.owner.name}</p>
              <label>{val.location}</label>
              <p style={{ marginTop: "10px", color: "green" }}>
                <ReactTimeAgos date={val.createdAt} />
              </p>
            </div>
          </Link>
          {options.save ? (
            <>
              {save ? (
                <p onClick={() => handleSave("save")}>
                  <AiOutlineHeart />
                </p>
              ) : (
                <p onClick={() => handleSave("unsave")}>
                  <AiFillHeart />
                </p>
              )}
            </>
          ) : null}
          <>
            {val.applicants.length > 0 && options.applyDev && (
              <button
                className="applied-developer-btn"
                onClick={handleApplyDev}
              >
                Applied Developer
              </button>
            )}
            {options.applyDev && (
              <button className="job-delete-btn" onClick={handleDelete}>
                Delete
              </button>
            )}
          </>
        </div>
      )}
    </>
  );
};

export default Job;
