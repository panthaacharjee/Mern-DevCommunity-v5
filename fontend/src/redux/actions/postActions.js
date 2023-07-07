import {
  ADD_REPLY_FAIL,
  ADD_REPLY_REQUEST,
  ADD_REPLY_SUCCESS,
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  DELETE_COMMENT_FAIL,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_POST_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_REPLY_FAIL,
  DELETE_REPLY_REQUEST,
  DELETE_REPLY_SUCCESS,
  GET_ALL_POST_FAIL,
  GET_ALL_POST_REQUEST,
  GET_ALL_POST_SUCCESS,
  GET_SINGLE_POST_FAIL,
  GET_SINGLE_POST_REQUEST,
  GET_SINGLE_POST_SUCCESS,
  LIKE_AND_UNLIKE_COMMENT_FAIL,
  LIKE_AND_UNLIKE_COMMENT_REQUEST,
  LIKE_AND_UNLIKE_COMMENT_SUCCESS,
  POST_LIKE_AND_UNLIKE_FAIL,
  POST_LIKE_AND_UNLIKE_REQUEST,
  POST_LIKE_AND_UNLIKE_SUCCESS,
} from "../constants/postConstants";
import axios from "axios";

//Get All Posts
export const getAllPost = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_POST_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.get(`/api/v1/get/posts`, config);

    dispatch({ type: GET_ALL_POST_SUCCESS, payload: data.posts });
  } catch (error) {
    dispatch({
      type: GET_ALL_POST_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Create Post
export const createPost = (userData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_POST_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/api/v1/create/post`, userData, config);

    dispatch({ type: CREATE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_POST_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Delete Post
export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_POST_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.delete(`/api/v1/post/delete/${id}`, config);

    dispatch({ type: DELETE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_POST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Post Like and Unlike
export const likeAndUnlikePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: POST_LIKE_AND_UNLIKE_REQUEST });
    // const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.get(`/api/v1/post/likeAndunlike/${id}`);

    dispatch({ type: POST_LIKE_AND_UNLIKE_SUCCESS, payload: data });
    // console.log(useForm1);
  } catch (error) {
    dispatch({
      type: POST_LIKE_AND_UNLIKE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Single Post
export const getSinglePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_POST_REQUEST });
    const { data } = await axios.get(`/api/v1/get/post/${id}`);
    dispatch({ type: GET_SINGLE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_POST_FAIL,
    });
  }
};

//Add A Comment
export const createComment = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_COMMENT_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/comment/add/${id}`,
      userData,
      config
    );
    dispatch({ type: CREATE_COMMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_COMMENT_FAIL,
    });
  }
};

//Delete A Comment
export const deleteComment = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_COMMENT_REQUEST });
    // const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.delete(`/api/v1/comment/delete/${id}`);
    dispatch({ type: DELETE_COMMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_COMMENT_FAIL,
    });
  }
};

//Like And Unlike Comment
export const likeAndUnlikeComment = (id) => async (dispatch) => {
  try {
    dispatch({ type: LIKE_AND_UNLIKE_COMMENT_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/comment/likeAndunlike/${id}`,
      config
    );
    dispatch({ type: LIKE_AND_UNLIKE_COMMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LIKE_AND_UNLIKE_COMMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Add A Reply
export const addReply = (userdata, id) => async (dispatch) => {
  try {
    dispatch({ type: ADD_REPLY_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/reply/add/${id}`,
      userdata,
      config
    );
    dispatch({ type: ADD_REPLY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_REPLY_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Delete A Reply
export const deleteReply = (userData, id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REPLY_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/reply/delete/${id}`,
      userData,
      config
    );
    dispatch({ type: DELETE_REPLY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_REPLY_FAIL,
      payload: error.response.data.message,
    });
  }
};
