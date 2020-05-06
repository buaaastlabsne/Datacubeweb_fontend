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

export function errorTip (self, errorMessage) {
  self.$message({
    type: 'error',
    message: errorMessage,
    center: true
  })
}

/**
 * Created by taozh on 2017/5/6.
 * taozh1982@gmail.com
 */
export var EleResize = {
  _handleResize: function (e) {
      var ele = e.target || e.srcElement;
      var trigger = ele.__resizeTrigger__;
      if (trigger) {
          var handlers = trigger.__z_resizeListeners;
          if (handlers) {
              var size = handlers.length;
              for (var i = 0; i < size; i++) {
                  var h = handlers[i];
                  var handler = h.handler;
                  var context = h.context;
                  handler.apply(context, [e]);
              }
          }
      }
  },
  _removeHandler: function (ele, handler, context) {
      var handlers = ele.__z_resizeListeners;
      if (handlers) {
          var size = handlers.length;
          for (var i = 0; i < size; i++) {
              var h = handlers[i];
              if (h.handler === handler && h.context === context) {
                  handlers.splice(i, 1);
                  return;
              }
          }
      }
  },
  _createResizeTrigger: function (ele) {
      var obj = document.createElement('object');
      obj.setAttribute('style',
          'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden;opacity: 0; pointer-events: none; z-index: -1;');
      obj.onload = EleResize._handleObjectLoad;
      obj.type = 'text/html';
      ele.appendChild(obj);
      obj.data = 'about:blank';
      return obj;
  },
  _handleObjectLoad: function (evt) {
      this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__;
      this.contentDocument.defaultView.addEventListener('resize', EleResize._handleResize);
  }
};
if (document.attachEvent) {//ie9-10
  EleResize.on = function (ele, handler, context) {
      var handlers = ele.__z_resizeListeners;
      if (!handlers) {
          handlers = [];
          ele.__z_resizeListeners = handlers;
          ele.__resizeTrigger__ = ele;
          ele.attachEvent('onresize', EleResize._handleResize);
      }
      handlers.push({
          handler: handler,
          context: context
      });
  };
  EleResize.off = function (ele, handler, context) {
      var handlers = ele.__z_resizeListeners;
      if (handlers) {
          EleResize._removeHandler(ele, handler, context);
          if (handlers.length === 0) {
              ele.detachEvent('onresize', EleResize._handleResize);
              delete  ele.__z_resizeListeners;
          }
      }
  }
} else {
  EleResize.on = function (ele, handler, context) {
      var handlers = ele.__z_resizeListeners;
      if (!handlers) {
          handlers = [];
          ele.__z_resizeListeners = handlers;

          if (getComputedStyle(ele, null).position === 'static') {
              ele.style.position = 'relative';
          }
          var obj = EleResize._createResizeTrigger(ele);
          ele.__resizeTrigger__ = obj;
          obj.__resizeElement__ = ele;
      }
      handlers.push({
          handler: handler,
          context: context
      });
  };
  EleResize.off = function (ele, handler, context) {
      var handlers = ele.__z_resizeListeners;
      if (handlers) {
          EleResize._removeHandler(ele, handler, context);
          if (handlers.length === 0) {
              var trigger = ele.__resizeTrigger__;
              if (trigger) {
                  trigger.contentDocument.defaultView.removeEventListener('resize', EleResize._handleResize);
                  ele.removeChild(trigger);
                  delete ele.__resizeTrigger__;
              }
              delete  ele.__z_resizeListeners;
          }
      }
  }
}