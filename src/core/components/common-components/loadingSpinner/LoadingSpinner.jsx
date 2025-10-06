// src/components/common/LoadingSpinner.js
import React from 'react';
import { Audio } from 'react-loader-spinner';
import './LoadingSpinner.scss';

const LoadingSpinner = ({ isLoading }) => {
    return (
        isLoading && (
            <div className="loading-overlay">
                <Audio
                    height="80"
                    width="80"
                    radius="9"
                    color="green"
                    ariaLabel="loading"
                    wrapperStyle={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                    }}
                />
            </div>
        )
    );
};

export default LoadingSpinner;
