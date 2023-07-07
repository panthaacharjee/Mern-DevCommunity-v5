import React, { useState, useRef, useEffect } from "react";
import "./TabValue.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createQuestion } from "../../../redux/actions/stackActions";
import JoditEditor from "jodit-react";
import { RxCross2 } from "react-icons/rx";
import Question from "../../Problems/Question";
import Pagination from "../../CustomComponent/Pagination";
import Loader from "../../Loader/Loader";

const Myproblems = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.questions);

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

  //Arrray Reverse
  const [problemData, setProblemData] = useState(user.questions);

  useEffect(() => {
    setProblemData(user.questions.reverse());
  }, [user]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="my-questions">
            <div className="questions-header">
              <p>All Questions ({user.questions.length})</p>
              {isAuthenticated ? (
                <button onClick={() => setAskShow(true)}>Ask Question</button>
              ) : (
                <Link to="/login">Ask Question</Link>
              )}
            </div>
            <div className="all-questions-container">
              {problemData.length <= 0 && (
                <p
                  style={{
                    marginTop: "20px",
                    marginLeft: "20px",
                    padding: "15px 0px",
                  }}
                >
                  No problem has posted by you!
                </p>
              )}
              {problemData.slice(firstIndex, lastIndex).map((val, ind) => {
                return <Question key={ind} val={val} />;
              })}
            </div>
          </div>
          <Pagination
            firstIndex={firstIndex}
            lastIndex={lastIndex}
            setFirstIndex={setFirstIndex}
            setLastIndex={setLastIndex}
            questions={user.questions}
          />
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

export default Myproblems;
