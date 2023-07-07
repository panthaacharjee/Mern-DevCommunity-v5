import React, { useEffect, useState } from "react";
import "./singlePost.css";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import Loader from "../Loader/Loader";
import ImageSlides from "../CustomComponent/ImageSlides";
import { AiFillCamera, AiFillLike, AiOutlineDelete } from "react-icons/ai";
import {
  createComment,
  getAllPost,
  getSinglePost,
} from "../../redux/actions/postActions";
import Comment from "./Comment";
import ReactTimeAgos from "../CustomComponent/ReactTimeAgos";
import { toast } from "react-toastify";

const SinglePost = ({ setSinglePostHidden, postId }) => {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post.post);
  const { postLoad, success, error } = useSelector((state) => state.post);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  // Like And Unlike Post
  // const [like, setLike] = useState(true);
  // const [postLength, setPostLength] = useState(post.likes.length);
  // const handleLikePost = (props) => {
  //   if (props === "like") {
  //     dispatch(likeAndUnlikePost(post._id));
  //     setPostLength(postLength + 1);
  //     setLike(false);
  //   } else {
  //     dispatch(likeAndUnlikePost(post._id));
  //     setPostLength(postLength - 1);
  //     setLike(true);
  //   }
  // };

  //Comment Image Handle
  const [commentImage, setCommentImage] = useState();
  const handleChangePostImage = (e) => {
    if (e.target.name === "commentImage") {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.readyState === 2) {
          setCommentImage(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  //Create Comment
  const [comment, setComment] = useState("");
  const handleCreateComment = () => {
    const myForm = new FormData();
    if (comment) {
      myForm.set("comment", comment);
    }
    if (commentImage) {
      myForm.set("image", commentImage);
    }
    dispatch(createComment(post._id, myForm));
    setComment("");
    setCommentImage("");
  };

  useEffect(() => {
    // if (isAuthenticated) {
    //   if (post.likes.includes(user._id)) {
    //     setLike(false);
    //   }
    // }
    if (!isAuthenticated) {
      setSinglePostHidden(false);
    }
    if (commentImage) {
      alert("Selected");
    }
    if (success && postLoad === false) {
      toast(success.message);
    }
    if (success === true && postLoad === true) {
      dispatch(getAllPost());
      dispatch(getSinglePost(post._id));
    }
    if (error) {
      toast(error);
    }
  }, [isAuthenticated, success, toast, postLoad, getAllPost, getSinglePost]);
  return (
    <div className="single-post-container">
      {postLoad ? (
        <Loader />
      ) : (
        <div className="single-post-box">
          <div className="single-post-header">
            <div>
              <p>{post.owner.name}'s post</p>
            </div>

            <span onClick={() => setSinglePostHidden(false)}>
              <RxCross2 />
            </span>
          </div>
          <div className="single-post-middle">
            <div className="post-owner-details">
              <img src={post && post.owner.avatar.url} />
              <div>
                <p>{post.owner.name}</p>
                <span>
                  <ReactTimeAgos date={post.createdAt} />
                </span>
              </div>
            </div>
            <div className="single-post-caption-box">
              <div dangerouslySetInnerHTML={{ __html: post.caption }} />
            </div>
            <div className="single-post-image-carosel-box">
              <ImageSlides images={post.images} />
            </div>
            <div className="comments-container">
              {post.comments.map((val, ind) => {
                return (
                  <Comment
                    val={val}
                    key={ind}
                    setSinglePostHidden={setSinglePostHidden}
                    postId={postId}
                  />
                );
              })}
            </div>
          </div>
          <div className="single-post-footer">
            <img src={user && user.avatar.url} />
            <div>
              <input
                type="text"
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment...."
              />
              <input
                type="file"
                id="file-upload"
                onChange={handleChangePostImage}
                name="commentImage"
              />
              <label htmlFor="file-upload">
                <AiFillCamera />
              </label>
            </div>
            <button onClick={handleCreateComment}>Comment</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePost;
