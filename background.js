// Store the last 10 URLs no more to ensure excess memory isnt lost
let urlHistory = [];

// Listen for back button clicks
chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
  // If the user is going back, replace the URL with the last saved URL
  if (details.navigationType === "back-forward") {
    if (urlHistory.length > 0) {
      chrome.tabs.update(details.tabId, { url: urlHistory[urlHistory.length - 1] });
      urlHistory.pop();
    }
  }
});

// Listen for forward button clicks
chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  // If the user is going forward, add the current URL to the history
  if (details.navigationType === "forward") {
    urlHistory.push(details.url);
  }
});

// Listen for page loads
chrome.webNavigation.onCompleted.addListener(function(details) {
  // Add the current URL to the history
  if (details.frameId === 0) {
    // If the history is already at the maximum length, remove the oldest URL
    if (urlHistory.length >= 10) {
      urlHistory.shift();
    }

    // Add the new URL to the history
    urlHistory.push(details.url);
  }
});