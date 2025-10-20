import React, { useState, useRef } from "react";
import "./resetPassword.scss";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faKey } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: "",
    });
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    const toastRef = useRef(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { newPassword, confirmPassword } = formData;

        // Validation
        if (!newPassword || !confirmPassword) {
            toastRef.current?.show({ severity: "warn", summary: "Validation Error", detail: "Please fill all fields" });
            return;
        }
        if (newPassword !== confirmPassword) {
            toastRef.current?.show({ severity: "error", summary: "Mismatch", detail: "Passwords do not match" });
            return;
        }
        if (newPassword.length < 6) {
            toastRef.current?.show({ severity: "warn", summary: "Weak Password", detail: "Password must be at least 6 characters" });
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}auth/reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token,
                    newPassword, // ✅ Backend expects "newPassword"
                }),
            });

            const data = await res.json();
            if (res.ok) {
                toastRef.current?.show({ severity: "success", summary: "Success", detail: data.message || "Password reset successfully" });
                setTimeout(() => navigate("/login"), 1500); // redirect after 1.5s
            } else {
                toastRef.current?.show({ severity: "error", summary: "Error", detail: data.message || "Failed to reset password" });
            }
        } catch (err) {
            toastRef.current?.show({ severity: "error", summary: "Network Error", detail: "Could not reach server" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reset-password-page">
            <Toast ref={toastRef} />

            <div className="form-container">
                <h2>Reset Password</h2>
                <form onSubmit={handleSubmit} className="rp-form">
                    <div className="field">
                        <label htmlFor="newPassword">New Password</label>
                        <div className="input-with-icon">
                            <FontAwesomeIcon icon={faKey} />
                            <InputText
                                id="newPassword"
                                name="newPassword"
                                type={showNew ? "text" : "password"}
                                value={formData.newPassword}
                                onChange={handleChange}
                                placeholder="Enter new password"
                                className="input-text"
                            />
                            <Button
                                type="button"
                                icon={showNew ? "pi pi-eye-slash" : "pi pi-eye"}
                                className="p-button-text btn-toggle"
                                onClick={() => setShowNew((prev) => !prev)}
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div className="input-with-icon">
                            <FontAwesomeIcon icon={faLock} />
                            <InputText
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirm ? "text" : "password"}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm new password"
                                className="input-text"
                            />
                            <Button
                                type="button"
                                icon={showConfirm ? "pi pi-eye-slash" : "pi pi-eye"}
                                className="p-button-text btn-toggle"
                                onClick={() => setShowConfirm((prev) => !prev)}
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        label={loading ? "Resetting..." : "Reset Password"}
                        className="p-button-primary btn-submit"
                        disabled={loading}
                    />
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
