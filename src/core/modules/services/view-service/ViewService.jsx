import React from "react";
import { useNavigate } from "react-router-dom";
import "./ViewService.scss";
import Navbar from "../../../components/common-components/navbar/navbar";
import Sidebar from "../../../components/common-components/sidebar/sidebar";
import BreadcrumbReact from "../../../components/common-components/breadcrumb/Breadcrumb";
import ServiceActivityTable from "../../../components/services/seviceActivityTable/ServiceActivityTable";
const ViewService = () => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate("/services/edit-service/1"); // id ke hisaab se path
    };

    // Service info based on first activity (id=1)
    const serviceInfo = {
        img: "https://via.placeholder.com/120",
        title: "Electricity Bill Payment",
        status: "Active",
        addedDate: "03-10-2025",
        description: "Users can now schedule recurring payments via Auto-Pay feature.",
    };

    return (
        <div className="single">
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <BreadcrumbReact
                    items={[
                        { label: "Dashboard", url: "/dashboard/admin-dashboard" },
                        { label: "Services List", url: "/services" },
                        { label: "View Service" },
                    ]}
                />

                {/* Single Top - Service Information */}
                <div className="singleTop fullWidth">
                    <div className="left fullWidth">
                        <div className="editButton" onClick={handleEdit}>Edit</div>
                        <h1 className="title">Service Information</h1>
                        <div className="item fullWidth">
                            <img
                                src={serviceInfo.img}
                                alt={serviceInfo.title}
                                className="itemImg"
                            />
                            <div className="details">
                                <h1 className="itemTitle">{serviceInfo.title}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">Status:</span>
                                    <span className="itemValue">{serviceInfo.status}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Added Date:</span>
                                    <span className="itemValue">{serviceInfo.addedDate}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Description:</span>
                                    <span className="itemValue">{serviceInfo.description}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Single Bottom - Service Activity Table */}
                <div className="singleBottom">
                    <h1 className="title">Service Activity</h1>
                    <ServiceActivityTable />
                </div>
            </div>
        </div>
    );
};

export default ViewService;
