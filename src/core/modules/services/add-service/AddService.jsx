import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { Divider } from "primereact/divider";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import noImage from '../../../../assets/noImage.png';
import { useNavigate } from "react-router-dom";

import BreadcrumbReact from "../../../components/common-components/breadcrumb/Breadcrumb";

import './addService.scss';

const AddService = () => {
    const toast = useRef(null);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "active",
        addedDate: null,
    });

    const [serviceImage, setServiceImage] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [formValid, setFormValid] = useState(false);

    const statusOptions = [
        { label: "Active", value: "active" },
        { label: "Pending", value: "pending" },
        { label: "Inactive", value: "inactive" },
    ];

    const handleChange = (e, name) => {
        const value = e.target ? e.target.value : e;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpload = (event) => {
        const file = event.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setServiceImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        const { title, description, addedDate, status } = formData;
        return title.trim() && description.trim() && addedDate && serviceImage && status;
    };

    useEffect(() => setFormValid(validateForm()), [formData, serviceImage]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (formValid) {
            toast.current.show({
                severity: "success",
                summary: "Success",
                detail: "Service Added Successfully",
                life: 2000,
            });
            setTimeout(() => navigate("/services"), 2000);
        } else {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Please fill all required fields",
                life: 3000,
            });
        }
    };

    return (
        <div className="edit"> {/* Same class as testimonial for sidebar responsiveness */}
            <div className="editContainer">
                <BreadcrumbReact
                    items={[
                        { label: 'Dashboard', url: '/dashboard/admin-dashboard' },
                        { label: 'Services List', url: '/services' },
                        { label: 'Add Service' },
                    ]}
                />

                <Toast ref={toast} />

                <Card className="form-card">
                    <div className="form-header">
                        <h2>Add Service</h2>
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
                                onClick={() => navigate("/services")}
                            />
                        </div>
                    </div>

                    <Divider />

                    <form className="p-fluid p-formgrid p-grid">
                        {/* Image Upload */}
                        <div className="p-field p-col-6 profile-upload-row">
                            <div className="profile-preview-wrapper">
                                <img
                                    src={serviceImage || noImage}
                                    alt="Service"
                                    className={classNames("profile-preview", { "p-invalid": submitted && !serviceImage })}
                                />
                                {submitted && !serviceImage && (
                                    <small className="p-error">Service image is required</small>
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

                        {/* Title */}
                        <div className="p-field p-col-12 p-md-6">
                            <label>Title<span className="required">*</span></label>
                            <InputText
                                value={formData.title}
                                onChange={(e) => handleChange(e, "title")}
                                placeholder="Service Title"
                                className={classNames({ "p-invalid": submitted && !formData.title })}
                            />
                            {submitted && !formData.title && <small className="p-error">Title is required</small>}
                        </div>

                        {/* Added Date */}
                        <div className="p-field p-col-12 p-md-6">
                            <label>Added Date<span className="required">*</span></label>
                            <Calendar
                                value={formData.addedDate}
                                onChange={(e) => handleChange(e.value, "addedDate")}
                                showIcon
                                placeholder="Select Added Date"
                                className={classNames({ "p-invalid": submitted && !formData.addedDate })}
                            />
                            {submitted && !formData.addedDate && <small className="p-error">Added Date is required</small>}
                        </div>

                        {/* Status */}
                        <div className="p-field p-col-12 p-md-6">
                            <label>Status<span className="required">*</span></label>
                            <Dropdown
                                value={formData.status}
                                options={statusOptions}
                                onChange={(e) => handleChange(e.value, "status")}
                                placeholder="Select Status"
                                className={classNames({ "p-invalid": submitted && !formData.status })}
                            />
                            {submitted && !formData.status && <small className="p-error">Status is required</small>}
                        </div>

                        {/* Description */}
                        <div className="p-field p-col-12 p-md-6">
                            <label>Description<span className="required">*</span></label>
                            <InputTextarea
                                rows={3}
                                value={formData.description}
                                onChange={(e) => handleChange(e, "description")}
                                placeholder="Service Description"
                                className={classNames({ "p-invalid": submitted && !formData.description })}
                            />
                            {submitted && !formData.description && <small className="p-error">Description is required</small>}
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default AddService;
