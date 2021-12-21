import Runtime from './runtime'
import LaunchApp from '../index'
import Guide from '../utils/guide'
import addwxTag from '../utils/addwxTag'
import { envokeByLocation } from '../utils/envoke'
import { isWechat, getWeChatVersion, semverCompare } from '../utils/env'

class Android extends Runtime {
    public ctx: LaunchApp
    public wxGuide: Guide

    constructor (ctx: LaunchApp) {
      super()
      this.ctx = ctx
      this.wxGuide = new Guide({ android: 'wechat' })
    }

    bindLaunchAppEvent (el: HTMLElement, link: string) {
      const { wxAppId, fbUrl } = this.ctx
      const { wxGuide } = this

      if (isWechat) {
        const wechatVersion: string = getWeChatVersion()
        if (wxAppId && semverCompare(wechatVersion, '7.0.12') >= 0) {
          addwxTag({ el, link, wxAppId, fbUrl })
          return
        }
      }

      el.addEventListener('click', () => {
        if (isWechat) {
          wxGuide.show()
        } else {
          envokeByLocation(fbUrl, link)
        }
      })
    }
}

export default Android
