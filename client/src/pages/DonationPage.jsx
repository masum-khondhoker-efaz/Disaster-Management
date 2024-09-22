import { useState, useEffect } from 'react';
import DailyFundsChart from '../components/DailyFundsAndExpenses.jsx';
import '../assets/DonationPage.css';

const DonationPage = () => {
    const [donorName, setDonorName] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [totalFunds, setTotalFunds] = useState(0); // State for total funds
    const [error, setError] = useState(null); // State for authentication errors

    useEffect(() => {
        fetchTotalFunds(); // Fetch total funds when the component mounts
    }, []);

    const fetchTotalFunds = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/funds'); // Update the endpoint as necessary
            const data = await response.json();
            setTotalFunds(data.totalFund); // Update the state with fetched total funds
        } catch (error) {
            console.error('Error fetching total funds:', error);
        }
    };

    const handleDonation = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state

        const token = localStorage.getItem('token'); // Retrieve token from localStorage

        if (!token) {
            setError('You need to be logged in to make a donation.'); // Show error if no token found
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/donate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Add token to Authorization header
                },
                body: JSON.stringify({ donorName, amount }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.Message); // Display success message
                fetchTotalFunds(); // Fetch updated total funds after donation
                setDonorName(''); // Clear the input
                setAmount(''); // Clear the input
            } else {
                setError(data.message || 'Failed to process donation.'); // Show server error message
            }
        } catch (error) {
            console.error('Error submitting donation:', error);
            setError('Error processing the donation. Please try again.'); // Show error if request fails
        }
    };

    return (
        <div className="donation-page-container">
            <section className="fund-section">
                <div className="fund-details">
                    <h1 className="section-header">Total Funds</h1>
                    <p style={{ fontSize: '40px' }}> BDT {totalFunds}</p> {/* Display total funds from state */}
                </div>
                <div className="chart-container">
                    <h1 className="section-header">Daily Funds and Expenses</h1>
                    <DailyFundsChart />
                </div>
            </section>
            <section className="donation-form-section">
                <h2 className="form-header">Make a Donation</h2>
                <div className="donation-form-container">
                    <form onSubmit={handleDonation} className="donation-form">
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={donorName}
                            onChange={(e) => setDonorName(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                        <button type="submit">Donate</button>
                    </form>
                    {message && <p className="donation-message">{message}</p>}
                    {error && <p className="donation-error">{error}</p>} {/* Display error message if any */}
                </div>
            </section>
        </div>
    );
};

export default DonationPage;
