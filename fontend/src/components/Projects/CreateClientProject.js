import React, { useRef, useState } from "react";
import "./clientProject.css";
import JoditEditor from "jodit-react";
import { BsCurrencyDollar } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "../../redux/actions/projectActions";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";

const CreateClientProject = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.projects);
  //Jodit Rich Text Editor
  const [about, setAbout] = useState(null);
  const editor = useRef(null);

  const [caption, setCaption] = useState();
  const [time, setTime] = useState("Full-Time");
  const [label, setLabel] = useState("Begginer");
  const [price, setPrice] = useState();
  const [pType, setPType] = useState("Fixed Price");
  const [type, setType] = useState("One Type");
  const [category, setCategory] = useState("Fontend Developer");
  const [location, setLocation] = useState();
  const [length, setLength] = useState("Under 3 Months");
  const [skills, setSkills] = useState({ skill: "" });
  const [skillArray, setSkillArray] = useState([]);

  //Skill Add Button
  const handleSkillAdd = () => {
    setSkillArray([...skillArray, skills]);
  };

  //Skill Delete Button
  const handleSkillDelete = (index) => {
    const update = skillArray.filter((val, ind) => ind !== index);
    setSkillArray(update);
  };
  //Handle Create Projce Function
  const handleCreateProject = () => {
    if (caption === null) {
      toast("Capiton is Required");
    } else if (price === null) {
      toast("Price is Required");
    } else if (location === null) {
      toast("Location is Required");
    } else {
      const data = {
        caption: caption,
        about: about,
        time: time,
        label: label,
        price: price,
        priceType: pType,
        location: location,
        type: type,
        category: category,
        length: length,
        skills: skillArray,
      };
      dispatch(createProject(data));
    }
  };

  return (
    <>
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
            <label>Price*</label>
            <div className="job-salary-box">
              <span>
                <BsCurrencyDollar />
              </span>
              <input
                type="text"
                placeholder="Enter Prject Price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="create-client-job-box">
            <label>Project Type*</label>
            <select onChange={(e) => setPType(e.target.value)}>
              <option>Fixed Price</option>
              <option>Hourly</option>
            </select>
          </div>
          <div className="create-client-job-box">
            <label>Type*</label>
            <select onChange={(e) => setType(e.target.value)}>
              <option>One Type</option>
              <option>Long Time</option>
              <option>Complex Project</option>
            </select>
          </div>
          <div className="create-client-job-box">
            <label>Category*</label>
            <select onChange={(e) => setCategory(e.target.value)}>
              <option>Fontend Developer</option>
              <option>Backend Developer</option>
              <option>Full Stack Developer</option>
            </select>
          </div>
          <div className="create-client-job-box">
            <label>Length*</label>
            <select onChange={(e) => setLength(e.target.value)}>
              <option>Under 3 Months</option>
              <option>Over 3 Months</option>
            </select>
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
            <label>Skills</label>
            <input
              type="text"
              required
              placeholder="Enter Developer Skills"
              onChange={(e) => setSkills({ skill: e.target.value })}
            />
            <button
              className="client-project-skill-add-btn"
              onClick={handleSkillAdd}
            >
              ADD
            </button>
          </div>
          <div className="create-client-job-box">
            {skillArray.map((val, ind) => {
              return (
                <button key={ind} onClick={() => handleSkillDelete(ind)}>
                  {val.skill}
                </button>
              );
            })}
          </div>
          <div className="create-client-job-box">
            <button onClick={handleCreateProject}>Create A Project</button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateClientProject;
