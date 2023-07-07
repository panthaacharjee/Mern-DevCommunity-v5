import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./TabValue.css";
import CreatePost from "../../Posts/CreatePost";
import Post from "../../Posts/Post";
import SinglePost from "../../Posts/SinglePost";
import Loader from "../../Loader/Loader";

const Mypost = ({ profilePostUpdate }) => {
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.posts);

  // Create Post Hidden
  const [createPostHidden, setCreatePostHidden] = useState(false);

  // Single Post Hidden
  const [singlePostHidden, setSinglePostHidden] = useState(false);

  //Post Id for delete Reply
  const [postId, setPostId] = useState();

  //Arrray Reverse
  const [postData, setPostData] = useState(user.posts);

  useEffect(() => {
    setPostData(user.posts.reverse());
  }, [user]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="my-post">
            <div
              className="profile-create-post"
              onClick={() => setCreatePostHidden(true)}
            >
              <img src={user.avatar.url} alt="avatar" />
              <p>Create Post</p>
            </div>
            <div className="my-post-container">
              {postData.length <= 0 && (
                <p style={{ marginTop: "20px", marginLeft: "20px" }}>
                  No post has posted by you!
                </p>
              )}
              {postData.map((val, ind) => {
                return (
                  <Post
                    key={ind}
                    val={val}
                    setSinglePostHidden={setSinglePostHidden}
                    setPostId={setPostId}
                    profilePostUpdate={profilePostUpdate}
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

export default Mypost;
