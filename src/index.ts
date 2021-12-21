import runtime from './runtime/index'
import Runtime from './runtime/runtime'
import { LaunchAppOptions } from './types'
import { isIos, isWeibo, isPC } from './utils/env'
export { default as toast } from './utils/toast'

export default class LaunchApp {
    public wxAppId: string
    public appConf: string
    public fbUrl: string
    public universalLink: string
    public yoda: any
    public openHandler: Runtime

    /**
     * 创建唤端实例
     * @param options 唤端配置
     */
    constructor (options: LaunchAppOptions) {
      const { fbUrl, wxAppId, appConf, universalLink, yoda } = options

      if (yoda && !appConf) {
        throw new Error('Boom, \n the `appConf` is needed when you passed `yoda`, maybe you should check your code')
      }

      if (!fbUrl) {
        throw new Error('Boom, please pass `fbUrl` param !')
      }

      this.wxAppId = wxAppId
      this.appConf = appConf
      this.fbUrl = fbUrl
      this.universalLink = universalLink
      this.openHandler = null
      this.init()
    }

    private init () {
      if (isPC) {
        this.openHandler = runtime.createPcHandler()
      } else if (isWeibo) {
        this.openHandler = runtime.createWeiboHandler()
      } else if (isIos) {
        this.openHandler = runtime.createIosHandler(this)
      } else {
        this.openHandler = runtime.createAndroidHandler(this)
      }
    }

    public changeFbUrl (fbUrl: string) {
      this.fbUrl = fbUrl
    }

    public bindLaunchAppEvent (eles: HTMLElement | HTMLElement[], url: string) {
      if (eles instanceof HTMLElement) {
        eles = [eles]
      } else {
        eles = Array.from(eles)
      }

      eles.forEach((el) => {
        this.openHandler.bindLaunchAppEvent(el, url)
      })
    }
}
