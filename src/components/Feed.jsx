import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import TiltedCard from "./TiltedCard";
import Footer from "./Footer";
// import { div } from "framer-motion/client";

const Feed = () => {
  const feed = useSelector((store) => 
    // console.log("SELECTED");
    store.feed
  );
  console.log(feed);

  const dispatch = useDispatch();
  const getFeed = async () => {
    // if (feed.length === 0) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      // console.log("RES DATA");
      // console.log(res.data);
      dispatch(addFeed(res?.data));
      // console.log(res?.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed || feed.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  return (
  feed && <>
    <div className="flex justify-center items-center mx-11 mt-4 mb-6">
        <TiltedCard user = {feed[0]}/>
      </div>
      <div className="relative bottom-0">
      <Footer />
      </div>
    
  </>
  )
};


export default Feed;
