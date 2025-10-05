import React, { useState, useRef } from "react";
import "./servicesDataTable.scss";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTrash, faEye, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { servicesRows } from "../../../../servicesData";

const ServicesDataTable = () => {
    const [data, setData] = useState(servicesRows);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef(null);

    // Confirm delete dialog
    const confirmDelete = (id) => {
        confirmDialog({
            message: 'Are you sure you want to delete this service?',
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
            detail: 'Service deleted successfully',
            life: 3000
        });
    };

    // Template for service column with image
    const serviceBodyTemplate = (rowData) => (
        <div className="cellWithImg">
            <img src={rowData.img} alt={rowData.title} className="cellImg" />
            {rowData.title}
        </div>
    );

    // Template for status column
    const statusBodyTemplate = (rowData) => (
        <div className={`cellWithStatus ${rowData.status}`}>{rowData.status}</div>
    );

    // Template for action column
    const actionBodyTemplate = (rowData) => (
        <div className="cellAction">
            <Link to={`/services/view-service/${rowData.id}`} style={{ textDecoration: "none" }}>
                <Button className="viewButton" icon={<FontAwesomeIcon icon={faEye} />} label="View" />
            </Link>

            <Link to={`/services/edit-service/${rowData.id}`} style={{ textDecoration: "none" }}>
                <Button className="editButton" icon={<FontAwesomeIcon icon={faEdit} />} label="Edit" />
            </Link>

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
                <h3>Services List</h3>
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
                    <Link to="/services/add-service" className="link">
                        <FontAwesomeIcon icon={faPlus} /> Add New Service
                    </Link>
                </div>
            </div>

            <DataTable
                value={data}
                paginator
                rows={8}
                responsiveLayout="scroll"
                globalFilter={globalFilter}
                emptyMessage="No services found."
            >
                <Column field="id" header="ID" sortable filter></Column>
                <Column header="Service" body={serviceBodyTemplate} sortable filter></Column>
                <Column field="description" header="Description" sortable filter></Column>
                <Column field="addedDate" header="Added Date" sortable filter></Column>
                <Column header="Status" body={statusBodyTemplate} sortable filter></Column>
                <Column header="Action" body={actionBodyTemplate}></Column>
            </DataTable>

        </div>
    );
};

export default ServicesDataTable;
