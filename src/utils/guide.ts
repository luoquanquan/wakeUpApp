import { isAndroid } from './env'

class Guide {
    private android: string
    private ios: string
    private wrapper: HTMLElement

    constructor (opt) {
      const { android, ios } = opt
      this.android = android
      this.ios = ios
      this.wrapper = null
      this.init()
    }

    private init () {
      const { android, ios } = this
      this.wrapper = document.createElement('div')
      this.wrapper.style.width = '100vw'
      this.wrapper.style.height = '100vh'
      this.wrapper.style.display = 'none'
      this.wrapper.style.position = 'fixed'
      this.wrapper.style.zIndex = '9999'
      this.wrapper.style.top = '0'
      this.wrapper.style.left = '0'
      this.wrapper.style.backgroundSize = '100% auto'
      this.wrapper.style.backgroundColor = '#ffffff'
      this.wrapper.style.backgroundRepeat = 'no-repeat'
      this.wrapper.style.backgroundImage = `url(//static.yximgs.com/udata/pkg/phenix/launchApp/${isAndroid ? android : ios}.png)`
      document.body.appendChild(this.wrapper)

      this.wrapper.addEventListener('click', () => {
        this.wrapper.style.display = 'none'
        document.body.style.overflow = 'auto'
      })
    }

    show () {
      this.wrapper.style.display = 'block'
      document.body.style.overflow = 'hidden'
    }
}

export default Guide
