import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMoon,
    faSun,
    faExpand,
    faBell,
    faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import NotificationBox from "../../navbar-components/notification-box/NotificationBox";
import MessagesBox from "../../navbar-components/message-box/Messages";
import LanguageDropdown from "../../navbar-components/language-box/LanguageDropdown";
import AddNewDropdown from "../../navbar-components/add-dropdown-box/AddNewDropdown";
import ProfileAvatar from "../../navbar-components/profile-avatar/ProfileAvatar";
import { DarkModeContext } from "../../../shared/context/DarkModeContext";
import SearchBar from "../../navbar-components/search-bar/SearchBar";
const Navbar = ({ sidebarWidth }) => {
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    const navigate = useNavigate();

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // ✅ Window resize listener
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // ✅ Fullscreen toggle
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    };

    // ✅ Responsive navbar width calculation
    const effectiveWidth =
        windowWidth < 760 ? "100%" : `calc(100% - ${sidebarWidth}px)`;
    const effectiveLeft = windowWidth < 760 ? 0 : `${sidebarWidth}px`;

    return (
        <div
            className="navbar"
            style={{
                width: effectiveWidth,
                left: effectiveLeft,
                transition: "all 0.3s ease",
            }}
        >
            <div className="wrapper">
                <SearchBar darkMode={darkMode} />

                {/* 🌙 Navbar Items */}
                <div className="items">
                    {/* Language Dropdown */}
                    <LanguageDropdown />

                    {/* Fullscreen Toggle */}
                    <div className="item" onClick={toggleFullscreen}>
                        <FontAwesomeIcon icon={faExpand} className="icon" />
                    </div>

                    {/* Dark Mode Toggle */}
                    <div className="item" onClick={toggleDarkMode}>
                        <FontAwesomeIcon
                            icon={darkMode ? faSun : faMoon}
                            className="icon"
                        />
                    </div>

                    {/* AI Assistant Button */}
                    <div className="item" onClick={() => navigate("/gn-emitra-ai")}>
                        <span className="text">AI</span>
                    </div>

                    {/* Add New Dropdown */}
                    <AddNewDropdown />

                    {/* Notifications */}
                    <NotificationBox icon={faBell} />

                    {/* Chat / Messages */}
                    <MessagesBox icon={faCommentDots} />

                    {/* Profile Avatar */}
                    <ProfileAvatar />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
