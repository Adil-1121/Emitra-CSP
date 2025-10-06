import React, { useState, useRef } from "react";
import "./testimonialsDataTable.scss";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faTrash,
    faEye,
    faEdit,
    faPlus,
    faStar,
} from "@fortawesome/free-solid-svg-icons";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { testimonialsRows } from "../../../testimonialDatatableSource";

const TestimonialsDataTable = () => {
    const [data, setData] = useState(testimonialsRows);
    const [globalFilter, setGlobalFilter] = useState("");
    const toast = useRef(null);

    // Confirm delete dialog
    const confirmDelete = (id) => {
        confirmDialog({
            message: "Are you sure you want to delete this testimonial?",
            header: "Delete Confirmation",
            icon: "pi pi-exclamation-triangle",
            acceptLabel: "Yes",
            rejectLabel: "No",
            acceptClassName: "p-button-success custom-accept",
            rejectClassName: "p-button-danger custom-reject",
            accept: () => handleDelete(id),
        });
    };

    // Delete handler
    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
        toast.current.show({
            severity: "success",
            summary: "Deleted",
            detail: "Testimonial deleted successfully",
            life: 3000,
        });
    };

    // Client column with image
    const clientBodyTemplate = (rowData) => (
        <div className="cellWithImg">
            <img
                src={rowData.img}
                alt={rowData.clientName}
                className="cellImg"
            />
            {rowData.clientName}
        </div>
    );

    // Rating stars
    const ratingBodyTemplate = (rowData) => (
        <div className="cellWithRating">
            {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    className={i < rowData.rating ? "star-filled" : "star-empty"}
                />
            ))}
        </div>
    );

    // Testimonial text trim
    const testimonialBodyTemplate = (rowData) => (
        <div className="testimonialText">
            {rowData.testimonial.length > 50
                ? `${rowData.testimonial.substring(0, 50)}...`
                : rowData.testimonial}
        </div>
    );

    // Actions
    const actionBodyTemplate = (rowData) => (
        <div className="cellAction">
            {/* View */}
            <Link
                to={`/testimonials/view-testimonial/${rowData.id}`}
                style={{ textDecoration: "none" }}
            >
                <Button
                    className="viewButton"
                    icon={<FontAwesomeIcon icon={faEye} />}
                    label="View"
                />
            </Link>

            {/* Edit */}
            <Link to={`/testimonials/edit-testimonial/${rowData.id}`} style={{ textDecoration: "none" }}>
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
                <h3>Testimonials List</h3>
                <div className="rightActions">
                    {/* Search */}
                    <div className="searchContainer">
                        <FontAwesomeIcon icon={faSearch} className="searchIcon" />
                        <input
                            type="text"
                            className="searchInput"
                            placeholder="Search testimonials..."
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                        />
                    </div>

                    {/* Add New */}
                    <Link to="/testimonials/add-testimonial" className="link">
                        <FontAwesomeIcon icon={faPlus} /> Add New Testimonial
                    </Link>
                </div>
            </div>

            <DataTable
                value={data}
                paginator
                rows={9}
                responsiveLayout="scroll"
                globalFilter={globalFilter}
                emptyMessage="No testimonials found."
            >
                <Column field="id" header="ID" sortable filter />
                <Column
                    header="Client"
                    body={clientBodyTemplate}
                    sortable
                    filter
                />
                <Column field="company" header="Company" sortable filter />
                <Column header="Rating" body={ratingBodyTemplate} sortable />
                <Column
                    header="Testimonial"
                    body={testimonialBodyTemplate}
                    sortable
                    filter
                />
                <Column header="Action" body={actionBodyTemplate} />
            </DataTable>
        </div>
    );
};

export default TestimonialsDataTable;
