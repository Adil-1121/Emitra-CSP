import React, { useState } from "react";
import "./faq.scss";
import { Card } from "primereact/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const FAQ = () => {
    const [open, setOpen] = useState(null);

    const toggle = (index) => {
        setOpen(open === index ? null : index);
    };

    const faqList = [
        { question: "How do I reset my password?", answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page. You'll receive an email with instructions to reset your password." },
        {
            question: "How can I add new user to Admin Panel Access?",
            answer: "Navigate to the Users page in the Admin Panel, click on 'Add New User', fill in all the required information such as name, email, role, and permissions, and then click 'Save' to add the new user successfully."
        },
        { question: "How do I generate reports?", answer: "Go to the Reports section in the main menu. You can generate various reports including sales, purchase, inventory, and financial reports." },
    ];

    return (
        <Card className="faq">
            <h3 className="title">Frequently Asked Questions</h3>
            {faqList.map((item, index) => (
                <div key={index} className={`faqItem ${open === index ? "open" : ""}`}>
                    <div className="faqQuestion" onClick={() => toggle(index)}>
                        <span>{item.question}</span>
                        <FontAwesomeIcon icon={faChevronDown} className={`icon ${open === index ? "rotate" : ""}`} />
                    </div>
                    {open === index && <div className="faqAnswer">{item.answer}</div>}
                </div>
            ))}
        </Card>
    );
};

export default FAQ;
