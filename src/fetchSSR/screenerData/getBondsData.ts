export async function fetchBondData(): Promise<any> {
    try {
        const res = await fetch('https://shibui-uat.exchange-data.co.in/api/Bonds');
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        // console.log(data);

        // Return the data you need, e.g., the blogs array
        return data; // Adjust this based on the actual structure of the response
    } catch (error) {
        console.error('Error fetching bond data:', error);
        return null; // Or handle the error as needed
    }
}