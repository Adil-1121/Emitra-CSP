import React from "react";
import './servicesList.scss'
import Navbar from "../../../components/common-components/navbar/navbar";
import Sidebar from "../../../components/common-components/sidebar/sidebar";
import BreadcrumbReact from "../../../components/common-components/breadcrumb/Breadcrumb";
import ServicesDataTable from "../../../components/services/servicesDataTable/ServicesDataTable";
const ServicesList = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
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