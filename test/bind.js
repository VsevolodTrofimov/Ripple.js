var assert = chai.assert
var expect = chai.expect

let rippleState = function() {
  let ripples = document.querySelectorAll('.ripple__effect')
  let lastRipple = ripples[ripples.length - 1]

  if(! lastRipple) return 'none'

  if(lastRipple.classList.contains('ripple__effect--hidden')) return 'hidden'
  if(lastRipple.classList.contains('ripple__effect--hide')) return 'hiding'

  return 'shown'
}

describe("Binders", function() {

  let rippleBind;

  beforeEach(function() {
    rippleBind = undefined
    document.querySelectorAll('.ripple').forEach((el) => {el.remove()})
  })

  afterEach(function() {
    rippleBind.remove()
  })

  describe("bindTo", function() {
    it("Gets triggered", function(done) {
      rippleBind = ripple.bindTo(document.querySelector('#testBtns button'))

      document.querySelector('#testBtns button')
        .dispatchEvent(mouseEvent('mousedown'))

      //events fire after a while

      setTimeout(function() {
        try {
          assert.equal(rippleState(), 'shown', 'Ripple was not shown')
        } catch (e) {
          done(e)
        }
      }, 10)

      setTimeout(function() {
        document.querySelector('#testBtns button')
          .dispatchEvent(mouseEvent('mouseup'))
        setTimeout(function() {
          try {
            assert.equal(rippleState(), 'hiding', 'Ripple did not hide')
            done()
          } catch (e) {
            done(e)
          }
        }, 10)
      }, 110)
    })
  })

  describe("Watch", function() {
    it("Gets triggered on existing elements", function(done) {
      rippleBind = ripple.watch('button')

      document.querySelector('#testBtns button')
        .dispatchEvent(mouseEvent('mousedown'))

      setTimeout(function() {
        try {
          assert.equal(rippleState(), 'shown', 'Ripple was not shown')
        } catch (e) {
          done(e)
        }
      }, 10)

      setTimeout(function() {
        document.querySelector('#testBtns button')
          .dispatchEvent(mouseEvent('mouseup'))
        setTimeout(function() {
          try {
            assert.equal(rippleState(), 'hiding', 'Ripple did not hide')
            done()
          } catch (e) {
            done(e)
          }
        }, 10)
      }, 110)
    })

    it("Gets triggered on added elements", function(done) {
      rippleBind = ripple.watch('button')

      let btn = document.createElement('button')
      document.querySelector('#testBtns').appendChild(btn)

      btn.dispatchEvent(mouseEvent('mousedown'))

      setTimeout(function() {
        try {
          assert.equal(rippleState(), 'shown', 'Ripple was not shown')
        } catch (e) {
          done(e)
        }
      }, 10)

      setTimeout(function() {
        btn.dispatchEvent(mouseEvent('mouseup'))
        setTimeout(function() {
          btn.remove()
          try {
            assert.equal(rippleState(), 'hiding', 'Ripple did not hide')
            done()
          } catch (e) {
            done(e)
          }
        }, 10)
      }, 110)
    })

    it("Gets triggered ONLY inside the scope", function(done) {
      rippleBind = ripple.watch('button', {},
                    document.querySelector('#testBtns'))

      let btn = document.createElement('button')
      document.body.appendChild(btn)

      btn.dispatchEvent(mouseEvent('mousedown'))

      setTimeout(function() {
        btn.remove()
        try {
          assert.equal(rippleState(), 'none', 'Ripple did trigger')
          done()
        } catch (e) {
          done(e)
        }
      }, 10)
    })
  })
})
