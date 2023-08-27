document.addEventListener("DOMContentLoaded", function() {
  const tabButtons = document.querySelectorAll(".tab button");
  
  // Function to remove active class from all tab buttons
  function deactivateTabs() {
    tabButtons.forEach(button => {
      button.classList.remove("active");
    });
  }
  
  // Function to handle tab button clicks
  function handleTabClick(event) {
    const clickedButton = event.target;
    
    if (!clickedButton.classList.contains("active")) {
      deactivateTabs();
      clickedButton.classList.add("active");
    }
  }
  
  // Add click event listener to each tab button
  tabButtons.forEach(button => {
    button.addEventListener("click", handleTabClick);
  });
});

// Get the settings icon and the modal content
// Add a click event listener to the settings icon
document.querySelector('.dropdown-btn').addEventListener('click', function() {
  // Toggle the display property of the modal content
  if (document.querySelector('.dropdown-content').style.display === 'none') {
    document.querySelector('.dropdown-content').style.display = 'block';
  } else {
    document.querySelector('.dropdown-content').style.display = 'none';
  }
});

let lastButtonClicked;

document.getElementById('summaryBtn').addEventListener('click', function() {
  lastButtonClicked = 'summary';
});

document.getElementById('keyPointsBtn').addEventListener('click', function() {
  lastButtonClicked = 'keyPoints';
});

document.getElementById('themeToggle').addEventListener('change', function() {
  var body = document.body;
  if(this.checked) {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    document.getElementById('settings-icon').src = 'assets/setting.svg';
  } else {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    document.getElementById('settings-icon').src = 'assets/setting-2.svg';
  }
});
