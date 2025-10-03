import React, { useState } from "react";
import "./table.scss";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faClock, faSort } from "@fortawesome/free-solid-svg-icons";

const List = () => {
    const [globalFilter] = useState(null);

    const rows = [
        { id: 1143155, product: "Acer Nitro 5", img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg", customer: "Ahmed Khan", date: "1 March", amount: 785, method: "Cash on Delivery", status: "Approved" },
        { id: 2235235, product: "Playstation 5", img: "https://m.media-amazon.com/images/I/619BkvKW35L._AC_UY327_FMwebp_QL65_.jpg", customer: "Fatima Ali", date: "2 March", amount: 900, method: "Online Payment", status: "Pending" },
        { id: 2342353, product: "Redragon S101", img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg", customer: "Mohammed Yusuf", date: "5 March", amount: 35, method: "Cash on Delivery", status: "Pending" },
        { id: 2357741, product: "Razer Blade 15", img: "https://m.media-amazon.com/images/I/81aV5iU4G2L._AC_UY327_FMwebp_QL65_.jpg", customer: "Ayesha Siddiqui", date: "10 March", amount: 920, method: "Online Payment", status: "Approved" },
        { id: 2342355, product: "ASUS ROG Strix", img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg", customer: "Omar Farooq", date: "15 March", amount: 2000, method: "Online Payment", status: "Pending" },
    ];

    const productBodyTemplate = (rowData) => (
        <div className="cellWrapper">
            <img src={rowData.img} alt={rowData.product} className="image" />
            {rowData.product}
        </div>
    );

    const statusBodyTemplate = (rowData) => (
        <Tag
            value={rowData.status}
            icon={rowData.status === "Approved" ? <FontAwesomeIcon icon={faCheckCircle} /> : <FontAwesomeIcon icon={faClock} />}
            severity={rowData.status === "Approved" ? "success" : "warning"}
            className={`status ${rowData.status}`}
        />
    );



    return (
        <div className="table">
            <DataTable
                value={rows}
                responsiveLayout="scroll"
                globalFilter={globalFilter}
                sortMode="multiple"
            >
                <Column field="id" header="Track Id" sortable sortIcon={<FontAwesomeIcon icon={faSort} />} filter filterPlaceholder="Search by ID" />
                <Column header="Product" body={productBodyTemplate} sortable sortIcon={<FontAwesomeIcon icon={faSort} />} filter filterPlaceholder="Search Product" />
                <Column field="customer" header="Customer" sortable sortIcon={<FontAwesomeIcon icon={faSort} />} filter filterPlaceholder="Search Customer" />
                <Column field="date" header="Date" sortable sortIcon={<FontAwesomeIcon icon={faSort} />} filter filterPlaceholder="Search Date" />
                <Column field="amount" header="Amount" sortable sortIcon={<FontAwesomeIcon icon={faSort} />} filter filterPlaceholder="Search Amount" />
                <Column field="method" header="Payment Method" sortable sortIcon={<FontAwesomeIcon icon={faSort} />} filter filterPlaceholder="Search Method" />
                <Column header="Status" body={statusBodyTemplate} sortable sortIcon={<FontAwesomeIcon icon={faSort} />} filter filterPlaceholder="Search Status" />
            </DataTable>
        </div>
    );
};

export default List;
