import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userReducer,
  profileReducer,
  forgotPasswordReducer,
  allDeveloperDetailReducer,
  singleDeveloperReducer,
} from "./reducers/userReducers";
import {
  addReplyReducer,
  deleteReplyReducer,
  getPostsReducer,
  likeAndUnlikeCommentReducer,
  likeAndUnlikeReducer,
  singlePost,
} from "./reducers/postReducers";
import {
  getQuestionsReducers,
  likeAndUnlikeAnswerReducer,
  questionReducer,
} from "./reducers/stackReducers";
import {
  applicantmailReducer,
  jobReducer,
  jobsReducer,
} from "./reducers/jobReducers";
import {
  hireDeveloperReducer,
  projectReducer,
  projectsReducer,
} from "./reducers/projectReducers";

const reducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  posts: getPostsReducer,
  likeAndUnlike: likeAndUnlikeReducer,
  post: singlePost,
  likeAndUnlikeComment: likeAndUnlikeCommentReducer,
  createReply: addReplyReducer,
  deleteReply: deleteReplyReducer,
  questions: getQuestionsReducers,
  question: questionReducer,
  answer: likeAndUnlikeAnswerReducer,
  jobs: jobsReducer,
  job: jobReducer,
  projects: projectsReducer,
  project: projectReducer,
  applicantMail: applicantmailReducer,
  developer: allDeveloperDetailReducer,
  singleDeveloper: singleDeveloperReducer,
  hireDeveloper: hireDeveloperReducer,
});
const middleware = [thunk];

let initialState = {};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
