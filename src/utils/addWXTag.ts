/**
 * 添加微信开放标签到指定元素上方
 * @param ele 目标元素
 * @param schemaUrl 唤端短链
 * @param appId 服务号 appid
 * @param fbUrl 兜底跳转链接
 */

export default function ({ ele, schemaUrl, appId, fbUrl }) {
  // ==========  dom 准备  =====================================================
  // 开放标签
  let wxTag
  // 目标元素父节点, 用于添加开放标签
  const { parentNode } = ele

  // 读取目标元素样式
  const style = window.getComputedStyle(ele)
  let { width, height, zIndex, position, top, bottom, left, right, transform } = style

  // 如果没有显示的设置元素的尺寸, 则通过 getBoundingClientRect 获取其所有尺寸信息
  if (width === 'auto' || height === 'auto') {
    const rect = ele.getBoundingClientRect()
    width = rect.width
    height = rect.height
  }

  // 保证开放标签能够覆盖到原始标签上方
  if (Number.isNaN(+zIndex)) {
    zIndex = '1'
  } else {
    zIndex = +zIndex + 1 + ''
  }

  // 创建包装盒, 用来包装开放标签元素
  const box = document.createElement('div')

  switch (position) {
    // 对于定位元素, 直接将 box 通过定位属性覆盖到目标元素即可
    case 'fixed': case 'absolute':
      box.setAttribute(
        'style',
        `position: ${position};
        top: ${top};
        bottom: ${bottom};
        left: ${left};
        right: ${right};
        transform: ${transform};
        z-index: ${zIndex};`
      )

      // 添加开放标签
      box.innerHTML = `
        <wx-open-launch-app extinfo="${schemaUrl}" appid="${appId}">
          <template><div style="width:${width}; height:${height};"></div></template>
        </wx-open-launch-app>
      `
      wxTag = box.firstElementChild
      parentNode.appendChild(box)
      break
    case 'relative': case 'static':
      // eslint-disable-next-line no-case-declarations
      const newWrap = document.createElement('div')
      newWrap.style.position = 'relative'
      newWrap.style.flex = 'none'
      parentNode.insertBefore(newWrap, ele)
      newWrap.appendChild(ele)
      parentNode.removeChild(ele)
      box.setAttribute('style', `position: absolute; top: 0; left: ${style.marginLeft}; width: ${width}; height: ${height}; transform: ${transform};`)
      box.innerHTML = `
        <wx-open-launch-app extinfo="${schemaUrl}" appid="${appId}">
          <template><div style="width:${width}; height:${height};"></div></template>
        </wx-open-launch-app>
      `
      wxTag = box.firstElementChild
      newWrap.appendChild(box)
      break

    default: break
  }

  if (wxTag) {
    wxTag.addEventListener('error', (e: any) => {
      const { errMsg } = e?.detail
      if (errMsg === 'launch:fail') {
        location.href = fbUrl
      }
    })
  }
}
