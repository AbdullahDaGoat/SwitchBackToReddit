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
    urlHistory.push(details.url);
  }
});