import React from "react";
import './contactUs.scss'
import Navbar from "../../components/common-components/navbar/navbar";
import Sidebar from "../../components/common-components/sidebar/sidebar";
import BreadcrumbReact from "../../components/common-components/breadcrumb/Breadcrumb";
import QuickContact from "../../components/contact-us/quickContact/QuickContact";
import ContactForm from "../../components/contact-us/contactForm/ContactForm";
import FAQ from "../../components/contact-us/faq/FAQ";
import SupportInfo from "../../components/contact-us/supportInfo/SupportInfo";
const ContactUs = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <BreadcrumbReact
                    items={[
                        { label: 'Dashboard', url: '/dashboard/admin-dashboard' },
                        { label: 'Contact Us' },
                    ]}
                />
                <div className="contactGrid">
                    <div className="leftColumn">
                        <QuickContact />
                        <SupportInfo />
                    </div>
                    <div className="rightColumn">
                        <ContactForm />
                        <FAQ />
                    </div>
                </div>

            </div>
        </div>
    )
}
export default ContactUs