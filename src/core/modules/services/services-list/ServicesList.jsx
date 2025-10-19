import React from "react";
import './servicesList.scss'

import BreadcrumbReact from "../../../components/common-components/breadcrumb/Breadcrumb";
import ServicesDataTable from "../../../components/services/servicesDataTable/ServicesDataTable";
const ServicesList = () => {
    return (
        <div className="list">
            <div className="listContainer">
                <BreadcrumbReact
                    items={[
                        { label: 'Dashboard', url: '/dashboard/admin-dashboard' },
                        { label: 'Service List' },
                    ]}
                />
                <ServicesDataTable />
            </div>
        </div>
    )
}
export default ServicesList