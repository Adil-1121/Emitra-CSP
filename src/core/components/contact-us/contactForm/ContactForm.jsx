import React, { useRef, useState } from "react";
import "./contactForm.scss";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const ContactForm = () => {
    const toast = useRef(null);

    const priorities = [
        { label: "Low", value: "Low" },
        { label: "Medium", value: "Medium" },
        { label: "High", value: "High" },
        { label: "Urgent", value: "Urgent" },
    ];

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        priority: null,
        message: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDropdownChange = (e) => {
        setFormData({ ...formData, priority: e.value });
    };

    const isFormValid = () => {
        return (
            formData.name.trim() &&
            formData.email.trim() &&
            formData.subject.trim() &&
            formData.priority &&
            formData.message.trim().length >= 10
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (isFormValid()) {
            toast.current.show({
                severity: "success",
                summary: "Success",
                detail: "Message sent successfully!",
                life: 3000,
            });

            setFormData({
                name: "",
                email: "",
                subject: "",
                priority: null,
                message: "",
            });
            setSubmitted(false);
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
        <Card className="contactForm">
            <Toast ref={toast} />
            <div className="header">Send us a Message</div>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="formGroup p-col-12 p-md-6">
                        <label htmlFor="name">
                            Full Name<span className="required">*</span>
                        </label>
                        <InputText
                            id="name"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            className={classNames({
                                "p-invalid": submitted && !formData.name.trim(),
                            })}
                        />
                    </div>

                    <div className="formGroup p-col-12 p-md-6">
                        <label htmlFor="email">
                            Email Address<span className="required">*</span>
                        </label>
                        <InputText
                            id="email"
                            name="email"
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={handleChange}
                            className={classNames({
                                "p-invalid": submitted && !formData.email.trim(),
                            })}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="formGroup p-col-12 p-md-6">
                        <label htmlFor="subject">
                            Subject<span className="required">*</span>
                        </label>
                        <InputText
                            id="subject"
                            name="subject"
                            placeholder="Enter message subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className={classNames({
                                "p-invalid": submitted && !formData.subject.trim(),
                            })}
                        />
                    </div>

                    <div className="formGroup p-col-12 p-md-6">
                        <label htmlFor="priority">
                            Priority<span className="required">*</span>
                        </label>
                        <Dropdown
                            id="priority"
                            value={formData.priority}
                            options={priorities}
                            optionLabel="label"
                            placeholder="Select Priority"
                            onChange={handleDropdownChange}
                            className={classNames({
                                "p-invalid": submitted && !formData.priority,
                            })}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="formGroup messageGroup p-col-12">
                        <label htmlFor="message">
                            Message<span className="required">*</span>
                        </label>
                        <InputTextarea
                            id="message"
                            name="message"
                            placeholder="Type your message here"
                            value={formData.message}
                            onChange={handleChange}
                            rows={5}
                            className={classNames({
                                "p-invalid": submitted && formData.message.trim().length < 10,
                            })}
                        />
                        {submitted && formData.message.trim().length < 10 && (
                            <small className="p-error">Minimum 10 characters required</small>
                        )}
                    </div>
                </div>

                <div className="form-actions">
                    <Button type="submit" className="sendBtn">
                        <FontAwesomeIcon icon={faPaperPlane} style={{ marginLeft: "8px" }} />Send Message
                    </Button>
                </div>

            </form>
        </Card>
    );
};

export default ContactForm;
