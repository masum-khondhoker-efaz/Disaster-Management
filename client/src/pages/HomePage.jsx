import React from 'react';
import { Link } from 'react-router-dom';
import TotalFunds from '../components/TotalFunds.jsx';
import DailyFundsChart from '../components/DailyFundsAndExpenses.jsx';
import '../assets/Home.css';
import CrisisSection from "../components/CrisisSection.jsx";
import VolunteerSection from "../components/VolunteerSection.jsx";


const HomePage = () => {
    return (
        <div className="homepage-container">
            <section className="fund-section">
                <div className="fund-details">
                    <h1 className="section-header">Total Funds</h1>
                    <TotalFunds />
                    <Link to="/donation" className="button">Make Donation</Link>
                </div>
                <div className="chart-container">
                    <h1 className="section-header">Daily Funds and Expenses</h1>
                    <DailyFundsChart />
                </div>
            </section>

                <CrisisSection />

                <VolunteerSection />
        </div>
    );
};

export default HomePage;
