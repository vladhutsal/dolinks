### 1.2.1
  - Removed `componentUpdated` hook support. Component should be re-rendered manualy, using e.g. Vue `:key=""` attribute.

### 1.2.0
  - DEPRECATED: passing text as v-dolinks directive arg is deprecated. Pass text to your tag inner text directly. Both are working for compatibility, but arg passing will be removed soon:
    - wrong: <p v-dolinks="'your text'"></p>
    - right: <p v-dolinks>{{ yourTextValue }}</p>
  - Changed links detecting method - increased parsing speed x10 ops/sec (measured by performance.now(), compared to 1.1.21);
  - Replaced RegExp (check README);
  - Bug fixed: if there was an <a> tag in text, it was hard to predict what are you going to get as the result;
  - Add code comments;
  - Updated README.md to 1.2.0.

### 1.1.21
  - Updated README.md

### 1.1.2
  - Add CHANGELOG.md;
  - RegEx worked wrong due to lack of escaped characters - now fixed;

### 1.1.1
  - Fixed bug with spaces that were recognized as new lines;

### 1.1.0
  - Add **disableWarnings** option and warning handling;
  - Add HTML tags sanitizer;
  - Now text should be passed as the v-dolinks argument, inside-tag text is ignored;
