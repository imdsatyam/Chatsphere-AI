import React, { useEffect, useRef } from "react";
import { User, Bot } from "lucide-react";

export default function ChatWindow({ messages, loading }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-window">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`message-row ${
            msg.sender === "user" ? "user-row" : "bot-row"
          }`}
        >
          {msg.sender === "bot" && (
            <div className="icon bot-icon">
              <Bot size={24} />
            </div>
          )}

          <div className={`message-bubble ${msg.sender}`}>
            {msg.text && <p>{msg.text}</p>}

            {msg.image && (
              <img
                src={msg.image}
                alt="Uploaded"
                className="chat-image"
              />
            )}

            {msg.video && (
              <video
                src={msg.video}
                controls
                className="chat-video"
              />
            )}
          </div>

          {msg.sender === "user" && (
            <div className="icon user-icon">
              <User size={24} />
            </div>
          )}
        </div>
      ))}

      {loading && (
        <div className="message-row bot-row">
          <div className="icon bot-icon">
            <Bot size={24} />
          </div>
          <div className="message-bubble bot">
            <p>⏳ Thinking...</p>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
