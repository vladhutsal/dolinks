# dolinks
> Vue directive to make links clickable in chosen HTML component, preserving newlines symbols of your text.

  - [Instalation](#installation)
  - [How to use](#how-to-use)
  - [Options](#options) 


## Installation
```$ npm i dolinks```

### Import
```javascript
// import dolinks in your project root
import dolinks from 'dolinks'

// pass it to Vue.use() method
Vue.use(dolinks);
```

### Additional options object:
```javascript
const options = {
  urlRegEx: myRegExpVariable,
  target: myTargetAtributeValue,
}
Vue.use(dolinks, options)
```

## How to use
Use ```v-dolinks``` directive with any HTML tag, which text need to be linked:
#### Input:
```html
<p v-dolinks>Some text description in <p> tag and some https://achievki.io link</p>
```
#### Output: 
```html
<p>
  Some text description in <p> tag and some
  <a href="https://achievki.io" target="_blank">https://achievki.io link</a>
</p>
```

## Options
### urlRegEx
Should be valid RegExp. By this expression, dolinks will deside what text should be transformed to an **&lt;a>** tag.</br>
Text, matched this regex, also will be used as a value for **href** atribute.

**Default:**
```javascript
/^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
```

### target
The value for **target** atribute of an **&lt;a>** tag. Should be a valid value for target:
  - _self
  - **_blank (default)**
  - _parent
  - _top

## License
MIT © [vladhutsal](https://github.com/vladhutsal)
