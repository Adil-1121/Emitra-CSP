import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import './profileAvatar.scss';

// Font Awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRightFromBracket, faUserPen, faLock } from '@fortawesome/free-solid-svg-icons';

const ProfileAvatar = ({
    image = "/default-avatar.png", // Default avatar image
    role = "ADMIN",
    altText = "User Avatar",
}) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // ✅ Get the logged-in user's name from localStorage
    const [name, setName] = useState(localStorage.getItem("userName") || "User");

    // Close dropdown if clicked outside
    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleToggle = () => {
        setOpen(prev => !prev);
    };

    // Navigation handlers
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

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        navigate("/login");
        setOpen(false);
    };

    return (
        <div className="item profile-avatar" ref={dropdownRef}>
            <img
                src={image}
                className="avatar"
                alt={altText}
                onClick={handleToggle}
            />

            {open && (
                <div className="profile-dropdown">
                    <div className="profile-header">
                        <div className="name">{name}</div>
                        <div className="role-badge">{role}</div>
                        {/* Pro subscription badge */}
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
                            <FontAwesomeIcon icon={faLock} className="icon" />
                            <span className="label">Change Password</span>
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
