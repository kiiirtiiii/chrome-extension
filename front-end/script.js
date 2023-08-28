// Declare variables for the settings icon and the dropdown content
let settingsIcon = document.querySelector('.dropdown-btn');
let modalContent = document.querySelector('.dropdown-content');
let lastButtonClicked;

// Event listener to wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
  const tabButtons = document.querySelectorAll(".tab button");
  
  // Function to deactivate all tabs
  function deactivateTabs() {
    // Loop over each button and remove the 'active' class
    tabButtons.forEach(button => {
      button.classList.remove("active");
    });
  }
  
  // Function to handle tab button click events
  function handleTabClick(event) {
    const clickedButton = event.target;
    
    // Check if clicked button is not already active
    if (!clickedButton.classList.contains("active")) {
      // Deactivate all tabs before activating the clicked one
      deactivateTabs();
      clickedButton.classList.add("active");
    }
  }
  
  // Add click event listener to each tab button
  tabButtons.forEach(button => {
    button.addEventListener("click", handleTabClick);
  });
});

// Add click event listener to the settings icon
settingsIcon.addEventListener('click', function() {
  // Toggle the display of the dropdown content on clicking the settings icon
  if (modalContent.style.display === 'none') {
    modalContent.style.display = 'block';
  } else {
    modalContent.style.display = 'none';
  }
});

// Event listener for clicks outside the modal and the settings button
document.addEventListener('click', function(event) {
  // Check if click was inside the modal or on the settings button
  let isClickInside = modalContent.contains(event.target);
  let isClickOnButton = settingsIcon.contains(event.target);

  // If click was outside, close the modal
  if (!isClickInside && !isClickOnButton) {
    modalContent.style.display = 'none';
  }
});

// Event listeners for summary and key points buttons
document.getElementById('summaryBtn').addEventListener('click', function() {
  lastButtonClicked = 'summary';
});

document.getElementById('keyPointsBtn').addEventListener('click', function() {
  lastButtonClicked = 'keyPoints';
});

// Event listener for theme toggle switch
document.getElementById('themeToggle').addEventListener('change', function() {
  let body = document.body;
  if(this.checked) {
    // If toggle is checked, switch to dark theme
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    document.getElementById('settings-icon').src = 'assets/setting.svg';
  } else {
    // If toggle is not checked, switch to light theme
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    document.getElementById('settings-icon').src = 'assets/setting-2.svg';
  }
});

// Event listener for checking input length
document.addEventListener('DOMContentLoaded',function(){
  document.getElementById('responseLengthInput').addEventListener('input', function() {
    // Check if input length exceeds 4000 characters
    if (this.value > 4000) {
      // If it does, highlight the input field and clear the input
      this.classList.add('input-error');
      this.value = '';
    } else {
      // If not, remove the highlight
      this.classList.remove('input-error');
    }
  });
});