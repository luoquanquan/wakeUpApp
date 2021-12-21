import Pc from './pc'
import Ios from './ios'
import Weibo from './weibo'
import Android from './android'

export default {
  createPcHandler () {
    return new Pc()
  },
  createWeiboHandler () {
    return new Weibo()
  },
  createAndroidHandler (ctx) {
    return new Android(ctx)
  },
  createIosHandler (ctx) {
    return new Ios(ctx)
  }
}
