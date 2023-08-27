// Get the buttons by id
const summaryBtn = document.getElementById('summaryBtn');
const regenerateBtn = document.getElementById('regenerateBtn');
const keyPointsBtn = document.getElementById('keyPointsBtn');
const copyBtn = document.getElementById('copyButton');
const saveBtn = document.getElementById('saveButton');
const loader = document.getElementById('loader');
const apiResponse =  document.getElementById('apiResponse');
const textbox = document.getElementById('responseLengthInput');

const apiBaseUrl = 'http://localhost:4000/api/'

let apiResponseData;

// Define the function to fetch summary and keypoints by api call
const callAPI = async (url) => {
    try{
        apiResponse.style.display = 'none';
        regenerateBtn.style.display = 'none'; 
        copyBtn.style.display = 'none'; 
        saveBtn.style.display = 'none';
        loader.style.display = 'block';

        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        // api call
        const response = await fetch(`${url}${tab.url}`);
        let data = await response.json();

        loader.style.display = 'none';
        apiResponse.style.display = 'block';
        regenerateBtn.style.display = 'block'; 
        copyBtn.style.display = 'block';
        saveBtn.style.display = 'block';
        
        apiResponseData = data.data;
        apiResponse.innerHTML = formatResponse(data.data)
    } catch(err){
        loader.style.display = 'none';
        apiResponse.innerHTML = 'Something went wrong!';
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

    let trimmedText;
    if(firstPointIndex !== -1){
        trimmedText = text.substring(firstPointIndex+2);
    } else {
        trimmedText = text;
    }

    const lastFullStopIndex = trimmedText.lastIndexOf('.');

    if (lastFullStopIndex !== -1) {
        return trimmedText.substring(0, lastFullStopIndex + 1).split('\n').join('<br/>');
    } else {
        return trimmedText.split('\n').join('<br/>'); 
    }
}

// Add event listeners to the buttons
summaryBtn.addEventListener('click', () => {
    let responseLimit = textbox.value || 2000; 
    callAPI(`${apiBaseUrl}summary?response_token=${responseLimit}&url=` )
});
keyPointsBtn.addEventListener('click', () => {
    callAPI(`${apiBaseUrl}key-points?response_token=2000&url=`)
});

regenerateBtn.addEventListener('click', function() {
    if (lastButtonClicked === 'summary') {
        let responseLimit = textbox.value || 2000; 
        callAPI(`${apiBaseUrl}/summary?regenerate=true&response_token=${responseLimit}&url=`);
    } else if (lastButtonClicked === 'keyPoints') {
        callAPI(`${apiBaseUrl}/key-points?regenerate=true&response_token=2000&url=`);
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