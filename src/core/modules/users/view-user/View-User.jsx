import React from "react";
import { useNavigate } from "react-router-dom";
import "./View-User.scss";

import BreadcrumbReact from "../../../components/common-components/breadcrumb/Breadcrumb";
import UserActivityTable from "../../../components/users/table/Table";
import ChartComponent from "../../../components/users/chart/ChartComponent";

const ViewUser = () => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate("/users/edit-user/1"); // id ke hisaab se path
    };

    return (
        <div className="viewUser">
            <div className="viewUser-container">
                <BreadcrumbReact
                    items={[
                        { label: "Dashboard", url: "/dashboard/admin-dashboard" },
                        { label: "Users List", url: "/users" },
                        { label: "View User" },
                    ]}
                />

                <div className="viewUser-top">
                    <div className="viewUser-left">
                        <div className="viewUser-editButton" onClick={handleEdit}>
                            Edit
                        </div>
                        <h1 className="viewUser-title">Information</h1>
                        <div className="viewUser-item">
                            <img
                                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                                alt="User"
                                className="viewUser-itemImg"
                            />
                            <div className="viewUser-details">
                                <h1 className="viewUser-itemTitle">Jane Doe</h1>
                                <div className="viewUser-detailItem">
                                    <span className="viewUser-itemKey">Email:</span>
                                    <span className="viewUser-itemValue">janedoe86@gmail.com</span>
                                </div>
                                <div className="viewUser-detailItem">
                                    <span className="viewUser-itemKey">Phone:</span>
                                    <span className="viewUser-itemValue">+91 86678 86696</span>
                                </div>
                                <div className="viewUser-detailItem">
                                    <span className="viewUser-itemKey">Address:</span>
                                    <span className="viewUser-itemValue">
                                        123, Newton Street, NewYork
                                    </span>
                                </div>
                                <div className="viewUser-detailItem">
                                    <span className="viewUser-itemKey">Country:</span>
                                    <span className="viewUser-itemValue">USA</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="viewUser-right">
                        <ChartComponent
                            height={210}
                            width="100%"
                            title="Last Activity (Last 6 Months)"
                        />
                    </div>
                </div>

                <div className="viewUser-bottom">
                    <h1 className="viewUser-title">Last Activity</h1>
                    <UserActivityTable />
                </div>
            </div>
        </div>
    );
};

export default ViewUser;
