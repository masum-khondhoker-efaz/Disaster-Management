import { useState } from 'react';
import axios from 'axios';
import '../assets/AdminReportsSection.css';

const AdminReportsSection = () => {
    const [loading, setLoading] = useState({ donation: false, expense: false, inventory: false });
    const [error, setError] = useState(null);

    // Helper function to download reports
    const downloadReport = async (reportType) => {
        try {
            // Set the loading state for the report type
            setLoading((prev) => ({ ...prev, [reportType]: true }));
            setError(null);

            // Retrieve the authentication token from localStorage
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No authentication token found. Please log in.');
                return;
            }

            // Make the API call to download the report (CSV)
            const response = await axios.get(`/api/reports/${reportType}-report`, {
                responseType: 'blob', // This ensures the response is treated as a file (blob)
                headers: {
                    Authorization: `Bearer ${token}`, // Attach the token in Authorization header
                },
            });


            // Create a URL for the blob object from the response
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Create a temporary anchor element to trigger the file download
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${reportType}_report.csv`); // Specify the filename
            document.body.appendChild(link); // Append the link to the DOM
            link.click(); // Programmatically click the link to trigger download

            // Clean up the link and blob URL after download
            link.remove();
            window.URL.revokeObjectURL(url); // Free up memory after the download
        } catch (err) {
            // Error handling based on the type of error
            if (err.response && err.response.status === 401) {
                setError('Unauthorized: Please log in.');
            } else {
                setError(`Failed to download the ${reportType} report. Please try again.`);
            }
        } finally {
            // Always reset the loading state for the report type
            setLoading((prev) => ({ ...prev, [reportType]: false }));
        }

    };

    return (
        <div className="admin-reports-section">
            <h2>Admin Reports Section</h2>
            {error && <div className="error">{error}</div>}

            <ul className="reports-list">
                <li className="report-item">
                    <span>Donation Report</span>
                    <button
                        className="btn btn-primary"
                        onClick={() => downloadReport('donation')}
                        disabled={loading.donation}
                    >
                        {loading.donation ? 'Generating...' : 'Download'}
                    </button>
                </li>

                <li className="report-item">
                    <span>Expense Report</span>
                    <button
                        className="btn btn-primary"
                        onClick={() => downloadReport('expense')}
                        disabled={loading.expense}
                    >
                        {loading.expense ? 'Generating...' : 'Download'}
                    </button>
                </li>

                <li className="report-item">
                    <span>Inventory Report</span>
                    <button
                        className="btn btn-primary"
                        onClick={() => downloadReport('inventory')}
                        disabled={loading.inventory}
                    >
                        {loading.inventory ? 'Generating...' : 'Download'}
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default AdminReportsSection;
