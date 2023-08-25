// Get the buttons by id
const summaryBtn = document.getElementById('summaryBtn');
const regenerateBtn = document.getElementById('regenerateBtn');

const apiBaseUrl = 'http://localhost:4000/api/'

// Define the function to fetch summary by api call
const fetchSummary = async (url) => {
    try{
        document.getElementById('apiResponse').style.display = 'none'; // Hide the current text
        document.getElementById('loader').style.display = 'block'; // Show loader

        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        const response = await fetch(`${url}${tab.url}`);
        const data = await response.json();

        document.getElementById('loader').style.display = 'none'; // Hide loader
        document.getElementById('apiResponse').style.display = 'block'; // Show text
        document.getElementById('apiResponse').innerHTML = JSON.stringify(data.data); // Display the result
    } catch(err){
        document.getElementById('loader').style.display = 'none'; // Hide loader in case of error
        console.log('Error: ',err);
    } 
}

// Add event listeners to the buttons
summaryBtn.addEventListener('click', () => fetchSummary(`${apiBaseUrl}/summary?response_token=250&url=`));
regenerateBtn.addEventListener('click', () => fetchSummary(`${apiBaseUrl}/summary?regenerate=true&response_token=250&url=`));