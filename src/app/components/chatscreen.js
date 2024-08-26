"use client";
import { useState } from "react";
import Image from "next/image";

export default function Chat() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Welcome! How can I assist you today?" },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { sender: "user", text: inputValue }]);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "This is a dummy response." },
      ]);
      setInputValue("");
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between p-24">
      <div className="fixed bottom-4 right-4">
        {!isChatOpen && (
          <button
            onClick={() => setIsChatOpen(true)}
            className="p-3 bg-blue-600 rounded-full text-white shadow-lg hover:bg-blue-500 transition"
          >
            <img
              width="44"
              height="64"
              src="https://img.icons8.com/3d-fluency/94/chat.png"
              alt="chat"
            />
          </button>
        )}
        {isChatOpen && (
          <div
            className={`fixed ${
              isMaximized
                ? "bottom-0 right-0 w-full h-full"
                : "bottom-4 right-4 w-80 h-[30rem]"
            } bg-white rounded-lg shadow-lg flex flex-col overflow-hidden transition-all duration-300 ease-in-out`}
          >
            <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
              <span>Chatbot</span>
              <div className="flex space-x-2">
                <button onClick={() => setIsMaximized(!isMaximized)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    {isMaximized ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 8.25V5.25A2.25 2.25 0 016.75 3h10.5a2.25 2.25 0 012.25 2.25v3M15 14.25l4.5 4.5M15 18.75l4.5-4.5M8.25 20.25H5.25a2.25 2.25 0 01-2.25-2.25v-3"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 4.5v5.25a2.25 2.25 0 01-2.25 2.25H4.5v7.5a2.25 2.25 0 002.25 2.25h12a2.25 2.25 0 002.25-2.25v-7.5H18a2.25 2.25 0 01-2.25-2.25V4.5h-5.25z"
                      />
                    )}
                  </svg>
                </button>
                <button onClick={() => setIsChatOpen(false)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex-1 p-4 overflow-y-auto flex flex-col">
              {isMaximized ? (
                <div className="flex h-full">
                  <div className="w-1/3 p-4 bg-gray-50 border-r border-gray-200 overflow-y-auto">
                    <h3 className="font-semibold mb-4">Chat History</h3>
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`mb-4 ${
                          message.sender === "user" ? "text-right" : "text-left"
                        }`}
                      >
                        <div
                          className={`inline-block p-2 rounded-lg ${
                            message.sender === "user"
                              ? "bg-blue-100 text-blue-900"
                              : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          {message.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="w-2/3 p-4 bg-white flex flex-col justify-center items-center">
                    <h3 className="font-semibold mb-4">Current Conversation</h3>
                    <div className="w-full h-full overflow-y-auto flex flex-col-reverse">
                      {messages.map((message, index) => (
                        <div
                          key={index}
                          className={`mb-4 ${
                            message.sender === "user"
                              ? "text-right"
                              : "text-left"
                          }`}
                        >
                          <div
                            className={`inline-block p-2 rounded-lg ${
                              message.sender === "user"
                                ? "bg-blue-100 text-blue-900"
                                : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            {message.text}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 ${
                      message.sender === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`inline-block p-2 rounded-lg ${
                        message.sender === "user"
                          ? "bg-blue-100 text-blue-900"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))
              )}
            </div>
            {!isMaximized && (
              <div className="p-4 bg-gray-100 flex">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-l-lg"
                  placeholder="Type a message..."
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-600 text-white p-2 rounded-r-lg"
                >
                  Send
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
