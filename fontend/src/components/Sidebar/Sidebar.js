import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { HiShoppingBag } from "react-icons/hi";
import { RiProjectorLine } from "react-icons/ri";
import { BsFillFilePostFill } from "react-icons/bs";
import {
  AiFillQuestionCircle,
  AiFillMessage,
  AiFillSetting,
  AiFillHeart,
} from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";

const Sidebar = ({ sidebar }) => {
  return (
    <div className="sidebar-box">
      {sidebar ? (
        <>
          <Link to="/jobs">
            <span>
              <HiShoppingBag />
            </span>
            <p>Jobs</p>
          </Link>
          <Link to="/projects">
            <span>
              <RiProjectorLine />
            </span>
            <p>Projects</p>
          </Link>

          <Link to="/posts">
            <span>
              <BsFillFilePostFill />
            </span>
            <p>Posts</p>
          </Link>
          <Link to="/questions">
            <span>
              <AiFillQuestionCircle />
            </span>
            <p>Problems</p>
          </Link>
          <Link to="/find-developer">
            <span>
              <IoIosPeople />
            </span>
            <p>Find Developer</p>
          </Link>
          <Link to="#">
            <span>
              <AiFillMessage />
            </span>
            <p>Messages</p>
          </Link>
        </>
      ) : (
        <>
          <Link to="/jobs">
            <span>
              <HiShoppingBag />
            </span>
          </Link>
          <Link to="/projects">
            <span>
              <RiProjectorLine />
            </span>
          </Link>

          <Link to="/posts">
            <span>
              <BsFillFilePostFill />
            </span>
          </Link>
          <Link to="/questions">
            <span>
              <AiFillQuestionCircle />
            </span>
          </Link>
          <Link to="/find-developer">
            <span>
              <IoIosPeople />
            </span>
          </Link>
          <Link to="/message">
            <span>
              <AiFillMessage />
            </span>
          </Link>
        </>
      )}
    </div>
  );
};

export default Sidebar;
