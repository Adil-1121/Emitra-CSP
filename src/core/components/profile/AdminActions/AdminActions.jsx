import React, { useRef } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faUnlockAlt,
    faUserShield,
    faBell,
    faUserPlus,
    faLock,
} from "@fortawesome/free-solid-svg-icons";
import "./AdminActions.scss";

const AdminActions = () => {
    const toast = useRef(null);

    const actions = [
        { label: "Delete Account", icon: faTrash, severity: "danger" },
        { label: "Reset Password", icon: faUnlockAlt, severity: "warning" },
        { label: "Suspend User", icon: faLock, severity: "danger" },
        { label: "Assign Role", icon: faUserShield, severity: "success" },
        { label: "Send Notification", icon: faBell, severity: "info" },
        { label: "Add to Group", icon: faUserPlus, severity: "success" },
    ];

    const handleAction = (action) => {
        if (action.label === "Delete Account") {
            // Show confirmation only for delete
            confirmDialog({
                message: `Are you sure you want to ${action.label}?`,
                header: "Confirmation",
                icon: "pi pi-exclamation-triangle",
                position: "top",
                acceptLabel: "Yes",
                rejectLabel: "No",
                acceptClassName: "p-button-success custom-accept",
                rejectClassName: "p-button-danger custom-reject",
                accept: () => {
                    toast.current.show({
                        severity: action.severity,
                        summary: `${action.label}`,
                        detail: `${action.label} executed successfully`,
                        life: 3000,
                    });
                },
                reject: () => {
                    toast.current.show({
                        severity: "info",
                        summary: "Cancelled",
                        detail: `${action.label} cancelled`,
                        life: 2000,
                    });
                },
            });
        } else {
            // Directly show toast for other actions
            toast.current.show({
                severity: action.severity,
                summary: `${action.label}`,
                detail: `${action.label} executed successfully`,
                life: 3000,
            });
        }
    };

    return (
        <Card className="admin-actions-card" title="Admin Actions">
            {/* Toast & ConfirmDialog */}
            <Toast ref={toast} position="top-right" />
            <ConfirmDialog position="top" className="custom-confirm-dialog" />

            <div className="actions-grid">
                {actions.map((action, index) => (
                    <Button
                        key={index}
                        className={`action-btn ${action.severity}`}
                        onClick={() => handleAction(action)}
                        icon={<FontAwesomeIcon icon={action.icon} />}
                        label={action.label}
                    />
                ))}
            </div>
        </Card>
    );
};

export default AdminActions;
