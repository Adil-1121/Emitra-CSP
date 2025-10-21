import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./View-User.scss";

import BreadcrumbReact from "../../../components/common-components/breadcrumb/Breadcrumb";
import UserActivityTable from "../../../components/users/table/Table";
import ChartComponent from "../../../components/users/chart/ChartComponent";
import LoadingSpinner from "../../../components/common-components/loadingSpinner/LoadingSpinner";
import { getUserById } from "../../../../services/userService";

const ViewUser = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const toast = useRef(null);

    const handleEdit = () => {
        navigate(`/users/edit-user/${userId}`);
    };

    // ✅ Status badge template like table.scss
    const getStatusBadge = (status) => {
        const className = status === "active" ? "Active"
            : status === "inactive" ? "Inactive"
                : status === "suspended" ? "suspended"
                    : "";
        return <span className={`status ${className}`}>{status}</span>;
    };

    useEffect(() => {
        if (!userId) return;

        setIsFetching(true);
        getUserById(userId)
            .then((data) => {
                const profileImage = data.profile_image
                    ? data.profile_image.startsWith("data:image")
                        ? data.profile_image
                        : `data:image/jpeg;base64,${data.profile_image}`
                    : "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg";

                setUserData({
                    username: data.username || "N/A",
                    fullname: data.full_name || "N/A",
                    email: data.email || "N/A",
                    phone: data.phone || "N/A",
                    address: data.address || "N/A",
                    city: data.city || "N/A",
                    role: data.role || "N/A",
                    status: data.status || "N/A",
                    joinedDate: data.created_at ? new Date(data.created_at).toLocaleDateString() : "N/A",
                    profileImage,
                });
            })
            .catch((err) => {
                console.error(err);
                toast.current.show({
                    severity: "error",
                    summary: "Error",
                    detail: "Failed to fetch user data",
                    life: 3000,
                });
            })
            .finally(() => setIsFetching(false));
    }, [userId]);

    if (isFetching || !userData) return <LoadingSpinner isLoading={true} />;

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
                                src={userData.profileImage}
                                alt="User"
                                className="viewUser-itemImg"
                            />
                            <div className="viewUser-details">
                                <h1 className="viewUser-itemTitle">{userData.fullname}</h1>

                                <div className="viewUser-detailItem">
                                    <span className="viewUser-itemKey">Username:</span>
                                    <span className="viewUser-itemValue">{userData.username}</span>
                                </div>
                                <div className="viewUser-detailItem">
                                    <span className="viewUser-itemKey">Email:</span>
                                    <span className="viewUser-itemValue">{userData.email}</span>
                                </div>
                                <div className="viewUser-detailItem">
                                    <span className="viewUser-itemKey">Phone:</span>
                                    <span className="viewUser-itemValue">{userData.phone}</span>
                                </div>
                                <div className="viewUser-detailItem">
                                    <span className="viewUser-itemKey">Address:</span>
                                    <span className="viewUser-itemValue">{userData.address}</span>
                                </div>
                                <div className="viewUser-detailItem">
                                    <span className="viewUser-itemKey">City:</span>
                                    <span className="viewUser-itemValue">{userData.city}</span>
                                </div>
                                <div className="viewUser-detailItem">
                                    <span className="viewUser-itemKey">Role:</span>
                                    <span className="viewUser-itemValue">{userData.role}</span>
                                </div>
                                <div className="viewUser-detailItem">
                                    <span className="viewUser-itemKey">Status:</span>
                                    <span className="viewUser-itemValue">{getStatusBadge(userData.status)}</span>
                                </div>
                                <div className="viewUser-detailItem">
                                    <span className="viewUser-itemKey">Joined Date:</span>
                                    <span className="viewUser-itemValue">{userData.joinedDate}</span>
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
