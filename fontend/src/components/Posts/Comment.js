import React, { useEffect, useState } from "react";
import {
  addReply,
  deleteComment,
  getAllPost,
  getSinglePost,
  likeAndUnlikeComment,
} from "../../redux/actions/postActions";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import Reply from "./Reply";
import ReactTimeAgos from "../CustomComponent/ReactTimeAgos";
import { toast } from "react-toastify";

const Comment = ({ val, setSinglePostHidden, postId }) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { loading, success } = useSelector((state) => state.createReply);
  const { post } = useSelector((state) => state.post.post);

  //Handle Comment Like and Comment
  const [commentLike, setCommentLike] = useState(val.likes.length);
  const [like, setLike] = useState(true);
  const handleCommentLike = (props) => {
    if (props === "like") {
      dispatch(likeAndUnlikeComment(val._id));
      setCommentLike(commentLike + 1);
      setLike(false);
    } else {
      dispatch(likeAndUnlikeComment(val._id));
      setCommentLike(commentLike - 1);
      setLike(true);
    }
  };

  //Handle Reply Comment
  const [allReplyShow, setAllReplyShow] = useState(false);

  const [replyShow, setReplyShow] = useState(false);
  const [replyText, setReplyText] = useState();

  const handleReply = () => {
    const myForm = new FormData();
    myForm.set("reply", replyText);
    dispatch(addReply(myForm, val._id));
  };
  const deleteCommentHandle = () => {
    dispatch(deleteComment(val._id));
    dispatch(getSinglePost(post._id));
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (val.likes.includes(user._id)) {
        setLike(false);
      }
    }
    if (success === true && loading === true) {
      dispatch(getSinglePost(post._id));
    }
  }, [user, success, loading, getSinglePost]);

  return (
    <>
      <div className="comment-box">
        <img src={val.user && val.user.avatar.url} />
        <div>
          <div className="comment-box-element">
            <div>
              <p>{val.user && val.user.name}</p>
              {isAuthenticated && user._id === val.user._id ? (
                <span onClick={deleteCommentHandle}>
                  <AiOutlineDelete />
                </span>
              ) : (
                <p style={{ padding: "17px 0px" }}></p>
              )}
            </div>
            <p
              style={{
                fontSize: "11px",
                marginTop: "-5px",
                marginBottom: "10px",
              }}
            >
              <ReactTimeAgos date={val.createdAt} />
            </p>
            <label>{val && val.comment}</label>
            {val.comment && <br />}
            {val.image && <img src={val.image} alt="" />}
            {commentLike > 0 && (
              <div className="comment-like">
                <span>
                  <FcLike />
                </span>
                <p>{commentLike}</p>
              </div>
            )}
          </div>
          <div className="comment-like-reply-box">
            {like ? (
              <button onClick={() => handleCommentLike("like")}>Like</button>
            ) : (
              <button onClick={() => handleCommentLike("unlike")}>
                Unlike
              </button>
            )}
            <button onClick={() => setReplyShow(!replyShow)}>Reply</button>
          </div>
        </div>
      </div>
      <div className="reply-option-box">
        {replyShow && (
          <div className="create-reply-box">
            <img src={isAuthenticated && user.avatar.url} />
            <div>
              <input
                type="text"
                placeholder="write your reply..."
                onChange={(e) => setReplyText(e.target.value)}
              />
              <button onClick={handleReply}>Reply</button>
            </div>
          </div>
        )}
        {val.replies.length > 0 &&
          (allReplyShow ? (
            <a href="#" onClick={() => setAllReplyShow(false)}>
              hide replies ({val.replies.length})
            </a>
          ) : (
            <a href="#" onClick={() => setAllReplyShow(true)}>
              view replies ({val.replies.length})
            </a>
          ))}

        {allReplyShow
          ? val.replies.length > 0 &&
            val.replies.map((reply, ind) => {
              return (
                <Reply
                  key={ind}
                  reply={reply}
                  commentId={val._id}
                  setSinglePostHidden={setSinglePostHidden}
                  postId={postId}
                />
              );
            })
          : ""}
      </div>
    </>
  );
};

export default Comment;
