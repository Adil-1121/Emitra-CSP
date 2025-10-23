import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    faUser,
    faUsers,
    faCog,
    faBell,
    faHeadset,
    faTools,
    faSignOutAlt,
    faAngleRight,
    faAngleLeft,
    faCheckCircle,
    faHome,
    faDollar,
    faBook,
    faChartColumn,
    faBarsProgress,
    faFileInvoiceDollar,
    faFileInvoice,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Sidebar as PrimeSidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import "./sidebar.scss";
import logo from "../../../../assets/logo.png";
import defaultAvatar from "../../../../assets/avatar.png";

const Sidebar = ({ sidebarOpen, toggleSidebar, setSidebarHovered }) => {
    const [portfolioOpen, setPortfolioOpen] = useState(false);
    const [salesOpen, setSalesOpen] = useState(false);

    const [hovered, setHovered] = useState(false);
    const [user, setUser] = useState({
        full_name: "User",
        role: "Admin",
        avatar: defaultAvatar,
    });
    const [mobileVisible, setMobileVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 760);

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

        const handleStorageChange = () => {
            setUser(getUserData());
        };

        const handleResize = () => {
            setIsMobile(window.innerWidth < 760);
        };

        window.addEventListener("storage", handleStorageChange);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const togglePortfolio = () => {
        setPortfolioOpen(!portfolioOpen);
    };
    const toggleSales = () => {
        setSalesOpen(!salesOpen);
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

    // const renderSidebarContent = () => (
    //     <>
    //         {/* Top Section */}
    //         <div className="top">
    //             <div className="logo-container">
    //                 <Link to="/dashboard/admin-dashboard" style={{ textDecoration: "none" }}>
    //                     <span className="logo">
    //                         <img
    //                             src={logo}
    //                             className="avatar"
    //                             alt="Logo"
    //                             style={{
    //                                 width: "45px",
    //                                 height: "45px",
    //                                 marginRight: isOpen ? "5px" : "0",
    //                             }}
    //                         />
    //                         {isOpen && "ADMIN PANEL"}
    //                     </span>
    //                 </Link>
    //             </div>
    //         </div>

    //         <hr />

    //         {/* Center Section */}
    //         <div className="center">
    //             <ul>
    //                 <p className="title">{isOpen ? "MAIN" : ""}</p>
    //                 <Link to="/dashboard/admin-dashboard" style={{ textDecoration: "none" }}>
    //                     <li className={sidebarOpen ? "active" : ""}>
    //                         <FontAwesomeIcon icon={faHome} className="icon" />
    //                         {isOpen && <span>Dashboard</span>}
    //                     </li>
    //                 </Link>

    //                 <p className="title">{isOpen ? "LISTS" : ""}</p>
    //                 <Link to="/users" style={{ textDecoration: "none" }}>
    //                     <li>
    //                         <FontAwesomeIcon icon={faUsers} className="icon" />
    //                         {isOpen && <span>Users</span>}
    //                     </li>
    //                 </Link>

    //                 <li
    //                     className={`portfolio ${portfolioOpen ? "active" : ""}`}
    //                     onClick={togglePortfolio}
    //                     style={{ cursor: "pointer", userSelect: "none" }}
    //                 >
    //                     <FontAwesomeIcon icon={faUser} className="icon" />
    //                     {isOpen && <span>Portfolio</span>}
    //                     <FontAwesomeIcon
    //                         icon={faAngleRight}
    //                         className={`arrowIcon ${portfolioOpen ? "rotate" : ""}`}
    //                     />
    //                 </li>

    //                 {(portfolioOpen && isOpen) && (
    //                     <>
    //                         <Link to="/services" style={{ textDecoration: "none" }}>
    //                             <li className="submenu"><span>Services</span></li>
    //                         </Link>
    //                         <Link to="/testimonials" style={{ textDecoration: "none" }}>
    //                             <li className="submenu"><span>Testimonials</span></li>
    //                         </Link>
    //                         <Link to="/faqs" style={{ textDecoration: "none" }}>
    //                             <li className="submenu"><span>Faqs</span></li>
    //                         </Link>
    //                     </>
    //                 )}

    //                 <li>
    //                     <FontAwesomeIcon icon={faTools} className="icon" />
    //                     {isOpen && <span>Services</span>}
    //                     {isOpen && <FontAwesomeIcon icon={faAngleRight} className="arrowIcon" />}
    //                 </li>

    //                 <p className="title">{isOpen ? "USEFUL" : ""}</p>
    //                 <li>
    //                     <FontAwesomeIcon icon={faChartBar} className="icon" />
    //                     {isOpen && <span>Stats</span>}
    //                     {isOpen && <FontAwesomeIcon icon={faAngleRight} className="arrowIcon" />}
    //                 </li>

    //                 <li>
    //                     <FontAwesomeIcon icon={faBell} className="icon" />
    //                     {isOpen && <span>Notification</span>}
    //                 </li>

    //                 <p className="title">{isOpen ? "SERVICE" : ""}</p>
    //                 <Link to="/settings" style={{ textDecoration: "none" }}>
    //                     <li>
    //                         <FontAwesomeIcon icon={faCog} className="icon" />
    //                         {isOpen && <span>Settings</span>}
    //                     </li>
    //                 </Link>

    //                 <Link to="/contact-us" style={{ textDecoration: "none" }}>
    //                     <li>
    //                         <FontAwesomeIcon icon={faHeadset} className="icon" />
    //                         {isOpen && <span>Contact Us</span>}
    //                     </li>
    //                 </Link>
    //             </ul>
    //         </div>

    //         {/* Bottom Section (User Profile) */}
    //         <div className="bottom">
    //             <div className="profile">
    //                 <Link to="/profile" className="link" style={{ textDecoration: "none" }}>
    //                     <img src={user.avatar} className="profileImg" alt="User Avatar" />
    //                 </Link>
    //                 {isOpen && (
    //                     <Link to="/profile" className="link" style={{ textDecoration: "none" }}>
    //                         <div className="profileInfo">
    //                             <div className="nameRow">
    //                                 <span className="name">{user.full_name}</span>
    //                                 <FontAwesomeIcon icon={faCheckCircle} className="verifiedIcon" />
    //                             </div>
    //                             <span className="role">{user.role}</span>
    //                         </div>
    //                     </Link>
    //                 )}
    //                 {isOpen && (
    //                     <div onClick={handleLogout} style={{ cursor: "pointer" }}>
    //                         <FontAwesomeIcon icon={faSignOutAlt} className="logoutIcon" />
    //                     </div>
    //                 )}
    //             </div>
    //         </div>
    //     </>
    // );

    const renderSidebarContent = () => (
        <>
            {/* Top Section */}
            <div className="top">
                <div className="logo-container">
                    <Link
                        to="/dashboard/admin-dashboard"
                        style={{ textDecoration: "none" }}
                        onClick={() => isMobile && setMobileVisible(false)}
                    >
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
                            {(isOpen || isMobile) && "ADMIN PANEL"}
                        </span>
                    </Link>
                </div>
            </div>

            <hr />

            {/* Center Section */}
            <div className="center">
                <ul>
                    <p className="title">{(isOpen || isMobile) ? "MAIN" : ""}</p>
                    <Link
                        to="/dashboard/admin-dashboard"
                        style={{ textDecoration: "none" }}
                        onClick={() => isMobile && setMobileVisible(false)}
                    >
                        <li className={sidebarOpen ? "active" : ""}>
                            <FontAwesomeIcon icon={faHome} className="icon" />
                            {(isOpen || isMobile) && <span>Dashboard</span>}
                        </li>
                    </Link>

                    <p className="title">{(isOpen || isMobile) ? "LISTS" : ""}</p>
                    <Link
                        to="/users"
                        style={{ textDecoration: "none" }}
                        onClick={() => isMobile && setMobileVisible(false)}
                    >
                        <li>
                            <FontAwesomeIcon icon={faUsers} className="icon" />
                            {(isOpen || isMobile) && <span>Users</span>}
                        </li>
                    </Link>

                    {/* Portfolio submenu */}
                    <li
                        className={`portfolio ${portfolioOpen ? "active" : ""}`}
                        onClick={togglePortfolio}
                        style={{ cursor: "pointer", userSelect: "none" }}
                    >
                        <FontAwesomeIcon icon={faUser} className="icon" />
                        {(isOpen || isMobile) && <span>Portfolio</span>}
                        <FontAwesomeIcon
                            icon={faAngleRight}
                            className={`arrowIcon ${portfolioOpen ? "rotate" : ""}`}
                        />
                    </li>

                    {(portfolioOpen && (isOpen || isMobile)) && (
                        <>
                            <Link
                                to="/services"
                                style={{ textDecoration: "none" }}
                                onClick={() => isMobile && setMobileVisible(false)}
                            >
                                <li className="submenu"><span>Services</span></li>
                            </Link>
                            <Link
                                to="/testimonials"
                                style={{ textDecoration: "none" }}
                                onClick={() => isMobile && setMobileVisible(false)}
                            >
                                <li className="submenu"><span>Testimonials</span></li>
                            </Link>
                            <Link
                                to="/faqs"
                                style={{ textDecoration: "none" }}
                                onClick={() => isMobile && setMobileVisible(false)}
                            >
                                <li className="submenu"><span>Faqs</span></li>
                            </Link>
                        </>
                    )}

                    {/* Sales submenu */}
                    <li
                        className={`sales ${salesOpen ? "active" : ""}`}
                        // onClick={toggleSales}
                        style={{ cursor: "pointer", userSelect: "none" }}
                    >
                        <FontAwesomeIcon icon={faDollar} className="icon" />
                        {(isOpen || isMobile) && <span>Sales & Purchase</span>}
                        <FontAwesomeIcon
                            icon={faAngleRight}
                            className={`arrowIcon ${salesOpen ? "rotate" : ""}`}
                        />
                    </li>

                    {(salesOpen && (isOpen || isMobile)) && (
                        <>
                            <Link
                                to="/sales"
                                style={{ textDecoration: "none" }}
                                onClick={() => isMobile && setMobileVisible(false)}
                            >
                                <li className="submenu"><span>Sales</span></li>
                            </Link>
                            <Link
                                to="/purchase"
                                style={{ textDecoration: "none" }}
                                onClick={() => isMobile && setMobileVisible(false)}
                            >
                                <li className="submenu"><span>Purchase</span></li>
                            </Link>
                            <Link
                                to="/quotation-reports"
                                style={{ textDecoration: "none" }}
                                onClick={() => isMobile && setMobileVisible(false)}
                            >
                                <li className="submenu"><span>Quotation Reports</span></li>
                            </Link>
                        </>
                    )}

                    <li>
                        <FontAwesomeIcon icon={faFileInvoiceDollar} className="icon" />
                        {(isOpen || isMobile) && <span>Invoice</span>}
                        {(isOpen || isMobile) && <FontAwesomeIcon icon={faAngleRight} className="arrowIcon" />}
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faTools} className="icon" />
                        {(isOpen || isMobile) && <span>Services</span>}
                        {(isOpen || isMobile) && <FontAwesomeIcon icon={faAngleRight} className="arrowIcon" />}
                    </li>

                    <p className="title">{(isOpen || isMobile) ? "USEFUL" : ""}</p>
                    <li>
                        <FontAwesomeIcon icon={faBarsProgress} className="icon" />
                        {(isOpen || isMobile) && <span>Stats</span>}
                        {(isOpen || isMobile) && <FontAwesomeIcon icon={faAngleRight} className="arrowIcon" />}
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faBook} className="icon" />
                        {(isOpen || isMobile) && <span>Ledger Pay</span>}
                        {(isOpen || isMobile) && <FontAwesomeIcon icon={faAngleRight} className="arrowIcon" />}
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faChartColumn} className="icon" />
                        {(isOpen || isMobile) && <span>Reports</span>}
                        {(isOpen || isMobile) && <FontAwesomeIcon icon={faAngleRight} className="arrowIcon" />}
                    </li>

                    <li>
                        <FontAwesomeIcon icon={faBell} className="icon" />
                        {(isOpen || isMobile) && <span>Notification</span>}
                    </li>

                    <p className="title">{(isOpen || isMobile) ? "SERVICE" : ""}</p>
                    <Link
                        to="/settings"
                        style={{ textDecoration: "none" }}
                        onClick={() => isMobile && setMobileVisible(false)}
                    >
                        <li>
                            <FontAwesomeIcon icon={faCog} className="icon" />
                            {(isOpen || isMobile) && <span>Settings</span>}
                        </li>
                    </Link>

                    <Link
                        to="/contact-us"
                        style={{ textDecoration: "none" }}
                        onClick={() => isMobile && setMobileVisible(false)}
                    >
                        <li>
                            <FontAwesomeIcon icon={faHeadset} className="icon" />
                            {(isOpen || isMobile) && <span>Contact Us</span>}
                        </li>
                    </Link>
                </ul>
            </div>

            {/* Bottom Section (User Profile) */}
            <div className="bottom">
                <div className="profile">
                    <Link
                        to="/profile"
                        className="link"
                        style={{ textDecoration: "none" }}
                        onClick={() => isMobile && setMobileVisible(false)}
                    >
                        <img src={user.avatar} className="profileImg" alt="User Avatar" />
                    </Link>
                    {(isOpen || isMobile) && (
                        <Link
                            to="/profile"
                            className="link"
                            style={{ textDecoration: "none" }}
                            onClick={() => isMobile && setMobileVisible(false)}
                        >
                            <div className="profileInfo">
                                <div className="nameRow">
                                    <span className="name">{user.full_name}</span>
                                    <FontAwesomeIcon icon={faCheckCircle} className="verifiedIcon" />
                                </div>
                                <span className="role">{user.role}</span>
                            </div>
                        </Link>
                    )}
                    {(isOpen || isMobile) && (
                        <div onClick={handleLogout} style={{ cursor: "pointer" }}>
                            <FontAwesomeIcon icon={faSignOutAlt} className="logoutIcon" />
                        </div>
                    )}
                </div>
            </div>
        </>
    );



    return (
        <>
            {/* Desktop Sidebar */}
            {!isMobile && (
                <>
                    <div
                        className={`sidebar ${sidebarOpen ? "open" : "closed"} ${hovered ? "hovered" : ""}`}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {renderSidebarContent()}
                    </div>
                    <FontAwesomeIcon
                        icon={sidebarOpen || hovered ? faAngleLeft : faAngleRight}
                        className={`menuBtn ${sidebarOpen ? "open" : "closed"} ${hovered ? "hovered" : ""}`}
                        onClick={toggleSidebar}
                    />
                </>
            )}

            {/* Mobile Sidebar */}
            {isMobile && (
                <>
                    <PrimeSidebar
                        visible={mobileVisible}
                        onHide={() => setMobileVisible(false)}
                        className="mobile-sidebar"
                    >
                        {renderSidebarContent()}
                    </PrimeSidebar>
                    <Button
                        icon="pi pi-bars"
                        className="mobile-sidebar-btn"
                        onClick={() => setMobileVisible(true)}
                    />
                </>
            )}
        </>
    );
};

export default Sidebar;
