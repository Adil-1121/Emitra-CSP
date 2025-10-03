import React, { useContext } from "react";
import './navbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch,
    faGlobe,
    faMoon,
    faSun,
    faExpand,
    faBell,
    faCommentDots,
    faList,
    faPlusCircle,
    faCog
} from '@fortawesome/free-solid-svg-icons';
import avatar from '../../../../assets/avatar.png';
import { DarkModeContext } from "../../../shared/context/darkModeContext";
import { Tooltip } from 'primereact/tooltip';
import NotificationBox from "../../navbar-components/notification-box/NotificationBox";
import MessagesBox from "../../navbar-components/message-box/Messages";
import LanguageDropdown from "../../navbar-components/language-box/LanguageDropdown";
import AddNewDropdown from "../../navbar-components/add-dropdown-box/AddNewDropdown";

const Navbar = () => {
    const { dispatch, darkMode } = useContext(DarkModeContext);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    };

    return (
        <div className="navbar">
            <div className="wrapper">
                {/* Search */}
                <div className="search">
                    <input type="text" placeholder="Type here to search..." />
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <Tooltip target=".search" content="Search" position="bottom" />
                </div>

                <div className="items">
                    {/* Language */}
                    <LanguageDropdown />

                    {/* Dark Mode Toggle */}
                    <div
                        className="item"
                        onClick={() => dispatch({ type: "TOGGLE" })}
                    >
                        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} className="icon" />
                        <Tooltip
                            target=".item:nth-child(2)"
                            content={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                            position="bottom"
                        />
                    </div>

                    {/* Fullscreen */}
                    <div className="item" onClick={toggleFullscreen}>
                        <FontAwesomeIcon icon={faExpand} className="icon" />
                        <Tooltip target=".item:nth-child(3)" content="Fullscreen" position="bottom" />
                    </div>

                    {/* Notifications */}
                    <NotificationBox icon={faBell} tooltip="Notifications" />

                    {/* Chat / Messages */}
                    <MessagesBox icon={faCommentDots} tooltip="Messages" />

                    {/* AI Assistant */}
                    <div className="item">
                        <span className="text">AI</span>
                        <Tooltip target=".item:nth-child(6)" content="AI Assistant" position="bottom" />
                    </div>

                    {/* Add New */}
                    <AddNewDropdown />

                    {/* List/Menu */}
                    <div className="item">
                        <FontAwesomeIcon icon={faList} className="icon" />
                        <Tooltip target=".item:nth-child(8)" content="Menu" position="bottom" />
                    </div>

                    {/* Settings */}
                    <div className="item">
                        <FontAwesomeIcon icon={faCog} className="icon" />
                        <Tooltip target=".item:nth-child(9)" content="Settings" position="bottom" />
                    </div>

                    {/* Avatar */}
                    <div className="item">
                        <img src={avatar} className="avatar" alt="User Avatar" />
                        <Tooltip target=".item:nth-child(10)" content="Profile" position="bottom" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
