import React from "react";
import "./ProfileDetails.scss";
import avatar from "C:/Users/HP/Documents/GitHub/Emitra-CSP/src/assets/avatar.png";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Tag } from "primereact/tag";
import { Avatar } from "primereact/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
    faEnvelope,
    faPhone,
    faMapMarkerAlt,
    faBuilding,
    faBriefcase,
    faCalendarAlt,
    faEdit,
    faTrophy,
    faUsers,
    faChartLine,
    faUser,
    faUserCircle,
    faLock,
    faIdBadge,
    faClock,
    faCircle,
} from "@fortawesome/free-solid-svg-icons";

const ProfileDetails = () => {
    const userData = {
        name: "Sadiq Hussain",
        username: "sadiq_admin",
        email: "sadiq.hussain@meta.com.tr",
        role: "System Administrator",
        employeeId: "EMP-2025-014",
        department: "IT Management",
        phone: "+90 536 446 27 56",
        location: "Istanbul, Turkey",
        createdAt: "March 2021",
        lastLogin: "October 6, 2025 - 10:42 AM",
        status: "Active",

        // ✅ Stats added
        stats: [
            { title: "Total Projects", value: 12, color: "#4caf50" },
            { title: "Completed Tasks", value: 89, color: "#2196f3" },
            { title: "Pending Tasks", value: 5, color: "#ff9800" },
            { title: "Overall Score", value: "95%", color: "#9c27b0" },
        ],

        // ✅ Achievements added
        achievements: 8,
        teamMembers: 14,
    };

    return (
        <Card className="profile-details-card">
            <div className="profile-title">
                <h1>My Profile</h1>
            </div>            {/* --- Header Section --- */}
            <div className="profile-header">

                <div className="avatar-wrapper">
                    <Avatar
                        image={avatar}
                        size="xlarge"
                        shape="circle"
                        className="avatar"
                    />
                    <span className="active-dot"></span>
                </div>

                <div className="user-info">
                    <div className="name-badge">
                        <h2>{userData.name}</h2>
                        {userData.role && (
                            <span className="role-badge">
                                {userData.role}
                            </span>
                        )}
                    </div>
                    <p className="designation">{userData.department}</p>
                    <p className="company">
                        <FontAwesomeIcon icon={faBuilding} /> {userData.location}
                    </p>
                    <Tag
                        value={`${userData.status}`}
                        severity="success"
                        className="status-tag"
                    />

                </div>


                <Link to="/profile/edit-profile" style={{ textDecoration: "none" }}>
                    <Button
                        icon={<FontAwesomeIcon icon={faEdit} />}
                        label="Edit Profile"
                        className="edit-btn"
                    />
                </Link>
            </div>

            <Divider />

            {/* --- Stats Section --- */}
            <div className="stats">
                {userData.stats.map((item, i) => (
                    <div key={i} className="stat-card">
                        <span
                            className="dot"
                            style={{ backgroundColor: item.color }}
                        ></span>
                        <h3>{item.value}</h3>
                        <p>{item.title}</p>
                    </div>
                ))}
            </div>

            <Divider />

            {/* --- Admin Personal Information --- */}
            <div className="profile-info">
                <h3>Admin Personal Information</h3>
                <div className="info-grid">
                    <div className="info-item">
                        <FontAwesomeIcon icon={faUser} className="icon" />
                        <div>
                            <label>Full Name</label>
                            <p>{userData.name}</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <FontAwesomeIcon icon={faUserCircle} className="icon" />
                        <div>
                            <label>Username</label>
                            <p>@{userData.username}</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <FontAwesomeIcon icon={faEnvelope} className="icon" />
                        <div>
                            <label>Email</label>
                            <p className="email">{userData.email}</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <FontAwesomeIcon icon={faLock} className="icon" />
                        <div>
                            <label>Password</label>
                            <p>********</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <FontAwesomeIcon icon={faBriefcase} className="icon" />
                        <div>
                            <label>Role</label>
                            <p>{userData.role}</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <FontAwesomeIcon icon={faIdBadge} className="icon" />
                        <div>
                            <label>Employee ID</label>
                            <p>{userData.employeeId}</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <FontAwesomeIcon icon={faBuilding} className="icon" />
                        <div>
                            <label>Department</label>
                            <p>{userData.department}</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <FontAwesomeIcon icon={faPhone} className="icon" />
                        <div>
                            <label>Phone</label>
                            <p className="phone">{userData.phone}</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
                        <div>
                            <label>Location</label>
                            <p>{userData.location}</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
                        <div>
                            <label>Account Created</label>
                            <p>{userData.createdAt}</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <FontAwesomeIcon icon={faClock} className="icon" />
                        <div>
                            <label>Last Login</label>
                            <p>{userData.lastLogin}</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <FontAwesomeIcon
                            icon={faCircle}
                            className={`icon ${userData.status === "Active" ? "active-dot" : "inactive-dot"}`}
                        />
                        <div>
                            <label>Status</label>
                            <p>{userData.status}</p>
                        </div>
                    </div>
                </div>
            </div>

            <Divider />

            {/* --- Achievements Section --- */}
            <div className="achievements">
                <h3>Achievements</h3>
                <div className="achievement-cards">
                    <div className="achievement">
                        <FontAwesomeIcon icon={faTrophy} className="ach-icon" />
                        <div>
                            <h4>{userData.achievements}</h4>
                            <p>Awards Won</p>
                        </div>
                    </div>
                    <div className="achievement">
                        <FontAwesomeIcon icon={faUsers} className="ach-icon" />
                        <div>
                            <h4>{userData.teamMembers}</h4>
                            <p>Team Members</p>
                        </div>
                    </div>
                    <div className="achievement">
                        <FontAwesomeIcon icon={faChartLine} className="ach-icon" />
                        <div>
                            <h4>92%</h4>
                            <p>Performance Rate</p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ProfileDetails;
