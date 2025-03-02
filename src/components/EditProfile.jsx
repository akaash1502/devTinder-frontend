import React, { useState } from "react";
import TiltedCard from "./TiltedCard";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setfirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [about, setabout] = useState(user.about);
  const [gender, setgender] = useState(user.gender || "");
  const [age, setAge] = useState(user.age || 0);
  const [photoURL, setphotoURL] = useState(user.photoURL);
  const [skills, setskills] = useState(user.skills || []);
  const [error, setError] = useState("");
  const [showToast, setshowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    //Clear existing errors
    setError("");
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          about,
          age,
          gender,
          photoURL,
          skills,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data?.user));
      setshowToast(true);
      setTimeout(() => {
        setshowToast(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data);
    }
  };

  return (
    <>
    {/* <div className="flex flex-col md:flex-row justify-center items-start gap-6 my-10 px-4"> */}

      <div className="flex flex-col md:flex-row justify-center items-start gap-6 my-10 px-4">
        {/* Edit Profile Card */}
        <div className="w-full md:w-1/2 flex justify-around">
          <div className="relative bg-base-300 p-6 rounded-lg shadow-lg border border-base-300 w-full sm:w-96">
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-lg font-bold">
                Edit Profile
              </legend>
  
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex flex-col w-full">
                  <label className="fieldset-label mt-2">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    className="input w-full"
                    onChange={(e) => setfirstName(e.target.value)}
                  />
                </div>
  
                <div className="flex flex-col w-full">
                  <label className="fieldset-label mt-2">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    className="input w-full"
                    onChange={(e) => setlastName(e.target.value)}
                  />
                </div>
              </div>
  
              <label className="fieldset-label mt-2">Age</label>
              <input
                type="number"
                value={age}
                className="input w-full"
                onChange={(e) => setAge(e.target.value)}
              />
  
              <label className="fieldset-label mt-2">Gender</label>
              <select
                value={gender}
                onChange={(e) => setgender(e.target.value)}
                className="select w-full"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
  
              <label className="fieldset-label mt-2">About</label>
              <input
                type="text"
                value={about}
                className="input w-full"
                onChange={(e) => setabout(e.target.value)}
              />
  
              <label className="fieldset-label mt-2">Photo URL</label>
              <input
                type="text"
                value={photoURL}
                className="input w-full"
                onChange={(e) => setphotoURL(e.target.value)}
              />
  
              {error && (
                <div className="flex justify-center">
                  <p className="text-red-500 font-bold">{error}</p>
                </div>
              )}
  
              <button
                className="btn btn-neutral w-full mt-4"
                onClick={saveProfile}
              >
                Save Profile
              </button>
            </fieldset>
          </div>
        </div>
  
        {/* View Profile Card */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="flex flex-col items-center bg-base-300 rounded-lg shadow-lg border border-base-300 w-full sm:w-96 p-6">
            <legend className="fieldset-legend text-lg font-bold text-center">
              View Profile Card
            </legend>
  
            <TiltedCard user={{ firstName, lastName, about, photoURL, skills }} />
          </div>
        </div>
      </div>
  
      {/* Toast Notification */}
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success z-10">
            <span>Profile Saved Successfully</span>
          </div>
        </div>
      )}
    </>
  );
  
};

export default EditProfile;


