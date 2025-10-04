import React, { useState } from "react";
import "./table.scss";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const UserActivityTable = () => {
    const [data] = useState([
        { id: 1, lastLogin: "2025-10-03 09:15 AM", ip: "192.168.0.2", device: "Chrome - Windows", status: "Success", location: "New York, USA" },
        { id: 2, lastLogin: "2025-10-02 07:45 PM", ip: "192.168.0.5", device: "Firefox - Mac", status: "Failed", location: "New York, USA" },
        { id: 3, lastLogin: "2025-09-30 08:10 AM", ip: "192.168.0.10", device: "Mobile Safari - iPhone", status: "Pending", location: "New York, USA" },
        { id: 4, lastLogin: "2025-09-28 10:30 AM", ip: "192.168.0.15", device: "Edge - Windows", status: "Success", location: "New York, USA" },
    ]);

    const statusBodyTemplate = (rowData) => (
        <span className={`status ${rowData.status}`}>
            {rowData.status}
        </span>
    );

    return (
        <div className="table">
            <DataTable value={data} paginator rows={5} responsiveLayout="scroll">
                <Column field="lastLogin" header="Last Login" sortable filter></Column>
                <Column field="ip" header="IP Address" sortable filter></Column>
                <Column field="device" header="Device / Browser" sortable filter></Column>
                <Column header="Status" body={statusBodyTemplate} sortable filter></Column>
                <Column field="location" header="Location" sortable filter></Column>
            </DataTable>
        </div>
    );
};

export default UserActivityTable;
