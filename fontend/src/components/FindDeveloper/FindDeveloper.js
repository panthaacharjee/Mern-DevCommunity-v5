import React, { useEffect } from "react";
import "./findDeveloper.css";
import { useDispatch, useSelector } from "react-redux";
import { allDeveloper } from "../../redux/actions/userActions";
import Developer from "./Developer";
import Loader from "../Loader/Loader";
import { Grid } from "@mui/material";
import { AiOutlineSearch } from "react-icons/ai";

const FindDeveloper = () => {
  const dispatch = useDispatch();
  const { loading, developer } = useSelector((state) => state.developer);
  console.log(developer);
  useEffect(() => {
    dispatch(allDeveloper());
  }, [allDeveloper]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="all-developer-container">
          <div className="search-box-container">
            <input type="text" placeholder="search your developer" />
            <button>
              <AiOutlineSearch />
            </button>
          </div>
          <h3>All Developer</h3>
          <Grid container className="all-developer-box">
            {developer.map((val, ind) => {
              return <Developer key={ind} val={val} />;
            })}
          </Grid>
        </div>
      )}
    </>
  );
};

export default FindDeveloper;
