import React, { useEffect } from "react";
import "./jobs.css";
import { BiSearchAlt2 } from "react-icons/bi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { getAllJob } from "../../redux/actions/jobActions";
import { useDispatch, useSelector } from "react-redux";
import Job from "./Job";
import Loader from "../Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import MetaData from "../MetaData";

const Jobs = () => {
  const dispatch = useDispatch();
  const { jobs, loading } = useSelector((state) => state.jobs);
  const { keyword } = useParams();
  const history = useNavigate();

  //Search Job
  const [key, setKey] = useState("");
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (key.trim()) {
      history(`/jobs/${key}`);
    } else {
      history("/jobs");
    }
  };

  const [ar, setAr] = useState(1);
  const fucn = () => {
    setAr(ar + 2);
  };
  console.log(ar);

  // Job Options
  const options = {
    save: true,
    applyDev: false,
  };

  useEffect(() => {
    dispatch(getAllJob(keyword));
  }, [keyword]);
  return (
    <>
      <MetaData title={"Find Your Jobs.."} />
      {loading ? (
        <Loader />
      ) : (
        <div className="jobs-container">
          <form className="jobs-search" onSubmit={searchSubmitHandler}>
            <input
              type="text"
              placeholder="Search your job"
              onChange={(e) => setKey(e.target.value)}
            />
            <button>
              <BiSearchAlt2 />
            </button>
          </form>
          {/* <div className="recomended-jobs-container">
            <h3>Recommended for you</h3>
            <p style={{ marginBottom: "20px" }}>
              Based on your profile and search history
            </p>
            <div>
              {jobs &&
                jobs.map((val, ind) => {
                  return <Job val={val} ind={ind} />;
                })}
            </div>
            <div className="show-more-box">
              <button>
                Show all
                <span style={{ marginLeft: "8px" }}>
                  <AiOutlineArrowRight />
                </span>
              </button>
            </div>
          </div> */}
          <div className="all-jobs-container">
            <h3 style={{ marginBottom: "20px" }}>More jobs for you</h3>

            {jobs &&
              jobs.map((val, ind) => {
                return <Job val={val} key={ind} options={options} />;
              })}
            {jobs.length <= 0 && (
              <p style={{ paddingLeft: "15px", paddingBottom: "15px" }}>
                No Jobs Found
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Jobs;
