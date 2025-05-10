import React, { useState } from "react";
import axios from "axios";
import LetterGlitch from "./LetterGlitch";
import { useDispatch } from "react-redux";
import { addUser,removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { Globe } from "./Globe";

const Login = () => {
    const [emailID, setemailID] = useState("");
    const [password, setpassword] = useState("");
    const [error, setError] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [isLoginform, setisLoginform] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignUp = async () => {
        try{
          const newUser = await axios.post(
            BASE_URL + "/signup",
          {
            firstName,
            lastName,
            emailID,
            password        
          },{withCredentials:true});
          dispatch(addUser(newUser.data.data));
          navigate("/profile");
        }catch(err){
          setError(err?.response?.data || "Something went Wrong");
          console.error(err);
        }
      }
      const handleLogin = async () => {
        try {
          const res = await axios.post(
            BASE_URL + "/login",
            { emailID, password },
            { withCredentials: true }
          );
          dispatch(addUser(res.data));
          navigate("/");
        } catch (err) {
          setError(err?.response?.data || "Something went Wrong");
          console.error(err);
        }
      };

  return (
    <div className="min-h-screen bg-base-200 text-white flex flex-col md:flex-row">
      {/* Left Side - Illustration */}
      <div className="hidden md:flex w-1/2 items-center justify-center p-10">
        <Globe />
      </div>

      {/* Right Side - Form */}
      <div className="flex justify-center items-center w-full md:w-1/2 px-6 py-12 min-h-screen">

      <fieldset className="bg-base-300 border border-gray-600 rounded-lg p-6 w-full max-w-md shadow-lg">

          <legend className="fieldset-legend text-lg text-center font-bold">
            {isLoginform ? "Login" : "Signup"}
          </legend>
          {!isLoginform && <> <label className="fieldset-label">First Name</label>
          <input
            type="text"
            value={firstName}
            className="input w-full"
            
            onChange={(e) => setfirstName(e.target.value)}
          />
          <label className="fieldset-label mt-2">Last Name</label>
          <input
            type="email"
            value={lastName}
            className="input w-full"
            
            onChange={(e) => setlastName(e.target.value)}
          /></>}
          <label className="fieldset-label mt-2">E-Mail</label>
          <input
            type="email"
            value={emailID}
            className="input w-full"
            placeholder="E-mail"
            onChange={(e) => setemailID(e.target.value)}
          />

          <label className="fieldset-label mt-2">Password</label>
          <input
            type="password"
            value={password}
            className="input w-full"
            placeholder="Password"
            onChange={(e) => setpassword(e.target.value)}
          />
          <div className="flex justify-center">
            <p className="text-red-500 font-bold">{error}</p>
          </div>
          <button className="btn btn-neutral w-full mt-4" onClick={isLoginform ? handleLogin : handleSignUp}>
            {isLoginform ? "Login" : "Signup"}
          </button>

          <div className="flex flex-col justify-center mt-2">
          <p className="text-center">
          {isLoginform 
          ? "Don't have an account?" 
          : "Already have an account?"}            
          </p>
          <button
            className="btn btn-link"
            onClick={() => setisLoginform(!isLoginform)}
          >
            {isLoginform ? "Signup" : "Login"}
          </button>
        </div>
        </fieldset>
        
      </div>
    </div>
  );
};

export default Login;
