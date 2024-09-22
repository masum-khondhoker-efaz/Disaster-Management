import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/AdminVolunteerSection.css';

const AdminVolunteerSection = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchVolunteers = async () => {
            try {
                // Retrieve token from localStorage
                const token = localStorage.getItem('token');

                // Send request with Authorization header
                const response = await axios.get('/api/volunteers/unverified', {
                    headers: {
                        Authorization: `Bearer ${token}`,  // Attach token to header
                    },
                });

                setVolunteers(response.data.data);
            } catch (error) {
                console.error('Error fetching unverified volunteers:', error);
                setErrorMessage(error.response ? error.response.data.message : 'Unable to fetch data');
            }
        };

        fetchVolunteers();
    }, []);

    const handleApprove = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`/api/volunteers/verify/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setVolunteers(volunteers.filter(volunteer => volunteer._id !== id));
        } catch (error) {
            console.error('Error approving volunteer:', error);
        }
    };

    const handleReject = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`/api/volunteers/reject/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setVolunteers(volunteers.filter(volunteer => volunteer._id !== id)); // Remove rejected volunteer from state
        } catch (error) {
            console.error('Error rejecting volunteer:', error);
        }
    };

    return (
        <div className="admin-volunteer-section">
            <h2>Unverified Volunteers</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {volunteers.length > 0 ? (
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {volunteers.map(volunteer => (
                        <tr key={volunteer._id}>
                            <td>{volunteer.name}</td>
                            <td>{volunteer.email}</td>
                            <td>{volunteer.status}</td>
                            <td>
                                <button onClick={() => handleApprove(volunteer._id)}>Approve</button>
                                <button className="reject" onClick={() => handleReject(volunteer._id)}>Reject</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <div className="no-volunteers-message">No unverified volunteers available</div>
            )}
        </div>
    );
};

export default AdminVolunteerSection;
