import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlusCircle,
    faUser,
    faBox,
    faShoppingCart,
    faTags,
    faUsers,
    faFileInvoice,
    faChartLine,
    faCogs,
    faCommentDots,
    faEnvelope
} from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "primereact/tooltip";
import "./addNewDropdown.scss";

const AddNewDropdown = () => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();

    const items = [
        { label: "New User", icon: faUser, action: () => alert("Create New User") },
        { label: "New Product", icon: faBox, action: () => alert("Create New Product") },
        { label: "New Order", icon: faShoppingCart, action: () => alert("Create New Order") },
        { label: "New Category", icon: faTags, action: () => alert("Create New Category") },
        { label: "New Customer", icon: faUsers, action: () => alert("Create New Customer") },
        { label: "New Invoice", icon: faFileInvoice, action: () => alert("Create New Invoice") },
        { label: "New Report", icon: faChartLine, action: () => alert("Create New Report") },
        { label: "New Setting", icon: faCogs, action: () => alert("Create New Setting") },
        { label: "New Message", icon: faCommentDots, action: () => alert("Create New Message") },
        { label: "New Email", icon: faEnvelope, action: () => alert("Create New Email") },
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
                <Tooltip target=".addnew-wrapper .item" content="Add New" position="bottom" />
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
