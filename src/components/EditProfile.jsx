import React, { useEffect, useState } from "react";
import TiltedCard from "./TiltedCard";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import Footer from "./Footer";

const EditProfile = ({ user }) => {
  const [firstName, setfirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [about, setabout] = useState(user.about);
  const [gender, setgender] = useState(user.gender || "");
  const [age, setAge] = useState(user.age || 0);


  const [photoURL, setphotoURL] = useState(user.photoURL);
  const [file, setFile] = useState(null);

  const [skills, setskills] = useState(user.skills || []);
  const [error, setError] = useState("");
  const [showToast, setshowToast] = useState(false);
  const dispatch = useDispatch();


  useEffect( () => {
    const fetchUser = async () => {
    const res = await axios.get(`${BASE_URL}/profile/view`,{withCredentials:true});
    console.log(res);
    dispatch(addUser(res?.data));
    }
    fetchUser();

  },[]);

  const handleUpload = async () => {
    if(!file){
      return;
    }
    const res = await axios.get(`${BASE_URL}/get-upload-url`, {
      params : {
        fileName: file.name,
        fileType: file.type,
      }
    });

    await axios.put(res.data.uploadURL, file, {
      headers: {
        "Content-Type":file.type,
      },
    });

    setphotoURL(res.data.fileURL);

  };

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
      {/* Main container with proper margins */}
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 mt-10 px-4 mb-4 md:mb-20">
        {/* Edit Profile Card - Using h-full to match parent height */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative bg-base-300 p-6 rounded-lg shadow-lg border border-base-300 w-full sm:w-96 h-full">
            <fieldset className="fieldset h-full flex flex-col">
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
                type="file"
                accept="image/*"
                className="file-input w-full"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button className="btn btn-outline btn-primary" onClick={handleUpload}>Upload</button>
  
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

        {/* View Profile Card - Using h-full to match parent height */}
        <div className="w-full md:w-1/2 flex justify-center">
          {/* <div className="flex flex-col items-center bg-amber-700 rounded-lg shadow-lg border border-base-300 w-full sm:w-96 p-6 h-full"> */}
            <div className="bg-base-300 p-6 rounded-lg shadow-lg border border-base-300 w-full sm:w-96 h-full">

            {/* <div className="flex flex-col bg-blue-950 items-center "> */}
            <legend className="fieldset-legend text-lg bg-base-300 font-bold text-center w-full rounded-lg p-2">
              View Profile
            </legend>  
            <div className="flex justify-center w-full bg-base-300">
              <TiltedCard user={{ firstName, lastName, about, photoURL, skills }} />
            </div>
            {/* </div> */}
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
      <Footer/>
    </>
  );
};

export default EditProfile;
