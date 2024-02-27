// URL Validation and Error Handling
const saveButton = document.getElementById("save-button");

function validateUrl() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = tabs[0].url;
    const errorElement = document.getElementById("error-message");
    const dropdown = document.getElementById("reddit-url");

    if (!url.includes("reddit.com")) {
      errorElement.style.display = "block";
      dropdown.disabled = true;
      saveButton.disabled = true;
    }
  });
}

// Theme Toggling
function toggleTheme() {
  const toggleIcon = document.getElementById("toggle-icon");
  const toggleContainer = document.querySelector(".toggle-container");
  const body = document.body;
  let isLightMode = false;

  toggleContainer.addEventListener("click", (event) => {
    event.stopPropagation();
    isLightMode = !isLightMode;
    updateTheme(isLightMode);
  });

  function updateTheme(isLightMode) {
    if (isLightMode) {
      body.classList.add("light-mode");
      toggleIcon.classList.remove("fas", "fa-lightbulb");
      toggleIcon.classList.add("far", "fa-lightbulb");
    } else {
      body.classList.remove("light-mode");
      toggleIcon.classList.remove("far", "fa-lightbulb");
      toggleIcon.classList.add("fas", "fa-lightbulb");
    }
  }
}

// Custom URL Handling
function handleCustomUrl() {
  const customUrlInput = document.getElementById("custom-url");
  const addCustomUrlButton = document.getElementById("add-custom-url");
  const dropdown = document.getElementById("reddit-url");

  addCustomUrlButton.addEventListener("click", () => {
    const customUrl = customUrlInput.value;
    if (customUrl.includes("reddit.com")) {
      dropdown.innerHTML += `<option value="${customUrl}">Custom: ${customUrl}</option>`;
      dropdown.value = customUrl;
      customUrlInput.value = "";

      // Save custom URL to local storage
      saveCustomUrl(customUrl);

      // Automatically apply the custom URL
      redirectUrl();
    } else {
      alert("Invalid custom URL. Please enter a URL that contains reddit.com");
    }
  });
}

// Save custom URL to local storage
function saveCustomUrl(customUrl) {
  chrome.storage.sync.set({ customUrl: customUrl }, () => {
    console.log("Custom URL saved: " + customUrl);
  });
}

// Load custom URL from local storage
function loadCustomUrl() {
  chrome.storage.sync.get("customUrl", (result) => {
    if (result.customUrl) {
      const dropdown = document.getElementById("reddit-url");
      dropdown.innerHTML += `<option value="${result.customUrl}">Custom: ${result.customUrl}</option>`;
      dropdown.value = result.customUrl;
    }
  });
}

// Redirect URL
function redirectUrl() {
  saveButton.addEventListener("click", () => {
    chrome.storage.sync.get("customUrl", (result) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentUrl = tabs[0].url;
        const newPath = currentUrl.substring(currentUrl.indexOf("/", 8));
        let newUrl;
        if (result.customUrl) {
          newUrl = result.customUrl + newPath;
        } else {
          newUrl = document.getElementById("reddit-url").value + newPath;
        }

        const redirectUrl = newUrl;
        chrome.tabs.update(tabs[0].id, { url: redirectUrl });
      });
    });
  });
}

// Reset All Button Functionality
const resetAllButton = document.getElementById("reset-all-button");

resetAllButton.addEventListener("click", () => {
  // Clear custom dropdown contents
  const dropdown = document.getElementById("reddit-url");
  dropdown.innerHTML = "";

  // Reset custom URL input form
  const customUrlInput = document.getElementById("custom-url");
  customUrlInput.value = "";

  // Reset chrome extension
  chrome.storage.sync.clear(() => {
    console.log("All settings have been reset");
  });

  // Reload the options page
  window.location.reload();
});

// Initialize the functions
document.addEventListener("DOMContentLoaded", () => {
  validateUrl();
  toggleTheme();
  handleCustomUrl();
  saveCustomUrl();
  loadCustomUrl();
  redirectUrl();
});