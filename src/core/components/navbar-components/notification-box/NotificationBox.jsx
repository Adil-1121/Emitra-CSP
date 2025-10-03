import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'primereact/tooltip';
import './notificationBox.scss';

const NotificationBox = ({ icon, tooltip, title = "Notifications" }) => {
    const [open, setOpen] = useState(false);
    const boxRef = useRef();

    // 🟢 Dummy Notifications
    const notifications = [
        { content: "New message from Ahmed", status: "success", datetime: "2025-09-27 14:00" },
        { content: "Your order is approved", status: "pending", datetime: "2025-09-27 13:45" },
        { content: "High CPU usage detected", status: "danger", datetime: "2025-09-27 12:30" },
        { content: "New system update available", status: "info", datetime: "2025-09-27 11:00" }
    ];

    // ✅ Auto count from notifications length
    const count = notifications.length;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (boxRef.current && !boxRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="notification-wrapper" ref={boxRef}>
            <div className="item" onClick={() => setOpen(!open)}>
                <FontAwesomeIcon icon={icon} className="icon" />
                {count > 0 && <div className="counter">{count}</div>}
                <Tooltip target=".notification-wrapper .item" content={tooltip} position="bottom" />
            </div>

            {open && (
                <div className="notification-box">
                    {/* Header with left title + right badge */}
                    <div className="box-header">
                        <span>{title}</span>
                        <span className="badge">{count} New</span>
                    </div>

                    <div className="notifications-list">
                        {notifications.map((note, index) => (
                            <div className="notification-item" key={index}>
                                <div className="content">{note.content}</div>
                                <div className="footer">
                                    <span className={`status ${note.status}`}>{note.status}</span>
                                    <span className="datetime">{note.datetime}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            )}
        </div>
    );
};

export default NotificationBox;
