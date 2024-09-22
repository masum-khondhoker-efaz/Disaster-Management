import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DonationPage from './pages/DonationPage.jsx';
import CrisisPage from "./pages/CrisisPage.jsx";
import VolunteersPage from "./pages/VolunteersPage.jsx";

import ProfilePage from "./pages/ProfilePage.jsx";
import AdminPage from "./pages/AdminPage.jsx"; // Ensure you have this

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('role');
        if (token) {
            setIsLoggedIn(true);
            setRole(userRole);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setIsLoggedIn(false);
        setRole(null);
    };

    const handleLogin = (token, userRole) => {
        localStorage.setItem('token', token);
        localStorage.setItem('role', userRole);
        setIsLoggedIn(true);
        setRole(userRole);
    };

    return (
        <Router>
            <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                <Route path="/donation" element={<DonationPage />} />
                <Route path="/crisesByList" element={<CrisisPage />} />
                <Route path="/available-volunteers" element={<VolunteersPage />} />
                <Route path="/admin/dashboard" element={isLoggedIn && role === 'admin' ? <AdminPage /> : <Navigate to="/" />} />
                <Route path="/profile" element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
