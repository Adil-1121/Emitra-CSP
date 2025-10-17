import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './navbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch,
    faMoon,
    faSun,
    faExpand,
    faBell,
    faCommentDots,
} from '@fortawesome/free-solid-svg-icons';
import avatar from '../../../../assets/avatar.png';
import { DarkModeContext } from "../../../shared/context/darkModeContext";
import NotificationBox from "../../navbar-components/notification-box/NotificationBox";
import MessagesBox from "../../navbar-components/message-box/Messages";
import LanguageDropdown from "../../navbar-components/language-box/LanguageDropdown";
import AddNewDropdown from "../../navbar-components/add-dropdown-box/AddNewDropdown";
import ProfileAvatar from "../../navbar-components/profile-avatar/ProfileAvatar";
import { userRows } from "../../../../datatablesource";

const Navbar = () => {
    const { dispatch, darkMode } = useContext(DarkModeContext);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    };

    useEffect(() => {
        if (searchTerm.length > 0) {
            const filteredUsers = userRows.filter(user => 
                user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchResults(filteredUsers.slice(0, 5));
            setShowDropdown(true);
        } else {
            setSearchResults([]);
            setShowDropdown(false);
        }
    }, [searchTerm]);

    const handleUserClick = (userId) => {
        navigate(`/users/view-user/${userId}`);
        setSearchTerm("");
        setShowDropdown(false);
    };

    return (
        <div className="navbar">
            <div className="wrapper">
                {/* Search */}
                <div className="search">
                    <input 
                        type="text" 
                        placeholder="Search users..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                    />
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    {showDropdown && searchResults.length > 0 && (
                        <div className="search-dropdown">
                            {searchResults.map(user => (
                                <div 
                                    key={user.id} 
                                    className="search-item"
                                    onClick={() => handleUserClick(user.id)}
                                >
                                    <img src={user.img} alt={user.userName} className="search-avatar" />
                                    <div className="search-info">
                                        <span className="search-name">{user.userName}</span>
                                        <span className="search-email">{user.email}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="items">
                    {/* Language */}
                    <LanguageDropdown />


                    {/* Fullscreen */}
                    <div className="item" onClick={toggleFullscreen}>
                        <FontAwesomeIcon icon={faExpand} className="icon" />
                    </div>
                    {/* Dark Mode Toggle */}
                    <div
                        className="item"
                        onClick={() => dispatch({ type: "TOGGLE" })}
                    >
                        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} className="icon" />
                    </div>

                    {/* AI Assistant */}
                    <div className="item" onClick={() => navigate("/gn-emitra-ai")}>
                        <span className="text">AI</span>
                    </div>
                    {/* Add New */}
                    <AddNewDropdown />

                    {/* Notifications */}
                    <NotificationBox icon={faBell} />
                    {/* Chat / Messages */}
                    <MessagesBox icon={faCommentDots} />

                    {/* Avatar */}
                    <ProfileAvatar image={avatar} />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
