const redditUrl = "https://new.reddit.com";

function updateTabUrl(tabId, url) {
  const newUrl = new URL(url, redditUrl).href;
  chrome.tabs.update(tabId, { url: newUrl });
}

function validateUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    if (e instanceof TypeError) {
      console.error("Invalid URL:", url);
    } else {
      console.error("Unknown error validating URL:", url);
    }
    return false;
  }
}

chrome.action.onClicked((tab) => updateTabUrl(tab.id, new URL(tab.url)));

chrome.tabs.onUpdated((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && /^https?:\/\/www\.reddit\.com/.test(tab.url)) {
    chrome.storage.local.get("newReddit", (result) => {
      if (result.newReddit) {
        chrome.action.setIcon({ path: "icon-on.png", tabId: tabId });
        updateTabUrl(tabId, new URL(tab.url));
      } else {
        chrome.action.setIcon({ path: "icon-off.png", tabId: tabId });
      }
    });
  }
});

chrome.runtime.onMessage((request, sender, sendResponse) => {
  if (request.action === "toggleNewReddit") {
    chrome.storage.local.get("newReddit", ({ newReddit }) => {
      const updatedValue = !newReddit;
      chrome.storage.local.set({ newReddit: updatedValue }, () => {
        sendResponse({ success: true });
      });
    });
  }
});

if (!validateUrl(redditUrl)) {
  console.error("Invalid redditUrl:", redditUrl);
}