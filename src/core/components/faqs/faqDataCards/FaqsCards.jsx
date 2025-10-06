import React, { useState, useRef } from "react";
import "./faqsCards.scss";
import { faqsRows } from "../../../../faqsData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEye, faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Link } from "react-router-dom";

const FaqsCards = () => {
    const [search, setSearch] = useState("");
    const [data, setData] = useState(faqsRows);
    const toast = useRef(null);

    // Confirm delete
    const confirmDelete = (id) => {
        confirmDialog({
            message: "Are you sure you want to delete this FAQ?",
            header: "Delete Confirmation",
            icon: "pi pi-exclamation-triangle",
            acceptLabel: "Yes",
            rejectLabel: "No",
            acceptClassName: "p-button-success custom-accept",
            rejectClassName: "p-button-danger custom-reject",
            accept: () => handleDelete(id),
        });
    };

    // Delete function
    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
        toast.current.show({
            severity: "success",
            summary: "Deleted",
            detail: "FAQ deleted successfully",
            life: 3000,
        });
    };

    // Filter search
    const filteredFaqs = data.filter(
        (faq) =>
            faq.question.toLowerCase().includes(search.toLowerCase()) ||
            faq.answer.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="faqsCards">
            {/* Toast & ConfirmDialog */}
            <Toast ref={toast} position="top-right" />
            <ConfirmDialog position="top" className="custom-confirm-dialog" />

            {/* Header */}
            <div className="faqsHeader">
                <h3>FAQ List</h3>
                <div className="rightActions">
                    <div className="searchContainer">
                        <FontAwesomeIcon icon={faSearch} className="searchIcon" />
                        <input
                            type="text"
                            className="searchInput"
                            placeholder="Search FAQs..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Link to="/faqs/add-faq" className="addBtn">
                        <FontAwesomeIcon icon={faPlus} /> Add FAQ
                    </Link>
                </div>
            </div>

            {/* FAQ Cards */}
            <div className="faqGrid">
                {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((faq) => (
                        <div className="faqCard" key={faq.id}>
                            {/* Card Header */}
                            <div className="faqMeta">
                                <span><strong>Category:</strong> {faq.category || "General"}</span>
                                <span><strong>Added By:</strong> {faq.addedBy || "Admin"}</span>
                            </div>
                            {/* Extra Details */}
                            <div className="cardHeader">
                                <h4 className="faqQuestion">{faq.question}</h4>
                                <span className={`status ${faq.status || "Active"}`}>
                                    {faq.status || "Active"}
                                </span>
                            </div>

                            {/* Card Body */}
                            <p className="faqAnswer">{faq.answer}</p>

                            <div className="faqMetaBottom">
                                <span className="date">{faq.addedDate || "05-10-2025"}</span>
                            </div>

                            {/* Actions */}
                            <div className="cardActions">
                                <Link to={`/faqs/view-faq/${faq.id}`} className="viewBtn">
                                    <FontAwesomeIcon icon={faEye} /> View
                                </Link>
                                <Link
                                    to={`/faqs/edit-faq/${faq.id}`}
                                    state={{ faq }} // pass the FAQ data for prefill
                                    className="editBtn"
                                >
                                    <FontAwesomeIcon icon={faEdit} /> Edit
                                </Link>
                                <button
                                    className="deleteBtn"
                                    onClick={() => confirmDelete(faq.id)}
                                >
                                    <FontAwesomeIcon icon={faTrash} /> Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="noResult">No FAQs found.</p>
                )}
            </div>
        </div>
    );
};

export default FaqsCards;
