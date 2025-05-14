import io from 'socket.io-client';
import { BASE_URL } from './constants.js';

export const createSocketConnection = () => {
    if(location.hostname === 'localhost') {
        return io(BASE_URL);
    } 

    //ELSE CONDITION IS FOR PRODUCTION
    else{
        return io("/", {path: "/api/socket.io"});
    }

    //Calls happen on Socket.io
    // but nginx doesnt know what to do with it
    // Our backend runs on /api so we want BASE_URL to be /api for backend when on Production
    // So we need to tell socket.io to use the same path

};