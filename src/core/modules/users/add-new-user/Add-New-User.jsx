import React, { useState } from "react";
import './Add-New-User.scss';
import Navbar from "../../../components/common-components/navbar/navbar";
import Sidebar from "../../../components/common-components/sidebar/sidebar";
import Breadcrumb from "../../../components/common-components/breadcrumb/Breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

// Example userInputs array (Replace with dynamic data if needed)
export const userInputs = [
    { id: 1, label: "Username", type: "text", placeholder: "Jhon Doe" },
    { id: 2, label: "Fullname", type: "text", placeholder: "Jhon Doe" },
    { id: 3, label: "Email", type: "email", placeholder: "jhon_doe@gmail.com" },
    { id: 4, label: "Phone", type: "text", placeholder: "+91 65455 64646" },
    { id: 5, label: "Password", type: "password", placeholder: "" },
    { id: 6, label: "Address", type: "text", placeholder: "Elton ST. 213 NewYork" },
    { id: 7, label: "Country", type: "text", placeholder: "USA" },
];

const New = () => {
    const [file, setFile] = useState(null);
    console.log(file);

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <Breadcrumb
                    items={[
                        { label: 'Dashboard', url: '/' },
                        { label: 'Users List', url: '/users' },
                        { label: 'Add User' }
                    ]}
                />
                <div className="newTop">
                    <h1>Add New User</h1>
                </div>
                <div className="newBottom">
                    <div className="left">
                        <img
                            src={file ? URL.createObjectURL(file) : "https://via.placeholder.com/100"}
                            alt="User Avatar"
                        />
                    </div>
                    <div className="right">
                        <form>
                            <div className="formInput">
                                <label htmlFor="file">
                                    Image: <FontAwesomeIcon icon={faUpload} className="icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    style={{ display: "none" }}
                                />
                            </div>

                            {/* Mapping over userInputs array */}
                            {userInputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input
                                        type={input.type}
                                        placeholder={input.placeholder}
                                    />
                                </div>
                            ))}

                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default New;
