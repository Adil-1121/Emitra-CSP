import React, { useState, useRef, useEffect } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Avatar } from "primereact/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./lockscreen.scss";
import avatar from "../../../assets/images/avatar.png";

const Lockscreen = () => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const toast = useRef(null);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    // ✅ Helper: Format Image from localStorage
    const formatImage = (img) => {
        if (!img) return avatar;
        if (img.startsWith("data:image")) return img;
        return `data:image/jpeg;base64,${img}`;
    };

    // ✅ Get user details from localStorage
    const userData = {
        full_name: localStorage.getItem("userName") || "Welcome Back!",
        avatar: formatImage(localStorage.getItem("userProfileImage")),
    };

    // -----------------------------
    // 1️⃣ Automatic Lock Timer (Inactivity)
    // -----------------------------
    useEffect(() => {
        if (!token) return; // agar login nahi hai toh lock nahi

        const lock = () => {
            localStorage.setItem("locked", "true");
            navigate("/lock-screen");
        };

        // 10 min timer
        let timer = setTimeout(lock, 600000);

        const resetTimer = () => {
            clearTimeout(timer);
            timer = setTimeout(lock, 600000);
        };

        window.addEventListener("mousemove", resetTimer);
        window.addEventListener("keydown", resetTimer);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("mousemove", resetTimer);
            window.removeEventListener("keydown", resetTimer);
        };
    }, [navigate, token]);

    // -----------------------------
    // Unlock function
    // -----------------------------
    const handleSubmit = async (e) => {
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

        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}auth/lockscreen-unlock`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.current.show({
                    severity: "success",
                    summary: "Unlocked",
                    detail: data.message,
                    life: 2000,
                });
                localStorage.removeItem("locked");
                setTimeout(() => {
                    navigate("/dashboard/admin-dashboard");
                }, 2000);
            } else {
                toast.current.show({
                    severity: "warn",
                    summary: "Incorrect Password",
                    detail: data.message,
                    life: 3000,
                });
            }
        } catch {
            toast.current.show({
                severity: "error",
                summary: "Network Error",
                detail: "Could not reach server",
                life: 3000,
            });
        }
    };

    return (
        <div className="lockscreen-page">
            <Toast ref={toast} />
            <div className="lockscreen-box">
                {/* ✅ User Image from localStorage */}
                <Avatar
                    image={userData.avatar}
                    size="xlarge"
                    shape="circle"
                />

                {/* ✅ User Name from localStorage */}
                <h2 className="username">
                    {userData.full_name}, Welcome Back!
                </h2>

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
