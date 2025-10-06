import React from "react";
import './Users-List.scss'
import Navbar from "../../../components/common-components/navbar/navbar";
import Sidebar from "../../../components/common-components/sidebar/sidebar";
import BreadcrumbReact from "../../../components/common-components/breadcrumb/Breadcrumb";
import DataTable from "../../../components/users/datatable/DataTable"

const UserList = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <BreadcrumbReact
                    items={[
                        { label: 'Dashboard', url: '/dashboard/admin-dashboard' },
                        { label: 'User List' },
                    ]}
                />

                <DataTable />
            </div>
        </div>
    )
}
export default UserList