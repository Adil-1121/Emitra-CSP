import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    faUser,
    faUsers,
    faCog,
    faChartBar,
    faBell,
    faHeadset,
    faTools,
    faSignOutAlt,
    faAngleRight,
    faCheckCircle,
    faHome,
    faBars
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './sidebar.scss';
import logo from '../../../../assets/logo.png';
import avatar from '../../../../assets/avatar.png';
import { text } from "@fortawesome/fontawesome-svg-core";

const Sidebar = () => {
    const [portfolioOpen, setPortfolioOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [hovered, setHovered] = useState(false);

    const togglePortfolio = () => {
        setPortfolioOpen(!portfolioOpen);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const isOpen = sidebarOpen || hovered;

    return (
        <div
            className={`sidebar ${sidebarOpen ? "open" : "closed"} ${hovered ? "hovered" : ""}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Top */}
            <div className="top">
                <div className="logo-container">
                    <Link to="/dashboard/admin-dashboard" style={{ textDecoration: "none" }}>
                        <span className="logo">
                            <img
                                src={logo}
                                className="avatar"
                                alt="Logo"
                                style={{
                                    width: isOpen ? '35px' : '25px',
                                    height: isOpen ? '35px' : '25px',
                                    marginRight: isOpen ? '5px' : '0'
                                }}
                            />
                            {isOpen && 'ADMIN PANEL'}
                        </span>
                    </Link>


                </div>
                <FontAwesomeIcon
                    icon={faBars}
                    className="menuBtn"
                    onClick={toggleSidebar}
                />
            </div>

            <hr />

            {/* Center */}
            <div className="center">
                <ul>
                    <p className="title">{isOpen ? "MAIN" : ""}</p>
                    <Link to="/dashboard/admin-dashboard" style={{ textDecoration: "none" }}>
                        <li className={sidebarOpen ? "active" : ""}>
                            <FontAwesomeIcon icon={faHome} className="icon" />
                            {isOpen && <span>Dashboard</span>}
                        </li>
                    </Link>

                    <p className="title">{isOpen ? "LISTS" : ""}</p>
                    <Link to="/users" style={{ textDecoration: "none" }}>
                        <li>
                            <FontAwesomeIcon icon={faUsers} className="icon" />
                            {isOpen && <span>Users</span>}
                        </li>
                    </Link>

                    <li
                        className={`portfolio ${portfolioOpen ? "active" : ""}`}
                        onClick={togglePortfolio}
                        style={{ cursor: "pointer", userSelect: "none" }}
                    >
                        <FontAwesomeIcon icon={faUser} className="icon" />
                        {isOpen && <span>Portfolio</span>}
                        <FontAwesomeIcon
                            icon={faAngleRight}
                            className={`arrowIcon ${portfolioOpen ? "rotate" : ""}`}
                        />
                    </li>

                    {(portfolioOpen && isOpen) && (
                        <>
                            <Link to="/services" style={{ textDecoration: "none" }}>
                                <li className="submenu"><span>Services</span></li>
                            </Link>
                            <Link to="/testimonials" style={{ textDecoration: "none" }}>
                                <li className="submenu"><span>Testimonials</span></li>
                            </Link>
                            <Link to="/faqs" style={{ textDecoration: "none" }}>
                                <li className="submenu"><span>Faqs</span></li>
                            </Link>
                        </>
                    )}

                    <li>
                        <FontAwesomeIcon icon={faTools} className="icon" />
                        {isOpen && <span>Services</span>}
                        {isOpen && <FontAwesomeIcon icon={faAngleRight} className="arrowIcon" />}
                    </li>

                    <p className="title">{isOpen ? "USEFUL" : ""}</p>
                    <li>
                        <FontAwesomeIcon icon={faChartBar} className="icon" />
                        {isOpen && <span>Stats</span>}
                        {isOpen && <FontAwesomeIcon icon={faAngleRight} className="arrowIcon" />}
                    </li>

                    <li>
                        <FontAwesomeIcon icon={faBell} className="icon" />
                        {isOpen && <span>Notification</span>}
                    </li>

                    <p className="title">{isOpen ? "SERVICE" : ""}</p>
                    <Link to="/settings" style={{ textDecoration: "none" }}>
                        <li>
                            <FontAwesomeIcon icon={faCog} className="icon" />
                            {isOpen && <span>Settings</span>}
                        </li>
                    </Link>

                    <Link to="/contact-us" style={{ textDecoration: "none" }}>
                        <li>
                            <FontAwesomeIcon icon={faHeadset} className="icon" />
                            {isOpen && <span>Contact Us</span>}
                        </li>
                    </Link>
                </ul>
            </div>

            {/* Bottom */}
            <div className="bottom">
                <div className="profile">
                    <Link to="/profile" className="link" style={{ textDecoration: "none" }}>
                        <img src={avatar} className="profileImg" alt="User Avatar" />
                    </Link>
                    {isOpen && (
                        <Link to="/profile" className="link" style={{ textDecoration: "none" }}>

                            <div className="profileInfo">
                                <div className="nameRow">
                                    <span className="name">Sadiq Hussain</span>
                                    <FontAwesomeIcon icon={faCheckCircle} className="verifiedIcon" />
                                </div>
                                <span className="role">Admin</span>
                            </div>
                        </Link>
                    )}
                    <Link to="/login" className="link" style={{ textDecoration: "none" }}>

                        {isOpen && <FontAwesomeIcon icon={faSignOutAlt} className="logoutIcon" />}</Link>
                </div>
            </div>
        </div >
    );
};

export default Sidebar;
