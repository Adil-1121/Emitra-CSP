import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { Divider } from "primereact/divider";
import { Rating } from "primereact/rating";
import { classNames } from "primereact/utils";
import noImage from "../../../../assets/noImage.png";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";

import Breadcrumb from "../../../components/common-components/breadcrumb/Breadcrumb";

import "./addTestimonial.scss";

import { addTestimonial } from "../../../../services/testimonialService";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "");

const AddTestimonial = () => {
    const toast = useRef(null);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        clientName: "",
        company: "",
        city: "",
        email: "",
        review: "",
        rating: null,
    });

    const [profileImage, setProfileImage] = useState(null);
    const [profileFile, setProfileFile] = useState(null); // store file for API
    const [submitted, setSubmitted] = useState(false);
    const [formValid, setFormValid] = useState(false);

    const handleChange = (e, name) => {
        const value = e.target ? e.target.value : e;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpload = (event) => {
        const file = event.files[0];
        if (file) {
            setProfileFile(file); // save file for API
            const reader = new FileReader();
            reader.onload = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Validation
    const validateForm = () => {
        const { clientName, company, city, email, review, rating } = formData;
        return (
            clientName.trim() &&
            company.trim() &&
            city.trim() &&
            email.trim() &&
            review.trim() &&
            rating > 0 &&
            profileFile // file required
        );
    };

    useEffect(() => {
        setFormValid(validateForm());
    }, [formData, profileFile]);

    const getErrorMessage = (field) => {
        const value = formData[field];
        if (!value || (typeof value === "string" && !value.trim())) {
            return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        }
        if (field === "rating" && (!value || value < 1)) {
            return "Please select a rating";
        }
        if (field === "image" && !profileFile) {
            return "Profile image is required";
        }
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

        // Prepare payload for API
        const payload = new FormData();
        payload.append("name", formData.clientName);
        payload.append("company", formData.company);
        payload.append("city", formData.city);
        payload.append("email", formData.email);
        payload.append("comment", formData.review);
        payload.append("rating", formData.rating);
        payload.append("image", profileFile);
        payload.append("added_by", formData.addedBy || "");
        payload.append("status", formData.status || "active");
        if (formData.dateAdded) {
            payload.append("date_added", formData.dateAdded.toISOString());
        }

        try {
            await addTestimonial(payload);
            toast.current.show({
                severity: "success",
                summary: "Success",
                detail: "Testimonial Added Successfully",
                life: 2000,
            });
            setTimeout(() => navigate("/testimonials"), 2000);
        } catch (err) {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: err.response?.data?.message || err.message || "Failed to add testimonial",
                life: 3000,
            });
        }
    };

    return (
        <div className="edit">
            <div className="editContainer">
                <Breadcrumb
                    items={[
                        { label: "Dashboard", url: "/dashboard/admin-dashboard" },
                        { label: "Testimonial List", url: "/testimonials" },
                        { label: "Add Testimonial" },
                    ]}
                />

                <Toast ref={toast} />

                <Card className="form-card">
                    <div className="form-header">
                        <h2>Add Testimonial</h2>
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
                                onClick={() => navigate("/testimonials")}
                            />
                        </div>
                    </div>

                    <Divider />

                    <form className="p-fluid p-formgrid p-grid">
                        {/* Profile Image */}
                        <div className="p-field p-col-6 profile-upload-row">
                            <div className="profile-preview-wrapper">
                                <img
                                    src={profileImage || noImage}
                                    alt="Client"
                                    className={classNames("profile-preview", {
                                        "p-invalid": submitted && !profileFile,
                                    })}
                                />
                                {submitted && !profileFile && (
                                    <small className="p-error">{getErrorMessage("image")}</small>
                                )}
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

                        {/* Client Name */}
                        <div className="p-field p-col-12 p-md-6">
                            <label>
                                Client Name<span className="required">*</span>
                            </label>
                            <InputText
                                value={formData.clientName}
                                onChange={(e) => handleChange(e, "clientName")}
                                placeholder="Please Enter Client Name"
                                className={classNames({
                                    "p-invalid": submitted && !formData.clientName,
                                })}
                            />
                            {submitted && !formData.clientName && (
                                <small className="p-error">{getErrorMessage("clientName")}</small>
                            )}
                        </div>

                        {/* Company */}
                        <div className="p-field p-col-12 p-md-6">
                            <label>
                                Company<span className="required">*</span>
                            </label>
                            <InputText
                                value={formData.company}
                                onChange={(e) => handleChange(e, "company")}
                                placeholder="Please Enter Client Company Name"
                                className={classNames({
                                    "p-invalid": submitted && !formData.company,
                                })}
                            />
                            {submitted && !formData.company && (
                                <small className="p-error">{getErrorMessage("company")}</small>
                            )}
                        </div>

                        {/* City */}
                        <div className="p-field p-col-12 p-md-6">
                            <label>
                                City<span className="required">*</span>
                            </label>
                            <InputText
                                value={formData.city}
                                onChange={(e) => handleChange(e, "city")}
                                placeholder="Please Enter Client City Name"
                                className={classNames({
                                    "p-invalid": submitted && !formData.city,
                                })}
                            />
                            {submitted && !formData.city && (
                                <small className="p-error">{getErrorMessage("city")}</small>
                            )}
                        </div>

                        {/* Email */}
                        <div className="p-field p-col-12 p-md-6">
                            <label>
                                Email<span className="required">*</span>
                            </label>
                            <InputText
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleChange(e, "email")}
                                placeholder="Please Enter Client Email Address"
                                className={classNames({
                                    "p-invalid": submitted && !formData.email,
                                })}
                            />
                            {submitted && !formData.email && (
                                <small className="p-error">{getErrorMessage("email")}</small>
                            )}
                        </div>
                        {/* Added By */}
                        <div className="p-field p-col-12 p-md-4">
                            <label>
                                Added By<span className="required">*</span>
                            </label>
                            <Dropdown
                                value={formData.addedBy}
                                options={[
                                    { label: "Admin", value: "admin" },
                                    { label: "Manager", value: "manager" },
                                    { label: "Staff", value: "staff" },
                                    { label: "Customer Support", value: "support" },
                                ]}

                                onChange={(e) => handleChange(e, "addedBy")}
                                placeholder="Select Added By"
                                className={classNames({
                                    "p-invalid": submitted && !formData.addedBy,
                                })}
                            />
                            {submitted && !formData.addedBy && (
                                <small className="p-error">{getErrorMessage("addedBy")}</small>
                            )}
                        </div>
                        {/* Date Added */}
                        <div className="p-field p-col-12 p-md-4">
                            <label>
                                Date Added<span className="required">*</span>
                            </label>
                            <Calendar
                                value={formData.dateAdded}
                                onChange={(e) => handleChange(e, "dateAdded")}
                                placeholder="Select Date"
                                showIcon
                                className={classNames({
                                    "p-invalid": submitted && !formData.dateAdded,
                                })}
                            />
                            {submitted && !formData.dateAdded && (
                                <small className="p-error">{getErrorMessage("dateAdded")}</small>
                            )}
                        </div>

                        {/* Rating */}
                        <div className="p-field p-col-12 p-md-6">
                            <label>
                                Rating<span className="required">*</span>
                            </label>
                            <Rating
                                value={formData.rating}
                                onChange={(e) => handleChange(e, "rating")}
                                cancel={false}
                                className={classNames("custom-rating", {
                                    "p-invalid": submitted && (!formData.rating || formData.rating < 1),
                                })}
                            />
                            {submitted && (!formData.rating || formData.rating < 1) && (
                                <small className="p-error">{getErrorMessage("rating")}</small>
                            )}
                        </div>
                        {/* Status */}
                        <div className="p-field p-col-12 p-md-4">
                            <label>
                                Status<span className="required">*</span>
                            </label>
                            <Dropdown
                                value={formData.status}
                                options={[
                                    { label: "Active", value: "active" },
                                    { label: "Pending", value: "pending" },
                                    { label: "Inactive", value: "inactive" },
                                ]}
                                onChange={(e) => handleChange(e, "status")}
                                placeholder="Select Status"
                                className={classNames({
                                    "p-invalid": submitted && !formData.status,
                                })}
                            />
                            {submitted && !formData.status && (
                                <small className="p-error">{getErrorMessage("status")}</small>
                            )}
                        </div>
                        {/* Review */}
                        <div className="p-field p-col-12">
                            <label>
                                Review<span className="required">*</span>
                            </label>
                            <InputTextarea
                                rows={4}
                                value={formData.review}
                                onChange={(e) => handleChange(e, "review")}
                                placeholder="Please Enter Client Reviews"
                                className={classNames({
                                    "p-invalid": submitted && !formData.review,
                                })}
                            />
                            {submitted && !formData.review && (
                                <small className="p-error">{getErrorMessage("review")}</small>
                            )}
                        </div>



                    </form>
                </Card>
            </div>
        </div>
    );
};

export default AddTestimonial;
