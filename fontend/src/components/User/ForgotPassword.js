import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../MetaData";
import Loader from "../Loader/Loader";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { forgotPassword } from "../../redux/actions/userActions";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(
    (state) => state.forgotPassword
  );
  console.log(message);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //OnSubmit
  const onSubmit = (data) => {
    dispatch(forgotPassword(data));
  };

  useEffect(() => {
    function auth() {
      if (error) {
        return toast(error);
      }
      if (message) {
        return toast(message);
      }
    }
    auth();
  }, [error, message]);
  return (
    <>
      <MetaData title={"Forgot Password"} />
      {loading ? (
        <Loader />
      ) : (
        <div className="LoginSignup-container">
          <div className="LoginSignup-box">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label>Email</label>
                <input
                  type="text"
                  placeholder="Enter Your email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
              </div>
              <button>Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
