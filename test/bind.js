var assert = chai.assert
var expect = chai.expect

describe("Binders", function() {

  var rippleBind;

  beforeEach(function() {
    rippleBind = undefined
    document.body.querySelectorAll('.ripple').toArray().forEach(function(el) {el.remove()})
  })

  afterEach(function() {
    rippleBind.remove()
  })

  describe("bindTo", function() {
    it("Gets triggered", function(done) {
      rippleBind = ripple.bindTo(document.body.querySelector('#testBtns button'))

      document.body.querySelector('#testBtns button')
        .dispatchEvent(mouseEvent('mousedown'))

      //events fire after a while

      setTimeout(function() {
        try {
          assert.equal(getRipplesState()[0], 'shown', 'Ripple was not shown')
        } catch (e) {
          done(e)
        }
      }, 10)

      setTimeout(function() {
        document.body.querySelector('#testBtns button')
          .dispatchEvent(mouseEvent('mouseup'))
        setTimeout(function() {
          try {
            assert.equal(getRipplesState()[0], 'hiding', 'Ripple did not hide')
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

      document.body.querySelector('#testBtns button')
        .dispatchEvent(mouseEvent('mousedown'))

      setTimeout(function() {
        try {
          assert.equal(getRipplesState()[0], 'shown', 'Ripple was not shown')
        } catch (e) {
          done(e)
        }
      }, 10)

      setTimeout(function() {
        document.body.querySelector('#testBtns button')
          .dispatchEvent(mouseEvent('mouseup'))
        setTimeout(function() {
          try {
            assert.equal(getRipplesState()[0], 'hiding', 'Ripple did not hide')
            done()
          } catch (e) {
            done(e)
          }
        }, 10)
      }, 110)
    })

    it("Gets triggered on added elements", function(done) {
      rippleBind = ripple.watch('button')

      var btn = document.createElement('button')
      document.body.querySelector('#testBtns').appendChild(btn)

      btn.dispatchEvent(mouseEvent('mousedown'))

      setTimeout(function() {
        try {
          assert.equal(getRipplesState()[0], 'shown', 'Ripple was not shown')
        } catch (e) {
          done(e)
        }
      }, 10)

      setTimeout(function() {
        btn.dispatchEvent(mouseEvent('mouseup'))
        setTimeout(function() {
          btn.remove()
          try {
            assert.equal(getRipplesState()[0], 'hiding', 'Ripple did not hide')
            done()
          } catch (e) {
            done(e)
          }
        }, 10)
      }, 110)
    })

    it("Gets triggered ONLY inside the scope", function(done) {
      rippleBind = ripple.watch('button', {},
                    document.body.querySelector('#testBtns'))

      var btn = document.createElement('button')
      document.body.appendChild(btn)

      btn.dispatchEvent(mouseEvent('mousedown'))

      setTimeout(function() {
        btn.remove()
        try {
          assert.equal(getRipplesState()[0], 'none', 'Ripple did trigger')
          done()
        } catch (e) {
          done(e)
        }
      }, 10)
    })
  })
})
