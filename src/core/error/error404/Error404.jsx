import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Error404.scss';

const Error404 = () => {
    const navigate = useNavigate();

    return (
        <div className="error404-container">
            <h1 className="error404-code">404</h1>
            <h2 className="error404-message">Page Not Found</h2>
            <p className="error404-description">
                The page you're looking for doesn’t exist or might have been moved.
            </p>
            <button className="error404-button" onClick={() => navigate('/dashboard/admin-dashboard')}>
                Go to Home
            </button>
        </div>
    );
};

export default Error404;
