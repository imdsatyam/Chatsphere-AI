import React from "react";

export default function Archived() {
  return (
    <div className="profile-container">
      <h2 className="profile-title">Archived Chats</h2>

      <div className="profile-field">
        <label>Search Archived Chats</label>
        <input type="text" placeholder="Type to search your archived conversations..." />
      </div>

      <div className="profile-field">
        <label>Sort By</label>
        <select>
          <option>Date (Newest First)</option>
          <option>Date (Oldest First)</option>
          <option>Chat Title</option>
        </select>
      </div>

      <div className="profile-field">
        <label>Reason for Archiving</label>
        <textarea placeholder="Optional note about why chats were archived..."></textarea>
      </div>

      <button className="save-btn">Update Archive</button>
    </div>
  );
}
