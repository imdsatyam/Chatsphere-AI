import React, { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  if (!user) {
    return <p className="text-center mt-10">Please login first.</p>;
  }

  return (
    <div className="profile-container">
      <h2 className="profile-title">User Profile</h2>

      <div className="profile-field">
        <label>Name</label>
        <input type="text" value={user.name} readOnly />
      </div>

      <div className="profile-field">
        <label>Email</label>
        <input type="email" value={user.email} readOnly />
      </div>

      <div className="profile-field">
        <label>Role</label>
        <input type="text" value={user.role} readOnly />
      </div>

      <div className="profile-field">
        <label>Bio</label>
        <textarea placeholder="Tell something about yourself"></textarea>
      </div>

      <button className="save-btn">Save Changes</button>
    </div>
  );
}
