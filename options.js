document.addEventListener("DOMContentLoaded", () => {
  const saveButton = document.getElementById("save-button")
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = tabs[0].url;
    const errorElement = document.getElementById("error-message")
    const dropdown = document.getElementById("reddit-url")
    if (!url.startsWith("https://www.reddit.com")) {
        errorElement.style.display = "block"
        dropdown.disabled = true
        saveButton.disabled = true
    }
  });

 saveButton.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentUrl = tabs[0].url;
      const domain = currentUrl.split("/")[2];
      const newPath = currentUrl.substring(currentUrl.indexOf("/", 8));
      const newUrl = document.getElementById("reddit-url").value + newPath;
      const redirectUrl = newUrl.replace(domain, "");
      chrome.tabs.update(tabs[0].id, { url: redirectUrl });
    });
  });

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
});