import React from "react";
import './TestimonialsList.scss';
import Navbar from "../../../components/common-components/navbar/navbar";
import Sidebar from "../../../components/common-components/sidebar/sidebar";
import TestimonialsDataTable from "../../../components/testimonials/TestimonialsDataTable";
import BreadcrumbReact from "../../../components/common-components/breadcrumb/Breadcrumb";
const TestimonialsList = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <BreadcrumbReact
                    items={[
                        { label: 'Dashboard', url: '/dashboard/admin-dashboard' },
                        { label: 'Testimonial List' },
                    ]}
                />
                <TestimonialsDataTable />
            </div>
        </div>
    );
};

export default TestimonialsList;