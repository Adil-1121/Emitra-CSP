import React, { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebookF, faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

import "./register.scss";

export default function Register() {
    const toast = useRef(null);
    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);

    const handleRegister = async () => {
        if (!fullName || !email || !password || !confirmPassword) {
            toast.current.show({ severity: "error", summary: "Error", detail: "All fields are required.", life: 3000 });
            return;
        }

        if (password !== confirmPassword) {
            toast.current.show({ severity: "warn", summary: "Password Mismatch", detail: "Passwords do not match.", life: 3000 });
            return;
        }

        if (!agreeTerms) {
            toast.current.show({ severity: "warn", summary: "Terms Not Agreed", detail: "You must agree to the terms and privacy policy.", life: 3000 });
            return;
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ full_name: fullName, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.current.show({ severity: "error", summary: "Registration Failed", detail: data.message || "Error", life: 3000 });
                return;
            }

            // Save JWT token in localStorage (optional)
            localStorage.setItem("token", data.token);

            toast.current.show({ severity: "success", summary: "Registration Successful", detail: "Welcome!", life: 2000 });

            // Redirect to login after 2s
            setTimeout(() => navigate("/login"), 2000);

        } catch (err) {
            toast.current.show({ severity: "error", summary: "Error", detail: "Something went wrong!", life: 3000 });
            console.error(err);
        }
    };


    return (
        <div className="register-container">
            <Toast ref={toast} />

            {/* Left Side - Form */}
            <div className="left-panel">
                <div className="register-box">
                    <h2>Getting Started</h2>

                    {/* Full Name */}
                    <div className="input-group">
                        <label htmlFor="fullname">
                            Full Name<span className="required">*</span>
                        </label>
                        <span className="p-input-icon-left full-width input-wrapper">
                            <FontAwesomeIcon icon={faUser} className="input-icon" />
                            <InputText
                                id="fullname"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Enter your full name"
                                className="full-width purple-input"
                            />
                        </span>
                    </div>

                    {/* Email */}
                    <div className="input-group">
                        <label htmlFor="email">
                            Email<span className="required">*</span>
                        </label>
                        <span className="p-input-icon-left full-width input-wrapper">
                            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                            <InputText
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="full-width purple-input"
                            />
                        </span>
                    </div>

                    {/* Password */}
                    <div className="input-group">
                        <label htmlFor="password">
                            Password<span className="required">*</span>
                        </label>
                        <span className="p-input-icon-left full-width input-wrapper">
                            <FontAwesomeIcon icon={faLock} className="input-icon" />
                            <InputText
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="full-width purple-input"
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </button>
                        </span>
                    </div>

                    {/* Confirm Password */}
                    <div className="input-group">
                        <label htmlFor="confirmPassword">
                            Confirm Password<span className="required">*</span>
                        </label>
                        <span className="p-input-icon-left full-width input-wrapper">
                            <FontAwesomeIcon icon={faLock} className="input-icon" />
                            <InputText
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Re-enter your password"
                                className="full-width purple-input"
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            >
                                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                            </button>
                        </span>
                    </div>

                    {/* Terms & Conditions */}
                    <div className="input-group terms">
                        <label className="terms-label">
                            <input
                                type="checkbox"
                                checked={agreeTerms}
                                onChange={() => setAgreeTerms(!agreeTerms)}
                            />{" "}
                            I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
                        </label>
                    </div>

                    {/* Register Button */}
                    <Button
                        label="Register"
                        className="register-btn"
                        onClick={handleRegister}
                    />

                    <p className="social-text">or register with social platforms</p>

                    {/* Social Buttons */}
                    <div className="social-icons">
                        <FontAwesomeIcon icon={faGoogle} />
                        <FontAwesomeIcon icon={faFacebookF} />
                        <FontAwesomeIcon icon={faGithub} />
                        <FontAwesomeIcon icon={faLinkedinIn} />
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="right-panel">
                <h2>Welcome Back!</h2>
                <p>Already have an account?</p>
                <Button
                    label="Login"
                    className="p-button-outlined login-btn"
                    onClick={() => navigate("/login")}
                />
            </div>
        </div>
    );
}
