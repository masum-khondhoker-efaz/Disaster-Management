import { Link } from 'react-router-dom';
import '../assets/styles.css';

const Navbar = ({ isLoggedIn, onLogout }) => {
    const userRole = localStorage.getItem('role'); // Fetch user role from localStorage

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">Disaster Management</Link>
            </div>
            <div>
                <Link to="/">Home</Link>
                <Link to="/donation">Donations</Link>
                <Link to="/crisesByList">Crisis</Link>
                <Link to="/available-volunteers">Volunteers</Link>
                {isLoggedIn && userRole === 'admin' && (
                    <Link to="/admin/dashboard">Admin Dashboard</Link>
                )}
                {isLoggedIn && userRole === 'volunteer' && (
                    <Link to="/profile" className="nav-link">Profile</Link>
                )}
                {isLoggedIn ? (
                    <button onClick={onLogout} className="logout-button">Logout</button>
                ) : (
                    <>
                        <Link to="/register" className="nav-link">Register</Link>
                        <Link to="/login" className="nav-link">Login</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
