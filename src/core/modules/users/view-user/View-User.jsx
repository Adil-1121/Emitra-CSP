import React from "react";
import { useNavigate } from "react-router-dom";

import './View-User.scss'
import Navbar from "../../../components/common-components/navbar/navbar";
import Sidebar from "../../../components/common-components/sidebar/sidebar";
import BreadcrumbReact from "../../../components/common-components/breadcrumb/Breadcrumb";
import UserActivityTable from "../../../components/users/table/Table";
import ChartComponent from "../../../components/users/chart/ChartComponent";
const ViewUser = () => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate("/users/edit-user/1"); // id ke hisaab se path
    };
    return (
        <div className="single">
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <BreadcrumbReact
                    items={[
                        { label: 'Dashboard', url: '/dashboard/admin-dashboard' },
                        { label: 'Users List', url: '/users' },
                        { label: 'View User' },
                    ]}
                />
                {/* <Breadcrumb items={['Dashboard', '', 'View User']} /> */}
                <div className="singleTop">
                    <div className="left">
                        <div className="editButton" onClick={handleEdit}>Edit</div>
                        <h1 className="title">Information</h1>
                        <div className="item">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" alt="" className="itemImg" />
                            <div className="details">
                                <h1 className="itemTitle">Jane Doe</h1>
                                <div className="detailItem">
                                    <span className="itemKey">Email:</span>
                                    <span className="itemValue">janedoe86@gmail.com</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Phone:</span>
                                    <span className="itemValue">+91 86678 86696</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Address:</span>
                                    <span className="itemValue">123, Newton Street, NewYork</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Country:</span>
                                    <span className="itemValue">USA</span>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className="right">
                        <ChartComponent height={210} width="100%" title="Last Activity (Last 6 Months)" />
                    </div>
                </div>
                <div className="singleBottom">
                    <h1 className="title">Last Activity</h1>

                    <UserActivityTable />

                </div>
            </div>
        </div>
    )
}
export default ViewUser
