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
  HIRE_DEVELOPER_FAIL,
  HIRE_DEVELOPER_REQUEST,
  HIRE_DEVELOPER_SUCCESS,
  CLEAR_ERRORS,
  COMPLETE_PROJECT_REQUEST,
  COMPLETE_PROJECT_SUCCESS,
  COMPLETE_PROJECT_FAIL,
} from "../constants/projectConstants";

export const projectsReducer = (state = { projects: [] }, action) => {
  switch (action.type) {
    case GET_ALL_PROJECT_REQUEST:
    case CREATE_PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    //     case CREATE_POST_SUCCESS:
    //       return {
    //         ...state,
    //         loading: false,
    //         posts: [action.payload.post, ...state.posts],
    //       };
    case CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: [action.payload.project, ...state.projects],
      };
    case GET_ALL_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: action.payload,
      };

    case GET_ALL_PROJECT_FAIL:
    case CREATE_PROJECT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const projectReducer = (state = { project: {} }, action) => {
  switch (action.type) {
    case GET_SINGLE_PROJECT_REQUEST:
    case APPLY_PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_SINGLE_PROJECT_SUCCESS:
    case APPLY_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        project: action.payload,
      };

    case GET_SINGLE_PROJECT_FAIL:
    case APPLY_PROJECT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const hireDeveloperReducer = (state = { project: {} }, action) => {
  switch (action.type) {
    case HIRE_DEVELOPER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case HIRE_DEVELOPER_SUCCESS:
      return {
        ...state,
        loading: false,
        project: action.payload,
      };

    case HIRE_DEVELOPER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const completeProjectReducer = (state = { project: {} }, action) => {
  switch (action.type) {
    case COMPLETE_PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case COMPLETE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        project: action.payload,
      };

    case COMPLETE_PROJECT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
