import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Avatar } from "primereact/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // <-- Import
import "./lockscreen.scss";

const Lockscreen = () => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const toast = useRef(null);
    const navigate = useNavigate(); // <-- Initialize

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!password) {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Please enter your password",
                life: 3000,
            });
            return;
        }

        if (password === "123456") {
            toast.current.show({
                severity: "success",
                summary: "Unlocked",
                detail: "Welcome back!",
                life: 2000,
            });

            // Navigate after 2 seconds
            setTimeout(() => {
                navigate("/dashboard/admin-dashboard"); // <-- Change to your route
            }, 2000);
        } else {
            toast.current.show({
                severity: "warn",
                summary: "Incorrect Password",
                detail: "Please try again.",
                life: 3000,
            });
        }
    };

    return (
        <div className="lockscreen-page">
            <Toast ref={toast} />
            <div className="lockscreen-box">
                <Avatar
                    image="https://i.pravatar.cc/150?img=3"
                    size="xlarge"
                    shape="circle"
                />
                <h2 className="username">John Doe</h2>

                <form onSubmit={handleSubmit} className="lockscreen-form">
                    <div className="password-wrapper">
                        <FontAwesomeIcon icon={faLock} className="lock-icon" />
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="password-input"
                        />
                        <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                            className="toggle-btn"
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    </div>

                    <Button
                        type="submit"
                        label="Unlock"
                        className="p-button-rounded p-button-primary unlock-btn"
                    />
                </form>
            </div>
        </div>
    );
};

export default Lockscreen;
