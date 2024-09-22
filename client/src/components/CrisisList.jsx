import { useState, useEffect } from 'react';
import axios from 'axios';

const CrisisList = () => {
    const [crises, setCrises] = useState([]);
    const [filterSeverity, setFilterSeverity] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCrises();
    }, [filterSeverity]);

    const fetchCrises = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('http://localhost:8000/api/crisesByList');
            const filteredCrises = response.data.data
                .filter(crisis => filterSeverity ? crisis.severity === filterSeverity : true)
                .map(crisis => ({
                    ...crisis
                }));

            console.log(filteredCrises);

            setCrises(filteredCrises);
        } catch (error) {
            setError('Error fetching crises. Please try again later.');
            console.error('Error fetching crises:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="crisis-page-container">
            <h1>All Crisis</h1>

            {/* Filter Section */}
            <div className="filter-section">
                <label htmlFor="severity">Filter by Severity: </label>
                <select
                    id="severity"
                    value={filterSeverity}
                    onChange={(e) => setFilterSeverity(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="1">1 - Low</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5 - High</option>
                </select>
            </div>

            {/* Loading or Error Message */}
            {loading ? (
                <p>Loading crises...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div className="crisis-list">
                    {crises.length ? (
                        crises.map((crisis) => (
                            <div className = "crisis-card" key = {crisis._id} >
                                <img src = {`http://localhost:8000/uploads/${crisis.image}`} alt = "Crisis" />
                                <h3 >{crisis.title}</h3 >
                                <p ><strong >Location:</strong > {crisis.location}</p >
                                <p ><strong >Description:</strong > {crisis.description}</p >
                                <p ><strong >Severity:</strong > {crisis.severity}</p >
                                <p ><strong >Help Required:</strong > {crisis.requiredHelp}</p >
                                <p ><strong >Date:</strong > {new Date(crisis.createdAt).toLocaleDateString()}</p >
                            </div >
                        ))
                    ) : (
                        <p >No crises found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default CrisisList;
