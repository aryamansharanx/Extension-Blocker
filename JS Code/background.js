chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const extensionPages = [
    "chrome://extensions",
    "chrome-extension://",
    "brave://extensions"
  ];

  if (changeInfo.status === 'complete') {
    const isExtensionPage = extensionPages.some(page => 
      tab.url.startsWith(page)
    );

    if (isExtensionPage) {
      chrome.tabs.update(tabId, { url: "about:blank" });
    }
  }
});
