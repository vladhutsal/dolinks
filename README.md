# dolinks
> ### Not tested with Vue3
> Vue directive to make links clickable in chosen HTML component, preserving newlines symbols of your text.

  - [Instalation](#installation)
  - [Usage examples](#usage-examples)
    - [Preserve your \n symbols](#preserve-your-n-symbols)
    - [Sanitizes all other HTML tags](#sanitizes-all-other-html-tags)
  - [Options](#options)
  - [Known issues](#known-issues)
  - [Changelog](https://github.com/vladhutsal/dolinks/blob/main/CHANGELOG.md)


## Installation
```
$ npm i dolinks
```

### Import
```javascript
// import dolinks in your project root
import dolinks from 'dolinks'

// pass it to Vue.use() method
Vue.use(dolinks);
```

### Additional options object:
```javascript
interface IOptions {
  urlRegEx?: RegExp,
  target?: '_self' | '_blank' | '_parent' | '_top',
  disableWarnings?: boolean,
}
```
Pass options object as a Vue.use() parameter:
```javascript
Vue.use(dolinks, options);
```

## Usage examples
dolinks assumes that you'll pass your text to the template using the [Vue "Mustache" syntax](https://v2.vuejs.org/v2/guide/syntax.html#Text).
  1. Mark you HTML tag with ```v-dolinks``` directive:</br>
  2. Pass text using ```{{ yourText }}```

### Preserve your \n symbols:
#### Input:
```javascript
<template>
  <p v-dolinks :style="{'white-space': 'pre-wrap'}">
    {{ yourText }}
  </p>
</template>

<script>
  data() {
    return {
      yourText: 'Some \n splited \n https://achievki.io \n here'
    }
  }
</script>
```
#### Output: 
```html
<p style="white-space: pre-wrap;">
  "Some splited"
  <a href="https://achievki.io" target="_blank">https://achievki.io</a> 
 " here"
</p>
```

### Sanitizes all other HTML tags:
#### Input:
```javascript
<script>
  data() {
    return {
      yourText: 'https://example.com Let`s try to pass some <script> with <a href="https://google.com">GOOGLE LINK</a> <\/script>'
    }
  }
</script>
```
#### Output: 
```html
<p style="white-space: pre-wrap;">
  <a href="https://example.com" target="_blank">https://example.com</a>
  " Let`s try to pass some &lt;script&gt; with &lt;a href=""
  <a href="https://google.com" target="_blank">https://google.com</a>
  ""&gt;GOOGLE LINK&lt;/a&gt; &lt;/script&gt;
</p>
```

## Options
### urlRegEx
Should be valid RegExp. By this expression, dolinks will deside what text should be transformed to an **&lt;a>** tag.</br>
Text, matched this regex, also will be used as a value for **href** atribute.

**Default:**
```javascript
/https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9@:%._\+~#=\/]{0,2048}/
```

### target
The value for **target** atribute of an **&lt;a>** tag. Should be a valid value for target:
  - _self
  - **_blank (default)**
  - _parent
  - _top

### disableWarnings
If true - disables all dolinks warnings and errors. **Default - false**.

## Known issues
- If text inside your tag with v-dolinks directive needs to be reactive, you should re-render component on each text update (e.g. use <p v-dolinks>:key="yourText">{{ yourText }}</p>). `update` and `componentUpdated` Vue directive hooks not working correctly with 1.2.0 and disabled for 1.2.1.

## License
MIT © [vladhutsal](https://github.com/vladhutsal)
