import Runtime from './runtime'
import Guide from '../utils/guide'

class Weibo extends Runtime {
    guide: Guide

    constructor () {
      super()
      this.guide = new Guide({
        android: 'android',
        ios: 'ios'
      })
    }

    bindLaunchAppEvent (el) {
      el.addEventListener('click', () => {
        this.guide.show()
      })
    }
}

export default Weibo
