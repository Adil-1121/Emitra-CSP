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
import noImage from '../../../../assets/noImage.png';
import { useNavigate, useParams } from "react-router-dom"; // ✅ useParams

import Navbar from "../../../components/common-components/navbar/navbar";
import Sidebar from "../../../components/common-components/sidebar/sidebar";
import Breadcrumb from "../../../components/common-components/breadcrumb/Breadcrumb";

import "./Edit-New-User.scss";

const mockUserData = [
    { id: 1, username: "john123", fullname: "John Doe", email: "john@example.com", phone: "1234567890", password: "123456", address: "123 Street", city: "New York", joinedDate: new Date(), profileImage: null },
    { id: 2, username: "jane456", fullname: "Jane Doe", email: "jane@example.com", phone: "9876543210", password: "abcdef", address: "456 Street", city: "Los Angeles", joinedDate: new Date(), profileImage: null },
];

const EditUser = () => {
    const toast = useRef(null);
    const navigate = useNavigate();
    const { userId } = useParams(); // ✅ For edit mode

    const isEditMode = !!userId;

    const [formData, setFormData] = useState({
        username: "",
        fullname: "",
        email: "",
        phone: "",
        password: "",
        address: "",
        city: "",
        joinedDate: null,
    });

    const [profileImage, setProfileImage] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [formValid, setFormValid] = useState(false);

    // Prefill form in edit mode
    useEffect(() => {
        if (isEditMode) {
            const user = mockUserData.find(u => u.id === parseInt(userId));
            if (user) {
                setFormData({
                    username: user.username,
                    fullname: user.fullname,
                    email: user.email,
                    phone: user.phone,
                    password: user.password,
                    address: user.address,
                    city: user.city,
                    joinedDate: new Date(user.joinedDate),
                });
                setProfileImage(user.profileImage || null);
            }
        }
    }, [isEditMode, userId]);

    const handleChange = (e, name) => {
        const value = e.target ? e.target.value : e; // for Calendar
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
        const { username, fullname, email, phone, password, joinedDate } = formData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10,15}$/;
        return username.trim() && fullname.trim() && emailRegex.test(email) &&
            phoneRegex.test(phone.replace(/\D/g, "")) && password.trim() && joinedDate;
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (formValid) {
            toast.current.show({
                severity: "success",
                summary: "Success",
                detail: isEditMode ? "User Updated Successfully" : "User Added Successfully",
                life: 2000,
            });

            setTimeout(() => navigate("/users"), 2000);
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
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <Breadcrumb
                    items={[
                        { label: "Dashboard", url: "/dashboard/admin-dashboard" },
                        { label: "Users List", url: "/users" },
                        { label: isEditMode ? "Edit User" : "Add User" },
                    ]}
                />
                <Toast ref={toast} />
                <Card className="form-card">
                    <div className="form-header">
                        <h2>{isEditMode ? "Edit User" : "Add User"}</h2>
                        <div className="btn-group">
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

                    <form className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-6 profile-upload-row">
                            <div className="profile-preview-wrapper">
                                <img src={profileImage || noImage} alt="Profile" className="profile-preview" />
                            </div>
                        </div>
                        <div className="p-field p-col-6 profile-upload-row">
                            <FileUpload
                                mode="basic"
                                name="file"
                                chooseLabel="Upload Image"
                                auto
                                customUpload
                                uploadHandler={handleUpload}
                                className="custom-upload"
                            />
                        </div>

                        {[{ label: "Username", name: "username", type: "text" },
                        { label: "Fullname", name: "fullname", type: "text" },
                        { label: "Email", name: "email", type: "text" },
                        { label: "Password", name: "password", type: "password" },
                        { label: "Phone", name: "phone", type: "text" }
                        ].map((field) => {
                            const errorMessage = submitted ? getErrorMessage(field.name) : "";
                            return (
                                <div key={field.name} className="p-field p-col-12 p-md-6">
                                    <label>
                                        {field.label}<span className="required">*</span>
                                    </label>
                                    <InputText
                                        type={field.type}
                                        value={formData[field.name]}
                                        onChange={(e) => handleChange(e, field.name)}
                                        placeholder={field.label}
                                        className={classNames({ "p-invalid": errorMessage })}
                                    />
                                    {errorMessage && <small className="p-error">{errorMessage}</small>}
                                </div>
                            );
                        })}

                        <div className="p-field p-col-12 p-md-6">
                            <label>
                                Joined Date<span className="required">*</span>
                            </label>
                            <Calendar
                                value={formData.joinedDate}
                                onChange={(e) => handleChange(e.value, "joinedDate")}
                                showIcon
                                placeholder="Select joined date"
                                className={classNames({ "p-invalid": submitted && !formData.joinedDate })}
                            />
                            {submitted && !formData.joinedDate && <small className="p-error">Joined Date is required</small>}
                        </div>

                        <div className="p-field p-col-12 p-md-6">
                            <label>City</label>
                            <InputText value={formData.city} onChange={(e) => handleChange(e, "city")} placeholder="New York" />
                        </div>

                        <div className="p-field p-col-12 p-md-6">
                            <label>Address</label>
                            <InputTextarea rows={2} value={formData.address} onChange={(e) => handleChange(e, "address")} placeholder="Elton ST. 213 NewYork" />
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default EditUser;
