import React from "react";
import "./supportInfo.scss";
import { Card } from "primereact/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faMapMarkerAlt, faGlobe, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const SupportInfo = () => {
    return (
        <Card className="supportInfo">
            <div className="header">
                <FontAwesomeIcon icon={faInfoCircle} className="headerIcon" />
                Support Information
            </div>

            <div className="infoBox">
                <FontAwesomeIcon icon={faClock} className="icon" />
                <div>
                    <h4>Business Hours</h4>
                    <p>Monday – Friday: 9:00 AM – 6:00 PM</p>
                    <p>Saturday: 10:00 AM – 4:00 PM</p>
                    <p>Sunday: Closed</p>
                </div>
            </div>

            <div className="infoBox">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
                <div>
                    <h4>Visit Us</h4>
                    <p>Corporate Office: Chanda Colony, BIJAINAGR, Ajmer, Pincode - 305624</p>
                </div>
            </div>

            <div className="infoBox">
                <FontAwesomeIcon icon={faGlobe} className="icon" />
                <div>
                    <h4>Website</h4>
                    <a href="https://gn-emitra.netlify.app/" target="_blank" rel="noopener noreferrer">
                        https://gn-emitra.netlify.app/
                    </a>
                </div>
            </div>
        </Card>

    );
};

export default SupportInfo;
