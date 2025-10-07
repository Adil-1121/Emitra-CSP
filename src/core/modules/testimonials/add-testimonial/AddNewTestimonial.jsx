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

import Navbar from "../../../components/common-components/navbar/navbar";
import Sidebar from "../../../components/common-components/sidebar/sidebar";
import Breadcrumb from "../../../components/common-components/breadcrumb/Breadcrumb";

import "./addTestimonial.scss";

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
            profileImage // image required
        );
    };

    useEffect(() => {
        setFormValid(validateForm());
    }, [formData, profileImage]);

    const getErrorMessage = (field) => {
        const value = formData[field];
        if (!value || (typeof value === "string" && !value.trim())) {
            return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        }
        if (field === "rating" && (!value || value < 1)) {
            return "Please select a rating";
        }
        return "";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (formValid) {
            toast.current.show({
                severity: "success",
                summary: "Success",
                detail: "Testimonial Added Successfully",
                life: 2000,
            });

            setTimeout(() => {
                navigate("/testimonials"); // testimonials list page
            }, 2000);
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
                                        "p-invalid": submitted && !profileImage,
                                    })}
                                />
                                {submitted && !profileImage && (
                                    <small className="p-error">Profile image is required</small>
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
                                placeholder="John Doe"
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
                                placeholder="ABC Pvt Ltd"
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
                                placeholder="New York"
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
                                placeholder="example@email.com"
                                className={classNames({
                                    "p-invalid": submitted && !formData.email,
                                })}
                            />
                            {submitted && !formData.email && (
                                <small className="p-error">{getErrorMessage("email")}</small>
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

                        {/* Review */}
                        <div className="p-field p-col-12">
                            <label>
                                Review<span className="required">*</span>
                            </label>
                            <InputTextarea
                                rows={4}
                                value={formData.review}
                                onChange={(e) => handleChange(e, "review")}
                                placeholder="Client review..."
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
