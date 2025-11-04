import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import Profile from "./Profile";
import Library from "./Library";
import Archived from "./Archived";
import SettingsPage from "./Settings";
import "../App.css";

function AppChat() {
  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem("chats");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeChat, setActiveChat] = useState(() => {
    const activeId = localStorage.getItem("activeChatId");
    const saved = localStorage.getItem("chats");
    if (activeId && saved) {
      const parsed = JSON.parse(saved);
      return parsed.find((c) => c.id === Number(activeId)) || null;
    }
    return null;
  });

  const [activePage, setActivePage] = useState("chat");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeChat) {
      const updated = chats.find((c) => c.id === activeChat.id);
      if (updated) setActiveChat(updated);
    }
  }, [chats, activeChat]);

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    if (activeChat) localStorage.setItem("activeChatId", activeChat.id);
  }, [activeChat]);

  const handleNewChat = () => {
    const newChat = { id: Date.now(), title: "New Chat", messages: [] };
    setChats((prev) => [...prev, newChat]);
    setActiveChat(newChat);
    setActivePage("chat");
  };

  const handleSendMessage = async (text, file) => {
  if (!activeChat || (!text.trim() && !file)) return;

  const userMessage = { sender: "user", text };
  if (file) userMessage.image = URL.createObjectURL(file);

  setChats((prev) =>
    prev.map((c) =>
      c.id === activeChat.id
        ? { ...c, messages: [...c.messages, userMessage] }
        : c
    )
  );

  setLoading(true);

  try {
    let base64Image = null;
    if (file) {
      base64Image = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: text, image: base64Image }),
    });

    const data = await res.json();
    const botReply = { sender: "bot", text: data.output };
    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChat.id
          ? { ...c, messages: [...c.messages, botReply] }
          : c
      )
    );
  } catch (err) {
    console.error(err);
  }

  setLoading(false);
};

  const handleDeleteChat = (id) => {
    setChats(chats.filter((c) => c.id !== id));
    if (activeChat?.id === id) setActiveChat(null);
  };

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (
    <div className="appChat">
      <Sidebar
        chats={chats}
        onNewChat={handleNewChat}
        onSelectChat={(chat) => {
          setActiveChat(chat);
          setActivePage("chat");
        }}
        onDeleteChat={handleDeleteChat}
        activeChat={activeChat}
        onPageChange={handlePageChange}
      />

      <div className="chat-section">
        {activePage === "profile" ? (
          <Profile />
        ) : activePage === "library" ? (
          <Library />
        ) : activePage === "archived" ? (
          <Archived />
        ) : activePage === "settings" ? (
          <SettingsPage />
        ) : activeChat ? (
          <>
            <ChatWindow messages={activeChat.messages} loading={loading} />
            <ChatInput onSend={handleSendMessage} loading={loading} />
          </>
        ) : (
          <div className="empty-state">
            <p>Welcome! 👋</p>
            <p>Select a chat or start a new conversation to begin.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AppChat;
