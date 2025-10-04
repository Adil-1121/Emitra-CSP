import React from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './breadcrumb.scss';

const BreadcrumbReact = ({ items }) => {
    const navigate = useNavigate();

    const model = items.map((item, index) => {
        const isLast = index === items.length - 1;

        return {
            label: item.label,
            command: !isLast && item.url ? () => navigate(item.url) : undefined,
            className: isLast ? 'p-disabled' : '',
        };
    });

    const separator = <FontAwesomeIcon icon={faChevronRight} className="custom-separator-icon" />;

    return (
        <div className="breadcrumb-wrapper-prime">
            <BreadCrumb
                model={model}
                className="prime-breadcrumb-custom"
                separator={separator}
            />
        </div>
    );
};

export default BreadcrumbReact;
