import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { addRequests,removeRequests } from '../utils/requestSlice'

const Requests = () => {

    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests);

    const reviewRequest = async (status, _id) => {
      try{
        const res = await axios.post(
          BASE_URL + "/request/review/"+status+"/"+_id,
          {}, 
          { withCredentials: true }
        );
        dispatch(removeRequests(_id));
      }catch(err){
        console.error(err);
      }
    };

    const fetchRequests = async () => {
        try{
            const res = await axios.get(
                `${BASE_URL}/user/requests/review`,
                { withCredentials: true }
            )
            console.log(res.data.data);
            dispatch(addRequests(res?.data?.data));

        }catch(err){
            console.error(err);
        }
    };

    useEffect(() => {
        fetchRequests();
    },[]);

    if (!requests) {
        return <div className="text-center text-lg my-10">Loading...</div>;
      }
    
      if (requests.length === 0) {
        return (
          <div className="flex justify-center items-center h-screen">
            <h1 className="font-bold text-3xl">No Pending Requests</h1>
          </div>
        );
      }
    
    

      return (
        <div className="p-5">
          <h1 className="font-bold text-3xl text-center my-3">Pending Requests</h1>
          <div className="flex flex-col items-center space-y-6">
            {requests.map((request) => (
              <div
                key={request._id}
                className="bg-base-300 rounded-lg shadow-lg p-4 w-full sm:w-9/12 md:w-6/12 flex flex-col sm:flex-row sm:justify-between items-center"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-x-0 sm:space-x-4 text-center sm:text-left">
                  <img
                    className="w-16 h-16 rounded-full object-cover"
                    src={request.fromUserId.photoURL}
                    alt={request.fromUserId.firstName}
                  />
                  <div className="flex flex-col mt-2 sm:mt-0">
                    <h2 className="text-xl font-bold">{request.fromUserId.firstName}</h2>
                    <p className="text-sm mt-2">{request.fromUserId.about}</p>
                  </div>
                </div>
      
                <div className="flex space-x-2 mt-4 sm:mt-0">
                  <button
                    className="btn btn-xs sm:btn-sm md:btn-md bg-black-300"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-xs sm:btn-sm md:btn-md bg-black-300"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
      
}

export default Requests;