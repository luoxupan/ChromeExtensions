// let color = '#3aa757';

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.storage.sync.set({ color });
//   console.log('Default background color set to %cgreen', `color: ${color}`);
// });

// chrome.webRequest.onBeforeRedirect.addListener(
//   function(details) {
//     console.log('details:',details)
//     'data:text/html;charset=utf-8,dddddd'
//   },
//   {urls: ["<all_urls>"]},
//   ["responseHeaders"]
// );

const RulesTemp = {
  ResProxy(id, redirect_url, RegExp_url) {
    return {
      "id": id,
      "priority": 1,
      "action": {
        "type": "redirect",
        "redirect": { "url": redirect_url }
      },
      "condition": {
        "urlFilter": RegExp_url,
        "resourceTypes": ["script", "xmlhttprequest"]
      }
    }
  },
};

function generatorRules(existRules, rules) {
  let addRules = [];
  let removeRuleIds = [];
  let enableRulesetIds = [];
  let disableRulesetIds = [];
  for (let i = 0; i < rules.length; ++i) {
    const { RegExp_url, redirect_url, enabled, type, id } = rules[i];
    const isExist = existRules.includes(id);
    if (enabled) {
      if (isExist) {
        enableRulesetIds.push(String(id));
      } else if (type && RegExp_url && redirect_url) {
        removeRuleIds.push(id);
        addRules.push(RulesTemp[type](id, redirect_url, RegExp_url));
      }
    }
    if (!enabled && isExist) {
      disableRulesetIds.push(String(id));
    }
  }
  return {
    addRules, removeRuleIds,
    enableRulesetIds, disableRulesetIds
  };
}

/**
 * onChanged监听数据的格式
 * { "rules": { "newValue": {}, "oldValue": {} } }
 */
chrome.storage.onChanged.addListener(async function (changes, namespace) {
  const { rules } = await chrome.storage.sync.get(['rules']);
  console.log('rules is:' + JSON.stringify(rules));

  const existRules = await chrome.declarativeNetRequest.getDynamicRules();
  console.log('existRules:', existRules)

  const {
    addRules, removeRuleIds,
    disableRulesetIds, enableRulesetIds
  } = generatorRules(existRules.map(({ id }) => id), rules);
  console.log('rules:=', {addRules, removeRuleIds, disableRulesetIds, enableRulesetIds} )
  /**
   * 文档
   * https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#method-updateDynamicRules
   */
  chrome.declarativeNetRequest.updateDynamicRules({ addRules, removeRuleIds });
  chrome.declarativeNetRequest.updateEnabledRulesets({ disableRulesetIds, enableRulesetIds });
});
