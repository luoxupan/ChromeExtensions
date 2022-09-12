// let color = '#3aa757';

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.storage.sync.set({ color });
//   console.log('Default background color set to %cgreen', `color: ${color}`);
// });

var data = [
	{
		"RegExp_url": "https://luoxupan.github.io/wiki/pages/webapp/main_04b9bf45.js",
		"redirect_url": "http://localhost/main_04b9bf45.js",
		"enabled": true
	},
	{
		"RegExp_url": "https://luoxupan.github.io/wiki/pages/webapp/main_04b9bf45.js",
		"redirect_url": "https://dss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/js/lib/jquery-1-edb203c114.10.2.js",
		"enabled": false
	},
	{
		"RegExp_url": "https://luoxupan.github.io/wiki/pages/webapp/index.html",
		"redirect_url": "http://localhost/index.html",
		"enabled": false
	}
];

/**
 * 正则表达式MDN文档
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp
 * 
 * 插件开发文档
 * https://developer.chrome.com/docs/extensions/reference/webRequest/#type-BlockingResponse
 */
chrome.webRequest.onBeforeRequest.addListener(function (details) {
    let url = details.url;
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const reg = new RegExp(item.RegExp_url, 'g');
      if (item.enabled && item.redirect_url && reg.test(url)) {
        url = url.replace(reg, item.redirect_url);
      }
    }
    return url === details.url ? { cancel: false } : { redirectUrl: url };
  },
  {urls: ["<all_urls>"]},
  ["blocking"]
);

