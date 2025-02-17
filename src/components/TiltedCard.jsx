import React from "react";
import axios from "axios"; 
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const TiltedCard = ({ user }) => {
  const { _id,firstName, lastName, about, photoURL, skills } = user;
  const dispatch = useDispatch();
  const handleRequest = async (status,_id) => {
    try{
      const res = await axios.post(
        // request/send/interested/6798f37f4ceb641bd024ae7c
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
    }catch(err){
      console.error(err);
    }
  }


  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img
          className="rounded-lg rounded-b-none h-[300px] my-2"
          src={photoURL}
          alt="User Image"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        <p>{about}</p>
        {skills && skills.length > 0 && (
          <div className="card-actions justify-end">
            <div className="badge badge-outline">{skills[0]}</div>
            <div className="badge badge-outline">{skills[1]}</div>
          </div>
        )} 
        <div className="flex flex-wrap justify-between hover:ease-in">
          <button 
          className="btn btn-primary" 
          onClick={() => handleRequest("ignored",_id)}
          >
            Ignore  
          </button>
          <button 
          className="btn btn-secondary" 
          onClick={() => handleRequest("interested",_id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default TiltedCard;
