import React from "react";

export default function Library() {
  return (
    <div className="profile-container">
      <h2 className="profile-title">Library</h2>

      <div className="profile-field">
        <label>Search Resources</label>
        <input type="text" placeholder="Search your saved files or prompts..." />
      </div>

      <div className="profile-field">
        <label>Category</label>
        <select>
          <option>All</option>
          <option>AI Prompts</option>
          <option>Documents</option>
          <option>Snippets</option>
        </select>
      </div>

      <div className="profile-field">
        <label>Notes</label>
        <textarea placeholder="Add notes or references related to your saved content"></textarea>
      </div>

      <button className="save-btn">Save</button>
    </div>
  );
}
