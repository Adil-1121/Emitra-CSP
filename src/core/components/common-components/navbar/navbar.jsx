import React, { useContext, useEffect, useState } from "react";
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
import { DarkModeContext } from "../../../shared/context/darkModeContext";
import NotificationBox from "../../navbar-components/notification-box/NotificationBox";
import MessagesBox from "../../navbar-components/message-box/Messages";
import LanguageDropdown from "../../navbar-components/language-box/LanguageDropdown";
import AddNewDropdown from "../../navbar-components/add-dropdown-box/AddNewDropdown";
import ProfileAvatar from "../../navbar-components/profile-avatar/ProfileAvatar";
import { userRows } from "../../../../datatablesource";

const Navbar = ({ sidebarWidth }) => {
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    const navigate = useNavigate();

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // ✅ Listen for window resize
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    };

    // ✅ Calculate dynamic width and left for navbar
    const effectiveWidth = windowWidth < 760 ? '100%' : `calc(100% - ${sidebarWidth}px)`;
    const effectiveLeft = windowWidth < 760 ? 0 : `${sidebarWidth}px`;

    return (
        <div
            className="navbar"
            style={{
                width: effectiveWidth,
                left: effectiveLeft,
                transition: "all 0.3s ease"
            }}
        >
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
                    <div className="item" onClick={toggleDarkMode}>
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
                    <ProfileAvatar />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
