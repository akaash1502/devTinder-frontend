
import React, { useState } from "react";
import axios from "axios";
import LetterGlitch from "./LetterGlitch";
import { useDispatch } from "react-redux";
import { addUser,removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

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
    <div className="relative h-screen flex items-center justify-center">
      {/* Letter Glitch in Background */}
      <div className="absolute inset-0 z-0">
        <LetterGlitch 
        glitchSpeed={50} 
        centerVignette={true} 
        outerVignette={false} 
        smooth={true} />
      </div>

      {/* Login Component */}
      <div className="relative z-10 bg-base-300 p-6 rounded-lg shadow-lg border border-base-300 w-11/12 sm:w-96">
        <fieldset className="fieldset">
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
          <label className="fieldset-label">Last Name</label>
          <input
            type="email"
            value={lastName}
            className="input w-full"
            
            onChange={(e) => setlastName(e.target.value)}
          /></>}
          <label className="fieldset-label">E-Mail</label>
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
        </fieldset>
        <div className="flex flex-col justify-center">
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
      </div>
    </div>
  );
};

export default Login;

