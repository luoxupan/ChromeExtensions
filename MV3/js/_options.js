let rules = [
	{
		"RegExp_url": "https://luoxupan.github.io/wiki/pages/webapp/main_04b9bf45.js",
		"redirect_url": "http://localhost:8080/main_04b9bf45.js",
		"enabled": false,
    "type": "ResProxy",
    "id": 1
	},
	{
		"RegExp_url": "https://cstest.xxxxx.com/cs-ticket-system/*",
		"redirect_url": "http://localhost:3000/",
		"enabled": false,
    "type": "ResProxy",
    "id": 2
	},
	{
		"RegExp_url": "https://cstest.xxxxx.com/static/js/*",
		"redirect_url": "http://localhost:3000/static/js/",
		"enabled": false,
    "type": "ResProxy",
    "id": 3
	},
	{
		"RegExp_url": "https://cstest.xxxxx.com/static/kfcommon/*",
		"redirect_url": "http://localhost:8686/static/kfcommon/",
		"enabled": false,
    "type": "ResProxy",
    "id": 4
	}
];

/**
 * 文档
 * https://developer.chrome.com/docs/extensions/reference/storage/
 */

chrome.storage.sync.set({ rules: rules });

async function getStorageRules() {
  const { rules } = await chrome.storage.sync.get(['rules']);
  return rules;
}
