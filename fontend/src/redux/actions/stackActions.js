import axios from "axios";
import {
  CREATE_ANSWER_FAIL,
  CREATE_ANSWER_REQUEST,
  CREATE_ANSWER_SUCCESS,
  CREATE_QUESTIONS_FAIL,
  CREATE_QUESTIONS_REQUEST,
  CREATE_QUESTIONS_SUCCESS,
  DELETE_ANSWER_FAIL,
  DELETE_ANSWER_REQUEST,
  DELETE_ANSWER_SUCCESS,
  DELETE_QUESTION_FAIL,
  DELETE_QUESTION_REQUEST,
  DELETE_QUESTION_SUCCESS,
  GET_ALL_QUESTIONS_FAIL,
  GET_ALL_QUESTIONS_REQUEST,
  GET_ALL_QUESTIONS_SUCCESS,
  GET_LIKEANDUNLIKE_QUESTION_FAIL,
  GET_LIKEANDUNLIKE_QUESTION_REQUEST,
  GET_LIKEANDUNLIKE_QUESTION_SUCCESS,
  GET_SINGLE_QUESTION_FAIL,
  GET_SINGLE_QUESTION_REQUEST,
  GET_SINGLE_QUESTION_SUCCESS,
  LIKE_ANSWER_FAIL,
  LIKE_ANSWER_REQUEST,
  LIKE_ANSWER_SUCCESS,
  UPDATE_ANSWER_FAIL,
  UPDATE_ANSWER_REQUEST,
  UPDATE_ANSWER_SUCCESS,
  VIEW_QUESTION_FAIL,
  VIEW_QUESTION_REQUEST,
  VIEW_QUESTION_SUCCESS,
} from "../constants/stackConstants";

//Get All Questions
export const getAllQuestions = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_QUESTIONS_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.get(`/api/v1/get/questions`, config);

    dispatch({ type: GET_ALL_QUESTIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_QUESTIONS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Create Question
export const createQuestion = (userData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_QUESTIONS_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/create/question`,
      userData,
      config
    );

    dispatch({ type: CREATE_QUESTIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_QUESTIONS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Delete Question
export const deleteQuestion = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_QUESTION_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.delete(
      `/api/v1/delete/question/${id}`,
      config
    );

    dispatch({ type: DELETE_QUESTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_QUESTION_FAIL,
      payload: error.response.data.message,
    });
  }
};

//GET Single Question
export const getQuestion = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_QUESTION_REQUEST });

    const { data } = await axios.get(`/api/v1/get/question/${id}`);

    dispatch({ type: GET_SINGLE_QUESTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_QUESTION_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Like And Unlike Single Question
export const getLikeAndUnlike = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_LIKEANDUNLIKE_QUESTION_REQUEST });

    const { data } = await axios.get(`/api/v1/get/likeAndunlikeQuestion/${id}`);

    dispatch({ type: GET_LIKEANDUNLIKE_QUESTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_LIKEANDUNLIKE_QUESTION_FAIL,
      payload: error.response.data.message,
    });
  }
};

//View  Question
export const viewQuestion = (id) => async (dispatch) => {
  try {
    dispatch({ type: VIEW_QUESTION_REQUEST });

    const { data } = await axios.get(`/api/v1/question/viewed/${id}`);

    dispatch({ type: VIEW_QUESTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: VIEW_QUESTION_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Create Answer
export const createAnswer = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ANSWER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/answer/add/${id}`,
      userData,
      config
    );

    dispatch({ type: CREATE_ANSWER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_ANSWER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Like And Unlike Answer
export const likeAndUnlikeAnswer = (id) => async (dispatch) => {
  try {
    dispatch({ type: LIKE_ANSWER_REQUEST });

    const { data } = await axios.get(`/api/v1/answer/likeandunlike/${id}`);

    dispatch({ type: LIKE_ANSWER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LIKE_ANSWER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Update Answer
export const updateAnswer = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ANSWER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/answer/update/${id}`,
      userData,
      config
    );

    dispatch({ type: UPDATE_ANSWER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_ANSWER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Delete Answer
export const deleteAnswer = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ANSWER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/answer/delete/${id}`,
      userData,
      config
    );

    dispatch({ type: DELETE_ANSWER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_ANSWER_FAIL,
      payload: error.response.data.message,
    });
  }
};
