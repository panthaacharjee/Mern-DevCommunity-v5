import {
  ADD_REPLY_FAIL,
  ADD_REPLY_REQUEST,
  ADD_REPLY_SUCCESS,
  CLEAR_ERRORS,
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

export const getPostsReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case GET_ALL_POST_REQUEST:
    case CREATE_POST_REQUEST:
    case DELETE_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: [action.payload.post, ...state.posts],
      };

    case GET_ALL_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
      };

    case DELETE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };

    case GET_ALL_POST_FAIL:
    case CREATE_POST_FAIL:
    case DELETE_POST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const likeAndUnlikeReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_LIKE_AND_UNLIKE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_LIKE_AND_UNLIKE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
      };
    case POST_LIKE_AND_UNLIKE_FAIL:
      return {
        loading: false,

        error: action.payload,
      };
    default:
      return state;
  }
};

export const singlePost = (state = { post: {} }, action) => {
  switch (action.type) {
    case GET_SINGLE_POST_REQUEST:
    case CREATE_COMMENT_REQUEST:
    case DELETE_COMMENT_REQUEST:
      return {
        ...state,
        postLoad: true,
      };
    case GET_SINGLE_POST_SUCCESS:
    case CREATE_COMMENT_SUCCESS:
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        postLoad: false,
        post: action.payload,
        success: action.payload,
      };

    case GET_SINGLE_POST_FAIL:
    case CREATE_COMMENT_FAIL:
    case DELETE_COMMENT_FAIL:
      return {
        ...state,
        postLoad: false,
      };
    default:
      return state;
  }
};

export const addReplyReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_REPLY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_REPLY_SUCCESS:
      return {
        ...state,
        success: action.payload.success,
        reply: action.payload.reply,
        loading: false,
      };
    case ADD_REPLY_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
export const deleteReplyReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REPLY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_REPLY_SUCCESS:
      return {
        success: action.payload.success,
        message: action.payload.message,
        loading: false,
      };
    case DELETE_REPLY_FAIL:
      return {
        error: action.payload,
        loading: false,
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
export const likeAndUnlikeCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case LIKE_AND_UNLIKE_COMMENT_REQUEST:
      return {
        ...state,
      };
    case LIKE_AND_UNLIKE_COMMENT_SUCCESS:
      return {
        ...state,
        success: action.payload.success,
      };
    case LIKE_AND_UNLIKE_COMMENT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
