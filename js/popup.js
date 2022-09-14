// let changeColor = document.querySelector("#changeColor");
// chrome.storage.sync.get("color", ({ color }) => {
//   changeColor.style.color = color;
// });
// changeColor.addEventListener("click", async () => {
//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     func: setPageBackgroundColor,
//   });
// });

// The body of this function will be executed as a content script inside the
// current page
// function setPageBackgroundColor() {
//   chrome.storage.sync.get("color", ({ color }) => {
//     document.body.style.backgroundColor = color;
//   });
// }

/**
 * 文档
 * https://developer.chrome.com/docs/extensions/reference/runtime/#method-openOptionsPage
 */
const options = document.querySelector('#options');
options.addEventListener("click", () => {
  chrome.runtime.openOptionsPage();
});