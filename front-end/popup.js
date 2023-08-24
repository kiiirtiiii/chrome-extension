let popupVisible = false;

chrome.browserAction.onClicked.addListener(() => {
  if (popupVisible) {
    closePopup();
  } else {
    openPopup();
  }
});

function openPopup() {
//   popupVisible = true;
  // Show your popup content or manipulate the DOM here
  document.body.style.display = 'block';
}

function closePopup() {
  popupVisible = false;
  // Hide your popup content or reset the DOM here
  document.body.style.display = 'none';
}
