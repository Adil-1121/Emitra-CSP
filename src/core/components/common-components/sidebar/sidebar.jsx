import React, { useState, useEffect } from "react";
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
    faAngleLeft,
    faCheckCircle,
    faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./sidebar.scss";
import logo from "../../../../assets/logo.png";
import defaultAvatar from "../../../../assets/avatar.png";

const Sidebar = ({ sidebarOpen, toggleSidebar, setSidebarHovered }) => {
    const [portfolioOpen, setPortfolioOpen] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [user, setUser] = useState({
        full_name: "User",
        role: "Admin",
        avatar: defaultAvatar,
    });

    // ✅ Helper: Format avatar (supports base64 or URL)
    const formatAvatar = (img) => {
        if (!img) return defaultAvatar;
        if (img.startsWith("data:image")) return img;
        return `data:image/jpeg;base64,${img}`;
    };

    // ✅ Fetch user info from localStorage
    const getUserData = () => {
        const name = localStorage.getItem("userName") || "User";
        const role = localStorage.getItem("userRole") || "Admin";
        const avatar = formatAvatar(localStorage.getItem("userProfileImage"));
        return { full_name: name, role, avatar };
    };

    useEffect(() => {
        setUser(getUserData());

        // ✅ Auto update when localStorage changes
        const handleStorageChange = () => {
            setUser(getUserData());
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const togglePortfolio = () => {
        setPortfolioOpen(!portfolioOpen);
    };

    const handleMouseEnter = () => {
        setHovered(true);
        setSidebarHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
        setSidebarHovered(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("locked");
        localStorage.removeItem("userName");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userProfileImage");
        window.location.href = "/login";
    };

    const isOpen = sidebarOpen || hovered;

    return (
        <>
            <div
                className={`sidebar ${sidebarOpen ? "open" : "closed"} ${hovered ? "hovered" : ""}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Top Section */}
                <div className="top">
                    <div className="logo-container">
                        <Link to="/dashboard/admin-dashboard" style={{ textDecoration: "none" }}>
                            <span className="logo">
                                <img
                                    src={logo}
                                    className="avatar"
                                    alt="Logo"
                                    style={{
                                        width: "45px",
                                        height: "45px",
                                        marginRight: isOpen ? "5px" : "0",
                                    }}
                                />
                                {isOpen && "ADMIN PANEL"}
                            </span>
                        </Link>
                    </div>
                </div>

                <hr />

                {/* Center Section */}
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

                {/* Bottom Section (User Profile) */}
                <div className="bottom">
                    <div className="profile">
                        <Link to="/profile" className="link" style={{ textDecoration: "none" }}>
                            <img src={user.avatar} className="profileImg" alt="User Avatar" />
                        </Link>
                        {isOpen && (
                            <Link to="/profile" className="link" style={{ textDecoration: "none" }}>
                                <div className="profileInfo">
                                    <div className="nameRow">
                                        <span className="name">{user.full_name}</span>
                                        <FontAwesomeIcon icon={faCheckCircle} className="verifiedIcon" />
                                    </div>
                                    <span className="role">{user.role}</span>
                                </div>
                            </Link>
                        )}
                        {isOpen && (
                            <div onClick={handleLogout} style={{ cursor: "pointer" }}>
                                <FontAwesomeIcon icon={faSignOutAlt} className="logoutIcon" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ✅ Toggle Button Outside Sidebar */}
            <FontAwesomeIcon
                icon={sidebarOpen || hovered ? faAngleLeft : faAngleRight}
                className={`menuBtn ${sidebarOpen ? "open" : "closed"} ${hovered ? "hovered" : ""}`}
                onClick={toggleSidebar}
            />
        </>
    );
};

export default Sidebar;
