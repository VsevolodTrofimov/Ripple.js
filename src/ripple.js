import binders from './binders'
import {getDefaults} from './defaults'
import {getStyle, parseShorthand} from './utility'

import './ripple.css'

/** The actual ripple effect presentational class */
export class Ripple {
  constructor(props) {
    this.props = props

    this.$ = document.createElement('div')

    this.$.classList.add('ripple')

    this.$.innerHTML = '<div class="ripple__effect ripple__effect--hidden"></div>'
    this.$effect = this.$.querySelector('.ripple__effect')

    this.$.style.zIndex = props.zIndex
    document.body.appendChild(this.$)
  }
  show(target, event) {
    // setup
    let self = this
    let rect = this.getRect(target)

    let pageX = 0
    let pageY = 0

    if(typeof TouchEvent !== 'undefined' && event instanceof TouchEvent) {
      pageX = event.touches[0].pageX;
      pageY = event.touches[0].pageY;
    } else {
      pageX = event.pageX;
      pageY = event.pageY;
    }

    let effectCenter = {
      left: Math.abs(rect.left - pageX),
      top: Math.abs(rect.top - pageY)
    }

    let borderWidth, borderRadius

    this.radius = this.calcRadius(effectCenter, rect)

    let transitionTime = this.calcTransition()
    let maskStyle = this.$.style
    let effectStyle = this.$effect.style

    if(this.props.borderRadius === 'auto') {
      borderRadius = getStyle(target, 'border-radius')
    } else {
      borderRadius = this.props.borderRadius
    }

    if(this.props.borderWidth === 'auto') {
      borderWidth = getStyle(target, 'border-width')
    } else {
      borderWidth = this.props.borderWidth
    }

    borderRadius = parseShorthand(borderRadius)
    borderWidth = parseShorthand(borderWidth);

    // position of mask
    maskStyle.left = `${rect.left}px`
    maskStyle.top = `${rect.top}px`
    maskStyle.width = `${rect.width}px`
    maskStyle.height = `${rect.height}px`

    // modifying mask to avoid edge breaking
    maskStyle.borderRadius = borderRadius.val
    maskStyle.borderWidth = borderWidth.val

    //resize & position ripple effect (this is all for performace)
    effectStyle.width = `${this.radius*2}px`
    effectStyle.height = `${this.radius*2}px`

    effectStyle.left = `${effectCenter.left - this.radius - borderWidth.left}px`
    effectStyle.top = `${effectCenter.top - this.radius - borderWidth.top}px`

    // set transition properties
    effectStyle.transitionTimingFunction  = this.props.timingFunction
    effectStyle.transitionDuration = `${transitionTime}ms`

    // set cosmetic props
    effectStyle.background = this.props.color
    effectStyle.opacity = this.props.opacity

    // workaround to provide 100% chance of transition
    setTimeout(function() {
      self.$effect.classList.remove('ripple__effect--hidden')
    }, 1)
  }
  hide(cb) {
    let self = this
    let transitionTime = this.calcTransition()
    this.$effect.style.transitionDuration = `${transitionTime}ms`

    this.$effect.classList.add('ripple__effect--hide')
    setTimeout(() => {
      self.$.remove()
      delete self.$
      return cb()
    }, transitionTime)
  }

  calcTransition() {
    let transitionTime = 0

    if(this.props.constant) {
      transitionTime = this.props.transitionDuration
    } else {
      transitionTime = this.props.transitionDuration + this.radius * 1.1
    }

    return transitionTime
  }

  calcRadius(point, rect) {
    let vertical = Math.max(point.top, rect.height - point.top)

    let horizontal = Math.max(point.left, rect.width - point.left)

    return Math.sqrt(vertical * vertical + horizontal*horizontal)
  }

  getRect(target) {
    let bodyRect = document.body.getBoundingClientRect() //for scroll fix
    let targetRect = target.getBoundingClientRect()
    let marginTop = parseInt(getStyle(document.body, 'margin-top'), 10)
    let documentTop = parseInt(getStyle(document.body.parentElement, 'margin-top'), 10) + parseInt(getStyle(document.body.parentElement, 'padding-top'), 10)
    let marginLeft = parseInt(getStyle(document.body, 'margin-left'), 10)
    let documentLeft = parseInt(getStyle(document.body.parentElement, 'margin-left'), 10) + parseInt(getStyle(document.body.parentElement, 'padding-left'), 10)

    let rect = {
      top: targetRect.top - bodyRect.top + marginTop + documentTop,
      left: targetRect.left - bodyRect.left + marginLeft + documentLeft,
      width: targetRect.width,
      height: targetRect.height
    }

    return rect
  }
}

/** Factrory that creates {Ripple} based on its props */
export class RippleFactory {
  constructor(rippleProps) {
    rippleProps = rippleProps || {}
    this.rippleProps = Object.assign({}, getDefaults(), rippleProps)
  }
  create() {
    return new Ripple(this.rippleProps)
  }
}
