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
import { useNavigate, useParams } from "react-router-dom";
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';

import Breadcrumb from "../../../components/common-components/breadcrumb/Breadcrumb";
import { getTestimonialById, updateTestimonial } from "../../../../services/testimonialService";

import "./editTestimonial.scss";

const EditTestimonial = () => {
    const toast = useRef(null);
    const navigate = useNavigate();
    const { id } = useParams(); // testimonial id from route

    const [formData, setFormData] = useState({
        clientName: "",
        company: "",
        city: "",
        email: "",
        review: "",
        rating: null,
        addedBy: "",
        status: "",
        dateAdded: null,
    });

    const [profileImage, setProfileImage] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [formValid, setFormValid] = useState(false);

    // ✅ Fetch testimonial from backend
    useEffect(() => {
        const fetchTestimonial = async () => {
            const data = await getTestimonialById(id);
            if (data) {
                setFormData({
                    clientName: data.name || "",
                    company: data.company || "",
                    city: data.city || "",
                    email: data.email || "",
                    review: data.comment || "",
                    rating: data.rating || 0,
                    addedBy: data.added_by || "",
                    status: data.status || "",
                    dateAdded: data.date_added ? new Date(data.date_added) : null,
                });
                if (data.image_url) setProfileImage(data.image_url);
            }
        };
        fetchTestimonial();
    }, [id]);


    const handleChange = (e, name) => {
        const value = e.target ? e.target.value : e;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpload = (event) => {
        const file = event.files[0];
        if (file) {
            setProfileImage(file); // save file object for API
        }
    };

    // Validation
    const validateForm = () => {
        const { clientName, company, city, email, review, rating, addedBy, status, dateAdded } = formData;
        return (
            clientName.trim() &&
            company.trim() &&
            city.trim() &&
            email.trim() &&
            review.trim() &&
            rating > 0 &&
            profileImage &&
            addedBy &&
            status &&
            dateAdded
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

    // ✅ Submit updated testimonial to backend
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

        try {
            const payload = new FormData();
            payload.append("name", formData.clientName);
            payload.append("company", formData.company);
            payload.append("city", formData.city);
            payload.append("email", formData.email);
            payload.append("comment", formData.review);
            payload.append("rating", formData.rating);
            payload.append("added_by", formData.addedBy);
            payload.append("status", formData.status);
            if (formData.dateAdded) {
                payload.append("date_added", formData.dateAdded.toISOString());
            }

            // If profileImage is a file, append it
            if (profileImage instanceof File) {
                payload.append("image", profileImage);
            }

            await updateTestimonial(id, payload);

            toast.current.show({
                severity: "success",
                summary: "Success",
                detail: "Testimonial Updated Successfully",
                life: 2000,
            });

            setTimeout(() => navigate("/testimonials"), 2000);
        } catch (error) {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to update testimonial",
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
                        { label: "Edit Testimonial" },
                    ]}
                />

                <Toast ref={toast} />

                <Card className="form-card">
                    <div className="form-header">
                        <h2>Edit Testimonial</h2>
                        <div className="btn-group">
                            <Button
                                label="Update"
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
                                    src={
                                        profileImage instanceof File
                                            ? URL.createObjectURL(profileImage)
                                            : profileImage || noImage
                                    }
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
                                onChange={(e) => handleChange(e.value, "dateAdded")}
                                showIcon
                                dateFormat="yy-mm-dd"
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

export default EditTestimonial;
