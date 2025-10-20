import React, { useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

import './login.scss';

export default function Login() {
    const toast = useRef(null);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'All fields are required.',
                life: 3000
            });
            return;
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                toast.current.show({
                    severity: 'error',
                    summary: 'Login Failed',
                    detail: data.message || "Invalid credentials",
                    life: 3000
                });
                return;
            }

            // ✅ Corrected line
            localStorage.setItem("token", data.token);
            localStorage.setItem("userName", data.user.full_name);

            toast.current.show({
                severity: 'success',
                summary: 'Login Successful',
                detail: 'Welcome back!',
                life: 2000
            });

            setTimeout(() => navigate("/dashboard/admin-dashboard"), 2000);

        } catch (err) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Something went wrong!',
                life: 3000
            });
            console.error(err);
        }
    };



    return (
        <div className="login-container">
            <Toast ref={toast} />

            <div className="left-panel">
                <h2>Hello, Welcome!</h2>
                <p>Don't have an account?</p>
                <Button
                    label="Register"
                    className="p-button-outlined register-btn"
                    onClick={() => navigate('/register')}
                />
            </div>

            <div className="right-panel">
                <div className="login-box">
                    <h2>Login</h2>

                    <div className="input-group floating-label">
                        <label htmlFor="email">Email<span className="required">*</span></label>
                        <span className="p-input-icon-left full-width">
                            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                            <InputText
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="full-width purple-input"
                            />
                        </span>
                    </div>

                    <div className="input-group floating-label">
                        <label htmlFor="password">Password<span className="required">*</span></label>
                        <span className="p-input-icon-left full-width password-wrapper">
                            <FontAwesomeIcon icon={faLock} className="input-icon" />
                            <InputText
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="full-width purple-input"
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </button>
                        </span>
                    </div>

                    <div className="remember-forgot-container">
                        <label className="remember-me">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                            />
                            Remember me
                        </label>
                        <p className="forgot-password" onClick={() => navigate('/forgot-password')}>
                            Forgot password?
                        </p>
                    </div>

                    <Button label="Login" className="login-btn" onClick={handleLogin} />

                    <p className="social-login-text">or login with social platforms</p>

                    <div className="social-icons">
                        <FontAwesomeIcon icon={faGoogle} />
                        <FontAwesomeIcon icon={faFacebookF} />
                        <FontAwesomeIcon icon={faGithub} />
                        <FontAwesomeIcon icon={faLinkedinIn} />
                    </div>
                </div>
            </div>
        </div>
    );
}
