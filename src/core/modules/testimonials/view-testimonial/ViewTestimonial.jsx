import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../../components/common-components/navbar/navbar";
import Sidebar from "../../../components/common-components/sidebar/sidebar";
import Breadcrumb from "../../../components/common-components/breadcrumb/Breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import noImage from "../../../../assets/noImage.png"; // fallback image
import './viewTestimonial.scss';
const ViewTestimonial = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Get testimonial from state or fallback dummy data
    const testimonial = location.state?.testimonial || {
        clientName: "John Doe",
        company: "ABC Pvt Ltd",
        city: "New York",
        email: "john@example.com",
        review: "Great service provided!",
        rating: 4,
        status: "active",
        addedBy: "Admin",
        addedDate: "05-10-2025",
        profileImage: null,
    };

    return (
        <div className="viewTestimonialPage list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <Breadcrumb
                    items={[
                        { label: "Dashboard", url: "/dashboard/admin-dashboard" },
                        { label: "Testimonial List", url: "/testimonials" },
                        { label: "View Testimonial" },
                    ]}
                />

                {/* Wrapper for padding */}
                <div className="contentWrapper">
                    {/* Header with breadcrumb-style back button */}
                    <div className="viewTestimonialHeader p-grid p-align-center p-justify-between">
                        <div className="breadcrumbBack">
                            <span className="backLink" onClick={() => navigate(-1)}>
                                <FontAwesomeIcon className="fa-icon" icon={faChevronLeft} /> Back to Testimonial List
                            </span>
                        </div>
                        <div className="createdDate">
                            Created on: {testimonial.addedDate}
                        </div>
                    </div>

                    {/* Testimonial Details */}
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
                                <span className={`status ${testimonial.status}`}>
                                    {testimonial.status}
                                </span>
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
            </div>
        </div>
    );
};

export default ViewTestimonial;
