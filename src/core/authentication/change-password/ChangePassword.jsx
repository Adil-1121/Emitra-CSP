import React, { useState, useRef } from "react";
import "./changePassword.scss";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faKey } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const toastRef = useRef(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { currentPassword, newPassword, confirmPassword } = formData;

        if (!currentPassword || !newPassword || !confirmPassword) {
            toastRef.current?.show({
                severity: "warn",
                summary: "Validation Error",
                detail: "Please fill all fields",
            });
            return;
        }

        if (newPassword !== confirmPassword) {
            toastRef.current?.show({
                severity: "error",
                summary: "Mismatch",
                detail: "New password and confirm password must match",
            });
            return;
        }

        // Simulate password change API
        console.log("Changing password:", formData);
        toastRef.current?.show({
            severity: "success",
            summary: "Success",
            detail: "Password updated",
        });

        // Redirect to login after 1.5 sec
        setTimeout(() => {
            navigate("/login");
        }, 1500);
    };

    return (
        <div className="change-password-page">
            <Toast ref={toastRef} />

            <div className="form-container">
                <h2>Change Password</h2>
                <form onSubmit={handleSubmit} className="cp-form">
                    <div className="field">
                        <label htmlFor="currentPassword">Current Password</label>
                        <div className="input-with-icon">
                            <FontAwesomeIcon icon={faLock} />
                            <InputText
                                id="currentPassword"
                                name="currentPassword"
                                type={showCurrent ? "text" : "password"}
                                value={formData.currentPassword}
                                onChange={handleChange}
                                className="input-text"
                                placeholder="Enter current password"
                            />
                            <Button
                                type="button"
                                icon={showCurrent ? "pi pi-eye-slash" : "pi pi-eye"}
                                className="p-button-text btn-toggle"
                                onClick={() => setShowCurrent((prev) => !prev)}
                            />
                        </div>

                    </div>

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
                                className="input-text"
                                placeholder="Enter new password"
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
                            <FontAwesomeIcon icon={faKey} />
                            <InputText
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirm ? "text" : "password"}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="input-text"
                                placeholder="Confirm new password"
                            />
                            <Button
                                type="button"
                                icon={showConfirm ? "pi pi-eye-slash" : "pi pi-eye"}
                                className="p-button-text btn-toggle"
                                onClick={() => setShowConfirm((prev) => !prev)}
                            />
                        </div>
                        <div className="forgot-link">
                            <a href="/forgot-password">Forgot Password?</a>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        label="Update Password"
                        className="p-button-primary btn-submit"
                    />
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
