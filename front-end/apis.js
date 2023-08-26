// Get the buttons by id
const summaryBtn = document.getElementById('summaryBtn');
const regenerateBtn = document.getElementById('regenerateBtn');
const keyPointsBtn = document.getElementById('keyPointsBtn');
const copyBtn = document.getElementById('copyButton');
const saveBtn = document.getElementById('saveButton');
const loader = document.getElementById('loader');

const apiBaseUrl = 'http://localhost:4000/api/'

let apiResponseData;

// Define the function to fetch summary by api call
const callAPI = async (url) => {
    try{
        document.getElementById('apiResponse').style.display = 'none'; // Hide the current text
        regenerateBtn.style.display = 'none'; 
        copyBtn.style.display = 'none'; 
        saveBtn.style.display = 'none';
        loader.style.display = 'block';  // Show loader

        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        // api call
        const response = await fetch(`${url}${tab.url}`);
        let data = await response.json();

        loader.style.display = 'none'; // Hide loader
        document.getElementById('apiResponse').style.display = 'block'; // Show text
        regenerateBtn.style.display = 'block'; 
        copyBtn.style.display = 'block'; // Show copy button
        saveBtn.style.display = 'block'; // Show copy button
        
        apiResponseData = data.data;
        document.getElementById('apiResponse').innerHTML = formatResponse(data.data); // Display the result
    } catch(err){
        document.getElementById('loader').style.display = 'none'; // Hide loader in case of error
        document.getElementById('apiResponse').innerHTML = 'Something went wrong!' // Show the error
        console.log('Error: ',err);
    } 
}

const savePdfAPI = (url) => {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text: apiResponseData})
    } )
    .then(res =>res.blob())
    .then(blob => {
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'summary.pdf';
        link.click();
    }).catch(err => console.log('Error: ',err));
}

const formatResponse = (text) => {
    const firstPointIndex = text.indexOf('\n\n');

    if(firstPointIndex !== -1){
        const trimmedText = text.substring(firstPointIndex+2);
        return trimmedText.split('\n').join('<br/>'); 
    }
    return text.split('\n').join('<br/>'); 
}

// Add event listeners to the buttons
summaryBtn.addEventListener('click', () => callAPI(`${apiBaseUrl}summary?response_token=500&url=` ));
keyPointsBtn.addEventListener('click', () => callAPI(`${apiBaseUrl}key-points?response_token=500&url=`));

regenerateBtn.addEventListener('click', function() {
    if (lastButtonClicked === 'summary') {
        callAPI(`${apiBaseUrl}/summary?regenerate=true&response_token=500&url=`);
    } else if (lastButtonClicked === 'keyPoints') {
        callAPI(`${apiBaseUrl}/key-points?regenerate=true&response_token=500&url=`);
    }
});

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(apiResponseData)
    .then(() => {
        alert('Copied to clipbord!');
    })
    .catch(err => {
        alert('Error in copying text: ' + err);
    });
});

saveBtn.addEventListener('click', () => savePdfAPI(`${apiBaseUrl}download/pdf`));