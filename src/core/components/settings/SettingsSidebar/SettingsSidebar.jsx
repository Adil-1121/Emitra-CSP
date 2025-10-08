import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faIdCard,
    faLock,
    faUsers,
    faCreditCard,
    faBell,
    faPuzzlePiece,
    faCog,
} from "@fortawesome/free-solid-svg-icons";

const navItems = [
    { id: "My details", icon: faUser, label: "My details" },
    { id: "Profile", icon: faIdCard, label: "Profile" },
    { id: "Password", icon: faLock, label: "Password" },
    { id: "Team", icon: faUsers, label: "Team" },
    { id: "Plan", icon: faCreditCard, label: "Plan" },
    { id: "Billing", icon: faCog, label: "Billing" },
    { id: "Notifications", icon: faBell, label: "Notifications" },
    { id: "Integrations", icon: faPuzzlePiece, label: "Integrations" },
];

const SettingsSidebar = ({ activeTab, onChange }) => {
    return (
        <aside className="settings-sidebar">
            <div className="sidebar-inner">
                <h3 className="sidebar-title">Settings</h3>
                <ul className="settings-nav">
                    {navItems.map((item) => (
                        <li
                            key={item.id}
                            className={`nav-item ${activeTab === item.id ? "active" : ""}`}
                            onClick={() => onChange(item.id)}
                        >
                            <FontAwesomeIcon icon={item.icon} className="nav-icon" />
                            <span className="nav-label">{item.label}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default SettingsSidebar;
