import React, { useEffect } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/route/ProtectedRoute";
import Navigation from "./components/Navigation/Navigation";
import Home from "./components/Home/Home";
import Sidebar from "./components/Sidebar/Sidebar";
import { useState } from "react";
import LoginSignup from "./components/User/LoginSignup";
import Profile from "./components/User/Profile";
import store from "./redux/store";
import { loadUser } from "./redux/actions/userActions";
import MetaData from "./components/MetaData";
import Resgister from "./components/User/Resgister";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Posts from "./components/Posts/Posts";
import { useSelector } from "react-redux";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import AllQuestion from "./components/Problems/AllQuestion";
import QuestionSingle from "./components/Problems/SingleQuestion/QuestionSingle";
import Jobs from "./components/Job/Jobs";
import Projects from "./components/Projects/Projects";
import Singlejob from "./components/Job/SingleJob/Singlejob";
import Singleproject from "./components/Projects/SingleProject/Singleproject";
import CreateClientJob from "./components/Job/CreateClientJob";
import CreateClientProject from "./components/Projects/CreateClientProject";
import FindDeveloper from "./components/FindDeveloper/FindDeveloper";
import SingleDeveloper from "./components/FindDeveloper/SingleDeveloper/SingleDeveloper";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

function App() {
  const { error } = useSelector((state) => state.posts);
  //Load User
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  //Sidebar open and close
  const [sidebar, setSidebar] = useState(false);

  //React Notification
  const option = {
    position: "bottom-center",
    autoClose: 5000,
    // hideProgressBar: false,
    newestOnTop: true,

    rtl: false,
    // pauseOnFocusLoss,
    // draggable,
    // pauseOnHover,
    theme: "dark",
    type: "warning",
  };

  useEffect(() => {
    if (
      error ===
      "getaddrinfo ENOTFOUND ac-pwsxx4i-shard-00-00.wv215zp.mongodb.net"
    ) {
      toast("Network Error");
    }
  });
  return (
    <>
      <MetaData title={"My Profile"} />
      <ToastContainer {...option} />

      <Navigation sidebar={sidebar} setSidebar={setSidebar} />
      <div className="body">
        <div className={sidebar ? "sidebar" : "sidebar sidebar-hidden"}>
          <Sidebar sidebar={sidebar} />
        </div>
        <div className="content container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<LoginSignup />} />
            <Route exact path="/register" element={<Resgister />} />
            <Route exact path="/forgot/password" element={<ForgotPassword />} />
            <Route
              exact
              path="/password/reset/:token"
              element={<ResetPassword />}
            />

            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/posts" element={<Posts />} />
            <Route path="/questions" element={<AllQuestion />} />
            <Route path="/question/:id" element={<QuestionSingle />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:keyword" element={<Jobs />} />
            <Route path="/job/:id" element={<Singlejob />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:keyword" element={<Projects />} />
            <Route path="/project/:id" element={<Singleproject />} />

            <Route path="/create-client-job" element={<CreateClientJob />} />
            <Route
              path="/create-client-project"
              element={<CreateClientProject />}
            />
            <Route path="/find-developer" element={<FindDeveloper />} />
            <Route path="/single-developer/:id" element={<SingleDeveloper />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
