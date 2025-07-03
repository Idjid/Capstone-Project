import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("exchange");

  const [editingName, setEditingName] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);
  const [editingPicture, setEditingPicture] = useState(false);

  const [nameInput, setNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [addressInput, setAddressInput] = useState({ country: "", state: "", city: "" });
  const [pictureInput, setPictureInput] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/user/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(res.data);
        setNameInput(res.data.name || "");
        setDescriptionInput(res.data.description || "");
        setAddressInput(res.data.address || { country: "", state: "", city: "" });
        setPictureInput(res.data.picture || "");
      } catch (err) {
        console.error("Error while downloading profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateName = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/user/name",
        { name: nameInput },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setUser((prev) => ({ ...prev, name: nameInput }));
      setEditingName(false);
    } catch (err) {
      console.error("Failed to update name", err);
    }
  };

  const handleUpdateDescription = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/user/description",
        { description: descriptionInput },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setUser((prev) => ({ ...prev, description: descriptionInput }));
      setEditingDescription(false);
    } catch (err) {
      console.error("Failed to update description", err);
    }
  };

  const handleUpdateAddress = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/user/address",
        addressInput,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setUser((prev) => ({ ...prev, address: addressInput }));
      setEditingAddress(false);
    } catch (err) {
      console.error("Failed to update address", err);
    }
  };

  const handleUpdatePicture = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/user/picture",
        { picture: pictureInput },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setUser((prev) => ({ ...prev, picture: pictureInput }));
      setEditingPicture(false);
    } catch (err) {
      console.error("Failed to update picture", err);
    }
  };

  if (!user) return <div className="profile-loading">Downloading your profile...</div>;

  return (
    <div className="profile-container">
        <div className="profile-header">
            <div className="profile-picture-section">
                <img
                    src={user.picture || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="profile-picture"
                />

                {editingPicture ? (
                    <div className="edit-picture-form">
                        <input
                            type="text"
                            value={pictureInput}
                            placeholder="Paste image URL"
                            onChange={(event) => setPictureInput(event.target.value)}
                        />
                        <div className="edit-buttons">
                            <button className="btn primary" onClick={handleUpdatePicture}>Save</button>
                            <button className="btn secondary" onClick={() => setEditingPicture(false)}>Cancel</button>
                        </div>
                    </div>
                ) : (
                    <button className="btn secondary" onClick={() => setEditingPicture(true)}>Change picture</button>
                )}
            </div>


            {editingName ? (
                <div className="edit-name-section">
                    <input
                        type="text"
                        value={nameInput}
                        onChange={(event) => setNameInput(event.target.value)}
                        className="name-input"
                    />
                    <div className="edit-buttons">
                        <button className="btn primary" onClick={handleUpdateName}>Save</button>
                        <button className="btn secondary" onClick={() => setEditingName(false)}>Cancel</button>
                    </div>
                </div>
                ) : (
                <>
                    <h1>{user.name}</h1>
                    <button className="btn secondary" onClick={() => setEditingName(true)}>Change name</button>
                </>
                )}

                <p className="profile-role">Role: {user.role}</p>

                <h4 className="margin-button">About myself:</h4>
                {editingDescription ? (
                    <>
                        <textarea
                            value={descriptionInput}
                            onChange={(event) => setDescriptionInput(event.target.value)}
                    />
                    <div className="edit-buttons">
                        <button className="btn primary" onClick={handleUpdateDescription}>Save</button>
                        <button className="btn secondary" onClick={() => setEditingDescription(false)}>Cancel</button>
                    </div>
                </>
                ) : (
                    <>
                        <p className="profile-description">{user.description || "No description"}</p>
                        <button className="btn secondary" onClick={() => setEditingDescription(true)}>Update description</button>
                    </>
                )}
            

                {editingAddress ? (
                    <div className="address-form">
                        <input
                            placeholder="Country"
                            value={addressInput.country}
                            nChange={(event) => setAddressInput({ ...addressInput, country: event.target.value })}
                        />
                        <input
                            placeholder="State"
                            value={addressInput.state}
                            onChange={(event) => setAddressInput({ ...addressInput, state: event.target.value })}
                        />
                        <input
                            placeholder="City"
                            value={addressInput.city}
                            onChange={(event) => setAddressInput({ ...addressInput, city: event.target.value })}
                        />
                        <div className="edit-buttons">
                            <button className="btn primary" onClick={handleUpdateAddress}>Save</button>
                            <button className="btn secondary" onClick={() => setEditingAddress(false)}>Cancel</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <p>
                            Address: {user.address?.country || "—"}, {user.address?.state || "—"},{" "}
                            {user.address?.city || "—"}
                        </p>
                        <button className="btn secondary" onClick={() => setEditingAddress(true)}>Change address</button>
                    </>
                )}

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
                <button onClick={() => navigate("/publish")} className="publish-book-button">
                    Add book
                </button>
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

export default Profile;
