import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

const Bidder = ({ val }) => {
  const [showCover, setShowCover] = useState(false);
  return (
    <>
      <div className="applied-developer-single">
        <Link to={`/single-developer/${val.user._id}`} className="first-box">
          <img src={val.user.avatar.url} />
          <div>
            <p>{val.user.name}</p>
            <p>{val.user.title}</p>
          </div>
        </Link>
        <div className="second-box">
          <p>$ {val.bidPrice}</p>
          <p style={{ cursor: "pointer" }}>{val.projectId}</p>
          <p>{val.projectTime}</p>
          <button onClick={() => setShowCover(true)}>Cover Letter</button>
        </div>
      </div>
      {showCover && (
        <div className="cover-letter-container">
          <div className="cover-letter-box">
            <div className="cover-letter-header">
              <p>Cover Letter</p>
              <span onClick={() => setShowCover(false)}>
                <RxCross1 />
              </span>
            </div>
            <div className="cover-letter-text">
              <p dangerouslySetInnerHTML={{ __html: val.coverLetter }} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Bidder;
