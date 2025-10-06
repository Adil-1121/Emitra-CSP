import React from "react";
import "./quickContact.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faPhone, faHeadset } from "@fortawesome/free-solid-svg-icons";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

const QuickContact = () => {
    return (
        <Card className="quickContact">
            <div className="header">
                <FontAwesomeIcon icon={faHeadset} className="headphoneIcon" />
                <h3 className="title">Quick Contact</h3>
            </div>

            <div className="contactOption">
                <div className="icon whatsapp">
                    <FontAwesomeIcon icon={faWhatsapp} />
                </div>
                <div className="info">
                    <h4>WhatsApp Support</h4>
                    <p>Get instant help via WhatsApp</p>
                    <Button
                        label="Chat Now"
                        className="p-button-success chatBtn"
                        onClick={() => window.open("https://wa.me/919929151471", "_blank")}
                    />
                </div>
            </div>

            <div className="contactOption">
                <div className="icon call">
                    <FontAwesomeIcon icon={faPhone} />
                </div>
                <div className="info">
                    <h4>Call Support</h4>
                    <p>Speak directly with our team</p>
                    <Button
                        label="+91 9929151471"
                        className="p-button-info callBtn"
                        onClick={() => (window.location.href = "tel:+919929151471")}
                    />
                </div>
            </div>
        </Card>
    );
};

export default QuickContact;
