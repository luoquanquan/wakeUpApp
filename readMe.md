# H5 唤端

> 统一了多 app 项目的唤端逻辑, DRY ✌🏻

## 运行环境

- 快手系
- 安卓
- iOS
- 微博
- pc
- ...

## 整体方案

### 唤端逻辑

![唤端方案逻辑](https://static.yximgs.com/udata/pkg/phenix/launchApp/docs/launchApp.png)

### 流程图

![唤端方案流程图](https://static.yximgs.com/udata/pkg/phenix/launchApp/docs/flow-chart.jpg)

ps: 代码实现和流程图**大体一致**, 但并非完全一样. 比如安卓快手环境下唤端, 由于目前 yoda 不支持指定页面唤起, 所以使用了 `location.href = scheme` 的方式

## USAGE

安装依赖

```shell
npm i @phenix/launch-app --registry https://npm.corp.kuaishou.com
```

业务代码

```js
import yoda from '@ks/yoda-js-sdk';
import LaunchApp from '@phenix/launch-app';

const launchApp = new LaunchApp({
    yoda,
    appConf: {
        ios: 'imv://',
        android: 'com.kwai.hisense'
    },
    wxAppId: 'wxa00dac0042e12dd4',
    fbUrl: 'https://h5.getkwai.com/html/mulight-web/middleware/landPage/index.html',
    universalLink: 'https://www.zhongnice.com/html/mulight-web/middleware/landPage/index.html'
});

const eles = document.querySelectorAll('.open-user-page');
launchApp.bindLaunchAppEvent(eles,  `imv://tab/feed`);
```

## options

### fbUrl

类型: `string`

必填: ✅

唤端失败后的兜底页面, 建议设置引导用户下载 app 的页面 eg: https://h5.getkwai.com/html/mulight-web/middleware/landPage/index.html

### yoda

类型: `object`

必填: ❌

yoda 容器对象, 用于快手系 App 内判断目标 app 是否已经安装, 唤端的逻辑更加灵活.

### appConf

类型: `object`
必填: 如果传了 yoda 该字段必填, 否则可以不填

目标 App 的包信息, 用于快手系 App 环境下判断目标 App 是否已安装

- appConf.android

    类型: `string`

    必填: ✅

    目标 app 安卓包名, eg: `com.kwai.hisense`

- appConf.ios

    类型: `string`

    必填: ✅

    目标 app iOS scheme 协议 <font color="#ff4d4f">PS: </font>这里必须写上 ://, eg: `imv://`

### wxAppId

类型: `string`

必填: ❌

在微信开放平台申请的 appId, 用于添加微信开放标签

### universalLink

类型: `string`

必填: ❌

Universal Link 方案唤端的跳转地址, 需要和当前正在展示的页面 **不同域**, 客户端没有配置 universal link 时可以不加. 如果用户没有安装目标 app 或者由于其他原因导致了 universal link 唤端失败的话 iPhone 会在当前环境跳转到 universalLink 下. 建议这里放一个引导用户下载 app 的页面 ~

## methods

### bindLaunchAppEvent(nodeList, link)

nodeList: DOM 节点列表
link: 唤端的 scheme 短链

### changeFbUrl(fbUrl)

可用于更新兜底页面的 url, 当需要在兜底页面上加一些需要异步获取的参数的时候. 可以在接口返回成功后调用此方法更新兜底网页链接

## 关于 universal link

universal link 是 iOS 9 引入的一种唤端方案, 没有弹窗也没有拦截. 体验就像端 html 中的 a 标签一样的丝滑 ~

![universal-link 图片展示](https://static.yximgs.com/udata/pkg/phenix/launchApp/docs/universal-link.gif)

关于 universal link 前端和 app 端的配置可以参考[官方文档](https://developer.apple.com/library/archive/documentation/General/Conceptual/AppSearch/UniversalLinks.html)

在本仓库中, 我们使用的 universal link 是基于 scheme 的. 用户无需关心拼接的过程. 只需要统一传入 scheme 短链接即可.

eg:

```js
// 我们想打开的短链接为 imv://tab/feed
// universalLink 为 https://www.zhongnice.com/html/mulight-web/middleware/landPage/index.html
// 最终会被拼接成以下 universal link

const ul = `https://www.zhongnice.com/html/mulight-web/middleware/landPage/index.html?deepLink=${encodeURIComponent('imv://tab/feed')}`

// 也就是说 iOS 开发的同学获取到 universal link 以后要读取 deepLink 参数的值, 并作为 scheme 解析即可复用 scheme 唤端逻辑
```

PS: universal link 用到的 json 文件会在用户下载 app 时候下载, 如果用户下载的时候配置了代理可能会导致该文件下载失败. 最终导致唤端失效. 解决方法是卸载 app 取消代理重新下载

## 参考资料

- [callapp-lib](https://github.com/suanmei/callapp-lib)
- [yoda-js-sdk hasInstalledApp](https://yoda.corp.kuaishou.com/docs/content/KUAISHOU/bridge/%252Fdocs%252Fdoc%252FKUAISHOU%252Fbridge%252Fkwai%252FhasInstalledApp)
- [开放标签说明文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_Open_Tag.html#22)
- [Support Universal Links](https://developer.apple.com/library/archive/documentation/General/Conceptual/AppSearch/UniversalLinks.html)
