import React, { useState } from "react";
import "./datatable.scss";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { userRows } from "../../../../datatablesource";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye, faEdit } from "@fortawesome/free-solid-svg-icons";

const DataTableComponent = () => {
    const [data, setData] = useState(userRows);

    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
    };

    const userBodyTemplate = (rowData) => (
        <div className="cellWithImg">
            <img src={rowData.img} alt={rowData.userName} className="cellImg" />
            {rowData.userName}
        </div>
    );

    const statusBodyTemplate = (rowData) => (
        <div className={`cellWithStatus ${rowData.status}`}>{rowData.status}</div>
    );

    const actionBodyTemplate = (rowData) => (
        <div className="cellAction">
            <Link to="/users/single" style={{ textDecoration: "none" }}>
                <Button className="viewButton" icon={<FontAwesomeIcon icon={faEye} />} label="View" />
            </Link>
            <Link to={`/users/edit/${rowData.id}`} style={{ textDecoration: "none" }}>
                <Button className="editButton" icon={<FontAwesomeIcon icon={faEdit} />} label="Edit" />
            </Link>
            <Button
                className="deleteButton"
                icon={<FontAwesomeIcon icon={faTrash} />}
                label="Delete"
                onClick={() => handleDelete(rowData.id)}
            />
        </div>
    );

    return (
        <div className="datatable">
            <div className="dataTableTitle">
                Add New User
                <Link to="/users/new" className="link">
                    Add New
                </Link>
            </div>
            <DataTable value={data} paginator rows={9} responsiveLayout="scroll">
                <Column field="id" header="ID" sortable filter></Column>
                <Column header="User" body={userBodyTemplate} sortable filter></Column>
                <Column field="email" header="Email" sortable filter></Column>
                <Column field="age" header="Age" sortable filter></Column>
                <Column header="Status" body={statusBodyTemplate} sortable filter></Column>
                <Column header="Action" body={actionBodyTemplate}></Column>
            </DataTable>
        </div>
    );
};

export default DataTableComponent;
