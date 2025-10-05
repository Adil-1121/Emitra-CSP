import React from "react";
import './faqsList.scss'
import Navbar from "../../../components/common-components/navbar/navbar";
import Sidebar from "../../../components/common-components/sidebar/sidebar";
import BreadcrumbReact from "../../../components/common-components/breadcrumb/Breadcrumb";
import FaqsCards from "../../../components/faqs/faqDataCards/FaqsCards";
const FaqsList = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <BreadcrumbReact
                    items={[
                        { label: 'Dashboard', url: '/dashboard/admin-dashboard' },
                        { label: 'FAQ List' },
                    ]}
                />
                <FaqsCards />

            </div>
        </div>
    )
}
export default FaqsList