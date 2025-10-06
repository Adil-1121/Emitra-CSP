import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import './profileAvatar.scss';

// Font Awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRightFromBracket, faUserPen } from '@fortawesome/free-solid-svg-icons';

const ProfileAvatar = ({
    image,
    name = "Sadiq Hussain",
    role = "ADMIN",
    altText = "User Avatar",
}) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

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

    const goToProfile = () => {
        navigate("/profile");
        setOpen(false);
    };

    const goToEditProfile = () => {
        navigate("/edit-profile");
        setOpen(false);
    };

    const handleLogout = () => {
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
                        <li onClick={handleLogout}>
                            <FontAwesomeIcon icon={faRightFromBracket} className="icon" />
                            <span className="label">Logout</span>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

ProfileAvatar.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string,
    role: PropTypes.string,
    altText: PropTypes.string,
    tooltip: PropTypes.string,
};

export default ProfileAvatar;
