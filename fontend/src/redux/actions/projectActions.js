import axios from "axios";
import {
  APPLY_PROJECT_FAIL,
  APPLY_PROJECT_REQUEST,
  APPLY_PROJECT_SUCCESS,
  CREATE_PROJECT_FAIL,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  GET_ALL_PROJECT_FAIL,
  GET_ALL_PROJECT_REQUEST,
  GET_ALL_PROJECT_SUCCESS,
  GET_SINGLE_PROJECT_FAIL,
  GET_SINGLE_PROJECT_REQUEST,
  GET_SINGLE_PROJECT_SUCCESS,
} from "../constants/projectConstants";

//Get All Projects
export const getAllProject =
  (keyword = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_PROJECT_REQUEST });
      let link = `/api/v1/get/projects?keyword=${keyword}`;

      const { data } = await axios.get(link);

      dispatch({ type: GET_ALL_PROJECT_SUCCESS, payload: data.projects });
    } catch (error) {
      dispatch({
        type: GET_ALL_PROJECT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//Get Single Project
export const getSingleProject = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_PROJECT_REQUEST });

    const { data } = await axios.get(`/api/v1/get/project/${id}`);

    dispatch({ type: GET_SINGLE_PROJECT_SUCCESS, payload: data.project });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_PROJECT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Create Project
export const createProject = (userData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PROJECT_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/create/project`,
      userData,
      config
    );

    dispatch({ type: CREATE_PROJECT_SUCCESS, payload: data.project });
  } catch (error) {
    dispatch({
      type: CREATE_PROJECT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Apply Project
export const applyProject = (userData, id) => async (dispatch) => {
  try {
    dispatch({ type: APPLY_PROJECT_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/create/project/apply/${id}`,
      userData,
      config
    );

    dispatch({ type: APPLY_PROJECT_SUCCESS, payload: data.project });
  } catch (error) {
    dispatch({
      type: APPLY_PROJECT_FAIL,
      payload: error.response.data.message,
    });
  }
};
