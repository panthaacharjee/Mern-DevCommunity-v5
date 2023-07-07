import React from "react";
import ReactTimeAgos from "../CustomComponent/ReactTimeAgos";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { viewQuestion } from "../../redux/actions/stackActions";

const Question = ({ val }) => {
  const dispatch = useDispatch();

  return (
    <Link
      className="question-container"
      to={`/question/${val._id}`}
      onClick={() => {
        dispatch(viewQuestion(val._id));
      }}
    >
      <div className="question-additional-box">
        <p>{val.likes && val.likes.length} likes</p>
        <p>{val.answers && val.answers.length} answers</p>
        <p>{val.views && val.views.length} views</p>
      </div>
      <div className="question-box">
        <h4>{val.question && val.question}</h4>
        {val.description && val.description.length > 64 ? (
          <p
            dangerouslySetInnerHTML={{
              __html: val.description.substr(0, 250),
            }}
          />
        ) : (
          <p dangerouslySetInnerHTML={{ __html: val.description }} />
        )}
        <div className="tag-box">
          {val.tags.map((value, ind) => {
            return <p key={ind}>{value.tag}</p>;
          })}
        </div>
        <div className="owner-box">
          <div>
            <img src={val.owner.avatar.url} alt="owner pic" />
            <p>{val.owner.name}</p>
          </div>
          <ReactTimeAgos date={val.createdAt} />
        </div>
        <div className="edit-icon-box"></div>
      </div>
    </Link>
  );
};

export default Question;
