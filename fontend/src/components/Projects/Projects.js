import React, { useEffect, useState } from "react";
import "./projects.css";
import { BiSearchAlt2 } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProject } from "../../redux/actions/projectActions";
import Loader from "../Loader/Loader";
import Project from "./Project";
import MetaData from "../MetaData";

const Projects = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { keyword } = useParams();
  const { projects, loading } = useSelector((state) => state.projects);

  //Search Job
  const [key, setKey] = useState("");
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (key.trim()) {
      history(`/projects/${key}`);
    } else {
      history("/projects");
    }
  };

  const options = {
    save: true,
    applyDev: false,
  };

  useEffect(() => {
    dispatch(getAllProject(keyword));
  }, [keyword]);
  return (
    <>
      <MetaData title={"Find Your Projects..."} />
      {loading ? (
        <Loader />
      ) : (
        <div className="projects-container">
          <form className="search-box" onSubmit={searchSubmitHandler}>
            <input
              type="text"
              placeholder="Search your projects....."
              onChange={(e) => setKey(e.target.value)}
            />
            <button>
              <BiSearchAlt2 />
            </button>
          </form>
          <div className="all-projects-container">
            <h4 style={{ marginBottom: "20px" }}>Projects you might like</h4>
            {projects &&
              projects.map((val, ind) => {
                return <Project key={ind} val={val} options={options} />;
              })}
            {projects.length <= 0 && (
              <p style={{ paddingBottom: "15px", paddingLeft: "15px" }}>
                No Project Found
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;
