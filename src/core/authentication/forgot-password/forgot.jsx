// src/components/ForgotPassword.jsx
import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./forgot.scss";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email) {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Email is required.",
                life: 3000,
            });
            return;
        }

        // Simulate API call success
        setSubmitted(true);
        toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Reset link sent to your email.",
            life: 3000,
        });

        console.log("Password reset requested for:", email);
    };

    return (
        <div className="forgot-password-page">
            <Toast ref={toast} />
            <div className="left-panel">
                <h2>Forgot Password</h2>
                <p className="subtitle">Enter your email and we'll send you a reset link.</p>

                {submitted ? (
                    <div className="success-message">
                        <p>A reset link has been sent to your email.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="inputGroup">
                            <label htmlFor="email">Email</label>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <FontAwesomeIcon icon={faEnvelope} style={{ color: "rebeccapurple" }} />
                                </span>
                                <InputText
                                    id="email"
                                    type="email"
                                    placeholder="example@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    aria-describedby="email-help"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            label="Send Reset Link"
                            className="submit-btn p-button-rounded p-button-primary"
                        />
                    </form>
                )}

                <div className="back-login">
                    <a href="/login">← Back to Login</a>
                </div>
            </div>

            <div className="right-panel">
                <h4>Need Help?</h4>
                <p>We’ll help you recover your password quickly.</p>
                <img
                    src="https://cdn-icons-png.flaticon.com/512/6195/6195700.png"
                    alt="Reset Illustration"
                />
            </div>
        </div>
    );
};

export default ForgotPassword;
