import React from "react";
import './contactUs.scss'
import BreadcrumbReact from "../../components/common-components/breadcrumb/Breadcrumb";
import QuickContact from "../../components/contact-us/quickContact/QuickContact";
import ContactForm from "../../components/contact-us/contactForm/ContactForm";
import FAQ from "../../components/contact-us/faq/FAQ";
import SupportInfo from "../../components/contact-us/supportInfo/SupportInfo";
const ContactUs = () => {
    return (
        <div className="list">
            <div className="listContainer">
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