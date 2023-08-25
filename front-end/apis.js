// Get the buttons by id
const summaryBtn = document.getElementById('summaryBtn');

const apiBaseUrl = 'http://localhost:4000/api/'

// Define the function to fetch summary by api call
const fetchSummary = async (apiBaseUrl) => {
    try{
        document.getElementById('loader').style.display = 'block'; // Show loader

        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        const response = await fetch(`${apiBaseUrl}/summary?url=${tab.url}&response_token=500`);
        const data = await response.json();

        document.getElementById('loader').style.display = 'none'; // Hide loader

        // Display the result
        document.getElementById('apiResponse').innerHTML = JSON.stringify(data.data);        
    } catch(err){
        document.getElementById('loader').style.display = 'none'; // Hide loader in case of error
        console.log('Error: ',err);
    } 
}

// Add event listeners to the buttons
summaryBtn.addEventListener('click', () => fetchSummary(apiBaseUrl));