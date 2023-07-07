import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageSlides from "../CustomComponent/ImageSlides";
import { GrLike } from "react-icons/gr";
import { GoComment } from "react-icons/go";
import { FcLike } from "react-icons/fc";
import { AiFillLike, AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  deletePost,
  getSinglePost,
  likeAndUnlikePost,
} from "../../redux/actions/postActions";
import ReactTimeAgos from "../CustomComponent/ReactTimeAgos";

const Post = ({ val, setSinglePostHidden, setPostId, profilePostUpdate }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { postLoad } = useSelector((state) => state.post);
  // Like And Unlike Post
  const [like, setLike] = useState(true);
  const [postLength, setPostLength] = useState(val.likes.length);
  const handleLikePost = (props) => {
    if (props === "like") {
      dispatch(likeAndUnlikePost(val._id));
      setPostLength(postLength + 1);
      setLike(false);
    } else {
      dispatch(likeAndUnlikePost(val._id));
      setPostLength(postLength - 1);
      setLike(true);
    }
  };

  //Sorted Caption
  const [lastIndex, setLastIndex] = useState(300);

  //Handle Comment
  const handleComment = () => {
    dispatch(getSinglePost(val._id));
    setSinglePostHidden(true);
  };

  //Post Delete
  const handleDelete = () => {
    dispatch(deletePost(val._id));
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (val.likes.includes(user._id)) {
        setLike(false);
      }
    }
    setPostId(val._id);
  }, [isAuthenticated, user, postLoad]);
  return (
    <div className="post-conatiner">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingRight: "20px",
        }}
      >
        <div className="post-header-box">
          <img
            src={val.owner.avatar.url && val.owner.avatar.url}
            alt="avatar"
          />
          <div>
            <p>{val.owner.name}</p>
            <span>
              <ReactTimeAgos date={val.createdAt} />
            </span>
          </div>
        </div>
        {isAuthenticated && profilePostUpdate
          ? user._id === val.owner._id && (
              <div className="user-box-edit">
                <span onClick={handleDelete}>
                  <AiFillDelete />
                </span>
              </div>
            )
          : null}
      </div>
      <div className="post-middle-box">
        <div className="caption-box">
          {val.caption && (
            <>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${
                    lastIndex <= 300
                      ? val.caption.slice(0, lastIndex) + "........."
                      : val.caption.slice(0, lastIndex)
                  }`,
                }}
              />
              <div className="show-hide-btn">
                {val.caption.length >= 299 ? (
                  lastIndex <= 300 ? (
                    <span onClick={() => setLastIndex(val.caption.length)}>
                      Show
                    </span>
                  ) : (
                    <span onClick={() => setLastIndex(300)}>Hide</span>
                  )
                ) : null}
              </div>
            </>
          )}
        </div>
        <div className="post-image-carosel-box">
          <ImageSlides images={val.images} />
        </div>
      </div>
      <div className="post-footer-box">
        <div className="values-box">
          <div>
            <span>
              <FcLike />
            </span>
            <p>{postLength} likes</p>
          </div>
          <div>
            <span style={{ marginTop: "10px" }}>
              <GoComment />
            </span>
            <p>{val.comments.length} comments</p>
          </div>
        </div>
        {isAuthenticated && (
          <div className="like-comment-box">
            {like === true ? (
              <div onClick={() => handleLikePost("like")}>
                <span>
                  <GrLike />
                </span>
                <p>Like</p>
              </div>
            ) : (
              <div onClick={() => handleLikePost("unlike")}>
                <span>
                  <AiFillLike />
                </span>
                <p style={{ color: "#002229" }}>Unlike</p>
              </div>
            )}
            <div onClick={handleComment}>
              <span>
                <GoComment style={{ marginTop: "5px" }} />
              </span>
              <p>Comment</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
