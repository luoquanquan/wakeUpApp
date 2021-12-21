class Toast {
    public wrapper: HTMLElement
    static instance: Toast

    constructor () {
      this.wrapper = null
      this.init()
    }

    static getInstance () {
      if (!Toast.instance) {
        Toast.instance = new Toast()
      }

      return Toast.instance
    }

    init () {
      this.wrapper = document.createElement('div')
      this.wrapper.setAttribute('style', `
            max-width: 80%;
            text-overflow: break-all;
            transition: all 200ms;
            padding: 20px;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: none;
            color: #ffffff;
            background: rgba(0, 0, 0, 0.6);
            border-radius: 4px;
            opacity: 0;
            z-index: 600;
        `)
      document.body.appendChild(this.wrapper)
    }

    show (content: string) {
      this.wrapper.innerHTML = content

      // 同时只允许出现一个 toast
      if (this.wrapper.style.display !== 'none') {
        return
      }
      this.wrapper.innerHTML = content
      this.wrapper.style.display = 'block'
      this.wrapper.style.opacity = '1'

      setTimeout(() => {
        this.wrapper.style.opacity = '0'
        setTimeout(() => {
          this.wrapper.style.display = 'none'
        }, 200)
      }, 3e3)
    }
}

export default Toast.getInstance()
