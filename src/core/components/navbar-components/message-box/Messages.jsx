import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './messages.scss';

const MessagesBox = ({ icon }) => {
    const [open, setOpen] = useState(false);
    const boxRef = useRef();

    const messages = [
        {
            title: "New application submitted: Aadhaar Update",
            tag: "service",
            time: "9/28/2025, 10:45:22 AM"
        },
        {
            title: "Payment received: ₹350 for Electricity Bill",
            tag: "payment",
            time: "9/28/2025, 9:15:11 AM"
        },
        {
            title: "New patient registered: Sahil Raza",
            tag: "patient",
            time: "9/28/2025, 8:33:06 AM"
        },
        {
            title: "Service request updated: Birth Certificate - Pending Verification",
            tag: "service",
            time: "9/27/2025, 4:28:38 PM"
        },
        {
            title: "New application submitted: Pension Scheme",
            tag: "service",
            time: "9/27/2025, 2:21:44 PM"
        },
        {
            title: "KYC Verification completed for Olivia Carter",
            tag: "kyc",
            time: "9/26/2025, 6:45:10 PM"
        }
    ];

    const count = messages.length;

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
        <div className="messages-wrapper" ref={boxRef}>
            <div className="item" onClick={() => setOpen(!open)}>
                <FontAwesomeIcon icon={icon} className="icon" />
                {count > 0 && <div className="counter">{count}</div>}
            </div>

            {open && (
                <div className="messages-box">
                    <h4 className="messages-header">
                        <span>Messages</span>
                        <span className="badge">{count} New</span>
                    </h4>
                    <ul>
                        {messages.map((msg, index) => (
                            <li key={index}>
                                <p className="msg-title">{msg.title}</p>
                                <span className="msg-time">{msg.time}</span>
                                <span className={`msg-tag ${msg.tag}`}>{msg.tag}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MessagesBox;
