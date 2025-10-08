import React, { useState } from "react";
import "./settingPage.scss";

import Navbar from "../../components/common-components/navbar/navbar";
import Sidebar from "../../components/common-components/sidebar/sidebar";
import Breadcrumb from "../../components/common-components/breadcrumb/Breadcrumb";

import SettingsSidebar from "../../components/settings/SettingsSidebar/SettingsSidebar";
import SettingsContent from "../../components/settings/SettingsContent/SettingsContent";

const SettingPage = () => {
    // Initial tab changed from "Integrations" to "My details"
    const [activeTab, setActiveTab] = useState("My details");

    return (
        <div className="settings-page">
            <Sidebar />
            <div className="settings-main">
                <Navbar />
                <Breadcrumb
                    items={[
                        { label: "Dashboard", url: "/dashboard/admin-dashboard" },
                        { label: "Settings" },
                    ]}
                />
                <div className="settings-body">
                    <div className="settings-layout card">
                        <div className="left-panel">
                            <SettingsSidebar activeTab={activeTab} onChange={setActiveTab} />
                        </div>

                        <div className="right-panel">
                            <SettingsContent activeTab={activeTab} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingPage;
