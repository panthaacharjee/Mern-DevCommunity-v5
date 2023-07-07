import React, { useEffect, useState } from "react";
import "./post.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost, getSinglePost } from "../../redux/actions/postActions";
import Loader from "../Loader/Loader";
import CreatePost from "./CreatePost";
import Post from "./Post";
import { toast } from "react-toastify";
import SinglePost from "./SinglePost";
import { Link } from "react-router-dom";
import MetaData from "../MetaData";

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  //Post Id for delete Reply
  const [postId, setPostId] = useState();

  // Create Post Hidden
  const [createPostHidden, setCreatePostHidden] = useState(false);

  // Single Post Hidden
  const [singlePostHidden, setSinglePostHidden] = useState(false);

  useEffect(() => {
    if (error) {
      toast(error);
    }

    dispatch(getAllPost());
  }, [error, toast]);

  return (
    <>
      <MetaData title="Posts" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="post">
            {isAuthenticated && user.role == "developer" ? (
              <div
                className="create-post"
                onClick={() => setCreatePostHidden(true)}
              >
                <div>
                  <Link to="/account">
                    <img
                      src={isAuthenticated && user.avatar.url.toString()}
                      alt="avatar"
                    />
                  </Link>
                  <p>Whats on your mind, {isAuthenticated && user.name}?</p>
                </div>
              </div>
            ) : null}
            <div
              style={
                isAuthenticated && user.role === "developer"
                  ? { marginTop: "15px" }
                  : { marginTop: "90px" }
              }
              className="all-post-container"
            >
              {posts &&
                posts.map((val, ind) => {
                  return (
                    <Post
                      key={ind}
                      val={val}
                      setSinglePostHidden={setSinglePostHidden}
                      setPostId={setPostId}
                    />
                  );
                })}
            </div>
          </div>
          {createPostHidden && (
            <CreatePost
              setCreatePostHidden={setCreatePostHidden}
              setSinglePostHidden={setSinglePostHidden}
            />
          )}
          {singlePostHidden && (
            <SinglePost
              setSinglePostHidden={setSinglePostHidden}
              postId={postId}
            />
          )}
        </>
      )}
    </>
  );
};

export default Posts;
