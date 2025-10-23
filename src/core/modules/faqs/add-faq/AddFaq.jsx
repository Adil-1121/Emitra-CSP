import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { useNavigate } from "react-router-dom";

import BreadcrumbReact from "../../../components/common-components/breadcrumb/Breadcrumb";

import "./addFaq.scss";

const AddFaq = () => {
    const toast = useRef(null);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        question: "",
        answer: "",
        category: "",
        status: "active",
        addedDate: null,
        addedBy: "",
    });

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

    const validateForm = () => {
        const { question, answer, category, status, addedDate, addedBy } = formData;
        return question.trim() && answer.trim() && category.trim() && addedDate && addedBy.trim() && status;
    };

    useEffect(() => {
        setFormValid(validateForm());
    }, [formData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (formValid) {
            toast.current.show({
                severity: "success",
                summary: "Success",
                detail: "FAQ Added Successfully",
                life: 2000,
            });

            setTimeout(() => {
                navigate("/faqs");
            }, 2000);
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
        <div className="addFaq">
            <div className="addFaqContainer">
                <BreadcrumbReact
                    items={[
                        { label: 'Dashboard', url: '/dashboard/admin-dashboard' },
                        { label: 'FAQ List', url: '/faqs' },
                        { label: 'Add FAQ' },
                    ]}
                />

                <Toast ref={toast} />

                <Card className="addFaq-formCard">
                    <div className="addFaq-formHeader">
                        <h2>Add FAQ</h2>
                        <div className="addFaq-btnGroup">
                            <Button
                                label="Submit"
                                onClick={handleSubmit}
                                style={{ backgroundColor: "rebeccapurple", border: "none" }}
                            />
                            <Button
                                label="Cancel"
                                className="p-button-secondary"
                                style={{ marginLeft: "10px" }}
                                onClick={() => navigate("/faqs")}
                            />
                        </div>
                    </div>

                    <form className="p-fluid p-formgrid p-grid">
                        {/* Category */}
                        <div className="p-field p-col-12 p-md-6">
                            <label>
                                Category<span className="required">*</span>
                            </label>
                            <InputText
                                value={formData.category}
                                onChange={(e) => handleChange(e, "category")}
                                placeholder="Enter category"
                                className={classNames({
                                    "p-invalid": submitted && !formData.category,
                                })}
                            />
                            {submitted && !formData.category && (
                                <small className="p-error">Category is required</small>
                            )}
                        </div>

                        {/* Added By */}
                        <div className="p-field p-col-12 p-md-6">
                            <label>
                                Added By<span className="required">*</span>
                            </label>
                            <InputText
                                value={formData.addedBy}
                                onChange={(e) => handleChange(e, "addedBy")}
                                placeholder="Enter name"
                                className={classNames({
                                    "p-invalid": submitted && !formData.addedBy,
                                })}
                            />
                            {submitted && !formData.addedBy && (
                                <small className="p-error">Added By is required</small>
                            )}
                        </div>

                        {/* Added Date */}
                        <div className="p-field p-col-12 p-md-6">
                            <label>
                                Added Date<span className="required">*</span>
                            </label>
                            <Calendar
                                value={formData.addedDate}
                                onChange={(e) => handleChange(e.value, "addedDate")}
                                showIcon
                                placeholder="Select Added Date"
                                className={classNames({
                                    "p-invalid": submitted && !formData.addedDate,
                                })}
                            />
                            {submitted && !formData.addedDate && (
                                <small className="p-error">Added Date is required</small>
                            )}
                        </div>

                        {/* Status */}
                        <div className="p-field p-col-12 p-md-6">
                            <label>
                                Status<span className="required">*</span>
                            </label>
                            <Dropdown
                                value={formData.status}
                                options={statusOptions}
                                onChange={(e) => handleChange(e.value, "status")}
                                placeholder="Select Status"
                                className={classNames({
                                    "p-invalid": submitted && !formData.status,
                                })}
                            />
                            {submitted && !formData.status && (
                                <small className="p-error">Status is required</small>
                            )}
                        </div>

                        {/* Question */}
                        <div className="p-field p-col-12 p-md-6">
                            <label>
                                Question<span className="required">*</span>
                            </label>
                            <InputText
                                value={formData.question}
                                onChange={(e) => handleChange(e, "question")}
                                placeholder="Enter FAQ question"
                                className={classNames({
                                    "p-invalid": submitted && !formData.question,
                                })}
                            />
                            {submitted && !formData.question && (
                                <small className="p-error">Question is required</small>
                            )}
                        </div>

                        {/* Answer */}
                        <div className="p-field p-col-12 p-md-6">
                            <label>
                                Answer<span className="required">*</span>
                            </label>
                            <InputTextarea
                                rows={3}
                                value={formData.answer}
                                onChange={(e) => handleChange(e, "answer")}
                                placeholder="Enter FAQ answer"
                                className={classNames({
                                    "p-invalid": submitted && !formData.answer,
                                })}
                            />
                            {submitted && !formData.answer && (
                                <small className="p-error">Answer is required</small>
                            )}
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default AddFaq;
