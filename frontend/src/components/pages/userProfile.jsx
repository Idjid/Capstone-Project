import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/profile.css";

function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("exchange");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        //Getting user
        const currentUser = await axios.get("http://localhost:8080/api/user/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        //Send to your profile
        if (currentUser.data._id === id) {
          navigate("/profile/me");
          return;
        }

        //Opens other user's profile
        const res = await axios.get(`http://localhost:8080/api/user/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchUser();
  }, [id, navigate]);

  if (!user) return <div className="profile-loading">Loading user profile...</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-picture-section">
            <img
                src={user.picture || "https://via.placeholder.com/150"}
                alt="Profile"
                className="profile-picture"
            />
        </div>

        <h1>{user.name}</h1>
        <p className="profile-role">Role: {user.role}</p>
        <p className="profile-description">{user.description || "No description"}</p>

        <p>
          Address: {user.address?.country || "—"}, {user.address?.state || "—"},{" "}
          {user.address?.city || "—"}
        </p>

        <button className="chat-button" onClick={() => navigate("/chat")}>
          Chat
        </button>
      </div>

      <div className="profile-tabs">
        <button className={activeTab === "exchange" ? "active" : ""} onClick={() => setActiveTab("exchange")}>
          Books for share
        </button>
        <button className={activeTab === "comments" ? "active" : ""} onClick={() => setActiveTab("comments")}>
          Comment history
        </button>
      </div>

      <div className="profile-tab-content">
        {activeTab === "exchange" ? (
          <div className="exchange-books">
            <p>There is nothing (Sharing books)</p>
          </div>
        ) : (
          <div className="comment-history">
            <p>No comments</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;

