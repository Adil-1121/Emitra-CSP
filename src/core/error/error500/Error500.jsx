import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Error500.scss';

const Error500 = () => {
    const navigate = useNavigate();

    return (
        <div className="error500-container">
            <h1 className="error500-code">500</h1>
            <h2 className="error500-message">Internal Server Error</h2>
            <p className="error500-description">
                Something went wrong on our end. Please try again later.
            </p>
            <button className="error500-button" onClick={() => navigate('/')}>
                Back to Home
            </button>
        </div>
    );
};

export default Error500;
