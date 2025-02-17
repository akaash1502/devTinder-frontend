import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnection(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) {
    return <div className="text-center text-lg my-10">Loading...</div>;
  }

  if (connections.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="font-bold text-3xl">No Connections</h1>
      </div>
    );
  }

  return (
    <div className="p-5 h-screen">
      <h1 className="font-bold text-3xl text-center my-3">Connections</h1>
      <div className="flex flex-col items-center space-y-6">
        {connections.map((connection) => (
          <div
            key={connection._id}
            className="bg-base-300 rounded-lg shadow-lg p-4 w-full sm:w-9/12 md:w-6/12 flex flex-col sm:flex-row items-center sm:justify-between"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-x-0 sm:space-x-4 text-center sm:text-left">
              <img
                className="w-16 h-16 rounded-full object-cover"
                src={connection.photoURL}
                alt={connection.firstName}
              />
              <div className="flex flex-col mt-2 sm:mt-0">
                <h2 className="text-xl font-bold">{connection.firstName}</h2>
                <p className="text-sm mt-2">{connection.about}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ); 
};

export default Connections;
