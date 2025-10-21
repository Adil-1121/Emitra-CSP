import React, { useState, useEffect, useRef } from "react";
import "./datatable.scss";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTrash, faEye, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import LoadingSpinner from "../../../components/common-components/loadingSpinner/LoadingSpinner";

// 👇 API service import
import { getAllUsers, deleteUser } from "../../../../services/userService";
import noImage from "../../../../assets/noImage.png";

const DataTableComponent = () => {
    const [data, setData] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const toast = useRef(null);

    // ✅ Fetch users from backend
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const response = await getAllUsers();
            setData(Array.isArray(response) ? response : []);
        } catch (error) {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: error.message || "Failed to fetch users",
                life: 3000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    // ✅ Confirm delete dialog
    const confirmDelete = (id) => {
        confirmDialog({
            message: "Are you sure you want to delete this user?",
            header: "Delete Confirmation",
            icon: "pi pi-exclamation-triangle",
            acceptLabel: "Yes",
            rejectLabel: "No",
            acceptClassName: "p-button-success custom-accept",
            rejectClassName: "p-button-danger custom-reject",
            accept: () => handleDelete(id),
        });
    };

    // ✅ Delete user
    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            toast.current.show({
                severity: "success",
                summary: "Deleted",
                detail: "User deleted successfully",
                life: 3000,
            });
            fetchUsers(); // Refresh list
        } catch (error) {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: error.message || "Failed to delete user",
                life: 3000,
            });
        }
    };

    // ✅ User Image + Name Template
    const userBodyTemplate = (rowData) => (
        <div className="cellWithImg">
            <img
                src={rowData.profile_image || noImage}
                alt={rowData.full_name}
                className="cellImg"
            />
            {rowData.full_name}
        </div>
    );

    // ✅ Status Template
    const statusBodyTemplate = (rowData) => (
        <div className={`cellWithStatus ${rowData.status}`}>{rowData.status}</div>
    );

    // ✅ Action Buttons
    const actionBodyTemplate = (rowData) => (
        <div className="cellAction">
            {/* View */}
            <Link
                to={`/users/view-user/${rowData.id}`}
                style={{ textDecoration: "none" }}
            >
                <Button
                    className="viewButton"
                    icon={<FontAwesomeIcon icon={faEye} />}
                    label="View"
                />
            </Link>

            {/* Edit */}
            <Link
                to={`/users/edit-user/${rowData.id}`}
                style={{ textDecoration: "none" }}
            >
                <Button
                    className="editButton"
                    icon={<FontAwesomeIcon icon={faEdit} />}
                    label="Edit"
                />
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

            {isLoading ? (
                <LoadingSpinner isLoading={isLoading} />
            ) : (
                <DataTable
                    value={data}
                    paginator
                    rows={9}
                    responsiveLayout="scroll"
                    globalFilter={globalFilter}
                    emptyMessage="No users found."
                >
                    <Column field="id" header="ID" sortable filter />
                    <Column field="full_name" header="Name" body={userBodyTemplate} sortable filter />
                    <Column field="email" header="Email" sortable filter />
                    <Column
                        field="created_at"
                        header="Joined"
                        body={(rowData) =>
                            new Date(rowData.created_at).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })
                        }
                        sortable filter
                    />
                    <Column field="status" header="Status" body={statusBodyTemplate} sortable filter />
                    <Column header="Action" body={actionBodyTemplate} />
                </DataTable>
            )}
        </div>
    );
};

export default DataTableComponent;
