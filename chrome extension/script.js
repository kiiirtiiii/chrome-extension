let apiResponse = ''; // Initialize an empty string to store the API response
let response;

document.getElementById('copyButton').addEventListener('click', () => {
    // Copy API response to clipboard
    navigator.clipboard.writeText(response.data.summary)
    .then(() => {
        alert('API response copied to clipboard');
    })
    .catch(err => {
        alert('Error in copying text: ' + err);
    });
});

async function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  document.getElementById('tab1Btn').addEventListener('click', function(event) {
    openTab(event, 'Tab1');
  });
  document.getElementById('tab2Btn').addEventListener('click', function(event) {
    openTab(event, 'Tab2');
  });

  // Add your API call here
  if (tabName === 'Tab1') {
        // The code for the 'printText' button goes here
    const result = await fetch(`http://localhost:4040/api/scrap?url=${tab.url}&bullets=false`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    response = await result.json();
    console.log({response});
    document.getElementById('apiResponse').innerHTML = JSON.stringify(response.data.summary)
  } else if (tabName === 'Tab2') {
    // The code for the 'bulletSummery' button goes here
    const result = await fetch(`http://localhost:4040/api/scrap?url=${tab.url}&bullets=true`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    response = await result.json();
    console.log({response});
    document.getElementById('apiResponse').innerHTML = JSON.stringify(response.data.summary)
  }
}

document.getElementById('themeToggle').addEventListener('change', function() {
    var body = document.body;
    if(this.checked) {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
    }
  });

document.getElementById('saveButton').addEventListener('click', async function() {
    console.log('save called');
    
    fetch('http://localhost:4040/api/download-pdf', {
        method: 'POST',
        body: response.data.summary
    } )
  .then(res => res.blob())
  .then(blob => {
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'summary.pdf';
    link.click();
  });
});