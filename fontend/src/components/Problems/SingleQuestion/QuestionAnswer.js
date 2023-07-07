import React, { useEffect, useState } from "react";
import ReactTimeAgos from "../../CustomComponent/ReactTimeAgos";
import { GrLike } from "react-icons/gr";
import { AiFillLike, AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAnswer,
  likeAndUnlikeAnswer,
} from "../../../redux/actions/stackActions";

const QuestionAnswer = ({ val, setUpdateAnsShow, setAnswerId, id }) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  //Answer Like
  const [like, setLike] = useState(true);
  const [likeCount, setLikeCount] = useState(val.likes.length);
  const handleLike = (props) => {
    if (props === "like") {
      dispatch(likeAndUnlikeAnswer(val._id));
      setLikeCount(likeCount + 1);
      setLike(false);
    } else {
      dispatch(likeAndUnlikeAnswer(val._id));
      setLikeCount(likeCount - 1);
      setLike(true);
    }
  };

  //Answer Edit
  const [editAnswerShow, setEditAnswerShow] = useState(false);
  const editHandle = () => {
    setUpdateAnsShow(true);
    setAnswerId(val._id);
    setEditAnswerShow(false);
  };

  //Answer Delete
  const handleDelete = () => {
    const data = {
      answerId: val._id,
    };
    dispatch(deleteAnswer(id, data));
    // console.log(val._id);
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (val.likes.includes(user._id)) {
        setLike(false);
      }
    }
    // document.body.addEventListener(
    //   "click",
    //   function () {
    //     setEditAnswerShow(false);
    //   },
    //   true
    // );
  }, [user]);

  return (
    <div className="answer-container">
      <div className="user-box">
        <div>
          <img src={val && val.user.avatar.url} alt="avatar" />
          <div>
            <p>{val.user.name}</p>
            <ReactTimeAgos date={val.createdAt} />
          </div>
        </div>
        {isAuthenticated
          ? user._id === val.user._id && (
              <div className="user-box-edit">
                <span onClick={() => setEditAnswerShow(!editAnswerShow)}>
                  <BsThreeDotsVertical />
                </span>
                {editAnswerShow && (
                  <div>
                    <p onClick={editHandle}>
                      <span>
                        <AiOutlineEdit />
                      </span>
                      Edit
                    </p>
                    <p onClick={handleDelete}>
                      <span>
                        <AiFillDelete />
                      </span>
                      Delete
                    </p>
                  </div>
                )}
              </div>
            )
          : null}
      </div>
      <p dangerouslySetInnerHTML={{ __html: val.answer }} />
      <div className="answer-like">
        {like ? (
          <div
            onClick={() => {
              handleLike("like");
            }}
          >
            <span>
              <GrLike />
            </span>
            <p>Like</p>
          </div>
        ) : (
          <div
            onClick={() => {
              handleLike("unlike");
            }}
          >
            <span>
              <AiFillLike />
            </span>
            <p style={{ color: "#002229" }}>Unlike</p>
          </div>
        )}
        <p>{likeCount} likes</p>
      </div>
    </div>
  );
};

export default QuestionAnswer;
