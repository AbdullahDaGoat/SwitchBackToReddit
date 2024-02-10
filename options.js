const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length > 0) {
      const newRedditToggle = document.getElementById("new-reddit-toggle");
      if (newRedditToggle) {
        newRedditToggle.parentElement.addEventListener("change", (e) => {
          if (e.target === newRedditToggle) {
            chrome.runtime.sendMessage({ action: "toggleNewReddit" }).catch((error) => {
              console.error("Error sending message:", error);
            });
          }
        });
      }
    }
  });
});

observer.observe(document.body, { childList: true });