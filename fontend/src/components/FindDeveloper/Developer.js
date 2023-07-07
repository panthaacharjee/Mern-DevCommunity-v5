import React from "react";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

const Developer = ({ val }) => {
  return (
    <Grid md={2}>
      <Link to={`/single-developer/${val._id}`} className="developer-container">
        <img src={val.avatar.url} />
        <div>
          <h5>{val.name}</h5>
        </div>
      </Link>
    </Grid>
  );
};

export default Developer;
