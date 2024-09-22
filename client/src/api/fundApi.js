import axios from 'axios';

export const fetchFundsData = async () => {
    try {
        const response = await axios.get('/api/funds'); // Make sure your backend has this route
        return response.data;
    } catch (error) {
        console.error('Error fetching funds data:', error);
        throw error;
    }
};
