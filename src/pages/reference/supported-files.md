---
layout: ../../layouts/content.astro
title: 支持的文件类型
description: Snowpack ships with built-in support for many file types including json, js, ts, jsx, css, css modules, and images.
---

Snowpack内置了对以下文件类型的支持，不需要配置。

- JavaScript (`js.`,`.mjs`)
- TypeScript (`.ts`,`.tsx`)
- JSON (`.json`)
- JSX (`.jsx`, `.tsx`)
- CSS (`.css`)
- CSS 模块 (`.module.css`)
- 图片和资源 (`.svg`,`.jpg`,`.png`, etc.)
- WASM (`.wasm`)

要自定义构建行为并支持新的语言，[请查看我们的工具指南](/guides/connecting-tools)

### JavaScript和ESM

Snowpack被设计用来支持JavaScript的本地ES模块（ESM）语法。ESM允许你定义明确的导入和导出，浏览器和构建工具可以更好地理解和优化。如果你熟悉JavaScript中的`import`和`export`关键字，那么你已经知道ESM了！所有现代浏览器都支持ESM。

```js
// ESM Example - src/user.js
export function getUser() {
  /* ... */
}

// src/index.js
import {getUser} from './user.js';
```

所有的现代浏览器都支持ESM，所以Snowpack能够在开发过程中把这些代码直接传给浏览器。这就是Snowpack的**免打包式开发**工作流程的原因。

Snowpack还允许你在你的应用程序中直接导入非JavaScript文件。Snowpack自动为你处理这一切，所以没有什么需要配置的，使用以下逻辑。

### TypeScript

Snowpack包括内置的支持，可以将TypeScript文件（`*.ts`）构建为JavaScript。

请注意，这个内置支持只是构建。默认情况下，Snowpack不会对你的TypeScript代码进行类型检查。要将类型检查整合到你的开发/构建工作流程中，请添加[@snowpack/plugin-typescript](https://www.npmjs.com/package/@snowpack/plugin-typescript)插件。

### JSX

Snowpack包括内置支持构建JSX文件（`*.jsx`&`*.tsx`）到JavaScript。

如果你正在使用Preact，Snowpack将检测到这一点，并切换到使用Preact风格的JsX`h()`函数。这都是自动为你完成的。如果你需要定制这种行为，可以考虑添加[@snowpack/plugin-babel](https://www.npmjs.com/package/@snowpack/plugin-babel)插件，通过Babel进行完全的编译器定制。

**注意：Snowpack的默认构建不支持`.js`/`.ts`**文件中的JSX。如果你不能使用`.jsx`/`.tsx`文件扩展名，你可以使用[@snowpack/plugin-babel](https://www.npmjs.com/package/@snowpack/plugin-babel)来代替构建你的JavaScript。

### JSON

```js
// Load the JSON object via the default export
import json from './data.json';
```

Snowpack支持将JSON文件直接导入到应用中。导入的文件在默认导入中返回完整的JSON对象。

### CSS

```js
// Load and inject 'style.css' onto the page
import './style.css';
```

Snowpack支持将CSS文件直接导入到应用中。导入的样式没有暴露出口，但是导入一个样式会自动将这些样式添加到页面中。这在默认情况下适用于所有的CSS文件，并且可以通过插件支持编译成CSS语言，如Sass & Less。

如果你不喜欢写CSS，Snowpack也支持所有流行的CSS-in-JS库（例如：styled-components）进行样式设计。

### CSS模块

```js
// 1. Converts './style.module.css' classnames to unique, scoped values.
// 2. Returns an object mapping the original classnames to their final, scoped value.
import styles from './style.module.css';

// This example uses JSX, but you can use CSS Modules with any framework.
return <div className={styles.error}>Your Error Message</div>;
```

Snowpack支持使用`[name].module.css`命名规则的CSS模块。就像任何CSS文件一样，导入一个CSS文件会自动将该CSS应用到页面中。然而，CSS模块导出了一个特殊的默认`style`对象，它将你的原始类名映射为唯一的标识符。

CSS模块可以帮助你在前端强制执行组件的隔离，为样式生成唯一的类名。

### 其他资源

```jsx
import imgReference from './image.png'; // img === '/src/image.png'
import svgReference from './image.svg'; // svg === '/src/image.svg'
import txtReference from './words.txt'; // txt === '/src/words.txt'

// This example uses JSX, but you can use import references with any framework.
<img src={imgReference} />;
```

上面没有明确提到的所有其他资源都可以通过ESM`导入`，并将返回对最终构建的资源的URL引用。这对于通过URL引用非JS资源是非常有用的，比如创建一个带有`src`属性的图片元素指向该图片。

### WASM

```js
// Loads and intializes the requested WASM file
const wasm = await WebAssembly.instantiateStreaming(fetch('/example.wasm'));
```

Snowpack支持使用浏览器的[`WebAssembly`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly)API将WASM文件直接加载到你的应用程序。阅读我们的[WASM指南](/guides/wasm)以了解更多。

### 导入NPM包

```js
// Returns the React & React-DOM npm packages
import React from 'react';
import ReactDOM from 'react-dom';
```

Snowpack让你在浏览器中直接导入npm包。即使一个包是用传统的格式发布的，Snowpack也会在把它提供给浏览器之前把它向上转换为ESM。

当你启动开发服务器或运行一个新的构建时，你可能会看到一个信息，即Snowpack正在 "安装依赖"。这意味着Snowpack正在转换你的依赖项以在浏览器中运行。这只需要运行一次，或者直到你下次通过添加或删除依赖项来改变依赖树。
