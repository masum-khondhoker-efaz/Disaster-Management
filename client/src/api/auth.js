import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Adjust the port if needed

// User registration
export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};

// User login
export const loginUser = async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
};

// Fetch total funds for home page
export const fetchTotalFunds = async () => {
    try {
        const response = await axios.get(`${API_URL}/funds`); // Assuming this is the correct endpoint
        return response.data;
    } catch (error) {
        console.error('Error fetching total funds:', error);
    }
};

// Fetch daily funds and expenses for the chart on home page
export const fetchDailyFundsAndExpenses = async () => {
    try {
        const response = await axios.get(`${API_URL}/daily-funds-expenses`); // Assuming this is the correct endpoint
        return response.data;
    } catch (error) {
        console.error('Error fetching daily funds and expenses:', error);
    }
};
