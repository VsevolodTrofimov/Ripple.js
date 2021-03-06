# Ripple.js • [![Code Climate](https://codeclimate.com/github/VsevolodTrofimov/Ripple.js/badges/gpa.svg)](https://codeclimate.com/github/VsevolodTrofimov/Ripple.js) [![Build Status](https://travis-ci.org/VsevolodTrofimov/Ripple.js.svg?branch=master)](https://travis-ci.org/VsevolodTrofimov/Ripple.js)

Dependency-free Material Design ripple effect for the web, that wouldn't interfere your elements' DOM.
 - Tiny (3kb gzipped, even less with your webpack)
 - Doesn't need a DOM node as a host, you can create ripples over inputs and images without hacks
 - Customizable
 - Capable of creating multiple ripples at once
 - Enlarges on mousedown, fades out on mouseup
 - Works with touch devices
 - Has simple API
 - Supports IE 10+
 - Runs smoothly (always 30+ fps) on low-end devices (with power of CSS3 transitions)

[See a Demo](https://vsevolodtrofimov.github.io/Ripple.js/)

## Getting Ripple.js

#### Like a vendor lib

[Check the latest release](https://github.com/VsevolodTrofimov/Ripple.js/releases)

#### via npm
```bash
$ npm install proper-ripple --save-dev
```

#### via yarn
```bash
$ yarn add proper-ripple
```

Make sure to include it in your webpack (npm/yarn usage) (uses babel-loader with es-2015 preset & css-loader)

## Usage

This is how you can tell Ripple.js to watch any element matching a selector (including dynamically added)
```javascript
ripple.watch('#demo-2 button')
```

This is how you can add a listener to an element \ array of elements (DOM nodes)
```javascript
var yourElement = document.querySelector('.login-button')
var manyNodes = document.querySelectorAll('button')

ripple.bindTo(yourElement) //will trigger on your element
ripple.bindTo(manyNodes) //will trigger on any of these
```

This is how you can remove all listeners (rippleBind is the same for ripple.bindTo)
```javascript
var rippleBind = ripple.watch('#demo-2 button')
rippleBind.remove()
```

## Customization
### Full set of props
```javascript
{
  color: "#fafafa", //{string} background color (like in CSS)
  opacity: 0.21, //{number} ripple max opacity (like in CSS)
  borderRadius: 'auto', //auto -- copy target props OR {Srting} CSS prop value
  borderWidth: 'auto',  //auto -- copy target props OR {number} CSS prop value !IN PX!
  zIndex: 999, //{number}
  transitionDuration: 500, //{number} in ms
  timingFunction: "cubic-bezier(.4,0`,.42,1)", //{string} transition timing function
  constant: false //{bool} enlarging speed is constant on any element size
}
```
### Changing props
#### Way A
```javascript
var rippleBind = ripple.watch('#demo-2 button')
rippleBind.factory.rippleProps = {
	opacity: 0.41,
	transitionDuration: 700,
} //it's a plain js object

rippleBind.factory.rippleProps.color = '#000'
```

#### Way B
```javascript
var myProps = {
	color: '#000',
	opacity: 0.4,
	transitionDuration: 700
}

ripple.watch('#demo-2 button', myProps)
ripple.bindTo(manyNodes, myProps)
```

#### Way C
```javascript
ripple.setDefaults({
	color: '#000',
	opacity: 0.41,
	transitionDuration: 700
})
```

---

## Running tests
There are 2 ways to run tests for Ripple.js
1) PhantomJS
2) Browser mocha tests

Test's specs files are the same, but for the sake of PhantomJS they must be written in ES5

#### CLI PhantomJS testing

Assuming you have all devDependencies installed

```bash
$ npm test
```

#### Browser testing
```bash
$ npm run test-browser
```
