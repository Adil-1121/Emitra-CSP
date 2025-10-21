import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { Divider } from "primereact/divider";
import { Calendar } from "primereact/calendar";
import { classNames } from "primereact/utils";
import noImage from "../../../../assets/noImage.png";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../../components/common-components/breadcrumb/Breadcrumb";
import { addUser } from "../../../../services/userService";
import { Dropdown } from "primereact/dropdown";

import "./Add-New-User.scss";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "");

const AddNewUser = () => {
    const toast = useRef(null);
    const navigate = useNavigate();
    const [roles] = useState([
        { label: "Admin", value: "admin" },
        { label: "Manager", value: "manager" },
        { label: "User", value: "user" },
    ]);
    const [formData, setFormData] = useState({
        username: "",
        fullname: "",
        email: "",
        phone: "",
        password: "",
        address: "",
        city: "",
        joinedDate: null,
        role: null,   // Role dropdown
        status: "active", // default Status dropdown value
    });


    const [profileImage, setProfileImage] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [formValid, setFormValid] = useState(false);

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
    const [statusOptions] = useState([
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "Suspended", value: "suspended" },
    ]);

    const validateForm = () => {
        const { username, fullname, email, phone, password, joinedDate } = formData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10,15}$/;
        return (
            username.trim() &&
            fullname.trim() &&
            emailRegex.test(email) &&
            phoneRegex.test(phone.replace(/\D/g, "")) &&
            password.trim() &&
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
            if (!phoneRegex.test(value.replace(/\D/g, "")))
                return "Phone number is invalid";
        }
        if (field === "joinedDate" && !value) return "Joined Date is required";
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (formValid) {
            try {
                const payload = {
                    username: formData.username,
                    fullname: formData.fullname,
                    email: formData.email,
                    password: formData.password,
                    phone: formData.phone,
                    city: formData.city,
                    address: formData.address,
                    joinedDate: formData.joinedDate,
                    role: formData.role,
                    status: formData.status,
                    profileImage: profileImage
                };
                await addUser(payload);
                toast.current.show({
                    severity: "success",
                    summary: "Success",
                    detail: "User Added Successfully",
                    life: 2000,
                });
                setTimeout(() => navigate("/users"), 2000);
            } catch (err) {
                toast.current.show({
                    severity: "error",
                    summary: "Error",
                    detail: err.response?.data?.message || "Server Error",
                    life: 3000,
                });
            }
        } else {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Please fill all required fields correctly",
                life: 3000,
            });
        }
    };



    return (
        <div className="addUser">
            <div className="addUser-container">
                <Breadcrumb
                    items={[
                        { label: "Dashboard", url: "/dashboard/admin-dashboard" },
                        { label: "Users List", url: "/users" },
                        { label: "Add User" },
                    ]}
                />

                <Toast ref={toast} />

                <Card className="addUser-form-card">
                    <div className="addUser-form-header">
                        <h2>Add User</h2>
                        <div className="addUser-btn-group">
                            <Button
                                label="Submit"
                                onClick={handleSubmit}
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

                    <form className="p-fluid p-formgrid p-grid addUser-form">
                        <div className="p-field p-col-6 addUser-profile-upload-row">
                            <div className="addUser-profile-preview-wrapper">
                                <img
                                    src={profileImage || noImage}
                                    alt="Profile"
                                    className="addUser-profile-preview"
                                />
                            </div>
                        </div>

                        <div className="p-field p-col-6 addUser-profile-upload-row">
                            <FileUpload
                                mode="basic"
                                name="file"
                                chooseLabel="Upload Image"
                                auto
                                customUpload
                                uploadHandler={handleUpload}
                                className="addUser-custom-upload"
                            />
                        </div>

                        {[
                            { label: "Username", name: "username", type: "text", placeholder: "Please Enter User Name" },
                            { label: "Fullname", name: "fullname", type: "text", placeholder: "Please Enter Full Name" },
                            { label: "Email", name: "email", type: "text", placeholder: "Please Enter Email Address" },
                            { label: "Password", name: "password", type: "password", placeholder: "Please Enter Password" },
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
                                        className={classNames({
                                            "p-invalid": errorMessage,
                                        })}
                                    />
                                    {errorMessage && (
                                        <small className="p-error">{errorMessage}</small>
                                    )}
                                </div>
                            );
                        })}
                        <div className="p-field p-col-12 p-md-6">
                            <label>
                                Role<span className="required">*</span>
                            </label>
                            <Dropdown
                                value={formData.role}
                                options={roles}
                                onChange={(e) => handleChange(e.value, "role")}
                                placeholder="Select Role"
                                className={classNames({
                                    "p-invalid": submitted && !formData.role,
                                })}
                            />
                            {submitted && !formData.role && (
                                <small className="p-error">Role is required</small>
                            )}
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <label>
                                Status<span className="required">*</span>
                            </label>
                            <Dropdown
                                value={formData.status}
                                options={statusOptions}
                                onChange={(e) => handleChange(e.value, "status")}
                                placeholder="Please Select Status"
                                className={classNames({
                                    "p-invalid": submitted && !formData.status,
                                })}
                            />
                            {submitted && !formData.status && (
                                <small className="p-error">Status is required</small>
                            )}
                        </div>

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

                        <div className="p-field p-col-12 p-md-6">
                            <label>City</label>
                            <InputText
                                value={formData.city}
                                onChange={(e) => handleChange(e, "city")}
                                placeholder="Please Enter City Name"
                            />
                        </div>

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
            </div>
        </div>
    );
};

export default AddNewUser;
