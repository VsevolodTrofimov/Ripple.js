function mouseEvent(type, sx, sy, cx, cy) {
  var evt;
  var e = {
    bubbles: true,
    cancelable: (type != "mousemove"),
    view: window,
    detail: 0,
    screenX: sx,
    screenY: sy,
    clientX: cx,
    clientY: cy,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    button: 0,
    relatedTarget: undefined
  };
  if (typeof( document.createEvent ) == "function") {
    evt = document.createEvent("MouseEvents");
    evt.initMouseEvent(type,
      e.bubbles, e.cancelable, e.view, e.detail,
      e.screenX, e.screenY, e.clientX, e.clientY,
      e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
      e.button, document.body.parentNode);
  } else if (document.createEventObject) {
    evt = document.createEventObject();
    for (prop in e) {
    evt[prop] = e[prop];
  }
    evt.button = { 0:1, 1:4, 2:2 }[evt.button] || evt.button;
  }
  return evt;
}

function dispatchEvent (el, evt) {
  if (el.dispatchEvent) {
    el.dispatchEvent(evt);
  } else if (el.fireEvent) {
    el.fireEvent('on' + type, evt);
  }
  return evt;
}

function getRipplesState() {
  var ripples = document.body.querySelectorAll('.ripple__effect').toArray()

  if(ripples.length === 0) return ['none']

  var states = ripples.map(function (currRipple) {
    if(currRipple.classList.contains('ripple__effect--hidden')) return 'hidden'
    if(currRipple.classList.contains('ripple__effect--hide')) return 'hiding'

    return 'shown'
  })

  return states
}


// Fix for old browsers & phantomjs
NodeList.prototype.toArray = function () {
  return Array.prototype.slice.call(this)
}

function getStyle(el, strCssRule) {
    var strValue = ""
    if (document.defaultView && document.defaultView.getComputedStyle) {
      strValue = document.defaultView.getComputedStyle(el, null).getPropertyValue(strCssRule)
    } else if(el.currentStyle) {
      strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1) {
        return p1.toUpperCase()
      })
      strValue = el.currentStyle[strCssRule]
    }
    return strValue
}
