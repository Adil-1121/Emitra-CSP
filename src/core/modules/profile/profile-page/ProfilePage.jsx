import React from "react";
import "./profilePage.scss";

import ProfileDetails from "../../../components/profile/ProfileDetails/ProfileDetails";
import ProfileProgress from "../../../components/profile/ProfileProgress/ProfileProgress";
import AdminActions from "../../../components/profile/AdminActions/AdminActions";

const ProfilePage = () => {
    return (
        <div className="profile-page">
            <div className="profile-container">
                <div className="profile-content">
                    {/* Left column */}
                    <ProfileDetails />

                    {/* Right column */}
                    <div className="right-column">
                        <div className="right-progress">
                            <ProfileProgress />
                        </div>
                        <div className="admin-action-progress">
                            <AdminActions />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
