import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../assets/Sign-up-in.css';
import axios from "axios";

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', { email, password });
            const { token, role } = response.data.data; // Assuming your API returns these

            onLogin(token, role);

            // Redirect based on role
            if (role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/profile'); // Change this to your profile route
            }
        } catch (error) {
            console.error('Login failed:', error);
            // Handle error (show message, etc.)
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-heading">Sign In</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <input
                    type="email"
                    className="input-field"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="input-field"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="login-button">Log In</button>
            </form>
            <p>
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
};

export default LoginForm;
