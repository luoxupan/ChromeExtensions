## Chrome插件

#### 支持功能

- [x] 前端线上静态文件代理到本地
- [ ] 修改接口请求头参数

#### 插件安装
1. `git clone git@github.com:luoxupan/ChromeExtensions.git`
2. 打开Chrome浏览器输入`chrome://extensions/`回车
3. 在第二步页面里面，点击左上角的`Load unpacked`按钮
4. 在弹出文件选择框中，选中ChromeExtensions文件夹即可

#### 插件开发背景
- 前段时间参加业务很重的客服系统开发，该系统采用微前端技术架构。
- 本地开发，修改某处，需要启动很多服务，极其繁琐。
- 团队采用将测试环境的前端静态资源用Charles代理到本地前端服务的方案开发。
  - **但是**
  - Charles在我本地电脑总是影响网络，对工作影响极其重大，Charles太重 排查太费时间。
  - **于是**
  - 我就想到开发一个Chrome插件代替Charles的资源文件代理，然后就有了此插件。

#### 插件尚未发布Chrome应用市场
- Chrome商店规定发布插件前需要先注册开发者账号
- 注册开发者账号需支付 ${\color{red}5美元}$ 注册费，于是我立即决定 $\color{red}放弃$ 发布插件
- [https://chrome.google.com/webstore/devconsole/register](https://chrome.google.com/webstore/devconsole/register) 

#### 开发文档：
- [https://developer.chrome.com/docs/extensions/mv3/getstarted/](https://developer.chrome.com/docs/extensions/mv3/getstarted/)
- [declarativeNetRequest](https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/)
- [resourceTypes](https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#type-ResourceType)



<!-- ![](https://img.shields.io/static/v1?label=&message=hello&color=green) -->
