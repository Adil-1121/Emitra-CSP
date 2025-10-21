import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./profileAvatar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faUserLock,
    faRightFromBracket,
    faUserPen,
    faUnlockKeyhole,
} from "@fortawesome/free-solid-svg-icons";

const ProfileAvatar = ({
    image = "/default-avatar.png",
    role = "ADMIN",
    altText = "User Avatar",
}) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // ✅ Helper: Format image (base64 or direct URL)
    const formatImage = (img) => {
        if (!img) return image;
        if (img.startsWith("data:image")) return img;
        return `data:image/jpeg;base64,${img}`;
    };

    // ✅ Fetch user details from localStorage
    const [name, setName] = useState(localStorage.getItem("userName") || "User");
    const [userRole, setUserRole] = useState(localStorage.getItem("userRole") || role);
    const [avatar, setAvatar] = useState(formatImage(localStorage.getItem("userProfileImage")));

    // ✅ Listen for any localStorage updates (e.g., after editing profile)
    useEffect(() => {
        const updateUserInfo = () => {
            setName(localStorage.getItem("userName") || "User");
            setUserRole(localStorage.getItem("userRole") || role);
            setAvatar(formatImage(localStorage.getItem("userProfileImage")));
        };
        window.addEventListener("storage", updateUserInfo);
        return () => window.removeEventListener("storage", updateUserInfo);
    }, [role]);

    // ✅ Close dropdown on outside click
    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setOpen(false);
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // ✅ Toggle dropdown
    const handleToggle = () => setOpen((prev) => !prev);

    // ✅ Navigation Handlers
    const goToProfile = () => {
        navigate("/profile");
        setOpen(false);
    };

    const goToEditProfile = () => {
        navigate("/profile/edit-profile");
        setOpen(false);
    };

    const goToChangePassword = () => {
        navigate("/change-password");
        setOpen(false);
    };

    const goToLockScreen = () => {
        localStorage.setItem("locked", "true");
        navigate("/lock-screen");
        setOpen(false);
    };

    // ✅ Logout Handler
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userProfileImage");
        navigate("/login");
        setOpen(false);
    };

    return (
        <div className="item profile-avatar" ref={dropdownRef}>
            <img
                src={avatar}
                className="avatar"
                alt={altText}
                onClick={handleToggle}
            />

            {open && (
                <div className="profile-dropdown">
                    <div className="profile-header">
                        <div className="name">{name}</div>
                        <div className="role-badge">{userRole}</div>
                        <div className="subscription-badge">Pro</div>
                    </div>

                    <ul>
                        <li onClick={goToProfile}>
                            <FontAwesomeIcon icon={faUser} className="icon" />
                            <span className="label">My Profile</span>
                        </li>

                        <li onClick={goToEditProfile}>
                            <FontAwesomeIcon icon={faUserPen} className="icon" />
                            <span className="label">Edit Profile</span>
                        </li>

                        <li onClick={goToChangePassword}>
                            <FontAwesomeIcon icon={faUnlockKeyhole} className="icon" />
                            <span className="label">Change Password</span>
                        </li>

                        <li onClick={goToLockScreen}>
                            <FontAwesomeIcon icon={faUserLock} className="icon" />
                            <span className="label">Lock Screen</span>
                        </li>

                        <hr />

                        <li className="signout" onClick={handleLogout}>
                            <FontAwesomeIcon icon={faRightFromBracket} className="icon" />
                            <span className="label">Sign Out</span>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

ProfileAvatar.propTypes = {
    image: PropTypes.string,
    role: PropTypes.string,
    altText: PropTypes.string,
};

export default ProfileAvatar;
