import React from "react";

export default function Settings() {
  return (
    <div className="profile-container">
      <h2 className="profile-title">Settings</h2>

      <div className="profile-field">
        <label>Theme</label>
        <select>
          <option>Dark</option>
          <option>Light</option>
          <option>System Default</option>
        </select>
      </div>

      <div className="profile-field">
        <label>Notifications</label>
        <select>
          <option>Enabled</option>
          <option>Disabled</option>
        </select>
      </div>

      <div className="profile-field">
        <label>Language</label>
        <select>
          <option>English</option>
          <option>Hindi</option>
          <option>Spanish</option>
          <option>French</option>
        </select>
      </div>

      <div className="profile-field">
        <label>Account Preferences</label>
        <textarea placeholder="Any specific preferences or notes..."></textarea>
      </div>

      <button className="save-btn">Save Settings</button>
    </div>
  );
}
