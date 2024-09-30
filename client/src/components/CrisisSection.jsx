import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../assets/CrisisSection.css';

const CrisisSection = () => {
    const [crises, setCrises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCrises = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/crisesByList');
                if (response.data.status === 'Success') {
                    setCrises(response.data.data);
                } else {
                    setError('Failed to fetch crises.');
                }
            } catch (error) {
                setError('Error fetching crises: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCrises();
    }, []);

    if (loading) {
        return <p>Loading crises...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="crisis-section">
            <h2>Recent Crises</h2>
            <div className="crisis-grid">
                {crises.length > 0 ? (
                    crises.map((crisis) => (
                        <div className="crisis-card" key={crisis._id}>
                            <img src = {`/uploads/${crisis.image}`} alt = "Crisis" />
                            <div className = "crisis-details" >
                                <strong >{crisis.title}</strong>
                                <p>Location: {crisis.location}</p>
                                <p>Description: {crisis.description}</p>
                                <p>Severity: {crisis.severity}</p>
                                <p>Required Help: {crisis.requiredHelp}</p>
                                <p>Created At: {crisis.createdAt}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No recent crises available.</p>
                )}
            </div>
            <div className="button-container">
                <Link to="/crisesByList" className="button">All Crisis</Link>
            </div>
        </div>
    );
};

export default CrisisSection;
