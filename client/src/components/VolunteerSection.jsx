import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../assets/VolunteerSection.css';

const VolunteerSection = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVolunteers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/volunteers/approved');
                if (response.data.status === 'Success') {
                    setVolunteers(response.data.data);
                } else {
                    setError('Failed to fetch volunteers.');
                }
            } catch (error) {
                setError('Error fetching volunteers: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchVolunteers();
    }, []);

    if (loading) {
        return <p>Loading volunteers...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="volunteer-section">
            <h2>Available Volunteers</h2>
            <div className="volunteer-grid">
                {volunteers.length > 0 ? (
                    volunteers.map((volunteer) => (
                        <div className="volunteer-card" key={volunteer._id}>
                            <img src="https://via.placeholder.com/100" alt={volunteer.name} className="volunteer-image" />
                            <div className="volunteer-details">
                                <strong>{volunteer.name}</strong>
                                <p>Email: {volunteer.email}</p>
                                <p>Role: {volunteer.role}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No available volunteers.</p>
                )}
            </div>
            <div className="button-container">
                <Link to="/available-volunteers" className="button">All available volunteer</Link>
            </div>
        </div>
    );
};

export default VolunteerSection;
