document.addEventListener('DOMContentLoaded', () => {
  const newRedditToggle = document.getElementById("new-reddit-toggle");
  if (newRedditToggle) {
    newRedditToggle.addEventListener("change", () => {
      chrome.runtime.sendMessage({ action: "toggleNewReddit" });
    });
  }
});