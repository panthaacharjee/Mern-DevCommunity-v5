import React, { useEffect, useState, useRef } from "react";
import "./createpost.css";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../redux/actions/postActions";
import { RxCross2 } from "react-icons/rx";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";

const CreatePost = ({ setCreatePostHidden }) => {
  const dispatch = useDispatch();

  //Jodit Rich Text Editor
  const [caption, setCaption] = useState();
  const editor = useRef(null);
  // const config = {
  //   readonly: false,
  // };

  //Comment Image Handle
  const [postImage, setPostImage] = useState([]);
  const handleChangePostImage = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.readyState === 2) {
          setPostImage((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const deleteImages = (ind) => {
    const newArr = [...postImage];
    newArr.splice(ind, 1);
    setPostImage(newArr);
  };

  const handlePost = () => {
    const data = {
      caption: caption,
      images: postImage,
    };
    dispatch(createPost(data));
    setCreatePostHidden(false);
  };

  return (
    <div className="create-post-box">
      <div className="create-post-box-container">
        <div className="create-post-header">
          <div>
            <p>Create Post</p>
          </div>

          <span onClick={() => setCreatePostHidden(false)}>
            <RxCross2 />
          </span>
        </div>
        <div className="create-post-caption">
          <JoditEditor
            ref={editor}
            value={caption}
            name="caption"
            onChange={(e) => {
              setCaption(e);
            }}
          />
        </div>
        <div className="create-post-image-box">
          <div>
            <input
              type="file"
              id="file-upload"
              onChange={handleChangePostImage}
              name="postImage"
              multiple
            />
            <label htmlFor="file-upload">
              {/* <AiFillCamera /> */}Add Photos
            </label>
          </div>
          <div className="post-image-box">
            {postImage.map((val, ind) => {
              return (
                <img
                  src={val}
                  alt="img"
                  key={ind}
                  onClick={() => deleteImages(ind)}
                />
              );
            })}
          </div>
        </div>
        <button onClick={handlePost}>Post</button>
      </div>
    </div>
  );
};

export default CreatePost;
