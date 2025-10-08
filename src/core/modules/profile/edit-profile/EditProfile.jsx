import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faEnvelope,
    faPhone,
    faBuilding,
    faMapMarkerAlt,
    faCalendarAlt,
    faIdBadge,
    faHome,
    faFlag,
    faHeart,
    faTint,
} from "@fortawesome/free-solid-svg-icons";

import Navbar from "../../../components/common-components/navbar/navbar";
import Sidebar from "../../../components/common-components/sidebar/sidebar";
import avatar from "../../../../assets/avatar.png";

import "./EditProfile.scss";

const EditProfile = () => {
    const toast = useRef(null);
    const navigate = useNavigate(); // ✅ Add navigation hook

    const maritalStatusOptions = [
        { label: "Single", value: "Single" },
        { label: "Married", value: "Married" },
        { label: "Divorced", value: "Divorced" },
        { label: "Widowed", value: "Widowed" },
    ];

    const bloodGroupOptions = [
        { label: "Unknown", value: "Unknown" },
        { label: "A+", value: "A+" },
        { label: "A-", value: "A-" },
        { label: "B+", value: "B+" },
        { label: "B-", value: "B-" },
        { label: "AB+", value: "AB+" },
        { label: "AB-", value: "AB-" },
        { label: "O+", value: "O+" },
        { label: "O-", value: "O-" },
    ];

    const [formData, setFormData] = useState({
        // New fields
        firstName: "Sadiq",
        middleName: "",
        lastName: "Rangrej",
        displayName: "Sadiq Rangrej",
        workEmail: "sadiq.rangrej@company.com",
        alternateEmail: "",
        alternatePhone: "",
        maritalStatus: "Single",
        bloodGroup: "Unknown",
        street: "",
        city: "",
        state: "",
        country: "India",
        postalCode: "",

        // Previous fields
        fullname: "Sadiq Hussain",
        username: "sadiq_admin",
        email: "sadiq.hussain@meta.com.tr",
        phone: "+90 536 446 27 56",
        employeeId: "EMP-2025-014",
        department: "IT Management",
        location: "Istanbul, Turkey",
        joinedDate: new Date("2021-03-01"),
        bio: "Dedicated System Administrator with 5+ years of experience in IT infrastructure and team leadership.",
    });

    const [image, setImage] = useState(avatar);


    const handleUpload = (event) => {
        const file = event.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImage(reader.result);
            reader.readAsDataURL(file);
        }
    };
    const [errors, setErrors] = useState({});

    const handleChange = (e, field) => {
        setFormData({ ...formData, [field]: e.target.value });
        setErrors({ ...errors, [field]: "" }); // Remove error when user types
    };

    const handleSubmit = () => {
        const requiredFields = [
            "firstName",
            "lastName",
            "workEmail",
            "street",
            "city",
            "state",
            "country",
            "postalCode",
        ];

        const newErrors = {};
        requiredFields.forEach((f) => {
            if (!formData[f]) {
                newErrors[f] = "This field is required";
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            toast.current.show({
                severity: "warn",
                summary: "Required Fields Missing",
                detail: "Please fill all required fields marked with *.",
                life: 3000,
            });
            return;
        }

        toast.current.show({
            severity: "success",
            summary: "Profile Updated",
            detail: "Your changes have been saved successfully!",
            life: 3000,
        });
        setTimeout(() => {
            navigate("/profile"); // ✅ Redirect to Profile page after save
        }, 2000);
    };
    const handleCancel = () => {
        navigate("/profile"); // ✅ Go to profile page on cancel
    };


    return (
        <div className="edit-profile">
            <Sidebar />
            <div className="edit-profile-container">
                <Navbar />
                <Toast ref={toast} />
                <Card className="edit-card">
                    <div className="header">
                        <h2>Edit Profile</h2>
                        <div className="btn-group">
                            <Button
                                label="Cancel"
                                className="cancel-btn"
                                severity="secondary"
                                onClick={handleCancel} // ✅ Added
                            />
                            <Button
                                label="Save Changes"
                                className="save-btn"
                                onClick={handleSubmit} // ✅ Added
                            />
                        </div>
                    </div>

                    <Divider />

                    <div className="profile-section">
                        <div className="profile-img-wrapper">
                            <img src={image} alt="profile" className="profile-img" />
                            <FileUpload
                                mode="basic"
                                name="demo[]"
                                chooseLabel="Change Photo"
                                customUpload
                                uploadHandler={handleUpload}
                                auto
                                className="upload-btn"
                            />
                        </div>
                    </div>

                    <Divider />

                    <form className="form-grid">
                        {/* New Fields */}
                        <div className="form-row">
                            <div className="form-field">
                                <label>
                                    <FontAwesomeIcon icon={faUser} /> First Name <span>*</span>
                                </label>
                                <InputText
                                    value={formData.firstName}
                                    onChange={(e) => handleChange(e, "firstName")}
                                    className={!formData.firstName ? "error-input" : ""}
                                    required
                                />
                                {!formData.firstName && (
                                    <span className="error-text">This field is required.</span>
                                )}
                            </div>
                            <div className="form-field">
                                <label><FontAwesomeIcon icon={faUser} /> Middle Name</label>
                                <InputText
                                    value={formData.middleName}
                                    onChange={(e) => handleChange(e, "middleName")}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-field">
                                <label>
                                    <FontAwesomeIcon icon={faUser} /> Last Name <span>*</span>
                                </label>
                                <InputText
                                    value={formData.lastName}
                                    onChange={(e) => handleChange(e, "lastName")}
                                    className={!formData.lastName ? "error-input" : ""}
                                    required
                                />
                                {!formData.lastName && (
                                    <span className="error-text">This field is required.</span>
                                )}
                            </div>
                            <div className="form-field">
                                <label><FontAwesomeIcon icon={faUser} /> Display Name</label>
                                <InputText
                                    value={formData.displayName}
                                    onChange={(e) => handleChange(e, "displayName")}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-field">
                                <label>
                                    <FontAwesomeIcon icon={faEnvelope} /> Work Email <span>*</span>
                                </label>
                                <InputText
                                    value={formData.workEmail}
                                    onChange={(e) => handleChange(e, "workEmail")}
                                    className={!formData.workEmail ? "error-input" : ""}
                                    required
                                />
                                {!formData.workEmail && (
                                    <span className="error-text">This field is required.</span>
                                )}
                            </div>
                            <div className="form-field">
                                <label><FontAwesomeIcon icon={faEnvelope} /> Alternate Email</label>
                                <InputText
                                    value={formData.alternateEmail}
                                    onChange={(e) => handleChange(e, "alternateEmail")}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-field">
                                <label><FontAwesomeIcon icon={faPhone} /> Alternate Phone</label>
                                <InputText
                                    value={formData.alternatePhone}
                                    onChange={(e) => handleChange(e, "alternatePhone")}
                                />
                            </div>
                            <div className="form-field">
                                <label><FontAwesomeIcon icon={faHeart} /> Marital Status</label>
                                <Dropdown
                                    value={formData.maritalStatus}
                                    options={maritalStatusOptions}
                                    onChange={(e) => handleChange(e, "maritalStatus")}
                                    placeholder="Select Status"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-field">
                                <label><FontAwesomeIcon icon={faTint} /> Blood Group</label>
                                <Dropdown
                                    value={formData.bloodGroup}
                                    options={bloodGroupOptions}
                                    onChange={(e) => handleChange(e, "bloodGroup")}
                                    placeholder="Select Group"
                                />
                            </div>
                        </div>

                        <Divider />
                        <h3 className="section-title">Company & Personal Info</h3>

                        {/* Old Fields */}
                        <div className="form-row">
                            <div className="form-field">
                                <label><FontAwesomeIcon icon={faUser} /> Full Name</label>
                                <InputText
                                    value={formData.fullname}
                                    onChange={(e) => handleChange(e, "fullname")}
                                />
                            </div>
                            <div className="form-field">
                                <label><FontAwesomeIcon icon={faIdBadge} /> Username</label>
                                <InputText
                                    value={formData.username}
                                    onChange={(e) => handleChange(e, "username")}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-field">
                                <label><FontAwesomeIcon icon={faEnvelope} /> Email</label>
                                <InputText
                                    value={formData.email}
                                    onChange={(e) => handleChange(e, "email")}
                                />
                            </div>
                            <div className="form-field">
                                <label><FontAwesomeIcon icon={faPhone} /> Phone</label>
                                <InputText
                                    value={formData.phone}
                                    onChange={(e) => handleChange(e, "phone")}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-field">
                                <label><FontAwesomeIcon icon={faBuilding} /> Department</label>
                                <InputText
                                    value={formData.department}
                                    onChange={(e) => handleChange(e, "department")}
                                />
                            </div>
                            <div className="form-field">
                                <label><FontAwesomeIcon icon={faMapMarkerAlt} /> Location</label>
                                <InputText
                                    value={formData.location}
                                    onChange={(e) => handleChange(e, "location")}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-field">
                                <label><FontAwesomeIcon icon={faIdBadge} /> Employee ID</label>
                                <InputText
                                    value={formData.employeeId}
                                    onChange={(e) => handleChange(e, "employeeId")}
                                />
                            </div>
                            <div className="form-field">
                                <label><FontAwesomeIcon icon={faCalendarAlt} /> Joined Date</label>
                                <Calendar
                                    value={formData.joinedDate}
                                    onChange={(e) => handleChange(e, "joinedDate")}
                                    showIcon
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-field full-width">
                                <label><FontAwesomeIcon icon={faBuilding} /> Bio</label>
                                <InputTextarea
                                    rows={4}
                                    value={formData.bio}
                                    onChange={(e) => handleChange(e, "bio")}
                                    placeholder="Write something about yourself..."
                                />
                            </div>
                        </div>

                        <Divider />
                        <h3 className="section-title">Address</h3>

                        <div className="form-row">
                            <div className="form-field">
                                <label><FontAwesomeIcon icon={faHome} /> Street <span>*</span></label>
                                <InputText
                                    value={formData.street}
                                    onChange={(e) => handleChange(e, "street")}
                                    className={!formData.street ? "error-input" : ""}
                                    required
                                />
                                {!formData.street && (
                                    <span className="error-text">This field is required.</span>
                                )}
                            </div>
                            <div className="form-field">
                                <label><FontAwesomeIcon icon={faMapMarkerAlt} /> City <span>*</span></label>
                                <InputText
                                    value={formData.city}
                                    onChange={(e) => handleChange(e, "city")}
                                    className={!formData.city ? "error-input" : ""}
                                    required
                                />
                                {!formData.city && (
                                    <span className="error-text">This field is required.</span>
                                )}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-field">
                                <label><FontAwesomeIcon icon={faFlag} /> State <span>*</span></label>
                                <InputText
                                    value={formData.state}
                                    onChange={(e) => handleChange(e, "state")}
                                    className={!formData.state ? "error-input" : ""}
                                    required
                                />
                                {!formData.state && (
                                    <span className="error-text">This field is required.</span>
                                )}
                            </div>
                            <div className="form-field">
                                <label><FontAwesomeIcon icon={faFlag} /> Country <span>*</span></label>
                                <InputText
                                    value={formData.country}
                                    onChange={(e) => handleChange(e, "country")}
                                    className={!formData.country ? "error-input" : ""}
                                    required
                                />
                                {!formData.country && (
                                    <span className="error-text">This field is required.</span>
                                )}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-field">
                                <label><FontAwesomeIcon icon={faMapMarkerAlt} /> Postal Code <span>*</span></label>
                                <InputText
                                    value={formData.postalCode}
                                    onChange={(e) => handleChange(e, "postalCode")}
                                    className={!formData.postalCode ? "error-input" : ""}
                                    required
                                />
                                {!formData.postalCode && (
                                    <span className="error-text">This field is required.</span>
                                )}
                            </div>
                        </div>
                    </form>

                </Card>
            </div>
        </div>
    );
};

export default EditProfile;
