import React, { useEffect, useState } from "react";
import "./client.css";
import { RxCross1 } from "react-icons/rx";
import Applicant from "./Applicant.js";
import { sendApplicantsMail } from "../../../../redux/actions/jobActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../../Loader/Loader";

const AppliedDeveloper = ({ setAppliedDev, appliedDevData }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.applicantMail);

  const [mailData, setMailData] = useState([]);

  const sendMail = () => {
    if (mailData.length > 0) {
      const data = {
        applicants: mailData,
        jobDesc: appliedDevData,
      };
      dispatch(sendApplicantsMail(data));
      setMailData([]);
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="applied-developer-box">
          <div className="applied-developer-header-box">
            <h3>
              All Applied Developer {`(${appliedDevData.applicants.length})`}
            </h3>
            <button onClick={() => setAppliedDev(false)}>
              <RxCross1 />
            </button>
          </div>
          <div className="applied-developer-middle-box">
            {appliedDevData.applicants.map((val, ind) => {
              return (
                <Applicant
                  val={val}
                  setMailData={setMailData}
                  mailData={mailData}
                  ind={ind}
                />
              );
            })}
          </div>
          <div className="applied-developer-footer-box">
            <button onClick={sendMail}>Send Mail</button>
          </div>
        </div>
      )}
    </>
  );
};

export default AppliedDeveloper;
