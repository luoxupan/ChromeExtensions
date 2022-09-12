// let color = '#3aa757';

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.storage.sync.set({ color });
//   console.log('Default background color set to %cgreen', `color: ${color}`);
// });

chrome.webRequest.onBeforeRedirect.addListener(
  function(details) {
    console.log('details:',details)
    'data:text/html;charset=utf-8,dddddd'
  },
  {urls: ["<all_urls>"]},
  ["responseHeaders"]
);
