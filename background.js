// background.js

// Listen for changes to the #reddit-url select element
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === "sync" && changes.redditUrl) {
      // The #reddit-url select element has changed, so update the saved URL
      chrome.storage.sync.set({ redditUrl: changes.redditUrl.newValue });
    }
  });
  
  // When the extension is opened, retrieve the saved URL and apply it to the #reddit-url select element
  chrome.runtime.onStartup.addListener(() => {
    chrome.storage.sync.get("redditUrl", (result) => {
      if (result.redditUrl) {
        // A saved URL exists, so apply it to the #reddit-url select element
        document.getElementById("reddit-url").value = result.redditUrl;
      }
    });
  });
  
  // Listen for messages from the content script
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "redirect") {
      // The content script has requested a redirect to a new URL
      const newUrl = request.url;
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentUrl = tabs[0].url;
        const domain = currentUrl.split("/")[2];
        const newPath = currentUrl.substring(currentUrl.indexOf("/", 8));
        const redirectUrl = newUrl + newPath;
        chrome.tabs.update(tabs[0].id, { url: redirectUrl });
      });
    }
  });