import Runtime from './runtime'
import toast from '../utils/toast'

class Pc extends Runtime {
  bindLaunchAppEvent (el) {
    el.addEventListener('click', () => {
      toast.show('请在手机端打开')
    })
  }
}

export default Pc
