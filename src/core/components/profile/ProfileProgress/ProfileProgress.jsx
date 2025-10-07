import React from "react";
import { Card } from "primereact/card";
import { ProgressBar } from "primereact/progressbar";
import { Divider } from "primereact/divider";
import { Tag } from "primereact/tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faTimesCircle,
    faUser,
    faCamera,
    faIdCard,
    faMapMarkerAlt,
    faBookOpen,
    faBell,
    faUniversity
} from "@fortawesome/free-solid-svg-icons";
import "./ProfileProgress.scss";

const ProfileProgress = () => {
    const progress = 40;

    const tasks = [
        { label: "Setup Account", percent: 10, icon: faUser, done: true },
        { label: "Upload your Photo", percent: 5, icon: faCamera, done: true },
        { label: "Personal Info", percent: 10, icon: faIdCard, done: true },
        { label: "Location", percent: 20, icon: faMapMarkerAlt, done: false },
        { label: "Biography", percent: 15, icon: faBookOpen, done: false },
        { label: "Notifications", percent: 10, icon: faBell, done: false },
        { label: "Bank Details", percent: 30, icon: faUniversity, done: false },
    ];

    return (
        <Card className="profile-progress-card" title="Complete your profile">
            <div className="progress-section">
                <div className="circle-container">
                    <div className="circle">
                        <span className="percentage">{progress}%</span>
                    </div>
                </div>
                <ProgressBar
                    value={progress}
                    showValue={false}
                    className="progress-bar"
                />
            </div>

            <Divider />

            <ul className="task-list">
                {tasks.map((task, index) => (
                    <li
                        key={index}
                        className={`task ${task.done ? "done" : "pending"}`}
                    >
                        <div className="left">
                            <FontAwesomeIcon icon={task.icon} className="icon" />
                            <span className="label">{task.label}</span>
                        </div>
                        <div className="right">
                            <Tag
                                severity={task.done ? "success" : "danger"}
                                value={
                                    task.done ? (
                                        <>
                                            <FontAwesomeIcon
                                                icon={faCheckCircle}
                                                className="tag-icon"
                                            />{" "}
                                            Done
                                        </>
                                    ) : (
                                        <>
                                            <FontAwesomeIcon
                                                icon={faTimesCircle}
                                                className="tag-icon"
                                            />{" "}
                                            +{task.percent}%
                                        </>
                                    )
                                }
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </Card>
    );
};

export default ProfileProgress;
