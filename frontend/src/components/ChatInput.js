import React, { useState, useEffect, useRef } from "react";
import { Send, Image, Mic, MicOff, X } from "lucide-react";

export default function ChatInput({ onSend, loading }) {
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      console.warn("Speech recognition not supported in this browser.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-IN";

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setInput(transcript);
    };

    recognition.onend = () => setIsRecording(false);
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const handleMicToggle = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  const removePreview = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() && !file) return;

    onSend(input, file);
    setInput("");
    setFile(null);
    setPreviewUrl(null);
  };

  return (
    <form className="chat-input-wrapper" onSubmit={handleSubmit}>
      {previewUrl && (
        <div className="preview-container">
          {file.type.startsWith("image/") ? (
            <img src={previewUrl} alt="preview" className="preview-image" />
          ) : (
            <video src={previewUrl} controls className="preview-video" />
          )}
          <button type="button" className="remove-preview" onClick={removePreview}>
            <X size={18} />
          </button>
        </div>
      )}

      <div className="chat-input">
        <label className="file-upload" title="Upload image or video">
          <Image size={22} />
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            hidden
          />
        </label>

        <input
          type="text"
          placeholder="Type or speak your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />

        <button
          type="button"
          onClick={handleMicToggle}
          className={`send-btn ${isRecording ? "recording" : ""}`}
          title={isRecording ? "Stop Recording" : "Speak Message"}
        >
          {isRecording ? <MicOff size={20} color="white" /> : <Mic size={20} />}
        </button>

        <button type="submit" disabled={loading} className="send-btn">
          {loading ? <span className="loader"></span> : <Send size={20} />}
        </button>
      </div>
    </form>
  );
}
