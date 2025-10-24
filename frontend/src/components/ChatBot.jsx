import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
const ChatBot = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    const newChat = [...chat, { sender: "user", message }];
    setChat(newChat);
    setMessage("");

    try {
      const res = axios.post("http://localhost:4000/api/chat", { message });
      setChat([...newChat, { sender: "bot", text: (await res).data.reply }]);
    } catch {
      setChat([...newChat, { sender: "bot", text: "error connecting" }]);
    }
  };
  return (
    <>
      {isOpen && (
        <div
          className="fixed top-20 right-7 w-80 md:w-96 bg-gradient-to-br from-[#A5CDF2] to-[#47CFFF] 
                  dark:from-[#112d4e] dark:to-[#274472] text-[#112d4e] dark:text-[#A1F6FF] 
                  shadow-2xl rounded-3xl p-4 pt-10 flex flex-col gap-3 z-50 transition-all duration-300"
        >
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto max-h-96 p-2 space-y-2">
            {chat.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-[#82E0FA] text-[#112d4e] self-end"
                    : "bg-[#198FFF] text-white self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input & Buttons */}
          <div className="flex gap-2 mt-2">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-[#FF4D4D] hover:text-[#FF1A1A] z-10"
              aria-label="Close Chat"
            >
              <X size={20} />
            </button>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              placeholder="Ask anything..."
              className="flex-1 rounded-xl px-3 py-2 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#198FFF]"
            />
            <button
              onClick={sendMessage}
              className="bg-[#198FFF] hover:bg-[#7DF9FF] text-white px-4 py-2 rounded-xl transition-colors duration-300"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
