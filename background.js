// Store the last 10 URLs no more to ensure excess memory isn't lost
let urlHistory = [];

// Listen for back button clicks
chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
  // If the user is going back, replace the URL with the last saved URL
  if (details.navigationType === "back_forward") {
    if (urlHistory.length > 0) {
      chrome.tabs.update(details.tabId, { url: urlHistory[urlHistory.length - 1] });
      urlHistory.pop();
    }
  }
});

// Listen for forward button clicks
chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
  // If the user is going forward, add the current URL to the history
  if (details.navigationType === "forward") {
    urlHistory.push(details.url);
  }
});

// Listen for page loads
chrome.webNavigation.onCompleted.addListener(function (details) {
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

// Listen for page loads on the options page
chrome.webNavigation.onCompleted.addListener(function (details) {
  // If the page is the extension's options page and it is the active tab, do not modify the URL
  if (
    details.url.includes("chrome-extension://") &&
    details.tabId ===
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        return tabs[0].id;
      })
  ) {
    return;
  }

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

chrome.webNavigation.onBeforeNavigate.addListener(function (details) {
  if (details.navigationType === "back_forward") {
    urlHistory.push(details.url);
  }
});

// Set the default URL
let default_url = "https://new.reddit.com";

// Listen for page loads
chrome.webNavigation.onCompleted.addListener(function (details) {
  // If the page is the first page loaded in the browser, set the URL to the default URL
  if (details.frameId === 0 && details.url === "chrome://newtab/") {
    chrome.tabs.update(details.tabId, { url: default_url });
  }
});

// Listen for clicks on the extension button
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // If the message is to set the URL, set the URL to the requested value
  if (request.type === "set_url") {
    chrome.tabs.update(sender.tab.id, { url: request.url });
  }

  // If the message is to reset the URL, set the URL to the default URL
  if (request.type === "reset_url") {
    chrome.tabs.update(sender.tab.id, { url: default_url });
  }
});