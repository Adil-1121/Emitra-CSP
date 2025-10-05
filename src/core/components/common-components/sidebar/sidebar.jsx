import React, { useState } from "react";
import { Link } from "react-router-dom";
import { faUser, faUsers, faCog, faChartBar, faBell, faEnvelope, faTools, faSignOutAlt, faAngleRight, faCheckCircle, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './sidebar.scss';

import logo from '../../../../assets/logo.png';
import avatar from '../../../../assets/avatar.png';

const Sidebar = () => {
    const [portfolioOpen, setPortfolioOpen] = useState(false);

    const togglePortfolio = () => {
        setPortfolioOpen(!portfolioOpen);
    };

    return (
        <div className="sidebar">
            <div className="top">
                <Link to="/dashboard/admin-dashboard" style={{ textDecoration: "none" }}>
                    <span className="logo">
                        <img src={logo} className="avatar" alt="Logo" />
                        ADMIN PANEL
                    </span>
                </Link>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <Link to="/dashboard/admin-dashboard" style={{ textDecoration: "none" }}>
                        <li className="active">
                            <FontAwesomeIcon icon={faHome} className="icon" />
                            <span>Dashboard</span>
                        </li>
                    </Link>

                    <p className="title">LISTS</p>
                    <Link to="/users" style={{ textDecoration: "none" }}>
                        <li>
                            <FontAwesomeIcon icon={faUsers} className="icon" />
                            <span>Users</span>
                        </li>
                    </Link>
                    <li
                        className={`portfolio ${portfolioOpen ? "active" : ""}`}
                        onClick={togglePortfolio}
                        style={{ cursor: "pointer", userSelect: "none" }}
                    >
                        <FontAwesomeIcon icon={faUser} className="icon" />
                        <span>Portfolio</span>
                        <FontAwesomeIcon
                            icon={faAngleRight}
                            className={`arrowIcon ${portfolioOpen ? "rotate" : ""}`}
                        />
                    </li>
                    {portfolioOpen && (
                        <>
                            <Link to="/users" style={{ textDecoration: "none" }}>
                                <li className="submenu">
                                    <span>About</span>
                                </li>
                            </Link>
                            <Link to="/services" style={{ textDecoration: "none" }}>
                                <li className="submenu">
                                    <span>Services</span>
                                </li>
                            </Link>
                            <li className="submenu"><span>Testimonials</span></li>
                            <Link to="/faqs" style={{ textDecoration: "none" }}>
                                <li className="submenu"><span>Faqs</span></li></Link>
                        </>
                    )}


                    <li>
                        <FontAwesomeIcon icon={faTools} className="icon" />
                        <span>Services</span>
                        <FontAwesomeIcon icon={faAngleRight} className="arrowIcon" />
                    </li>

                    <p className="title">USEFUL</p>
                    <li>
                        <FontAwesomeIcon icon={faChartBar} className="icon" />
                        <span>Stats</span>
                        <FontAwesomeIcon icon={faAngleRight} className="arrowIcon" />
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faBell} className="icon" />
                        <span>Notification</span>
                    </li>

                    <p className="title">SERVICE</p>
                    <li>
                        <FontAwesomeIcon icon={faEnvelope} className="icon" />
                        <span>Contact Messages</span>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faCog} className="icon" />
                        <span>Settings</span>
                    </li>

                    <p className="title">USER</p>
                    <li>
                        <FontAwesomeIcon icon={faUser} className="icon" />
                        <span>Profile</span>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
            <div className="bottom">
                <div className="profile">
                    <img src={avatar} className="profileImg" alt="User Avatar" />
                    <div className="profileInfo">
                        <div className="nameRow">
                            <span className="name">Sadiq Hussain</span>
                            <FontAwesomeIcon icon={faCheckCircle} className="verifiedIcon" />
                        </div>
                        <span className="role">Admin</span>
                    </div>
                    <FontAwesomeIcon icon={faSignOutAlt} className="logoutIcon" />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
