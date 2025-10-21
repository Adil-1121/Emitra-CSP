import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../components/common-components/breadcrumb/Breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import noImage from "../../../../assets/noImage.png";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "");
import { Toast } from "primereact/toast";
import "./viewTestimonial.scss";
import LoadingSpinner from "../../../components/common-components/loadingSpinner/LoadingSpinner";
import { getTestimonialById } from "../../../../services/testimonialService";

const ViewTestimonial = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const toast = useRef(null);

    const [testimonial, setTestimonial] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // 👈 Spinner state

    useEffect(() => {
        const fetchTestimonial = async () => {
            setIsLoading(true); // 👈 Start spinner
            try {
                const res = await getTestimonialById(id);
                setTestimonial({
                    clientName: res.name || "",
                    company: res.company || "",
                    city: res.city || "",
                    email: res.email || "",
                    review: res.comment || "",
                    rating: res.rating || 0,
                    status: res.status || "active",
                    addedBy: res.added_by || "Admin",
                    addedDate: res.date_added ? new Date(res.date_added).toLocaleDateString() : "",
                    profileImage: res.image_url ? `${API_BASE_URL}${res.image_url}` : null,
                });
            } catch (err) {
                toast.current.show({
                    severity: "error",
                    summary: "Error",
                    detail: err.response?.data?.message || err.message || "Failed to fetch testimonial",
                    life: 3000,
                });
            } finally {
                setIsLoading(false); // 👈 Stop spinner
            }
        };

        fetchTestimonial();
    }, [id]);

    return (
        <div className="viewTestimonialPage list">
            <div className="listContainer">
                <Breadcrumb
                    items={[
                        { label: "Dashboard", url: "/dashboard/admin-dashboard" },
                        { label: "Testimonial List", url: "/testimonials" },
                        { label: "View Testimonial" },
                    ]}
                />

                <Toast ref={toast} />

                {/* 👇 Spinner while data loading */}
                {isLoading ? (
                    <LoadingSpinner isLoading={isLoading} />
                ) : (
                    testimonial && (
                        <div className="contentWrapper">
                            <div className="viewTestimonialHeader p-grid p-align-center p-justify-between">
                                <div className="breadcrumbBack">
                                    <span className="backLink" onClick={() => navigate(-1)}>
                                        <FontAwesomeIcon className="fa-icon" icon={faChevronLeft} /> Back to Testimonial List
                                    </span>
                                </div>
                                <div className="createdDate">Created on: {testimonial.addedDate}</div>
                            </div>

                            <div className="testimonialDetailsCard p-grid p-align-start p-justify-start">
                                <h2>View Testimonial Details</h2>

                                <div className="testimonialRowWrapper">
                                    <div className="testimonialRow">
                                        <span className="label">Profile Image:</span>
                                        <span className="value">
                                            <img
                                                src={testimonial.profileImage || noImage}
                                                alt={testimonial.clientName}
                                                className="profileImg"
                                            />
                                        </span>
                                    </div>
                                    <div className="testimonialRow">
                                        <span className="label">Client Name:</span>
                                        <span className="value">{testimonial.clientName}</span>
                                    </div>
                                </div>

                                <div className="testimonialRowWrapper">
                                    <div className="testimonialRow">
                                        <span className="label">Company:</span>
                                        <span className="value">{testimonial.company}</span>
                                    </div>
                                    <div className="testimonialRow">
                                        <span className="label">Email:</span>
                                        <span className="value">{testimonial.email}</span>
                                    </div>
                                </div>

                                <div className="testimonialRowWrapper">
                                    <div className="testimonialRow">
                                        <span className="label">City:</span>
                                        <span className="value">{testimonial.city}</span>
                                    </div>
                                    <div className="testimonialRow">
                                        <span className="label">Status:</span>
                                        <span className={`status ${testimonial.status}`}>{testimonial.status}</span>
                                    </div>
                                </div>

                                <div className="testimonialRowWrapper">
                                    <div className="testimonialRow">
                                        <span className="label">Rating:</span>
                                        <span className="value">{testimonial.rating} / 5</span>
                                    </div>
                                    <div className="testimonialRow">
                                        <span className="label">Added By:</span>
                                        <span className="value">{testimonial.addedBy}</span>
                                    </div>
                                </div>

                                <div className="testimonialRowWrapper">
                                    <div className="testimonialRow fullWidth">
                                        <span className="label">Review:</span>
                                        <span className="value">{testimonial.review}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default ViewTestimonial;
