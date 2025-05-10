import React from 'react'
import { useParams } from 'react-router-dom';

const Chat = () => {
  const targeuserId = useParams();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col w-full max-w-md h-[90vh] bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        
        {/* Header */}
        <div className="bg-blue-600 text-white text-center py-4 text-xl font-semibold">
          DevSwipe Chat
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-900 px-4 py-2 rounded-2xl rounded-bl-none max-w-[80%]">
              Hello! How’s everything going?
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl rounded-br-none max-w-[80%]">
              All good! Just building this UI.
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-900 px-4 py-2 rounded-2xl rounded-bl-none max-w-[80%]">
              Looks clean! Want to style it more?
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
          />
       
          <button className='px-4 py-2 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-600 transition duration-200 ease-in-out'>
            Send
          </button>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Chat;
