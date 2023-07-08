import React, { useState } from "react";
import "./Hire.css";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { hireDeveloper } from "../../redux/actions/projectActions";
import Loader from "../Loader/Loader";

const Hire = ({ developer, setShowHire }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.hireDeveloper);

  const [projectId, setProjectId] = useState();
  const handleHire = () => {
    const data = {
      developerId: developer._id,
      projectId: projectId,
    };
    dispatch(hireDeveloper(data));
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="developer-hire-container">
          <div className="developer-hire-box">
            <div className="developer-hire-header">
              <p>Hire</p>
              <span onClick={() => setShowHire(false)}>
                <RxCross1 />
              </span>
            </div>
            <div className="developer-hire-main-box">
              <p>Project Id *</p>
              <input
                type="text"
                placeholder="Enter your project Id"
                required
                onChange={(e) => setProjectId(e.target.value)}
              />
              <button onClick={handleHire}>Hire</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hire;
