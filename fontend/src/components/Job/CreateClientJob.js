import React, { useEffect, useRef, useState } from "react";
import "./clientJob.css";
import { BsCurrencyDollar } from "react-icons/bs";
import { FcBusinessman } from "react-icons/fc";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createJob } from "../../redux/actions/jobActions";
import Loader from "../Loader/Loader";
import MetaData from "../MetaData";
import { useNavigate } from "react-router-dom";

const CreateClientJob = () => {
  const dispatch = useDispatch();
  const { loading, success } = useSelector((state) => state.jobs);
  const history = useNavigate();

  //Jodit Rich Text Editor
  const [about, setAbout] = useState(null);
  const editor = useRef(null);

  //Job Data
  const [caption, setCaption] = useState(null);
  const [time, setTime] = useState("Full-Time");
  const [label, setLabel] = useState("Begginer");
  const [sallery, setSellery] = useState(null);
  const [location, setLocation] = useState(null);
  const [startEmployee, setStartEmployee] = useState(null);
  const [endEmployee, setEndEmployee] = useState(null);

  console.log(
    caption,
    time,
    label,
    sallery,
    location,
    startEmployee,
    endEmployee
  );

  const handleCreateJob = () => {
    if (caption === null) {
      toast("Caption is Requiered");
    } else if (about === null) {
      toast("Time is Required");
    } else if (sallery === null) {
      toast("Sallery is Required");
    } else if (location === null) {
      toast("Location is Required");
    } else if (startEmployee === null) {
      toast("Start Employee is Required");
    } else if (endEmployee === null) {
      toast("End Employee is Required");
    } else {
      const data = {
        caption: caption,
        about: about,
        time: time,
        label: label,
        salary: sallery,
        location: location,
        startEmployee: startEmployee,
        endEmployee: endEmployee,
      };
      dispatch(createJob(data));
      setCaption(null);
      setTime("Full-Time");
      setLabel("Begginer");
      setSellery(null);
      setLocation(null);
      setStartEmployee(null);
      setEndEmployee(null);
    }
  };
  useEffect(() => {
    if (success) {
      toast("Job Created Successfully");
    }
  }, [success]);
  return (
    <>
      <MetaData title={"Create Your Job....."} />
      {loading ? (
        <Loader />
      ) : (
        <div className="create-client-job-container">
          <div className="create-client-job-box">
            <label>Caption*</label>
            <input
              type="text"
              placeholder="Enter your job title"
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
          <div className="create-client-job-box">
            <label>About*</label>
            <JoditEditor
              ref={editor}
              value={about}
              name="caption"
              onChange={(e) => {
                setAbout(e);
              }}
            />
          </div>
          <div className="create-client-job-box">
            <label>Time*</label>
            <select onChange={(e) => setTime(e.target.value)}>
              <option>Full-Time</option>
              <option>Part-Time</option>
            </select>
          </div>
          <div className="create-client-job-box">
            <label>Label*</label>
            <select onChange={(e) => setLabel(e.target.value)}>
              <option>Begginer</option>
              <option>Intermidiate</option>
              <option>Expart</option>
            </select>
          </div>
          <div className="create-client-job-box">
            <label>Salery*</label>
            <div className="job-salary-box">
              <span>
                <BsCurrencyDollar />
              </span>
              <input
                type="text"
                placeholder="Enter Job Sallery"
                onChange={(e) => setSellery(e.target.value)}
              />
            </div>
          </div>
          <div className="create-client-job-box display-flex">
            <div className="left-box">
              <label>Start Employee*</label>
              <div>
                <span>
                  <FcBusinessman />
                </span>
                <input
                  type="text"
                  placeholder="Enter developer amount"
                  onChange={(e) => setStartEmployee(e.target.value)}
                />
              </div>
            </div>
            <div className="right-box">
              <label>End Employee*</label>
              <div>
                <span>
                  <FcBusinessman />
                </span>
                <input
                  type="text"
                  placeholder="Enter developer amount"
                  onChange={(e) => setEndEmployee(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="create-client-job-box">
            <label>Location</label>
            <input
              type="text"
              placeholder="Enter Job Location"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="create-client-job-box">
            <button onClick={handleCreateJob}>Create A Job</button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateClientJob;
