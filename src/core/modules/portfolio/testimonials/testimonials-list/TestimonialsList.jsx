import React from "react";
import './TestimonialsList.scss';
import Navbar from "../../../../components/common-components/navbar/navbar";
import Sidebar from "../../../../components/common-components/sidebar/sidebar";
import Breadcrumb from "../../../../components/common-components/breadcrumb/Breadcrumb";
import TestimonialsDataTable from "../../../../components/portfolio/testimonials/TestimonialsDataTable";

const TestimonialsList = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <Breadcrumb items={['Dashboard', 'Portfolio', 'Testimonials']} />
                <TestimonialsDataTable />
            </div>
        </div>
    );
};

export default TestimonialsList;