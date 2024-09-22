import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/VolunteerPage.css';
const VolunteerComponent = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Fetch available tasks with volunteers from the backend
        axios.get('http://localhost:8000/api/available-volunteers')
            .then((response) => {
                if (response.data.status === 'Success') {
                    setTasks(response.data.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error);
            });
    }, []);

    return (
        <div className="volunteer-list">
            <h2>Available Volunteer List</h2>
            {tasks.length > 0 ? (
                tasks.map((task, index) => (
                    <div key={index} className="volunteer-task-card">

                        {task.assignedVolunteers && task.assignedVolunteers.length > 0 ? (
                            task.assignedVolunteers.map((volunteer, volIndex) => (
                                <div key={volIndex} className="volunteer-card">
                                    <img src="dummy-image.jpg" alt="Volunteer" />
                                    <div className="volunteer-info">
                                        <p><strong>Name:</strong> {volunteer.name}</p>
                                        <p><strong>Email:</strong> {volunteer.email}</p>
                                        <p><strong>Task Name:</strong> {task.title}</p>
                                        <p><strong>Location:</strong> {task.location}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No volunteers assigned yet.</p>
                        )}
                    </div>
                ))
            ) : (
                <p>No tasks available.</p>
            )}
        </div>
    );
};

export default VolunteerComponent;
