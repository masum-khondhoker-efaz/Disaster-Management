import { Link, useNavigate } from 'react-router-dom';
import '../assets/Sign-up-in.css';
import { useState } from "react";
import { registerUser } from "../api/auth.js";

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Use useNavigate for redirection

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        const userData = { name, email, password };

        try {
            const result = await registerUser(userData);
            if (result.status === 'Failed') {
                setErrorMessage(result.message); // Show the error message from the server
            } else {
                console.log(result); // Handle success
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                navigate('/login'); // Redirect to login page
            }
        } catch (error) {
            console.error(error); // Handle error
            setErrorMessage('An unexpected error occurred.'); // Generic error message
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-heading">Sign Up</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form className="register-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Full Name"
                    className="input-field"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="input-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="input-field"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit" className="register-button">Sign Up</button>
            </form>
            <div className="login-link">
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default RegisterForm;
