import React, { useEffect, useState } from "react";
import "./singlejob.css";
import { useDispatch, useSelector } from "react-redux";
import { applyJob, getSingleJob } from "../../../redux/actions/jobActions";
import { useParams, Link } from "react-router-dom";
import Loader from "../../Loader/Loader";
import ReactTimeAgos from "../../CustomComponent/ReactTimeAgos";
import { BsFillBagFill, BsLockFill } from "react-icons/bs";
import { FaClipboardList, FaRegMoneyBillAlt } from "react-icons/fa";
import { AiFillCamera } from "react-icons/ai";
import { FcIdea } from "react-icons/fc";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
var fileDownload = require("js-file-download");

const Singlejob = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { job, loading } = useSelector((state) => state.job);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  console.log(job);
  //Save Job
  const [save, setSave] = useState(true);
  const handleSave = (props) => {
    if (props === "save") {
      setSave(false);
      toast("This job is saved");
      // fileDownload(job.applicants[0].cv, "cv.pdf");
    } else {
      setSave(true);
      toast("This job is unsave");
    }
  };

  //Apply Job
  const [applyShow, setApplyShow] = useState(false);
  const [cv, setCv] = useState();
  const handleChange = (e) => {
    if (e.target.name === "cv") {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.readyState === 2) {
          setCv(reader.result);
          toast("Pdf Selected");
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const handleApply = () => {
    if (cv) {
      if (user.role === "developer") {
        const data = {
          cv: cv,
        };
        dispatch(applyJob(job._id, data));
        setCv();
        setApplyShow(false);
      } else {
        toast("You are not applicable. Please create a developer account");
      }
    } else {
      toast("CV is required");
    }
  };
  const [applied, setApplied] = useState(false);
  // const path = job.applicants.filter((val) => val.user === user._id);
  console.log(job.owner);

  console.log(job.applicants);
  useEffect(() => {
    dispatch(getSingleJob(id));
  }, [id]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="singlejob-container">
            <h2>{job.name}</h2>
            <div className="single-job-description">
              {job.owner && <p>{job.owner.name}</p>}
              <p>{job.location}</p>
              {job.createdAt && (
                <p style={{ color: "green" }}>
                  <ReactTimeAgos date={job.createdAt} />
                </p>
              )}
            </div>
            <div className="single-job-first">
              <div>
                <p>
                  <span>
                    <BsFillBagFill />
                  </span>
                  {job.time}
                </p>
                +<p>{job.label}</p>
              </div>
              <div>
                <span>
                  <FaClipboardList />
                </span>
                <p>
                  {job.startEmployee}-{job.endEmployee} employees
                </p>
              </div>
              <div>
                <span>
                  <FaRegMoneyBillAlt />
                </span>
                <p>$ {job.salary}</p>
              </div>
              {job.applicants && job.applicants.length > 0 ? (
                <div>
                  <span>
                    <FcIdea />
                  </span>
                  <p>
                    See how you compare to {job.applicants.length} applicants.
                    <Link
                      to="#"
                      style={{
                        textDecoration: "underline",
                        marginLeft: "10px",
                      }}
                    >
                      <span>
                        <BsLockFill />
                      </span>
                      Try Premeum for Free
                    </Link>
                  </p>
                </div>
              ) : null}
            </div>
            {isAuthenticated && (
              <div className="single-job-btn-box">
                {!applied ? (
                  <button onClick={() => setApplyShow(true)}>Apply</button>
                ) : (
                  <button>Applied</button>
                )}
                {save ? (
                  <button
                    style={{
                      background: "none",
                      border: "2px solid rgb(1, 1, 77) ",
                      color: "#000",
                    }}
                    onClick={() => handleSave("save")}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    style={{
                      background: "none",
                      border: "2px solid rgb(1, 1, 77) ",
                      color: "#000",
                    }}
                    onClick={() => handleSave("saved")}
                  >
                    Saved
                  </button>
                )}
              </div>
            )}
            <div className="single-job-about">
              <h3>About the job</h3>
              <p dangerouslySetInnerHTML={{ __html: job.about }} />
            </div>
            <div className="about-company-box">
              <h3>About the company</h3>
              <div>
                {job.owner && <img src={job.owner.avatar.url} alt="image" />}
                <div>
                  <div>
                    {job.owner && <h4>{job.owner.name}</h4>}
                    <p>47,710 followers</p>
                  </div>
                  <button>+ Follow</button>
                </div>
              </div>
              {job.owner && (
                <p dangerouslySetInnerHTML={{ __html: job.owner.about }} />
              )}
            </div>
          </div>
          {isAuthenticated
            ? applyShow && (
                <div className="apply-job-container">
                  <div className="apply-job-box">
                    <div className="apply-job-box-header">
                      <h4>Share your profile?</h4>
                      <p
                        onClick={() => {
                          setApplyShow(false);
                          setCv();
                        }}
                      >
                        <RxCross1 />
                      </p>
                    </div>
                    <div className="apply-job-user-box">
                      <img src={user.avatar.url} alt="user-avatar" />
                      <div>
                        <h4>{user.name}</h4>
                        <p>{user.title}</p>
                        <label>{user.location}</label>
                      </div>
                    </div>
                    <div className="apply-job-cv-box">
                      <input
                        type="file"
                        id="file-upload"
                        onChange={handleChange}
                        name="cv"
                        accept="application/pdf"
                      />
                      <label htmlFor="file-upload" style={{ color: "#fff" }}>
                        ADD CV
                      </label>
                    </div>
                    <div className="apply-job-btn-box">
                      <button onClick={handleApply}>Continue</button>
                    </div>
                  </div>
                </div>
              )
            : null}
        </>
      )}
    </>
  );
};

export default Singlejob;
