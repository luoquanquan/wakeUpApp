const ua = navigator.userAgent || ''

export const semverCompare = (verionA: string, versionB: string) => {
  const { isNaN } = Number
  const splitA = verionA.split('.')
  const splitB = versionB.split('.')

  for (let i = 0; i < 3; i++) {
    const snippetA = Number(splitA[i])
    const snippetB = Number(splitB[i])

    if (snippetA > snippetB) return 1
    if (snippetB > snippetA) return -1

    if (!isNaN(snippetA) && isNaN(snippetB)) return 1
    if (isNaN(snippetA) && !isNaN(snippetB)) return -1
  }

  return 0
}

export const getIOSVersion = () => {
  const version = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)
  return version && Number.parseInt(version[1], 10)
}

export const getWeChatVersion = ():string => {
  const version = navigator.appVersion.match(/micromessenger\/(\d+\.\d+\.\d+)/i)
  return version && version[1]
}

export const isAndroid = /android/i.test(ua)

export const isIos = /iphone|ipad|ipod/i.test(ua)

export const isWechat = /micromessenger\/([\d.]+)/i.test(ua)

export const isWeibo = /(weibo).*weibo__([\d.]+)/i.test(ua)

export const isBaidu = /(baiduboxapp)\/([\d.]+)/i.test(ua)

export const isQQ = /qq\/([\d.]+)/i.test(ua)

export const isQQBrowser = /(qqbrowser)\/([\d.]+)/i.test(ua)

export const isQzone = /qzone\/.*_qz_([\d.]+)/i.test(ua)

export const isPC = !(isIos || isAndroid)
