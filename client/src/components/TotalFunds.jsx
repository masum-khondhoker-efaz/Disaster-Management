import { useEffect, useState } from 'react';

const TotalFunds = () => {
    const [totalFunds, setTotalFunds] = useState(0);

    useEffect(() => {
        fetchTotalFunds();
    }, []);

    const fetchTotalFunds = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/funds');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Total Funds API Response:', data);  // Debugging the API response

            // Update the state with the correct key from the response
            setTotalFunds(data.totalFund || 0);
        } catch (error) {
            console.error('Error fetching total funds:', error);
        }
    };

    return (
        <div>
            <p style={{fontSize: '40px'}}>BDT {totalFunds}</p>
        </div>
    );
};

export default TotalFunds;
