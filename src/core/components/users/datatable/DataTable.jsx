import React, { useState, useRef } from "react";
import "./datatable.scss";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { userRows } from "../../../../datatablesource";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTrash, faEye, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

const DataTableComponent = () => {
    const [data, setData] = useState(userRows);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef(null);

    // Confirm delete dialog
    const confirmDelete = (id) => {
        confirmDialog({
            message: 'Are you sure you want to delete this user?',
            header: 'Delete Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Yes',
            rejectLabel: 'No',
            acceptClassName: 'p-button-success custom-accept',
            rejectClassName: 'p-button-danger custom-reject',
            accept: () => handleDelete(id)
        });
    };

    // Delete handler
    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
        toast.current.show({
            severity: 'success',
            summary: 'Deleted',
            detail: 'User deleted successfully',
            life: 3000
        });
    };

    // Template for user column with image
    const userBodyTemplate = (rowData) => (
        <div className="cellWithImg">
            <img src={rowData.img} alt={rowData.userName} className="cellImg" />
            {rowData.userName}
        </div>
    );

    // Template for status column
    const statusBodyTemplate = (rowData) => (
        <div className={`cellWithStatus ${rowData.status}`}>{rowData.status}</div>
    );

    // Template for action column
    const actionBodyTemplate = (rowData) => (
        <div className="cellAction">
            {/* View */}
            <Link to={`/users/view-user/${rowData.id}`} style={{ textDecoration: "none" }}>
                <Button className="viewButton" icon={<FontAwesomeIcon icon={faEye} />} label="View" />
            </Link>

            {/* Edit */}
            <Link to={`/users/edit-user/${rowData.id}`} style={{ textDecoration: "none" }}>
                <Button className="editButton" icon={<FontAwesomeIcon icon={faEdit} />} label="Edit" />
            </Link>

            {/* Delete */}
            <Button
                className="deleteButton"
                icon={<FontAwesomeIcon icon={faTrash} />}
                label="Delete"
                onClick={() => confirmDelete(rowData.id)}
            />
        </div>
    );

    return (
        <div className="datatable">
            {/* Toast & ConfirmDialog */}
            <Toast ref={toast} position="top-right" />
            <ConfirmDialog position="top" className="custom-confirm-dialog" />

            <div className="dataTableTitle">
                <h3>Users List</h3>
                <div className="rightActions">
                    <div className="searchContainer">
                        <FontAwesomeIcon icon={faSearch} className="searchIcon" />
                        <input
                            type="text"
                            className="searchInput"
                            placeholder="Search here..."
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                        />
                    </div>
                    <Link to="/users/add-user" className="link">
                        <FontAwesomeIcon icon={faPlus} /> Add New User
                    </Link>
                </div>
            </div>

            <DataTable
                value={data}
                paginator
                rows={9}
                responsiveLayout="scroll"
                globalFilter={globalFilter}
                emptyMessage="No users found."
            >
                <Column field="id" header="ID" sortable filter></Column>
                <Column header="Name" body={userBodyTemplate} sortable filter></Column>
                <Column field="email" header="Email" sortable filter></Column>
                <Column
                    field="date"
                    header="Joined"
                    body={(rowData) =>
                        new Date(rowData.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                        })
                    }
                    sortable
                    filter
                ></Column>
                <Column header="Status" body={statusBodyTemplate} sortable filter></Column>
                <Column header="Action" body={actionBodyTemplate}></Column>
            </DataTable>
        </div>
    );
};

export default DataTableComponent;
