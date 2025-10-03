import React, { useState } from "react";
import "./table.scss";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons";

const List = () => {
    const [data, setData] = useState([
        {
            id: 1143155,
            product: "Acer Nitro 5",
            img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
            customer: "Ahmed Khan",
            date: "1 March",
            amount: 785,
            method: "Cash on Delivery",
            status: "Approved",
        },
        {
            id: 2235235,
            product: "Playstation 5",
            img: "https://m.media-amazon.com/images/I/619BkvKW35L._AC_UY327_FMwebp_QL65_.jpg",
            customer: "Fatima Ali",
            date: "2 March",
            amount: 900,
            method: "Online Payment",
            status: "Pending",
        },
        {
            id: 2342353,
            product: "Redragon S101",
            img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
            customer: "Mohammed Yusuf",
            date: "5 March",
            amount: 35,
            method: "Cash on Delivery",
            status: "Pending",
        },
        {
            id: 2357741,
            product: "Razer Blade 15",
            img: "https://m.media-amazon.com/images/I/81aV5iU4G2L._AC_UY327_FMwebp_QL65_.jpg",
            customer: "Ayesha Siddiqui",
            date: "10 March",
            amount: 920,
            method: "Online Payment",
            status: "Approved",
        },
        {
            id: 2342355,
            product: "ASUS ROG Strix",
            img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
            customer: "Omar Farooq",
            date: "15 March",
            amount: 2000,
            method: "Online Payment",
            status: "Pending",
        },
    ]);

    const productBodyTemplate = (rowData) => (
        <div className="cellWrapper">
            <img src={rowData.img} alt={rowData.product} className="image" />
            <span className="productName">{rowData.product}</span>
        </div>
    );

    const statusBodyTemplate = (rowData) => (
        <span className={`status ${rowData.status}`}>{rowData.status}</span>
    );

    const actionBodyTemplate = (rowData) => (
        <div className="cellAction">
            <Button
                className="viewButton"
                icon={<FontAwesomeIcon icon={faEye} />}
                label="View"
                onClick={() => console.log("View", rowData.id)}
            />
            <Button
                className="deleteButton"
                icon={<FontAwesomeIcon icon={faTrash} />}
                label="Delete"
                onClick={() => setData(data.filter((item) => item.id !== rowData.id))}
            />
        </div>
    );

    return (
        <div className="table">
            <DataTable value={data} paginator rows={5} responsiveLayout="scroll">
                <Column field="id" header="Track Id" sortable filter></Column>
                <Column header="Product" body={productBodyTemplate} sortable filter></Column>
                <Column field="customer" header="Customer" sortable filter></Column>
                <Column field="date" header="Date" sortable filter></Column>
                <Column field="amount" header="Amount" sortable filter></Column>
                <Column field="method" header="Payment Method" sortable filter></Column>
                <Column header="Status" body={statusBodyTemplate} sortable filter></Column>
                <Column header="Action" body={actionBodyTemplate}></Column>
            </DataTable>
        </div>
    );
};

export default List;
