import { Hidden, VisibilityChange } from '../types'
// 判断当前页面是否展示的兼容写法
let hidden: Hidden
let visibilityChange: VisibilityChange
(() => {
  if (typeof document.hidden !== 'undefined') {
    hidden = 'hidden'
    visibilityChange = 'visibilitychange'
  } else if (typeof document.msHidden !== 'undefined') {
    hidden = 'msHidden'
    visibilityChange = 'msvisibilitychange'
  } else if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden'
    visibilityChange = 'webkitvisibilitychange'
  }
})()
const isPageHidden = () => document[hidden]

const bindUserAction = fbUrl => {
  // 如果 2 秒后当前的页面还在前台说明唤端失败, 跳转到兜底页面
  const timer = setTimeout(() => {
    if (!isPageHidden()) {
      window.location.href = fbUrl
    }
  }, 2e3)

  // 如果能够监听到当前页面已经切出后台, 清除计时器
  const wellDone = () => {
    clearTimeout(timer)
    document.removeEventListener(visibilityChange, wellDone)
    document.removeEventListener('pagehide', wellDone)
  }

  if (typeof visibilityChange !== 'undefined') {
    document.addEventListener(visibilityChange, wellDone)
  } else {
    window.addEventListener('pagehide', wellDone)
  }
}

export const envokeByA = (() => {
  const a = document.createElement('a')
  a.style.display = 'none'

  return (fbUrl, href) => {
    bindUserAction(fbUrl)
    a.href = href
    a.click()
  }
})()

export const envokeByLocation = (fbUrl, href) => {
  bindUserAction(fbUrl)
  window.location.href = href
}

export const envokeByUniversalLink = (bsUrl = '', href) => {
  let url = bsUrl + `?deepLink=${encodeURIComponent(href)}`
  if (bsUrl.includes('?')) {
    url = bsUrl + `&deepLink=${encodeURIComponent(href)}`
  }

  envokeByLocation('', url)
}
