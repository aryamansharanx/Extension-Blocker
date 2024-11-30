// manifest.json
{
  "manifest_version": 3,
  "name": "Extensions Page Blocker",
  "version": "1.0",
  "description": "Blocks access to the extensions management page",
  "permissions": ["tabs", "activeTab"],
  "background": {
    "service_worker": "background.js"
  }
}

// background.js
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