import React from "react";
import './Users-List.scss'

import BreadcrumbReact from "../../../components/common-components/breadcrumb/Breadcrumb";
import DataTable from "../../../components/users/datatable/DataTable"

const UserList = () => {
    return (
        <div className="list">
            <div className="listContainer">
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