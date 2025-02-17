import React, { useEffect,useState } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);


  const fetchUser = async () => {
    if(userData) return;
    try{
      const res = await axios.get(BASE_URL + "/profile/view", {
      withCredentials: true,
    });
    // console.log(res.data);
    dispatch(addUser(res.data));
  }catch(err){

      navigate("/login");   
      console.error(err);
    }
  };

  useEffect(() => {
    if(!userData){
    fetchUser();
  }
  },[]);


  return (  //   <div>
  //      <NavBar/>
  //   {/* Any children routes of Body will render in outlet */}
  //   {/* Children Routes will be defined under Body in App.jsx file */}
  //   {/* <div > */}
  //     <Outlet/>
  //     <Footer/>
  //   </div>
  // )
  // return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow overflow-auto">
        <Outlet />
      </div>
      <Footer className="mt-auto" />
    </div>
  // );

  );
} 

export default Body;