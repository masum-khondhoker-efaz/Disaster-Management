import { useState } from "react";
import axios from "axios";

const CrisisForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        image: '',
        description: '',
        severity: '',
        requiredHelp: ''
    });
    const [message, setMessage] = useState('');

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle file input change
    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    // Handle form submission with FormData for file uploads
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create FormData object to handle file and other form fields
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('location', formData.location);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('severity', formData.severity);
        formDataToSend.append('requiredHelp', formData.requiredHelp);
        formDataToSend.append('image', formData.image); // Append the image file

        try {
            const response = await axios.post('http://localhost:8000/api/crises', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage(response.data.message || 'Crisis submitted successfully');
            // Reset form
            setFormData({ title: '', location: '', image: '', description: '', severity: '', requiredHelp: '' });
        } catch (error) {
            console.error('Error submitting crisis:', error);
            setMessage('Error submitting crisis');
        }
    };

    return (
        <div className="crisis-form-container">
            <h2>Submit a Crisis</h2>
            <form onSubmit={handleSubmit} className="crisis-form">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange} // Handle file change separately
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
                <select
                    name="severity"
                    value={formData.severity}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Severity</option>
                    <option value="1">1 - Low</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5 - High</option>
                </select>
                <input
                    type="text"
                    name="requiredHelp"
                    placeholder="Required Help"
                    value={formData.requiredHelp}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Submit</button>
            </form>
            {message && <p className="submit-message">{message}</p>}
        </div>
    );
};

export default CrisisForm;
