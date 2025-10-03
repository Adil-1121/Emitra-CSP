import React from "react";
import './View-User.scss'
import Navbar from "../../../components/common-components/navbar/navbar";
import Sidebar from "../../../components/common-components/sidebar/sidebar";
import Breadcrumb from "../../../components/common-components/breadcrumb/Breadcrumb";
import List from "../../../components/users/table/Table";
import ChartComponent from "../../../components/dashboard/chart/Chart";
const Single = () => {
    return (
        <div className="single">
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <Breadcrumb items={['Dashboard', 'Users List', 'View User']} />
                <div className="singleTop">
                    <div className="left">
                        <div className="editButton">Edit</div>
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
                        <ChartComponent height={210} width="100%" title="User Activity (Last 6 Months)" />
                    </div>
                </div>
                <div className="singleBottom">
                    <h1 className="title">Last Transactions</h1>

                    <List />

                </div>
            </div>
        </div>
    )
}
export default Single
