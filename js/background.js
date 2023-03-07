const RulesTemp = {
  ResProxy(id, redirect_url, RegExp_url) {
    return {
      "id": id,
      "priority": 1,
      "action": {
        "type": "redirect",
        "redirect": { "regexSubstitution": redirect_url }
      },
      "condition": {
        "regexFilter": RegExp_url,
        "resourceTypes": ["script", "xmlhttprequest", "stylesheet", "main_frame", "sub_frame", "media", "image", "font"]
      }
    }
  },
};

class Background {
  constructor() {
    this.onAlarm();
    this.onChangedStorage();
    this.proxy();
  }
  proxy() {
    var config = {
      value: {
        mode: "fixed_servers",
        // mode: "system",
        rules: {
          proxyForHttp: {
            scheme: "http",
            host: "127.0.0.1",
            port: 8080,
          },
          proxyForHttps: {
            scheme: "http",
            host: "127.0.0.1",
            port: 8080,
          },
          bypassList: []
        },
      },
      scope: 'regular',
    };
    chrome.proxy.settings.set(config, function() {});
  }
  static toast({ title, message }) {
    /**
     * 解决Mac系统无法弹出消息问题
     * 1、在Chrome浏览器中访问地址：chrome://flags
     * 2、搜索：notifications，找到 Enable system notifications 选项
     * 3、将其选项值改为 Disabled，重启浏览器
     */
    chrome.notifications.create('toast', {
      requireInteraction: true,
      iconUrl: '/assets/icon.png',
      type: 'basic',
      title,
      message
    });
  }
  static generatorRules(existRules, rules) {
    let addRules = [];
    let removeRuleIds = [];
    for (let i = 0; i < rules.length; ++i) {
      const { RegExp_url, redirect_url, enabled, type, id } = rules[i];
      const isExist = existRules.includes(id);
      if (enabled && type && RegExp_url && redirect_url) {
        removeRuleIds.push(id);
        addRules.push(RulesTemp[type](id, redirect_url, RegExp_url));
      }
      if (!enabled && isExist) {
        removeRuleIds.push(id);
      }
    }
    return { addRules, removeRuleIds };
  }
  onChangedStorage() {
    /**
     * onChanged监听数据的格式
     * { "rules": { "newValue": {}, "oldValue": {} } }
     */
    chrome.storage.onChanged.addListener(async function (changes, namespace) {
      console.log('storageData:onChanged', changes, namespace);
      const storageData = await chrome.storage.sync.get(['rules']);
      const { rules } = storageData;
      console.log('storageData:', JSON.stringify(storageData));

      const existRules = await chrome.declarativeNetRequest.getDynamicRules();
      console.log('existRules:', existRules)

      const {
        addRules, removeRuleIds,
      } = Background.generatorRules(existRules.map(({ id }) => id), rules);
      /**
       * 文档
       * https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#method-updateDynamicRules
       */
      await chrome.declarativeNetRequest.updateDynamicRules({ addRules, removeRuleIds });
    });
  }
  createAlarm() {
    /**
     * 文档
     * https://developer.chrome.com/docs/extensions/reference/alarms/#type-AlarmCreateInfo
     */
    chrome.alarms.create('clock', {
      when: Date.now() + 1000 * 5
    });
  }
  onAlarm() {
    chrome.alarms.onAlarm.addListener((alarm) => {
      const { name } = alarm;
      if (name === 'clock') {
        console.log('alarm:', alarm);
        Background.toast({ title: '提醒', message: '时间到' })
      }
    });
  }
}

const background = new Background();
