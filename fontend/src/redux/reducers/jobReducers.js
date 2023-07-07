import {
  APPLY_JOB_FAIL,
  APPLY_JOB_REQUEST,
  APPLY_JOB_SUCCESS,
  GET_ALL_JOB_FAIL,
  GET_ALL_JOB_REQUEST,
  GET_ALL_JOB_SUCCESS,
  GET_SINGLE_JOB_FAIL,
  GET_SINGLE_JOB_REQUEST,
  GET_SINGLE_JOB_SUCCESS,
  CREATE_JOB_REQUEST,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_FAIL,
  SEND_APPLICANT_EMAIL_REQUEST,
  SEND_APPLICANT_EMAIL_SUCCESS,
  SEND_APPLICANT_EMAIL_FAIL,
  DELETE_JOB_REQUEST,
  DELETE_JOB_FAIL,
  DELETE_JOB_SUCCESS,
} from "../constants/jobConstants";

export const jobsReducer = (state = { jobs: [] }, action) => {
  switch (action.type) {
    case GET_ALL_JOB_REQUEST:
    case CREATE_JOB_REQUEST:
    case DELETE_JOB_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_JOB_SUCCESS:
      return {
        ...state,
        loading: false,
        jobs: [action.payload.job, ...state.jobs],
      };

    case GET_ALL_JOB_SUCCESS:
      return {
        ...state,
        loading: false,
        jobs: action.payload,
      };

    case DELETE_JOB_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case GET_ALL_JOB_FAIL:
    case CREATE_JOB_FAIL:
    case DELETE_JOB_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const jobReducer = (state = { job: {} }, action) => {
  switch (action.type) {
    case GET_SINGLE_JOB_REQUEST:
    case APPLY_JOB_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_SINGLE_JOB_SUCCESS:
    case APPLY_JOB_SUCCESS:
      return {
        ...state,
        loading: false,
        job: action.payload,
      };

    case GET_SINGLE_JOB_FAIL:
    case APPLY_JOB_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const applicantmailReducer = (state = { success: {} }, action) => {
  switch (action.type) {
    case SEND_APPLICANT_EMAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SEND_APPLICANT_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
      };

    case SEND_APPLICANT_EMAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
