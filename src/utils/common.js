export function confirmTip (self, config) {
  let boxType = config.boxType || 'confirm'
  if (boxType === 'confirm') {
    self.$confirm(config.body, config.head, {
      confirmButtonText: config.confirmButtonText || '确定',
      cancelButtonText: config.cancelButtonText || '取消',
      confirmButtonClass: 'el-button--' + (config.confirmButtonClass || 'primary'),
      type: config.type || 'warning',
      center: true
    }).then(() => {
      let callback = config.callback()
      if (typeof callback === 'object' && typeof callback.then === 'function') {
        callback.then(args => {
          typeof config.success === 'function' && config.success(args)
          successTip(self, config.successMessage)
        }).catch(error => {
          typeof config.error === 'function' && config.error(error)
          errorTip(self, error, config.errorMessage)
        })
      } else {
        typeof config.success === 'function' && config.success()
        successTip(self, config.successMessage)
      }
    }).catch(() => {
      typeof config.cancel === 'function' && config.cancel()
      cancelTip(self, config.cancelMessage)
    })
  } else if (boxType === 'prompt') {
    self.$prompt(config.body, config.head, {
      confirmButtonText: config.confirmButtonText || '确定',
      cancelButtonText: config.cancelButtonText || '取消',
      inputPattern: config.inputPattern || /.+/,
      inputValidator: config.inputValidator,
      center: true,
      ...(typeof config.value !== 'undefined' ? { inputValue: config.value } : {})
    }).then(({ value }) => {
      let callback = config.callback(value)
      if (typeof callback === 'object' && typeof callback.then === 'function') {
        callback.then(args => {
          typeof config.success === 'function' && config.success(args)
          successTip(self, config.successMessage)
        }).catch(error => {
          typeof config.error === 'function' && config.error(error)
          errorTip(self, error, config.errorMessage)
        })
      } else {
        typeof config.success === 'function' && config.success()
        successTip(self, config.successMessage)
      }
    }).catch(() => {
      typeof config.cancel === 'function' && config.cancel()
      cancelTip(self, config.cancelMessage)
    })
  }
}

export function infoTip (self, infoMessage) {
  self.$message({
    type: 'info',
    message: infoMessage || '无提示',
    center: true
  })
}

export function cancelTip (self, cancelMessage) {
  self.$message({
    type: 'info',
    message: cancelMessage || '已取消',
    center: true
  })
}

export function successTip (self, successMessage) {
  self.$message({
    type: 'success',
    message: successMessage || '操作成功',
    center: true
  })
}

export function errorTip (self, error, errorMessage) {
  let message = translate(error.message || error.msg || '出错了，请重试')
  console.log(error, message)
  self.$message({
    type: 'error',
    message: errorMessage || message,
    center: true,
    duration: (error.message && error.message.indexOf('Network Error') !== -1) ? 8000 : 3000
  })
  return message
}