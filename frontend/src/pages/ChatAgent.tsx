import { useState } from "react";
import { FaUserCircle, FaPaperPlane } from "react-icons/fa";

const ChatAgent = () => {
  const [messages, setMessages] = useState([
    { sender: "agent", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { sender: "user", text: input }]);
      setInput("");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white p-4 shadow-md hidden md:block">
        <h2 className="text-xl font-semibold mb-4">Chats</h2>
        <div className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-200">
          <FaUserCircle className="text-2xl" />
          <span className="text-sm">Support Agent</span>
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col bg-white shadow-lg">
        {/* Chat Header */}
        <div className="bg-blue-500 text-white p-4 text-lg font-semibold">
          Chat with Support
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-xs p-3 rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white self-end ml-auto"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-4 flex items-center border-t">
          <input
            type="text"
            className="flex-1 p-2 border rounded-lg focus:outline-none"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="ml-2 bg-blue-500 text-white p-2 rounded-lg"
            onClick={sendMessage}
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAgent;
