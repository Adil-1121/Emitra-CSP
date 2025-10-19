import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import BreadcrumbReact from "../../../components/common-components/breadcrumb/Breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faqsRows } from "../../../../faqsData"; // Dummy data
import "primeflex/primeflex.css";
import "./viewFaq.scss";

const ViewFaq = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Get FAQ from state or fallback to first dummy FAQ
    const faq = location.state?.faq || faqsRows[0];

    return (
        <div className="viewFaqPage list">
            <div className="listContainer">
                <BreadcrumbReact
                    items={[
                        { label: "Dashboard", url: "/dashboard/admin-dashboard" },
                        { label: "FAQ List", url: "/faqs" },
                        { label: "View FAQ" },
                    ]}
                />

                {/* Wrapper for padding */}
                <div className="contentWrapper">
                    {/* Header with breadcrumb-style back button */}
                    <div className="viewFaqHeader p-grid p-align-center p-justify-between">
                        <div className="breadcrumbBack">
                            <span className="backLink" onClick={() => navigate(-1)}>
                                <FontAwesomeIcon className="fa-icon" icon={faChevronLeft} /> Back to FAQ List
                            </span>
                        </div>
                        <div className="createdDate">
                            Created on: {faq.addedDate || "05-10-2025"}
                        </div>
                    </div>


                    {/* FAQ Details */}
                    <div className="faqDetailsCard p-grid p-align-start p-justify-start">
                        <h2>View FAQ Details</h2>
                        <div className="faqRowWrapper">
                            <div className="faqRow">
                                <span className="label">Category:</span>
                                <span className="value">{faq.category || "General"}</span>
                            </div>
                            <div className="faqRow">
                                <span className="label">Added By:</span>
                                <span className="value">{faq.addedBy || "Admin"}</span>
                            </div>
                        </div>

                        <div className="faqRowWrapper">
                            <div className="faqRow">
                                <span className="label">Status:</span>
                                <span className={`status ${faq.status?.toLowerCase() || "active"}`}>
                                    {faq.status || "Active"}
                                </span>
                            </div>
                            <div className="faqRow">
                                <span className="label">Tags:</span>
                                <span className="value">{faq.tags?.join(", ") || "-"}</span>
                            </div>
                        </div>

                        <div className="faqRowWrapper">
                            <div className="faqRow fullWidth">
                                <span className="label">Notes:</span>
                                <span className="value">{faq.notes || "-"}</span>
                            </div>
                        </div>

                        <div className="faqRowWrapper">
                            <div className="faqRow">
                                <span className="label">Question:</span>
                                <span className="value">{faq.question}</span>
                            </div>
                            <div className="faqRow">
                                <span className="label">Answer:</span>
                                <span className="value">{faq.answer}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewFaq;
