import React, { useState } from "react";
import "./serviceActivityTable.scss";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

// Dummy activity data based on servicesRows
const ServiceActivityTable = () => {
    const [data] = useState([
        {
            id: 1,
            serviceTitle: "Electricity Bill Payment",
            updatedBy: "Admin",
            updatedDate: "2025-10-03 10:15 AM",
            titleChange: "Added Auto-Pay feature",
            descriptionChange: "Users can now schedule recurring payments",
            duration: "1 hour",
        },
        {
            id: 2,
            serviceTitle: "Money Transfer",
            updatedBy: "Admin",
            updatedDate: "2025-10-02 03:45 PM",
            titleChange: "Updated UPI Integration",
            descriptionChange: "Faster processing and added error handling",
            duration: "2 hours",
        },
        {
            id: 3,
            serviceTitle: "Aadhar & PAN Services",
            updatedBy: "Admin",
            updatedDate: "2025-09-30 11:10 AM",
            titleChange: "Improved Document Validation",
            descriptionChange: "Added new verification rules for PAN linking",
            duration: "1 hour 30 min",
        },
        {
            id: 4,
            serviceTitle: "Government Schemes",
            updatedBy: "Admin",
            updatedDate: "2025-09-28 09:00 AM",
            titleChange: "Added New Schemes",
            descriptionChange: "Integrated new central government schemes",
            duration: "3 hours",
        },
        {
            id: 5,
            serviceTitle: "Ration & Labour Registration",
            updatedBy: "Admin",
            updatedDate: "2025-09-27 02:20 PM",
            titleChange: "UI Improvements",
            descriptionChange: "Simplified form layout for easier registration",
            duration: "45 min",
        },
        {
            id: 6,
            serviceTitle: "Driving License Renewal",
            updatedBy: "Admin",
            updatedDate: "2025-09-25 12:00 PM",
            titleChange: "Fixed Validation Errors",
            descriptionChange: "Corrected issues with date input and document upload",
            duration: "1 hour",
        },
        {
            id: 7,
            serviceTitle: "Birth & Death Certificates",
            updatedBy: "Admin",
            updatedDate: "2025-09-24 11:30 AM",
            titleChange: "Added Digital Signature",
            descriptionChange: "Certificates now come with verified digital signatures",
            duration: "2 hours 15 min",
        },
        {
            id: 8,
            serviceTitle: "Mobile & DTH Recharge",
            updatedBy: "Admin",
            updatedDate: "2025-09-23 09:45 AM",
            titleChange: "Added Auto-Topup Option",
            descriptionChange: "Users can now enable automatic balance top-ups",
            duration: "1 hour 30 min",
        },
    ]);

    return (
        <div className="serviceTable">
            <DataTable value={data} paginator rows={5} responsiveLayout="scroll">
                <Column field="id" header="ID" sortable></Column>
                <Column field="serviceTitle" header="Service Title" sortable></Column>
                <Column field="updatedBy" header="Updated By" sortable></Column>
                <Column field="updatedDate" header="Date & Time" sortable></Column>
                <Column field="titleChange" header="Title Change" sortable></Column>
                <Column field="descriptionChange" header="Description Change" sortable></Column>
                <Column field="duration" header="Duration" sortable></Column>
            </DataTable>
        </div>
    );
};

export default ServiceActivityTable;
