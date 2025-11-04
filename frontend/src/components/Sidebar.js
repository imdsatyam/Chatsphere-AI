import React from "react";
import { Plus, Book, Archive, Settings, User, Trash2, MessageSquare } from "lucide-react";

export default function Sidebar({ chats, onNewChat, onSelectChat, onDeleteChat, activeChat, onPageChange }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>ChatSphere AI</h2>
        <button className="new-chat-btn" onClick={onNewChat}>
          <Plus size={18} /> <span>New Chat</span>
        </button>
      </div>

      <div className="section-title">Recent Chats</div>

      <div className="chat-list">
        {chats.length === 0 ? (
          <div className="empty-chats">No chats yet</div>
        ) : (
          chats.map((chat) => {
            let displayTitle = chat.title;
            if (
              displayTitle === "New Chat" ||
              !displayTitle ||
              displayTitle.trim() === ""
            ) {
              const userMessages = chat.messages
                ?.filter((m) => m.sender === "user")
                .map((m) => m.text)
                .join(", ");

              displayTitle =
                userMessages && userMessages.trim() !== ""
                  ? userMessages.length > 50
                    ? userMessages.slice(0, 50) + "..."
                    : userMessages
                  : "New Chat";
            }
            return (
              <div
                key={chat.id}
                className={`chat-item ${activeChat?.id === chat.id ? "active" : ""
                  }`}
                onClick={() => onSelectChat(chat)}
              >
                <div className="chat-item-left">
                  <MessageSquare size={16} />
                  <span>{displayTitle}</span>
                </div>
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteChat(chat.id);
                  }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            );
          })
        )}
      </div>
      <div className="bottom-menu">
        <button className="bottom-btn" onClick={() => onPageChange("library")}>
          <Book size={20} />
          <span>Library</span>
        </button>
        <button className="bottom-btn" onClick={() => onPageChange("archived")}>
          <Archive size={20} />
          <span>Archived</span>
        </button>
        <button className="bottom-btn" onClick={() => onPageChange("settings")}>
          <Settings size={20} />
          <span>Settings</span>
        </button>
        <button className="bottom-btn" onClick={() => onPageChange("profile")}>
          <User size={20} />
          <span>Profile</span>
        </button>
      </div>
    </div>
  );
}
