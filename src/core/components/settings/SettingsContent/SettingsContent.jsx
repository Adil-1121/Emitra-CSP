import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const sampleData = {
    "My details": {
        name: "Sadik Rangrej",
        email: "sadik@example.com",
        role: "Admin",
    },
    Profile: {
        bio: "Frontend developer passionate about React & UI/UX.",
        location: "India",
    },
    Team: [
        { name: "Ali Khan", role: "Developer" },
        { name: "Sara Khan", role: "Designer" },
    ],
    Plan: {
        type: "Premium",
        expires: "2026-03-31",
        features: ["Unlimited projects", "Priority support"],
    },
    Notifications: [
        { message: "New login from Chrome", status: "unread" },
        { message: "Password will expire in 5 days", status: "read" },
    ],
};

const SettingsContent = ({ activeTab }) => {
    return (
        <div className="settings-content">
            <div className="content-header">
                <h2>{activeTab}</h2>
                <p className="sub">Manage {activeTab.toLowerCase()} for your account and team.</p>
            </div>

            {/* Dynamic cards based on tab */}
            <div className="placeholder-grid">
                {/* Quick Actions */}
                <Card className="placeholder-card">
                    <h3>Quick actions</h3>
                    <p>Perform frequent actions for <strong>{activeTab}</strong>.</p>
                    <Divider />
                    <div className="actions-row">
                        <Button label="Edit" className="p-button-outlined" />
                        <Button label="View" className="view-p-button" />
                    </div>
                </Card>

                {/* Help & Docs */}
                <Card className="placeholder-card">
                    <h3>Help & docs</h3>
                    <p>Find docs and help articles related to {activeTab}.</p>
                    <a className="link" href="#docs">
                        Open docs <FontAwesomeIcon icon={faExternalLinkAlt} />
                    </a>
                </Card>

                {/* Dynamic Data Card */}
                <Card className="placeholder-card">
                    <h3>{activeTab} Info</h3>
                    {Array.isArray(sampleData[activeTab]) ? (
                        <ul>
                            {sampleData[activeTab].map((item, idx) => (
                                <li key={idx}>
                                    <FontAwesomeIcon icon={faCheckCircle} className="ok-icon" />
                                    {item.name ? `${item.name} (${item.role})` : item.message}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        Object.entries(sampleData[activeTab] || {}).map(([key, value]) => (
                            <p key={key}>
                                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {Array.isArray(value) ? value.join(", ") : value}
                            </p>
                        ))
                    )}
                </Card>
            </div>
        </div>
    );
};

export default SettingsContent;
