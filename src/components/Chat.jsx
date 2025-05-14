import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { use } from "react";

const Chat = () => {
  const { targetuserId } = useParams();
  const user = useSelector((store) => store.user);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setmessages] = useState([]);
  const userId = user?._id;
  const [typingUser, setTypingUser] = useState("");
  const typingTimeoutRef = useRef(null);
  const socketRef = useRef(null);

  const fetchChatHistory = async () => {
    const messageHistory = await axios.get(
       BASE_URL + '/getChat/' + targetuserId,
       {
        withCredentials: true,
       }    
    );
    console.log(messageHistory?.data?.chat?.messages);
    const chatMessages = messageHistory?.data?.chat?.messages.map((msg) => {
      return{ 
          firstName: msg?.senderId?.firstName,
          lastName: msg?.senderId?.lastName,
          text: msg?.text,
          userId: msg?.senderId?._id,
      }
    });
    setmessages(chatMessages);
  }

  useEffect(() => {
    fetchChatHistory();
  },[]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    socketRef.current = socket;
    // As soon as page is loaded, it will emit an event joinChat( socket connection is made) and join chat event is emitted
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetuserId,
    });

    socket.on("receiveMessage", ({ firstName, userId, text }) => {
      console.log(firstName + ": " + text);
      setmessages((messages) => [...messages, { firstName, userId, text }]);
    });

    socket.on("typing", ({ firstName }) => {
      setTypingUser(firstName);
    });

    socket.on("stopTyping", () => {
      setTypingUser("");
    });

    // Always make sure to close the socket connection other wise performance may drop.
    // this is called when component unmounts
    return () => {
      socket.disconnect();
    };
  }, [userId, targetuserId]);

  const sendMessage = () => {
    if (!newMessage.trim()) {
      return;
    }
    socketRef.current?.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetuserId,
      text: newMessage,
    });

    socketRef.current?.emit("stopTyping", {
      userId,
      targetuserId,
    });

    setNewMessage("");
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);

    socketRef.current?.emit("typing", {
      userId,
      targetuserId,
      firstName: user.firstName,
    });

    clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current?.emit("stopTyping", {
        userId,
        targetuserId,
      });
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col w-full max-w-md h-[90vh] bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="bg-blue-600 text-white text-center py-4 text-xl font-semibold">
          DevSwipe Chat
        </div>

        {/* Messages */}

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => {
            const isSent = msg.userId === userId;
            return (
              <div
                key={index}
                className={`chat ${isSent ? "chat-end" : "chat-start"}`}
              >
                <div className="chat-header">
                  {isSent ? "You" : msg.firstName}
                </div>
                <div
                  className={`chat-bubble ${
                    isSent
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}

          {/* ✅ Typing Indicator (only once) */}
          {typingUser && (
            <div className="chat chat-start">
              <div className="chat-bubble bg-gray-300 text-sm italic dark:bg-gray-600 dark:text-white">
                {typingUser} is typing...
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <input
            type="text"
            value={newMessage}
            onChange={handleInputChange}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
          />

          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-600 transition duration-200 ease-in-out"
            onClick={sendMessage}
          >
            Send
          </button>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Chat;
