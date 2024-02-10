document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector("#new-reddit-toggle");
  toggle.addEventListener("change", () => {
    chrome.runtime.sendMessage({ action: "toggleNewReddit" });
  });
});