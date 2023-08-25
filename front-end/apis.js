// Get the buttons by id
const summaryBtn = document.getElementById('summaryBtn');

const apiBaseUrl = 'http://localhost:4000/api/'

// Define the function to fetch summary by api call
const fetchSummary = async (apiBaseUrl) => {
    try{
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const response = await fetch(`${apiBaseUrl}/summary?url=${tab.url}&response_token=500`);
        const data = await response.json();
        console.log(data);
    }catch(err){
        console.log(err);
    } 
}

// Add event listeners to the buttons
summaryBtn.addEventListener('click', () => fetchSummary(apiBaseUrl));