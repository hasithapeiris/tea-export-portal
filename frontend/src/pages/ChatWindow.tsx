import { Link } from "react-router-dom";
import MenuIco from "../assets/menu.png";
import { useState } from "react";
import LogoutMDIco from "../assets/logout_md.png";
import { FaPaperPlane } from "react-icons/fa";

const ChatWindow = () => {
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 grid grid-cols-12 gap-4 overflow-hidden p-4">
        {/* Sidebar */}
        <div className="col-span-12 bg-gray-100/80 backdrop-blur-lg border rounded-lg flex flex-col p-4 lg:col-span-2">
          <div className="flex justify-between items-center">
            <img
              src={MenuIco}
              alt="menu"
              className="w-8 z-10 h-8 cursor-pointer lg:hidden"
              onClick={handleClick}
            />
            <Link to="/" className="flex justify-start">
              <div className="p-2 bg-primary rounded-xl shadow-lg max-w-fit">
                <img
                  className="w-8 object-contain md:w-8"
                  src="icon.png"
                  alt="logo"
                />
              </div>
            </Link>
          </div>
          <div
            className={`${
              isMenuOpen == false ? "hidden" : "block"
            } transition-all duration-500 xl:justify-between h-full xl:flex xl:flex-col`}
          >
            {/* Chats */}
            <div className="mt-8 space-y-2">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Chats
              </h2>
              <div className="flex items-center gap-2 p-2 rounded-lg border cursor-pointer hover:bg-gray-200">
                <span className="text-sm text-gray-800">Support Agent</span>
              </div>
            </div>
            {/* Logout Button */}
            <div>
              <div className="w-full items-end justify-end md:justify-start flex">
                <button className="py-3 hidden items-center justify-between px-6 border border-[#0455bf]/10 xl:flex cursor-pointer hover:bg-gray-200 transition duration-200 rounded-lg w-full text-left">
                  Logout
                  <img src={LogoutMDIco} className="w-8 h-8" />
                </button>
                <img src={LogoutMDIco} className="xl:hidden w-8 h-8 mt-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Chat Window */}
        <div className="mt-4 xl:mt-0 col-span-12 p-4 rounded-xl bg-gray-100/80 border backdrop-blur-lg max-h-full overflow-y-auto lg:col-span-10">
          {/* Chat Messages */}
          <div className="h-full p-4 space-y-3 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-xs p-3 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-green-500 text-white self-end ml-auto"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 flex items-center rounded-xl bg-white w-full sticky bottom-0">
            <input
              type="text"
              className="flex-1 p-2 rounded-lg focus:outline-none"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              className="ml-2 bg-green-500 text-white p-2 rounded-lg"
              onClick={sendMessage}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
