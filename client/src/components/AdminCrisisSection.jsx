import { useEffect, useState } from "react";
import axios from "axios";
import '../assets/AdminCrisisSection.css';

const AdminCrisisSection = () => {
    const [crises, setCrises] = useState([]);
    const [error, setError] = useState("");

    // Fetch crises with pending status
    const fetchCrises = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("/api/adminCrisesByList", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCrises(response.data.data.filter(crisis => crisis.status === 'pending'));
        } catch (err) {
            setError("Error fetching pending crises.");
            console.error(err);
        }
    };

    // Approve a crisis
    const handleApprove = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(`/api/approve-crises/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchCrises(); // Refresh the crisis list
        } catch (err) {
            console.error("Error approving crisis:", err);
        }
    };

    // Reject a crisis (remove it)
    const handleReject = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(`/api/delete-crisis/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchCrises(); // Refresh the crisis list
        } catch (err) {
            console.error("Error rejecting crisis:", err);
        }
    };

    useEffect(() => {
        fetchCrises();
    }, []);

    return (
        <div>
            <h2>Pending Crises</h2>
            {error && <p className="error-message">{error}</p>}
            <ul>
                {crises.map((crisis) => (
                    <li key={crisis._id} className="crisis-item">
                        <h3>{crisis.title}</h3>
                        <p><strong>Location:</strong> {crisis.location}</p>
                        <p><strong>Description:</strong> {crisis.description}</p>
                        <p><strong>Severity:</strong> {crisis.severity}</p>
                        <p><strong>Required Help:</strong> {crisis.requiredHelp}</p>
                        <p><strong>Date:</strong> {crisis.createdAt}</p>
                        <div className="crisis-actions">
                            <button onClick={() => handleApprove(crisis._id)} className="approve-button">Approve</button>
                            <button onClick={() => handleReject(crisis._id)} className="reject-button">Reject</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminCrisisSection;
