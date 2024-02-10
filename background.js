const original_url = "https://sh.reddit.com"

chrome.action.onClicked.addListener((tab) => {
  const url = new URL(tab.url);
  const newUrl = original_url + url.pathname + url.search + url.hash;
  chrome.tabs.update(tab.id, { url: newUrl });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && /^https?:\/\/www\.reddit\.com/.test(tab.url)) {
    const isNewReddit = localStorage.getItem("newReddit") === "true";
    if (isNewReddit) {
      chrome.action.setIcon({ path: "icon-on.png", tabId: tabId });
      const url = new URL(tab.url);
      const newUrl = original_url + url.pathname + url.search + url.hash;
      chrome.tabs.update(tabId, { url: newUrl });
    } else {
      chrome.action.setIcon({ path: "icon-off.png", tabId: tabId });
    }
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleNewReddit") {
    const isNewReddit = localStorage.getItem("newReddit") === "true";
    if (isNewReddit) {
      localStorage.setItem("newReddit", false);
    } else {
      localStorage.setItem("newReddit", true);
    }
    sendResponse({ success: true });
  }
});