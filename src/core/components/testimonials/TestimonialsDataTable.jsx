import React, { useState } from "react";
import "./testimonialsDataTable.scss";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye, faEdit, faStar } from "@fortawesome/free-solid-svg-icons";
import { testimonialsRows } from "../../../testimonialDatatableSource";
const TestimonialsDataTable = () => {
    const [data, setData] = useState(testimonialsRows);

    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
    };

    const clientBodyTemplate = (rowData) => (
        <div className="cellWithImg">
            <img src={rowData.img} alt={rowData.clientName} className="cellImg" />
            {rowData.clientName}
        </div>
    );

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

    const statusBodyTemplate = (rowData) => (
        <div className={`cellWithStatus ${rowData.status}`}>{rowData.status}</div>
    );

    const testimonialBodyTemplate = (rowData) => (
        <div className="testimonialText">
            {rowData.testimonial.length > 50
                ? `${rowData.testimonial.substring(0, 50)}...`
                : rowData.testimonial}
        </div>
    );

    const actionBodyTemplate = (rowData) => (
        <div className="cellAction">
            <Link to="/portfolio/testimonials/single" style={{ textDecoration: "none" }}>
                <Button className="viewButton" icon={<FontAwesomeIcon icon={faEye} />} label="View" />
            </Link>
            <Link to={`/portfolio/testimonials/edit/${rowData.id}`} style={{ textDecoration: "none" }}>
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
                Testimonials Management
                <Link to="/portfolio/testimonials/new" className="link">
                    Add New
                </Link>
            </div>
            <DataTable value={data} paginator rows={9} responsiveLayout="scroll">
                <Column field="id" header="ID" sortable filter></Column>
                <Column header="Client" body={clientBodyTemplate} sortable filter></Column>
                <Column field="company" header="Company" sortable filter></Column>
                <Column header="Rating" body={ratingBodyTemplate} sortable></Column>
                <Column header="Testimonial" body={testimonialBodyTemplate} sortable filter></Column>
                {/* <Column header="Status" body={statusBodyTemplate} sortable filter></Column> */}
                <Column header="Action" body={actionBodyTemplate}></Column>
            </DataTable>
        </div>
    );
};

export default TestimonialsDataTable;