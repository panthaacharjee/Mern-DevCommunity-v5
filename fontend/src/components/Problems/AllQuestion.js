import React, { useEffect, useRef, useState } from "react";
import "./Question.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createQuestion,
  getAllQuestions,
} from "../../redux/actions/stackActions";
import Question from "./Question";
import Loader from "../Loader/Loader";
import { RxCross2 } from "react-icons/rx";
import JoditEditor from "jodit-react";
import { Link } from "react-router-dom";
import Pagination from "../CustomComponent/Pagination";
import MetaData from "../MetaData";

const AllQuestion = () => {
  const dispatch = useDispatch();
  const { questions, loading } = useSelector((state) => state.questions);
  const { isAuthenticated } = useSelector((state) => state.user);

  //Ask Question Show and Hidden
  const [askShow, setAskShow] = useState(false);

  //Ask Quetion
  const [question, setQuestion] = useState();
  //JODIT
  const [desc, setDesc] = useState();
  const editor = useRef(null);
  const [tags, setTags] = useState({
    tag: "",
  });
  const [tagArray, setTagArray] = useState([]);
  const addTags = () => {
    setTagArray([...tagArray, tags]);
    setTags({ tag: "" });
  };
  const deleteTags = (index) => {
    const array = tagArray.filter((val, ind) => ind !== index);
    setTagArray(array);
  };

  //Handle Question
  const handleQuestionSubmit = () => {
    const data = {
      question: question,
      description: desc,
      tags: tagArray,
    };

    dispatch(createQuestion(data));
    setTagArray([]);
    setDesc("");
  };

  //Pagination
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(10);

  //USEEFFECT
  useEffect(() => {
    dispatch(getAllQuestions());
  }, []);
  return (
    <>
      <MetaData title="All Questions" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="questions">
            <div className="questions-header">
              <p>All Questions ({questions.length})</p>
              {isAuthenticated ? (
                <button onClick={() => setAskShow(true)}>Ask Question</button>
              ) : (
                <Link to="/login">Ask Question</Link>
              )}
            </div>
            <div className="all-questions-container">
              {questions.slice(firstIndex, lastIndex).map((val, ind) => {
                return <Question key={ind} val={val} />;
              })}
            </div>
          </div>
          {questions.length > 9 && (
            <Pagination
              firstIndex={firstIndex}
              lastIndex={lastIndex}
              setFirstIndex={setFirstIndex}
              setLastIndex={setLastIndex}
              questions={questions}
            />
          )}
          {askShow && (
            <div className="ask-question-container">
              <div className="ask-question-box">
                <div className="ask-question-header">
                  <p></p>
                  <span onClick={() => setAskShow(false)}>
                    <RxCross2 />
                  </span>
                </div>
                <div className="ask-question-footer">
                  <div>
                    <textarea
                      type="text"
                      required
                      placeholder="Ask your question"
                      onChange={(e) => setQuestion(e.target.value)}
                    />
                  </div>
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
                  <div className="ask-tag-container">
                    <input
                      onChange={(e) => setTags({ tag: e.target.value })}
                      required
                      placeholder="Enter a Tag"
                    />
                    <button onClick={addTags}>Add</button>
                    <div>
                      {tagArray.length > 0 &&
                        tagArray.map((val, ind) => {
                          return (
                            <p key={ind} onClick={() => deleteTags(ind)}>
                              {val.tag}
                            </p>
                          );
                        })}
                    </div>
                  </div>
                </div>
                <button onClick={handleQuestionSubmit}>Question</button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AllQuestion;
