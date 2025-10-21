import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { Divider } from "primereact/divider";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown"; // ✅ Dropdown import
import { classNames } from "primereact/utils";
import noImage from "../../../../assets/noImage.png";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../../components/common-components/breadcrumb/Breadcrumb";
import LoadingSpinner from "../../../components/common-components/loadingSpinner/LoadingSpinner";
import { getUserById, updateUser } from "../../../../services/userService";
import "./Edit-New-User.scss";

const API_BASE_URL = "http://127.0.0.1:5000/api"; // Flask API base URL

const EditUser = () => {
    const toast = useRef(null);
    const navigate = useNavigate();
    const { userId } = useParams();
    const isEditMode = !!userId;

    const [formData, setFormData] = useState({
        username: "",
        fullname: "",
        email: "",
        phone: "",
        // password: "",
        address: "",
        city: "",
        joinedDate: null,
        status: "active", // ✅ default
        role: "User",     // ✅ default
    });

    const [profileImage, setProfileImage] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);  // API se data fetch karte waqt
    const [isSubmitting, setIsSubmitting] = useState(false); // Form submit karte waqt

    const statusOptions = [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "Suspended", value: "suspended" },

    ];

    const roleOptions = [
        { label: "Admin", value: "admin" },
        { label: "Manager", value: "manager" },
        { label: "User", value: "user" },
    ];

    // ✅ Prefill in edit mode from API
    useEffect(() => {
        if (isEditMode) {
            setIsFetching(true);
            getUserById(userId)
                .then((user) => {
                    setFormData({
                        username: user.username || "",
                        fullname: user.full_name || "",
                        email: user.email || "",
                        phone: user.phone || "",
                        address: user.address || "",
                        city: user.city || "",
                        joinedDate: user.created_at ? new Date(user.created_at) : null,
                        status: user.status || "active",
                        role: user.role || "user",
                    });
                    setProfileImage(user.profile_image || null);
                })
                .catch((err) => {
                    toast.current.show({
                        severity: "error",
                        summary: "Error",
                        detail: "Failed to fetch user data",
                        life: 3000,
                    });
                })
                .finally(() => setIsFetching(false));
        }
    }, [isEditMode, userId]);



    const handleChange = (e, name) => {
        const value = e.target ? e.target.value : e;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpload = (event) => {
        const file = event.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setProfileImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        const { username, fullname, email, phone, joinedDate } = formData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10,15}$/;
        return (
            username.trim() &&
            fullname.trim() &&
            emailRegex.test(email) &&
            phoneRegex.test(phone.replace(/\D/g, "")) &&
            // password.trim() &&
            joinedDate
        );
    };

    useEffect(() => {
        setFormValid(validateForm());
    }, [formData]);

    const getErrorMessage = (field) => {
        const value = formData[field];
        if (!value || (typeof value === "string" && !value.trim()))
            return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        if (field === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) return "Email is invalid";
        }
        if (field === "phone") {
            const phoneRegex = /^[0-9]{10,15}$/;
            if (!phoneRegex.test(value.replace(/\D/g, ""))) return "Phone number is invalid";
        }
        if (field === "joinedDate" && !value) return "Joined Date is required";
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (!formValid) {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Please fill all required fields correctly",
                life: 3000,
            });
            return;
        }

        setIsSubmitting(true);  // ✅ submit state true
        try {
            const payload = { ...formData, profileImage };
            if (isEditMode) {
                await updateUser(userId, payload);
            }
            toast.current.show({
                severity: "success",
                summary: "Success",
                detail: "User Updated Successfully",
                life: 2000,
            });
            setTimeout(() => navigate("/users"), 2000);
        } catch (err) {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to save user data",
                life: 3000,
            });
            console.error(err);
        } finally {
            setIsSubmitting(false); // ✅ submit state false
        }
    };


    return (
        <div className="editUser">
            <div className="editUser-container">
                <Breadcrumb
                    items={[
                        { label: "Dashboard", url: "/dashboard/admin-dashboard" },
                        { label: "Users List", url: "/users" },
                        { label: isEditMode ? "Edit User" : "Add User" },
                    ]}
                />
                <Toast ref={toast} />
                {isFetching ? (
                    <LoadingSpinner isLoading={isFetching} />
                ) : (
                    <Card className="editUser-form-card">
                        <div className="editUser-form-header">
                            <h2>{isEditMode ? "Edit User" : "Add User"}</h2>
                            <div className="editUser-btn-group">
                                <Button
                                    label={isLoading ? "Saving..." : "Submit"}
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                    style={{ backgroundColor: "rebeccapurple", border: "none" }}
                                />
                                <Button
                                    label="Cancel"
                                    className="p-button-secondary"
                                    style={{ marginLeft: "10px" }}
                                    onClick={() => navigate("/users")}
                                />
                            </div>
                        </div>
                        <Divider />

                        <form className="p-fluid p-formgrid p-grid editUser-form">
                            {/* Profile Image */}
                            <div className="p-field p-col-12 p-md-6 editUser-profile-upload-row">
                                <div className="editUser-profile-preview-wrapper">
                                    <img
                                        src={profileImage || noImage}
                                        alt="Profile"
                                        className="editUser-profile-preview"
                                    />
                                </div>
                            </div>

                            <div className="p-field p-col-12 p-md-6 editUser-profile-upload-row">
                                <FileUpload
                                    mode="basic"
                                    name="file"
                                    chooseLabel="Upload Image"
                                    auto
                                    customUpload
                                    uploadHandler={handleUpload}
                                    className="editUser-custom-upload"
                                />
                            </div>

                            {/* Text Fields */}
                            {[
                                { label: "Username", name: "username", type: "text", placeholder: "Please Enter User Name" },
                                { label: "Fullname", name: "fullname", type: "text", placeholder: "Please Enter Full Name" },
                                { label: "Email", name: "email", type: "text", placeholder: "Please Enter Email Address" },
                                // { label: "Password", name: "password", type: "password", placeholder: "Please Enter Password" },
                                { label: "Phone", name: "phone", type: "text", placeholder: "Please Enter Phone Number" },
                            ].map((field) => {
                                const errorMessage = submitted ? getErrorMessage(field.name) : "";
                                return (
                                    <div key={field.name} className="p-field p-col-12 p-md-6">
                                        <label>
                                            {field.label}
                                            <span className="required">*</span>
                                        </label>
                                        <InputText
                                            type={field.type}
                                            value={formData[field.name]}
                                            onChange={(e) => handleChange(e, field.name)}
                                            placeholder={field.placeholder}
                                            className={classNames({ "p-invalid": errorMessage })}
                                        />
                                        {errorMessage && (
                                            <small className="p-error">{errorMessage}</small>
                                        )}
                                    </div>
                                );
                            })}


                            {/* ✅ New Dropdown: Role */}
                            <div className="p-field p-col-12 p-md-6">
                                <label>Role</label>
                                <Dropdown
                                    value={formData.role}
                                    options={roleOptions}
                                    onChange={(e) => handleChange(e.value, "role")}
                                    placeholder="Please Select Role"
                                />
                            </div>
                            {/* ✅ New Dropdown: Status */}
                            <div className="p-field p-col-12 p-md-6">
                                <label>Status</label>
                                <Dropdown
                                    value={formData.status}
                                    options={statusOptions}
                                    onChange={(e) => handleChange(e.value, "status")}
                                    placeholder="Select Status"
                                />
                            </div>
                            {/* Calendar */}
                            <div className="p-field p-col-12 p-md-6">
                                <label>
                                    Joined Date<span className="required">*</span>
                                </label>
                                <Calendar
                                    value={formData.joinedDate}
                                    onChange={(e) => handleChange(e.value, "joinedDate")}
                                    showIcon
                                    placeholder="Please Select joined date"
                                    className={classNames({
                                        "p-invalid": submitted && !formData.joinedDate,
                                    })}
                                />
                                {submitted && !formData.joinedDate && (
                                    <small className="p-error">Joined Date is required</small>
                                )}
                            </div>

                            {/* City */}
                            <div className="p-field p-col-12 p-md-6">
                                <label>City</label>
                                <InputText
                                    value={formData.city}
                                    onChange={(e) => handleChange(e, "city")}
                                    placeholder="Please Enter City Name"
                                />
                            </div>

                            {/* Address */}
                            <div className="p-field p-col-12 p-md-6">
                                <label>Address</label>
                                <InputTextarea
                                    rows={2}
                                    value={formData.address}
                                    onChange={(e) => handleChange(e, "address")}
                                    placeholder="Please Enter Full Address"
                                />
                            </div>


                        </form>
                    </Card>
                )}  </div>
        </div>
    );
};

export default EditUser;
