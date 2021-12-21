import Runtime from './runtime'
import LaunchApp from '../index'
import Guide from '../utils/guide'
import addwxTag from '../utils/addwxTag'
import { envokeByUniversalLink, envokeByA, envokeByLocation } from '../utils/envoke'
import { isWechat, getWeChatVersion, semverCompare, isQQ, getIOSVersion, isQQBrowser, isQzone } from '../utils/env'

class Ios extends Runtime {
    public ctx: LaunchApp
    public wxGuide: Guide

    constructor (ctx: LaunchApp) {
      super()
      this.ctx = ctx
      this.wxGuide = new Guide({ ios: 'wechat' })
    }

    bindLaunchAppEvent (el: HTMLElement, link) {
      const { universalLink, fbUrl, wxAppId } = this.ctx
      const { wxGuide } = this

      // 如果当前为微信环境
      // 且没有配置 universal link
      // 但服务号已经申请完成的情况下可以使用微信开放标签
      if (isWechat) {
        const wechatVersion: string = getWeChatVersion()
        if (!universalLink && wxAppId && semverCompare(wechatVersion, '7.0.12') >= 0) {
          addwxTag({ el, link, wxAppId, fbUrl })
          return
        }
      }

      el.addEventListener('click', () => {
        if (isWechat) {
          const wechatVersion: string = getWeChatVersion()
          if (semverCompare(wechatVersion, '7.0.7') >= 0) {
            if (getIOSVersion() >= 9 && universalLink) {
              envokeByUniversalLink(universalLink, link)
            } else {
              wxGuide.show()
            }
          } else {
            wxGuide.show()
          }
          // 腾讯系 app 都禁用了 UniversalLink 和 location 唤端
        } else if (isQQ || isQQBrowser || isQzone) {
          envokeByA(fbUrl, link)
        } else {
          if (getIOSVersion() >= 9 && universalLink) {
            envokeByUniversalLink(universalLink, link)
          } else {
            envokeByLocation(fbUrl, link)
          }
        }
      })
    }
}

export default Ios
