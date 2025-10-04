import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faBoxOpen,
    faShoppingCart,
    faBell,
    faFileInvoiceDollar,
    faChartLine,
    faCog,
    faCommentDots,
    faEnvelope,
    faPlusCircle,
} from "@fortawesome/free-solid-svg-icons"
import "./addNewDropdown.scss";
import { useNavigate } from "react-router-dom";

const AddNewDropdown = () => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();
    const navigate = useNavigate();

    const items = [
        { label: "Add User", icon: faUser, action: () => navigate("/users/add") },
        { label: "Add Service", icon: faBoxOpen, action: () => navigate("/services/add") },
        { label: "Add Customer", icon: faShoppingCart, action: () => navigate("/customers/add") },
        { label: "Add Notification", icon: faBell, action: () => navigate("/notifications/add") },
        { label: "Add Invoice", icon: faFileInvoiceDollar, action: () => navigate("/invoices/add") },
        { label: "Add Report", icon: faChartLine, action: () => navigate("/reports/add") },
        { label: "Add Expenses", icon: faCog, action: () => navigate("/settings/add") },
        { label: "Add Message", icon: faCommentDots, action: () => navigate("/messages/add") },
        { label: "Add Email", icon: faEnvelope, action: () => navigate("/emails/add") },
    ];

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="addnew-wrapper" ref={dropdownRef}>
            {/* Trigger Button */}
            <div className="item" onClick={() => setOpen(!open)}>
                <FontAwesomeIcon icon={faPlusCircle} className="icon" />
            </div>

            {/* Dropdown */}
            {open && (
                <div className="addnew-dropdown">
                    {items.map((it, idx) => (
                        <div
                            key={idx}
                            className="dropdown-item"
                            onClick={() => {
                                it.action();
                                setOpen(false);
                            }}
                        >
                            {it.icon && <FontAwesomeIcon icon={it.icon} className="dropdown-icon" />}
                            {it.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AddNewDropdown;
