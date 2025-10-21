import React, { useState, useEffect, useRef } from "react";
import "./testimonialsDataTable.scss";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTrash, faEye, faEdit, faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { getAllTestimonials, deleteTestimonial } from "../../../services/testimonialService";
import LoadingSpinner from "../common-components/loadingSpinner/LoadingSpinner";
const TestimonialsDataTable = () => {
    const [data, setData] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const toast = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch testimonials on mount
    useEffect(() => {
        console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL);
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true); // 👈 Start loading
        try {
            const res = await getAllTestimonials();
            if (Array.isArray(res)) setData(res);
            else setData([]);
        } catch (err) {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: err.message || "Failed to fetch testimonials",
                life: 3000,
            });
        } finally {
            setIsLoading(false); // 👈 Stop loading after fetch completes
        }
    };


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

    // Delete single testimonial
    const handleDelete = async (id) => {
        try {
            await deleteTestimonial(id);
            toast.current.show({
                severity: "success",
                summary: "Deleted",
                detail: "Testimonial deleted successfully",
                life: 3000,
            });
            fetchData(); // refresh table after deletion
        } catch (err) {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: err.message || "Failed to delete testimonial",
                life: 3000,
            });
        }
    };

    // Client column with image
    const clientBodyTemplate = (rowData) => (
        <div className="cellWithImg">
            {rowData.image_url && (
                <img
                    src={`${import.meta.env.VITE_API_BASE_URL}${rowData.image_url}`}
                    alt={rowData.name}
                    className="cellImg"
                />
            )}
            {rowData.name}
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

    // Testimonial text
    const testimonialBodyTemplate = (rowData) => (
        <div className="testimonialText">
            {rowData.comment.length > 50
                ? `${rowData.comment.substring(0, 50)}...`
                : rowData.comment}
        </div>
    );
    // Status column
    const statusBodyTemplate = (rowData) => (
        <span className={`cellWithStatus ${rowData.status}`}>
            {rowData.status}
        </span>
    );


    // Actions column
    const actionBodyTemplate = (rowData) => (
        <div className="cellAction">
            <Link to={`/testimonials/view-testimonial/${rowData.id}`} style={{ textDecoration: "none" }}>
                <Button className="viewButton" icon={<FontAwesomeIcon icon={faEye} />} label="View" />
            </Link>
            <Link to={`/testimonials/edit-testimonial/${rowData.id}`} style={{ textDecoration: "none" }}>
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
            <Toast ref={toast} position="top-right" />
            <ConfirmDialog position="top" className="custom-confirm-dialog" />

            <div className="dataTableTitle">
                <h3>Testimonials List</h3>
                <div className="rightActions">
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

                    <Link to="/testimonials/add-testimonial" className="link">
                        <FontAwesomeIcon icon={faPlus} /> Add New Testimonial
                    </Link>
                </div>
            </div>


            {/* 👇 Spinner tab chalega jab API pending hogi */}
            {isLoading ? (
                <LoadingSpinner isLoading={isLoading} />
            ) : (
                <DataTable
                    value={data}
                    paginator
                    rows={9}
                    responsiveLayout="scroll"
                    globalFilter={globalFilter}
                    emptyMessage="No testimonials found."
                >
                    <Column field="id" header="ID" sortable filter />
                    <Column field="name" header="Client" body={clientBodyTemplate} sortable filter />
                    <Column field="city" header="City" sortable filter />
                    <Column field="rating" header="Rating" body={ratingBodyTemplate} sortable />
                    <Column field="comment" header="Review" body={testimonialBodyTemplate} sortable filter />
                    <Column field="status" header="Status" body={statusBodyTemplate} sortable filter />
                    <Column header="Action" body={actionBodyTemplate} />
                </DataTable>
            )}
        </div>
    );
};

export default TestimonialsDataTable;
