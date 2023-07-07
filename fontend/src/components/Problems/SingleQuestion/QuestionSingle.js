import React, { useEffect, useRef, useState } from "react";
import "./singlequestion.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createAnswer,
  deleteQuestion,
  getQuestion,
  updateAnswer,
} from "../../../redux/actions/stackActions";
import ReactTimeAgo from "react-time-ago";
import Loader from "../../Loader/Loader";
import { GrLike } from "react-icons/gr";
import { AiFillDelete, AiFillLike } from "react-icons/ai";
import QuestionAnswer from "./QuestionAnswer";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";
import { GiCrossedBones } from "react-icons/gi";
import MetaData from "../../MetaData";

const QuestionSingle = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { question } = useSelector((state) => state.question.question);
  const { loading } = useSelector((state) => state.question);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const [like, setLike] = useState();

  //Jodit
  const [desc, setDesc] = useState();
  const editor = useRef(null);
  //Create Answwer
  const handleAnswer = () => {
    if (desc.length > 11) {
      const data = {
        answer: desc,
      };
      dispatch(createAnswer(id, data));
      setDesc();
    } else {
      toast("Answer is required");
    }
  };

  //Question Delete
  const handleDelete = () => {
    dispatch(deleteQuestion(id));
    // console.log(id);
  };

  //Update Answer
  const [updateAns, setUpdateAns] = useState();
  const [updateAnsShow, setUpdateAnsShow] = useState(false);
  const [answerId, setAnswerId] = useState();
  const handleUpdateAns = () => {
    if (updateAns.length > 11) {
      const data = {
        answer: updateAns,
        answerId: answerId,
      };
      dispatch(updateAnswer(id, data));
      setUpdateAns();
    } else {
      toast("Answer is required");
      setUpdateAnsShow(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && question) {
      if (question.likes.includes(user._id)) {
        setLike(false);
      }
    }
    dispatch(getQuestion(id));
  }, [id, user]);
  return (
    <>
      <MetaData title={question && question.question} />
      {loading ? (
        <Loader />
      ) : (
        question && (
          <>
            <div className="single-question-container">
              <div className="single-question-header">
                <h2>{question.question}</h2>
                <div className="section-1">
                  <p>
                    asked <ReactTimeAgo date={question.createdAt} />
                  </p>
                  <p>viewed {question && question.views.length} times</p>
                </div>
                <div className="section-2">
                  <p
                    dangerouslySetInnerHTML={{ __html: question.description }}
                  />
                </div>
                <div className="section-3">
                  {question.tags.map((val, ind) => {
                    return <p key={ind}>{val.tag}</p>;
                  })}
                </div>
                {/* <div className="section-4">
                  {like ? (
                    <div>
                      <span>
                        <GrLike />
                      </span>
                      <p>Like</p>
                    </div>
                  ) : (
                    <div>
                      <span>
                        <AiFillLike />
                      </span>
                      <p style={{ color: "#002229" }}>Unlike</p>
                    </div>
                  )}
                  <p>{question.likes.length} likes</p>
                </div> */}

                {isAuthenticated
                  ? user._id === question.owner._id && (
                      <div className="user-box-edit profile-question-delete-box">
                        <span onClick={handleDelete}>
                          <AiFillDelete />
                        </span>
                      </div>
                    )
                  : null}
              </div>
              <div className="single-question-middle">
                {question.answers.length > 0 ? (
                  <p>All Answers [{question.answers.length}]</p>
                ) : (
                  <p>No Answer</p>
                )}
                {question.answers.map((val, ind) => {
                  return (
                    <QuestionAnswer
                      val={val}
                      key={ind}
                      setUpdateAnsShow={setUpdateAnsShow}
                      setAnswerId={setAnswerId}
                      id={id}
                    />
                  );
                })}
              </div>
              <div className="single-question-footer">
                <p>Your Answer</p>
                <div>
                  <JoditEditor
                    ref={editor}
                    value={desc}
                    name="description"
                    onChange={(e) => {
                      setDesc(e);
                    }}
                  />
                </div>
                {isAuthenticated ? (
                  <button onClick={handleAnswer}>Answer</button>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </div>
            </div>
            {updateAnsShow && (
              <div className="answer-update-container">
                <div className="answer-update-box">
                  <div className="answer-update-header">
                    <p>Update Answer</p>
                    <span onClick={() => setUpdateAnsShow(false)}>
                      <GiCrossedBones />
                    </span>
                  </div>
                  <div className="answer-update-middle">
                    <JoditEditor
                      ref={editor}
                      value={updateAns}
                      onChange={(e) => {
                        setUpdateAns(e);
                      }}
                    />
                  </div>
                  <div className="answer-update-footer">
                    <button onClick={handleUpdateAns}>Update</button>
                  </div>
                </div>
              </div>
            )}
          </>
        )
      )}
    </>
  );
};

export default QuestionSingle;
