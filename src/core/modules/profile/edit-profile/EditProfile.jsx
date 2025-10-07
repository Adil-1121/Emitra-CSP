import React from "react";
import './editProfile.scss'
import Navbar from "../../../components/common-components/navbar/navbar";
import Sidebar from "../../../components/common-components/sidebar/sidebar";

const EditProfile = () => {
    return (
        <div className="list" >
            <Sidebar />
            < div className="listContainer" >
                <Navbar />


            </div>
        </div>
    )
}
export default EditProfile