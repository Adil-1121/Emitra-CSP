import React from "react";
import './TestimonialsList.scss';

import TestimonialsDataTable from "../../../components/testimonials/TestimonialsDataTable";
import BreadcrumbReact from "../../../components/common-components/breadcrumb/Breadcrumb";
const TestimonialsList = () => {
    return (
        <div className="list">
            <div className="listContainer">
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