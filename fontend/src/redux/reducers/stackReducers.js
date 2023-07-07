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

export const getQuestionsReducers = (state = { questions: [] }, action) => {
  switch (action.type) {
    case GET_ALL_QUESTIONS_REQUEST:
    case CREATE_QUESTIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_ALL_QUESTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        questions: action.payload.questions,
      };

    case CREATE_QUESTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        questions: [action.payload.questions, ...state.questions],
      };

    case GET_ALL_QUESTIONS_FAIL:
    case CREATE_QUESTIONS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const questionReducer = (state = { question: {} }, action) => {
  switch (action.type) {
    case GET_SINGLE_QUESTION_REQUEST:
    case GET_LIKEANDUNLIKE_QUESTION_REQUEST:
    case CREATE_ANSWER_REQUEST:
    case DELETE_ANSWER_REQUEST:
    case UPDATE_ANSWER_REQUEST:
    case DELETE_QUESTION_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_SINGLE_QUESTION_SUCCESS:
    case GET_LIKEANDUNLIKE_QUESTION_SUCCESS:
    case CREATE_ANSWER_SUCCESS:
    case DELETE_ANSWER_SUCCESS:
    case UPDATE_ANSWER_SUCCESS:
      return {
        ...state,
        loading: false,
        question: action.payload,
      };

    case DELETE_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };

    case GET_SINGLE_QUESTION_FAIL:
    case GET_LIKEANDUNLIKE_QUESTION_FAIL:
    case CREATE_ANSWER_FAIL:
    case DELETE_ANSWER_FAIL:
    case UPDATE_ANSWER_FAIL:
    case DELETE_QUESTION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const likeAndUnlikeAnswerReducer = (state = { answer: {} }, action) => {
  switch (action.type) {
    case LIKE_ANSWER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case LIKE_ANSWER_SUCCESS:
      return {
        ...state,
        loading: false,
        question: action.payload,
      };

    case LIKE_ANSWER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export const viewQuestionReducer = (state = { question: {} }, action) => {
  switch (action.type) {
    case VIEW_QUESTION_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case VIEW_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        question: action.payload,
      };

    case VIEW_QUESTION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
