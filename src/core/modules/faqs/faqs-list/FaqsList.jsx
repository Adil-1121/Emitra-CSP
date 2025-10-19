import React from "react";
import './faqsList.scss'

import BreadcrumbReact from "../../../components/common-components/breadcrumb/Breadcrumb";
import FaqsCards from "../../../components/faqs/faqDataCards/FaqsCards";
const FaqsList = () => {
    return (
        <div className="list">
            <div className="listContainer">
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