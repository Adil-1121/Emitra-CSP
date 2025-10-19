import React, { useContext } from "react";
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

const Navbar = ({ sidebarWidth }) => {
    const { dispatch, darkMode } = useContext(DarkModeContext);
    const navigate = useNavigate();

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    };

    return (
        <div
            className="navbar"
            style={{
                width: `calc(100% - ${sidebarWidth}px)`,
                left: `${sidebarWidth}px`,
                transition: "all 0.3s ease"
            }}
        >         <div className="wrapper">
                {/* Search */}
                <div className="search">
                    <input type="text" placeholder="Type here to search..." />
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
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
