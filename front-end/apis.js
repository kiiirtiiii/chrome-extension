// Get the buttons by id
const summaryBtn = document.getElementById('summaryBtn');

const apiBaseUrl = 'http://localhost:4000/api/'

// Define the function to fetch summary by api call
const fetchSummary = async (apiBaseUrl) => {
    try{
        document.getElementById('loader').style.display = 'block'; // Show loader

        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        // const response = await fetch(`${apiBaseUrl}/summary?url=${tab.url}&response_token=500`);
        // const data = await response.json();

        const data = {
            data:  `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
        }

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